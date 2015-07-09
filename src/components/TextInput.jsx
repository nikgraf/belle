import React, {Component} from 'react';
import calculateTextareaHeight from '../utils/calculate-textarea-height';
import {injectStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import {omit, extend} from 'underscore';
import style from '../style/text-input';

const newLineRegex = /[\r\n]/g;

/**
 * Returns an object with properties that are relevant for the TextInput's textarea.
 *
 * As the height of the textarea needs to be calculated valueLink can not be
 * passed down to the textarea, but made available through this component.
 */
function sanitizeChildProps(properties) {
  const childProps = omit(properties, [
    'valueLink',
    'onUpdate',
    'onKeyDown',
    'minHeight',
    'maxHeight',
    'className',
    'style',
    'hoverStyle',
    'focusStyle',
    'disabledStyle',
    'disabledHoverStyle'
  ]);
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
  const hoverStyle = extend({}, style.hoverStyle, properties.hoverStyle);
  const focusStyle = extend({}, style.focusStyle, properties.focusStyle);
  const disabledHoverStyle = extend({}, style.disabledHoverStyle, properties.disabledHoverStyle);

  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover'
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus'
    },
    {
      id: styleId,
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true
    }
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
    this.state = {
      height: 'auto',
      textareaProps: sanitizeChildProps(properties)
    };
  }

  /**
   * Generates the style-id & inject the focus & hover style.
   *
   * The style-id is based on React's unique DOM node id.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this._styleId = `style-id${id}`;
    updatePseudoClassStyle(this._styleId, this.props);
  }

  /**
   * Right after the component go injected into the DOM it should be resized.
   */
  componentDidMount() {
    this._triggerResize();
  }

  /**
   * Update the properties passed to the textarea and resize as with the new
   * properties the height might have changed.
   */
  componentWillReceiveProps(properties) {
    this.setState({ textareaProps: sanitizeChildProps(properties) });
    updatePseudoClassStyle(this._styleId, properties);
    this._triggerResize();
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
  _onKeyDown(event) {
    if (!this.props.allowNewLine && event.key === 'Enter') {
      event.preventDefault();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  /**
   * Update the height and calls the provided change callback for onUpdate
   * or valueLink.
   *
   * In addition newline characters are replaced by spaces in the textarea value
   * in case allowNewLine is set to false and newLine characters could be found.
   */
  _onChange(event) {
    let value = event.target.value;

    if (!this.props.allowNewLine && value.match(newLineRegex) !== null) {
      value = value.replace(newLineRegex, ' ');

      // controlled textarea must have value
      if (this.state.textareaProps.value) {
        this.setState({ textareaProps: { value: value } });
        this.forceUpdate(this._triggerResize);
      // uncontrolled textarea must be updated with value, but then released again
      } else {
        this.setState({ textareaProps: { value: value } });
        this.forceUpdate(() => {
          this._triggerResize();
          this.setState({ textareaProps: { value: undefined } });
        });
      }
    } else {
      this._triggerResize();
    }

    const valueLink = this.props.valueLink;
    if (typeof valueLink === 'object' && typeof valueLink.requestChange === 'function') {
      valueLink.requestChange(value);
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({ value: value });
    }
  }

  /**
   * Calculate the height and store the new height in the state to trigger a render.
   */
  _triggerResize() {
    let height = calculateTextareaHeight(React.findDOMNode(this));

    if (this.props.minHeight && this.props.minHeight > height) {
      height = this.props.minHeight;
    }

    if (this.props.maxHeight && this.props.maxHeight < height) {
      height = this.props.maxHeight;
    }

    this.setState({ height: height});
  }

  render() {
    let textareaStyle = extend({}, style.style, this.props.style);

    if (this.props.disabled) {
      textareaStyle = extend(textareaStyle, style.disabledStyle, this.props.disabledStyle);
    }

    textareaStyle.height = this.state.height;
    return (
      <textarea style={ textareaStyle }
                className={ unionClassNames(this.props.className, this._styleId) }
                onChange={ this._onChange.bind(this) }
                onKeyDown={ this._onKeyDown.bind(this) }
                { ...this.state.textareaProps } />
    );
  }
}

TextInput.displayName = 'Belle TextInput';

TextInput.propTypes = {
  className: React.PropTypes.string,
  minHeight: React.PropTypes.number,
  maxHeight: React.PropTypes.number,
  style: React.PropTypes.object,
  hoverStyle: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  allowNewLine: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  disabledStyle: React.PropTypes.object,
  disabledHoverStyle: React.PropTypes.object,
  onUpdate: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  valueLink: React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    requestChange: React.PropTypes.func.isRequired
  })
};

TextInput.defaultProps = {
  allowNewLine: false,
  disabled: false
};
