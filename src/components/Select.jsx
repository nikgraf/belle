"use strict";

import React, {Component} from 'react';
import {omit, extend, filter, find, first, isEmpty, isUndefined, findIndex, last, size, some} from 'underscore';
import {injectStyles, removeStyle} from '../utils/inject-style';
import style from '../style/select';

/**
 * Select component.
 *
 * In its simplest form the select component behaves almost identical to the
 * native HTML select which the exception that it comes with beautiful styles.
 *
 * Example:
 *
 *     <Select defaultValue="rome">
 *       <Option value="vienna">Vienna</Option>
 *       <Option value="rome">Rome</Option>
 *     </Select>
 *
 * Under the hood this component is leveraging a native select tag to manage
 * focus and provide you as developer with native select events.
 *
 * This component was inpired by:
 * - Jet Watson: https://github.com/JedWatson/react-select
 * - Instructure React Team: https://github.com/instructure-react/react-select-box
 */
export default class Select extends Component {

  /*
   * Initialize the component based on the provided properties.
   *
   * By default the Select is closed & the focused option in case you open it
   * will be the selected option.
   */
  constructor (properties) {
    super(properties);

    let selectedValue;

    if (this.props.valueLink && typeof this.props.valueLink === 'object') {
      selectedValue = this.props.valueLink.value;
    } else if (this.props.value) {
      selectedValue = this.props.value;
    } else if (this.props.defaultValue) {
      selectedValue = this.props.defaultValue;
    } else if (!isEmpty(this.props.children) && !some(this.props.children, isPlaceholder)) {
      selectedValue = first(this.props.children).props.value;
    }

    this.state = {
      isFocusedOn: false,
      isOpen: false,
      selectedValue: selectedValue,
      focusedOptionValue: selectedValue
    };
  }

  componentWillReceiveProps(properties) {
    if (properties.valueLink && typeof properties.valueLink === 'object') {
      this.setState({
        selectedValue: properties.valueLink.value,
        focusedOptionValue: properties.valueLink.value
      });
    } else if (properties.value) {
      this.setState({
        selectedValue: properties.value,
        focusedOptionValue: properties.value
      });
    }

    updatePseudoClassStyle(this._styleId, properties);
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
   * Remove a component's associated syles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this._styleId);
  }

  /**
   * In order to prevent loosing focus on the native select the onMouseDown
   * event default behaviour is prevented.
   */
  _onMouseDownAtOption (event) {
    event.preventDefault();
  }

  /**
   * In order to prevent loosing focus on the native select the onMouseDown
   * event default behaviour is prevented.
   */
  _onMouseDownAtSelectBox (event) {
    event.preventDefault();
  }

  /**
   * After the user clicks on an Option a change event is dispatched on the
   * native select.
   *
   * Rather than just updating the state the philosophy of Belle dicdates to fire
   * a change event from the native select in order to provide consistent event
   * behaviour between selecting an option by mouse click, touch or key press.
   *
   * This is aligned with the behaviour of the native HTML select.
   */
  _onClickAtOption (event) {
    const changeEvent = new window.Event('change', {
      bubbles: true,
      cancelable: false
    });

    const entry = event.currentTarget.querySelector('[data-belle-value]');
    const select = React.findDOMNode(this.refs.belleNativeSelect);
    // TODO investigate if this is aligned with a natively dispatched change event
    // So far only a changed value has been identified.
    select.value = entry.getAttribute('data-belle-value');
    select.dispatchEvent(changeEvent);
  }

  /**
   * After a choice has been selected the options area gets closed and the selection processed.
   *
   * Depending on the component's properties the value gets updated and the
   * provided change callback for onChange or valueLink is called.
   */
  _onChange (event) {
    if(isUndefined(this.props.value)) {
      this.setState({
        focusedOptionValue: event.target.value,
        selectedValue: event.target.value,
        isOpen: false
      });
    } else {
      this.setState({
        isOpen: false
      });
    }

    let changeCallback = this.props.onChange;
    const valueLink = this.props.valueLink;

    if (typeof valueLink == 'object' && typeof valueLink.requestChange == 'function') {
      changeCallback = event => valueLink.requestChange(event.target.value);
    }

    if (changeCallback) {
      changeCallback(event);
    }
  }

  /**
   * In order to inform the user which element in the document is active the
   * component keeps track of when it is selected and depending on that provide
   * a visual indicator.
   */
  _onFocus (event) {
    this.setState({ isFocusedOn: true });
  }

  /**
   * In order to inform the user which element in the document is active the
   * component keeps track of when it is de-selected and depending on that
   * remove the visual indicator.
   */
  _onBlur (event) {
    this.setState({
      isFocusedOn: false,
      isOpen: false
    });
  }

  /**
   * In order to inform the user which Option is active the component keeps
   * track of when an option is in focus of the user and depending on that
   * provide a visual indicator.
   */
  _onMouseEnterAtOption (event) {
    const entry = event.currentTarget.querySelector('[data-belle-value]');
    this.setState({
      focusedOptionValue: entry.getAttribute('data-belle-value')
    });
  }

  /**
   * Toggle the selection area of the component.
   */
  _toggleOptionsArea () {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
      React.findDOMNode(this.refs.belleNativeSelect).focus();
    }
  }

  /**
   * Update focus for the options for an already open options area.
   *
   * The user experience of HTML's native select is good and the goal here is to
   * achieve the same behaviour.
   *
   * - Focus on the first entry in case no options is focused on.
   * - Switch focus to the next option in case one option already has focus.
   */
  _onArrowDownKeyDown () {
    if (this.state.focusedOptionValue) {
      const indexOfFocusedOption = findIndexOfFocusedOption(this);

      if (hasNext(this.props.children, indexOfFocusedOption)) {
        this.setState({
          focusedOptionValue: this.props.children[indexOfFocusedOption + 1].props.value
        });
      }
    } else {
      this.setState({
        focusedOptionValue: first(this.props.children).props.value
      });
    }
  }

  /**
   * Update focus for the options for an already open options area.
   *
   * The user experience of HTML's native select is good and the goal here is to
   * achieve the same behaviour.
   *
   * - Focus on the last entry in case no options is focused on.
   * - Switch focus to the previous option in case one option already has focus.
   */
  _onArrowUpKeyDown () {
    if (this.state.focusedOptionValue) {
      const indexOfFocusedOption = findIndexOfFocusedOption(this);

      if (hasPrevious(this.props.children, indexOfFocusedOption)) {
        this.setState({
          focusedOptionValue: this.props.children[indexOfFocusedOption - 1].props.value
        });
      }
    } else {
      this.setState({
        focusedOptionValue: last(this.props.children).props.value
      });
    }
  }

  /**
   * After the user pressed the `Enter` or `Space` key for an already open
   * options area the focused option is selected.
   *
   * Same as _onClickAtOption this dispatches a change event on the native select.
   *
   * Rather than just updating the state the philosophy of Belle dicdates to fire
   * a change event from the native select in order to provide consistent event
   * behaviour between selecting an option by mouse click, touch or key press.
   *
   * This is aligned with the behaviour of the native HTML select.
   */
  _onEnterOrSpaceKeyDown () {
    const changeEvent = new window.Event('change', {
      bubbles: true,
      cancelable: false
    });

    const select = React.findDOMNode(this.refs.belleNativeSelect);
    // TODO investigate if this is aligned with a natively dispatched change event
    // So far only a changed value has been identified.
    select.value = this.state.focusedOptionValue;
    select.dispatchEvent(changeEvent);
  }

  /**
   * Manages the keyboard events.
   *
   * In case the Select is in focus, but closed ArrowDown, ArrowUp, Enter and
   * Space will result in opening the options area.
   *
   * In case the options area is already open each key press will have
   * different effects already documented in the related methods.
   *
   * Pressing Escape will close the options area.
   */
  _onKeyDown (event) {

    if(this.props.children.length > 0) {

      if (!this.state.isOpen && event.key === 'ArrowDown' ||
          !this.state.isOpen && event.key === 'ArrowUp' ||
          !this.state.isOpen && event.key === ' ') {
        event.preventDefault();
        this.setState({ isOpen: true });
      } else {
        // Updates the state to set focus on the next option
        // In case no option is active it should jump to the first.
        // In case it is the last it should stop there.
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this._onArrowDownKeyDown();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this._onArrowUpKeyDown();
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this._onEnterOrSpaceKeyDown();
        }
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        this.setState({ isOpen: false });
      }
    }
  }

  render () {
    const defaultStyle = extend({}, style.style, this.props.style);
    const focusStyle = extend({}, style.focusStyle, this.props.focusStyle);
    const wrapperStyle = extend({}, style.wrapperStyle, this.props.wrapperStyle);
    const optionsAreaStyle = extend({}, style.optionsAreaStyle, this.props.optionsAreaStyle);
    const nativeSelectStyle = extend({}, style.nativeSelectStyle, this.props.nativeSelectStyle);
    const caretDownStyle = extend({}, style.caretDownStyle, this.props.caretDownStyle);
    const caretUpStyle = extend({}, style.caretUpStyle, this.props.caretUpStyle);

    let selectedOptionOrPlaceholder;
    if (this.state.selectedValue) {
      const selectedEntry = find(this.props.children, (entry) => {
        return entry.props.value == this.state.selectedValue;
      });

      if (selectedEntry) {
        selectedOptionOrPlaceholder = React.addons.cloneWithProps(selectedEntry, {
          _isDisplayedAsSelected: true
        });
      }
    } else {
      selectedOptionOrPlaceholder = find(this.props.children, isPlaceholder);
    }

    const computedOptionsAreaStyle = this.state.isOpen ? optionsAreaStyle : { display: 'none' };

    return (
      <div style={ wrapperStyle } >

        <div onClick={ this._toggleOptionsArea.bind(this) }
             onMouseDown={ this._onMouseDownAtSelectBox.bind(this) }
             style={ this.state.isFocusedOn ? focusStyle : defaultStyle }
             className={ `${this.props.className} ${this._styleId}` }>
          { selectedOptionOrPlaceholder }
          <span style={ this.state.isOpen ? caretUpStyle : caretDownStyle }></span>
        </div>

        <ul style={ computedOptionsAreaStyle }>
          {
            React.Children.map(this.props.children, (entry, index) => {
              // filter out all non-Option Components
              if (entry.type.name === 'Option') {
                const option = React.addons.cloneWithProps(entry, {
                  _isHovered: entry.props.value == this.state.focusedOptionValue
                });

                return (
                  <li onClick={ this._onClickAtOption.bind(this) }
                      onMouseDown={ this._onMouseDownAtOption.bind(this) }
                      key={ index }
                      onMouseEnter={ this._onMouseEnterAtOption.bind(this) } >
                    { option }
                  </li>
                );
              }
            })
          }
        </ul>

        <select value={ this.state.selectedValue }
                onChange={ this._onChange.bind(this) }
                onFocus={ this._onFocus.bind(this) }
                onBlur={ this._onBlur.bind(this) }
                onKeyDown={ this._onKeyDown.bind(this) }
                style={ nativeSelectStyle }
                ref="belleNativeSelect">
          {
            React.Children.map(this.props.children, (entry, index) => {
              // filter out all non-Option Components

              // TODO get the text form for option instead of value
              if (entry.type.name === 'Option') {
                return (
                  <option key={ index } value={ entry.props.value }>
                    { entry.props.value }
                  </option>
                );
              } else if (entry.type.name === 'Placeholder') {
                // TODO get the text form for option instead of value
                return (
                  <option key={ index }
                          value
                          hidden
                          disabled>
                  </option>
                );
              }
            })
          }
        </select>

      </div>
    );
  }
}

Select.displayName = 'Belle Select';

Select.propTypes = {
  children: validateArrayOfOptionsAndMaximumOnePlaceholder,
  value: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Date)
  ]),
  defaultValue: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Date)
  ])
};

/**
 * Returns the index of the entry with a certain value from the component's
 * children.
 */
const findIndexOfFocusedOption = (component) => {
  return findIndex(component.props.children, (element) => {
    return element.props.value === component.state.focusedOptionValue;
  });
};

/**
 * Returns true if the provided property is a Placeholder component from Belle.
 */
function isPlaceholder(reactElement) {
  return reactElement._isReactElement &&
    reactElement.type &&
    reactElement.type.name === 'Placeholder';
}

/**
 * Returns true if the provided property is a Option component from Belle.
 */
function isOption(reactElement) {
  return reactElement._isReactElement &&
    reactElement.type &&
    reactElement.type.name === 'Option';
}


/**
 * Verifies that the children is an array containing only Options & at maximum
 * one Placeholder.
 */
function validateArrayOfOptionsAndMaximumOnePlaceholder (props, propName, componentName) {
  React.PropTypes.arrayOf(optionOrPlaceholderPropType).isRequired(props, propName, componentName);

  const placeholders = filter(props[propName], isPlaceholder);
  if (size(placeholders) > 1) {
    return new Error(`Invalid children supplied to \`${componentName}\`, expected only one Placeholder component.`);
  }
}

/**
 * Verifies that the provided property is an Option or Placeholder component from Belle.
 */
function optionOrPlaceholderPropType(props, propName, componentName) {
  if (props[propName] && !isOption(props[propName]) && !isPlaceholder(props[propName])) {
    return new Error(`Invalid children supplied to \`${componentName}\`, expected an Option or Placeholder component from Belle.`);
  }
}

/**
 * Update hover style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, properties) {
  const hoverStyle = extend({}, style.hoverStyle, properties.hoverStyle);

  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover'
    }
  ];
  injectStyles(styles);
}

/**
 * Returns true in case there one more element in the list.
 */
const hasNext = (list, currentIndex) => {
  return (currentIndex + 2 <= list.length);
};

/**
 * Returns true in case there is one previous element in the list.
 */
const hasPrevious = (list, currentIndex) => {
  return (currentIndex - 1 >= 0);
};
