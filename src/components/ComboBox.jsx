"use strict";

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import {omit, extend, filter, has, map} from 'underscore';
import style from '../style/combo-box';
import isComponentTypeOf from '../utils/is-component-of-type.js';

// Enable React Touch Events
React.initializeTouchEvents(true);

/**
 * ComboBox React Component.
 */
export default class ComboBox extends Component {

  constructor(properties) {
    super(properties);
    let inputValue;

    if (has(this.props, 'valueLink')) {
      inputValue = this.props.valueLink.value;
    } else if (has(this.props, 'value')) {
      inputValue = this.props.value;
    } else if (has(this.props, 'defaultValue')) {
      inputValue = this.props.defaultValue;
    }

    this.state = {
      isOpen: false,
      focusedOptionIndex: undefined,
      inputValue: inputValue,
      tempValue: undefined,
      filteredOptions: this.filterOptions(inputValue),
      wrapperProperties: sanitizePropertiesForWrapper(properties.wrapperProps),
      inputProperties: sanitizePropertiesForInput(properties),
      menuProperties: sanitizePropertiesForMenu(properties.menuProps)
    };

  }

  componentWillReceiveProps(properties) {
    let newState = {
      wrapperProperties: sanitizePropertiesForWrapper(properties.wrapperProps),
      inputProperties: sanitizePropertiesForInput(properties),
      menuProperties: sanitizePropertiesForMenu(properties.menuProps)
    };

    if (has(properties, 'valueLink')) {
      newState.inputValue = properties.valueLink.value;
      newState.filteredOption = this.filterOptions(properties.valueLink.value);
    } else if (has(properties, 'value')) {
      newState.inputValue = properties.value;
      newState.filteredOption = this.filterOptions(properties.value);
    }

    this.setState(newState);
    updatePseudoClassStyle(this._styleId, properties);
  }

  /**
   * Generates the style-id & inject the focus & hover style.
   * The style-id is based on React's unique DOM node id.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this._styleId = `style-id${id}`;
    updatePseudoClassStyle(this._styleId, this.props);
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this._styleId);
  }

  /**
   * Update focusedOptionIndex when an option is touched.
   */
  _onTouchStartAtOption (event) {
    if (!this.props.disabled && event.touches.length === 1) {
      this._touchStartedAt = Number(event.currentTarget.getAttribute('data-belle-index'));
      this.setState({focusedOptionIndex: this._touchStartedAt});
    }
  }

  /**
   * Triggers a change event after the user touched on an Option.
   */
  _onTouchEndAtOption (event) {
    if (!this.props.disabled && this._touchStartedAt) {
      const index = Number(event.currentTarget.getAttribute('data-belle-index'));
      if (this._touchStartedAt === index) {
        event.preventDefault();
        const entry = event.currentTarget.querySelector('[data-belle-value]');
        const value = entry.getAttribute('data-belle-value');
        this._triggerChange(value);
      }
      this._touchStartedAt = undefined;
    }
  }

  /**
   * Update focusedOptionIndex to undefined on touch cancel.
   */
  _onTouchCancelAtOption (event) {
    if (!this.props.disabled) {
      this._touchStartedAt = undefined;
      this.setState({focusedOptionIndex: undefined});
    }
  }

  /**
   * Closed opened combo-box options and removed focusStyles on blur.
   */
  _onBlur (event) {
    if (!this.props.disabled) {
      this.setState({
        isOpen: false,
        focusedOptionIndex: undefined,
        tempValue: undefined
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  /**
   * Set focused state when element is focused.
   */
  _onFocus (event) {
    if (!this.props.disabled) {
      this.setState({
        isOpen: true,
        focusedOptionIndex: 0
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * Update focusedOptionIndex for component when mouse enters an option.
   */
  _onMouseEnterAtOption (event) {
    if (!this.props.disabled) {
      const index = Number(event.currentTarget.getAttribute('data-belle-index'));
      this.setState({
        focusedOptionIndex: index
      });
    }
  }

  /**
   * Set focusedOptionIndex to undefined.
   */
  _onMouseLeaveAtOption (event) {
    if (!this.props.disabled) {
      this.setState({
        focusedOptionIndex: undefined
      });
    }
  }

  /**
   * Update component value when an option is clicked.
   */
  _onClickAtOption (event) {
    if (!this.props.disabled) {
      const entry = event.currentTarget.querySelector('[data-belle-value]');
      this._triggerChange(entry.getAttribute('data-belle-value'));
    }
  }

  /**
   * Handle keyDown in input (when input is focused):
   * 1. ComboBox is closed and ArrowDown/ ArrowUp/ SpaceKey is pressed -> open the ComboBox
   * 2. ComboBox is opened and ArrowDown is pressed -> highlight next option
   * 3. ComboBox is opened and ArrowUp is pressed -> highlight previous option
   * 4. ComboBox is opened and Enter/ Tab is pressed -> update input value to value of option
   * 5. ComboBox is opened and Esc is pressed -> close ComboBox
   * 6. ComboBox is opened and any key is pressed immediately after pressing ArrowUp or DownKey
   *    -> content of highlighted option will be copied over to combo-box
   */
  _onKeyDown (event) {
    if (!this.props.disabled) {
      if (!this.state.isOpen) {
        if (event.key === 'ArrowDown' ||
          event.key === 'ArrowUp') {
          event.preventDefault();
          this.setState({ isOpen: true, focusedOptionIndex: 0 });
        }
      } else {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this._onArrowDownKeyDown();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this._onArrowUpKeyDown();
        } else if (event.key === 'Enter') {
          event.preventDefault();
          this._onEnterOrTabKeyDown();
        } else if (event.key === 'Tab') {
          //event.preventDefault(); should not be called here else tab
          //will not be able to take user to next component on the page
          this._onEnterOrTabKeyDown();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          this.setState({ isOpen: false, focusedOptionIndex: undefined, tempValue: undefined  });
        } else {
          const tempValue = this.state.tempValue;
          if(this.state.tempValue) {
            this.setState({
              tempValue: undefined,
              inputValue: tempValue,
              filteredOptions: this.filterOptions(tempValue)
            });
          }
        }
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  /**
   * Highlight next option when arrowDown key is pressed.
   * Highlight first option if currently last option is focused.
   */
  _onArrowDownKeyDown () {
    let index = 0;
    if (this.state.focusedOptionIndex !== undefined && (this.state.focusedOptionIndex + 1) < this.state.filteredOptions.length) {
      index = this.state.focusedOptionIndex + 1;
    }
    this.setState({
      focusedOptionIndex: index,
      tempValue: this.state.filteredOptions[index].props.value
    });
  }

  /**
   * Highlight previous option when arrowUp key is pressed.
   * Highlight last option if currently first option is focused.
   */
  _onArrowUpKeyDown () {
    if(this.state.filteredOptions.length > 0) {
      let index = this.state.filteredOptions.length - 1;
      if (this.state.focusedOptionIndex) {
        index = this.state.focusedOptionIndex - 1;
      }
      this.setState({
        focusedOptionIndex: index,
        tempValue: this.state.filteredOptions[index].props.value
      });
    }
  }

  /**
   * Update value of Input box to the value of highlighted option.
   */
  _onEnterOrTabKeyDown () {
    this._triggerChange(this.state.filteredOptions[this.state.focusedOptionIndex].props.value);
  }

  /**
   * The function is called when user selects an option. Function will do following:
   * 1. Close the options
   * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
   * 3. Call onUpdate props function
   */
  _triggerChange (value) {
    if(has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        isOpen: false,
        tempValue: undefined,
        focusedOptionIndex: undefined
      });
    }
    else if(has(this.props, 'value')) {
      this.setState({
        isOpen: false,
        tempValue: undefined,
        focusedOptionIndex: undefined
      });
    }
    else {
      this.setState({
        inputValue: value,
        tempValue: undefined,
        isOpen: false,
        focusedOptionIndex: undefined,
        filteredOptions: this.filterOptions(value)
      });
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({ value: value });
    }
  }

  /**
   * The function is called when user inputs a value in the input box. Function will do following:
   * 1. Open the options
   * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
   * 3. Call onUpdate props function
   */
  _onChange(event) {
    const value = event.target.value;

    if(has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        isOpen: true,
        focusedOptionIndex: 0
      });
    } else {
      if(has(this.props, 'value')) {
        this.setState({
          isOpen: true,
          focusedOptionIndex: 0
        });
      }
      else {
        this.setState({
          inputValue: value,
          isOpen: true,
          focusedOptionIndex: 0,
          filteredOptions: this.filterOptions(value)
        });
      }
      if (this.props.onUpdate) {
        this.props.onUpdate({ value: value });
      }
    }
  }

  /**
   * Function to filter options using input value.
   */
  filterOptions(inputValue) {
    let filteredOptions = [];
    if(this.props.children.length > 0) {
      if(inputValue) {
        filteredOptions = filter(this.props.children, (entry) => {
          return this.props.filterFunc(inputValue, entry.props.value);
        });
      } else {
        filteredOptions = map(this.props.children, (entry) => { return entry;});
      }
      if(this.props.maxOptions) {
        filteredOptions = filteredOptions.splice(0, this.props.maxOptions);
      }
    }
    return filteredOptions;
  }

  render () {

    const wrapperStyle = extend({}, style.wrapperStyle, this.props.wrapperStyle);
    let inputStyle = extend({}, style.style, this.props.style);
    const menuStyle = extend({}, style.menuStyle, this.props.menuStyle);

    const inputClassName = unionClassNames(this.props.className, this._styleId);

    const tabIndex = this.props.tabIndex ? this.props.tabIndex : '0';

    // Currently there are no different hover styles for caret, like select they are probably not really needed.
    if(this.props.displayCaret) {
      if (this.props.disabled) {
        inputStyle = extend({}, inputStyle, style.disabledCaretToOpenStyle);
      } else if (this.state.isOpen) {
        inputStyle = extend({}, inputStyle, style.caretToCloseStyle);
      } else {
        inputStyle = extend({}, inputStyle, style.caretToOpenStyle);
      }
    }

    const computedMenuStyle = (this.state.isOpen && !this.props.disabled && this.state.filteredOptions && this.state.filteredOptions.length > 0) ? menuStyle : { display: 'none' };

    //using value for input makes it a controlled component and it will be changed in controlled manner if (1) user enters value, (2) user selects some option
    //value will be updated depending on whether user has passed value / valueLink / defaultValue as property
    return (
      <div style={ wrapperStyle }
           aria-label = { this.props['aria-label'] }
           aria-disabled = { this.props.disabled }
           {...this.state.wrapperProperties}>

        <input disabled = { this.props.disabled }
               aria-disabled = { this.props.disabled }
               value={ this.state.tempValue || this.state.inputValue }
               placeholder={ this.props.placeholder }
               style={ inputStyle }
               className={ inputClassName }
               onChange={ this._onChange.bind(this) }
               tabIndex={ tabIndex }
               onBlur={ this._onBlur.bind(this) }
               onFocus={ this._onFocus.bind(this) }
               onKeyDown={ this._onKeyDown.bind(this) }
               aria-autocomplete="list"
              {...this.state.inputProperties}></input>

        <ul style={ computedMenuStyle }
            role="listbox"
            aria-expanded={ this.state.isOpen }
            {...this.state.menuProperties} >
          {
            React.Children.map(this.state.filteredOptions, (entry, index) => {
              const isHovered = this.state.focusedOptionIndex == index;
              //TODO: get rid of cloneWithProps
              const option = React.addons.cloneWithProps(entry, {
                _isHovered: isHovered
              });

              return (
                <li key={ index }
                    data-belle-index={ index }
                    onTouchStart={ this._onTouchStartAtOption.bind(this) }
                    onTouchEnd={ this._onTouchEndAtOption.bind(this) }
                    onTouchCancel={ this._onTouchCancelAtOption.bind(this) }
                    onClick={ this._onClickAtOption.bind(this) }
                    onMouseEnter={ this._onMouseEnterAtOption.bind(this) }
                    onMouseLeave={ this._onMouseLeaveAtOption.bind(this) }
                    onMouseDown={ (event)=> {event.preventDefault(); } }
                    role="option">
                  { option }
                </li>
              );
            })
          }
        </ul>

      </div>
    );
  }
}

ComboBox.displayName = 'Belle ComboBox';

ComboBox.propTypes = {
  defaultValue: React.PropTypes.string,
  value: React.PropTypes.string,
  valueLink: React.PropTypes.shape({
    value: React.PropTypes.string,
    requestChange: React.PropTypes.func.isRequired
  }),
  placeholder: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  wrapperProps: React.PropTypes.object,
  menuProps: React.PropTypes.object,
  onUpdate: React.PropTypes.func,
  tabIndex: React.PropTypes.number,
  onKeyDown: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  wrapperStyle: React.PropTypes.object,
  menuStyle: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  disabledHoverStyle: React.PropTypes.object,
  hoverStyle: React.PropTypes.object,
  maxOptions: React.PropTypes.number,
  displayCaret: React.PropTypes.bool,
  filterFunc: React.PropTypes.func,
  'aria-label': React.PropTypes.string
};

ComboBox.defaultProps = {
  disabled: false,
  displayCaret: true,
  'aria-label': 'ComboBox',
  filterFunc: filterFunc
};

/**
 * Update hover style for the specified styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle
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
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus'
    }
  ];
  injectStyles(styles);
}

/**
 * Returns an object with properties that are relevant for the wrapper div.
 */
function sanitizePropertiesForWrapper(wrapperProperties) {
  return omit(wrapperProperties, [
    'style',
    'aria-label',
    'aria-disabled'
  ]);
}

/**
 * Returns an object with properties that are relevant for the input box.
 */
function sanitizePropertiesForInput(properties) {
  return omit(properties, [
    'ref',
    'value',
    'valueLink',
    'defaultValue',
    'placeholder',
    'disabled',
    'className',
    'style',
    'onUpdate',
    'tabIndex',
    'onBlur',
    'onFocus',
    'onKeyDown',
    'aria-disabled',
    'aria-autocomplete',
    'children'
  ]);
}

/**
 * Returns an object with properties that are relevant for the combo-box menu.
 */
function sanitizePropertiesForMenu(menuProperties) {
  return omit(menuProperties, [
    'style',
    'ref',
    'role'
  ]);
}

/**
 * Default function used for filtering options.
 */
function filterFunc(inputValue, optionValue) {
  if(inputValue && optionValue) {
    return optionValue.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  }
  return false;
}
