import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import calculateTextareaHeight from '../utils/calculate-textarea-height';
import { injectStyles, removeStyle } from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import { omit, has, uniqueId } from '../utils/helpers';
import { textInputStyle } from '../style';

const newLineRegex = /[\r\n]/g;

const textInputPropTypes = {
  className: PropTypes.string,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  style: PropTypes.object,
  hoverStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  allowNewLine: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  disabledHoverStyle: PropTypes.object,
  onUpdate: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  valueLink: PropTypes.shape({
    value: PropTypes.string.isRequired,
    requestChange: PropTypes.func.isRequired,
  }),
};

/**
 * Returns an object with properties that are relevant for the TextInput's textarea.
 *
 * As the height of the textarea needs to be calculated valueLink can not be
 * passed down to the textarea, but made available through this component.
 */
function sanitizeChildProps(properties) {
  const childProps = omit(properties, Object.keys(textInputPropTypes));
  if (typeof properties.valueLink === 'object') {
    childProps.value = properties.valueLink.value;
  }

  return childProps;
}

/**
 * Update hover & focus style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle & focusStyle
 */
function updatePseudoClassStyle(styleId, properties) {
  const hoverStyle = {
    ...textInputStyle.hoverStyle,
    ...properties.hoverStyle,
  };
  const focusStyle = {
    ...textInputStyle.focusStyle,
    ...properties.focusStyle,
  };
  const disabledHoverStyle = {
    ...textInputStyle.disabledHoverStyle,
    ...properties.disabledHoverStyle,
  };

  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover',
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus',
    },
    {
      id: styleId,
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true,
    },
  ];
  injectStyles(styles);
}

/**
 * TextInput component with great UX like autogrowing & handling states
 *
 * Note on styling: Right now this component doen't allow to change style after
 * initialisation.
 *
 * Note on resizing:
 * If you fill a textarea only with spaces and the cursor reaches the right end
 * it won't break the line. This leads to unexpected behaviour for the automatic
 * resizing.
 *
 * This component was highly inspired by the great work from these guys
 * - Andrey Popp: https://github.com/andreypopp/react-textarea-autosize
 * - Eugene: https://gist.github.com/eugene1g/5dbaa7d35d0c7d5c2c56
 */
export default class TextInput extends Component {

  constructor(properties) {
    super(properties);
    let inputValue;

    if (has(properties, 'valueLink')) {
      inputValue = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      inputValue = properties.value;
    } else if (has(properties, 'defaultValue')) {
      inputValue = properties.defaultValue;
    }

    this.state = {
      height: 'auto',
      inputValue,
    };
    this.textareaProps = sanitizeChildProps(properties);
  }

  static displayName = 'TextInput';

  static propTypes = textInputPropTypes;

  static defaultProps = {
    allowNewLine: false,
    disabled: false,
  };

  /**
   * Generates the style-id & inject the focus & hover style.
   */
  componentWillMount() {
    const id = uniqueId();
    this._styleId = `style-id${id}`;
    updatePseudoClassStyle(this._styleId, this.props);
  }

  /**
   * Right after the component go injected into the DOM it should be resized.
   */
  componentDidMount() {
    this._triggerResize(this.state.inputValue);
  }

  /**
   * Update the properties passed to the textarea and resize as with the new
   * properties the height might have changed.
   */
  componentWillReceiveProps(properties) {
    // Makes sure we have inputValue available when triggering a resize.
    const newState = {
      inputValue: this.state.inputValue,
    };
    if (has(properties, 'valueLink')) {
      newState.inputValue = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      newState.inputValue = properties.value;
    }

    this.textareaProps = sanitizeChildProps(properties);
    removeStyle(this._styleId);
    updatePseudoClassStyle(this._styleId, properties);
    this.setState(newState, () => this._triggerResize(newState.inputValue));
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this._styleId);
  }

  /**
   * Prevent any newline (except allowNewLine is active) and pass the event to
   * the onKeyDown property.
   *
   * This is an optimization to avoid adding a newline char & removing it right
   * away in the onUpdate callback.
   */
  _onKeyDown = (event) => {
    if (!this.props.allowNewLine && event.key === 'Enter') {
      event.preventDefault();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  /**
   * Update the height and calls the provided change callback for onUpdate
   * or valueLink.
   *
   * In addition newline characters are replaced by spaces in the textarea value
   * in case allowNewLine is set to false and newLine characters could be found.
   */
  _onChange = (event) => {
    let value = event.target.value;

    if (!this.props.allowNewLine && value.match(newLineRegex) !== null) {
      value = value.replace(newLineRegex, ' ');
    }

    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
    } else if (has(this.props, 'defaultValue')) {
      this.setState({
        inputValue: value,
      });
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({ value });
    }

    this._triggerResize(value);
  };

  /**
   * Calculate the height and store the new height in the state to trigger a render.
   */
  _triggerResize(textareaValue) {
    const height = calculateTextareaHeight(ReactDOM.findDOMNode(this), textareaValue, this.props.minRows, this.props.maxRows, this.props.minHeight, this.props.maxHeight);
    this.setState({ height });
  }

  render() {
    let textareaStyle = {
      ...textInputStyle.style,
      ...this.props.style,
    };

    if (this.props.disabled) {
      textareaStyle = {
        ...textareaStyle,
        ...textInputStyle.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    textareaStyle.height = this.state.height;
    return (
      <textarea
        style={ textareaStyle }
        value = {this.state.inputValue}
        className={ unionClassNames(this.props.className, this._styleId) }
        onChange={ this._onChange }
        onKeyDown={ this._onKeyDown }
        disabled={ this.props.disabled }
        { ...this.textareaProps }
      />
    );
  }
}
