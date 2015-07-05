import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import {omit, extend, filter, has, map} from 'underscore';
import style from '../style/combo-box';

// Enable React Touch Events
React.initializeTouchEvents(true);

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
  if (inputValue && optionValue) {
    return optionValue.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  }
  return false;
}

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
      hint: undefined,
      filteredOptions: this.filterOptions(inputValue),
      wrapperProperties: sanitizePropertiesForWrapper(properties.wrapperProps),
      inputProperties: sanitizePropertiesForInput(properties),
      menuProperties: sanitizePropertiesForMenu(properties.menuProps)
    };
  }

  static _getHint(filteredOptions, index, inputValue, isOptionSelected = false) {
    let hint = '';
    if(filteredOptions && filteredOptions.length > 0 &&
      !((inputValue === undefined || inputValue === null || inputValue.length === 0) && !isOptionSelected)) {
      const optionValue = filteredOptions[index].props.value;
      if(inputValue) {
        const position = optionValue.toLowerCase().indexOf(inputValue.toLowerCase());
        if(position == -1) {
          hint = optionValue;
        } else if(position == 0) {
          hint = inputValue + optionValue.substr(inputValue.length, (optionValue.length - inputValue.length));
        }
      }
      else {
        hint = optionValue;
      }
    }
    return hint;
  }

  /**
   * This method will calculate the hint that should be present in comboBox at some point in time. Rules:
   * 1. If menu is not open hint is undefined
   * 2. If menu is open but there are no filteredOptions hint is undefined
   * 3. If if some option is highlighted hint is equal to its value
   * 4. If no option is highlighted but some value is present in input box hint is equal to value of first filteredOptions
   * If user has typed some text in input box and there is a hint(according to above calculations), the starting of hint
   * is replaced by the text input by user ( this is to make sure that case of letters in hint is same as that in input box
   * value and overlap is perfect.
   * todo: simplify logic in method below
   */
  _getHint() {
    if(this.state.isOpen) {
      const filteredOptions = this.state.filteredOptions;
      if (filteredOptions && filteredOptions.length > 0) {
        let hint;
        const focusedOptionIndex = this.state.focusedOptionIndex;
        const inputValue = this.state.inputValue;
        if (focusedOptionIndex >= 0) {
          hint = filteredOptions[focusedOptionIndex].props.value;
        } else if (inputValue && inputValue.length > 0) {
          hint = filteredOptions[0].props.value;
        }
        if (hint) {
          if (inputValue && inputValue.length > 0) {
            const position = hint.toLowerCase().indexOf(inputValue.toLowerCase());
            if (position === 0) {
              return inputValue + hint.substr(inputValue.length, (hint.length - inputValue.length));
            }
            else if (position === -1) {
              return hint;
            }
          } else {
            return hint;
          }
        }
      }
    }
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

  componentWillReceiveProps(properties) {
    const newState = {
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
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this._styleId);
  }

  /**
   * Update focusedOptionIndex when an option is touched.
   */
  _onTouchStartAtOption(event) {
    if (!this.props.disabled && event.touches.length === 1) {
      this._touchStartedAt = Number(event.currentTarget.getAttribute('data-belle-index'));
      this.setState({focusedOptionIndex: this._touchStartedAt});
    }
  }

  /**
   * Triggers a change event after the user touched on an Option.
   */
  _onTouchEndAtOption(event) {
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
  _onTouchCancelAtOption() {
    if (!this.props.disabled) {
      this._touchStartedAt = undefined;
      this.setState({focusedOptionIndex: undefined});
    }
  }

  /**
   * Closed opened combo-box options and removed focusStyles on blur.
   */
  _onBlur(event) {
    if (!this.props.disabled) {
      this.setState({
        isOpen: false,
        focusedOptionIndex: undefined,
        hint: undefined
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  /**
   * Set focused state when element is focused.
   */
  _onFocus(event) {
    if (!this.props.disabled) {
      this.setState({
        isOpen: true
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * Update focusedOptionIndex for component when mouse enters an option.
   */
  _onMouseEnterAtOption(event) {
    if (!this.props.disabled) {
      const index = Number(event.currentTarget.getAttribute('data-belle-index'));
      this.setState({
        focusedOptionIndex: index,
        hint: ComboBox._getHint(this.state.filteredOptions, index, this.state.inputValue, true)
      });
    }
  }

  /**
   * Set focusedOptionIndex to undefined.
   */
  _onMouseLeaveAtOption() {
    if (!this.props.disabled) {
      this.setState({
        focusedOptionIndex: undefined,
        hint: undefined
      });
    }
  }

  /**
   * Update component value when an option is clicked.
   */
  _onClickAtOption(event) {
    if (!this.props.disabled) {
      const entry = event.currentTarget.querySelector('[data-belle-value]');
      this._triggerChange(entry.getAttribute('data-belle-value'));
    }
  }

  /**
   * Handle keyDown in input (when input is focused):
   * 1. ComboBox is closed and ArrowDown/ ArrowUp is pressed -> open the ComboBox
   * 2. ComboBox is opened and ArrowDown is pressed -> highlight next option
   * 3. ComboBox is opened and ArrowUp is pressed -> highlight previous option
   * 4. ComboBox is opened and ArrowRight is pressed -> value of hint is copied over to inputBox
   * 5. ComboBox is opened and Enter/ Tab is pressed -> update input value to value of option
   * 6. ComboBox is opened and Esc is pressed -> close ComboBox
   */
  _onKeyDown(event) {
    if (!this.props.disabled) {
      if (!this.state.isOpen) {
        if (event.key === 'ArrowDown' ||
          event.key === 'ArrowUp') {
          event.preventDefault();
          this.setState({
            isOpen: true
          });
        }
      } else {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this._onArrowDownKeyDown();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this._onArrowUpKeyDown();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          const hint = this._getHint();
          if(hint) {
            this._userUpdateValue(hint);
          }
        } else if (event.key === 'Enter') {
          event.preventDefault();
          this._onEnterOrTabKeyDown();
        } else if (event.key === 'Tab') {
          // event.preventDefault(); should not be called here else tab
          // will not be able to take user to next component on the page
          this._onEnterOrTabKeyDown();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          this.setState({
            isOpen: false,
            focusedOptionIndex: undefined,
            hint: undefined
          });
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
  _onArrowDownKeyDown() {
    let index = 0;
    if (this.state.focusedOptionIndex !== undefined && (this.state.focusedOptionIndex + 1) < this.state.filteredOptions.length) {
      index = this.state.focusedOptionIndex + 1;
    }
    this.setState({
      focusedOptionIndex: index
    });
  }

  /**
   * Highlight previous option when arrowUp key is pressed.
   * Highlight last option if currently first option is focused.
   */
  _onArrowUpKeyDown() {
    if (this.state.filteredOptions.length > 0) {
      let index = this.state.filteredOptions.length - 1;
      if (this.state.focusedOptionIndex) {
        index = this.state.focusedOptionIndex - 1;
      }
      this.setState({
        focusedOptionIndex: index
      });
    }
  }

  /**
   * Update value of Input box to the value of highlighted option.
   */
  _onEnterOrTabKeyDown() {
    if(this.state.focusedOptionIndex >= 0) {
      this._triggerChange(this.state.filteredOptions[this.state.focusedOptionIndex].props.value);
    }
  }

  /**
   * The function is called when user selects an option. Function will do following:
   * 1. Close the options
   * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
   * 3. Call onUpdate props function
   */
  _triggerChange(value) {
    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        isOpen: false,
        hint: undefined,
        focusedOptionIndex: undefined
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        isOpen: false,
        hint: undefined,
        focusedOptionIndex: undefined
      });
    } else {
      this.setState({
        inputValue: value,
        hint: undefined,
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
   * The function is called when user type/ paste value in the input box.
   */
  _onChange(event) {
    const value = event.target.value;
    this._userUpdateValue(value);
  }

  /**
   * The function is called when user inputs a value in the input box. This can be done by:
   * 1. typing/ pasting value into input box
   * 2. pressing arrowRight key when there is some hint in the input box
   *
   * Function will do following:
   * 1. Open the options
   * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
   * 3. Call onUpdate props function
   */
  _userUpdateValue(value) {
    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        isOpen: true,
        focusedOptionIndex: undefined
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        isOpen: true,
        focusedOptionIndex: undefined
      });
    } else {
      const filteredOptions =  this.filterOptions(value);
      this.setState({
        inputValue: value,
        isOpen: true,
        filteredOptions: filteredOptions,
        focusedOptionIndex: undefined
      });
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({ value: value });
    }
  }

  /**
   * Function to filter options using input value.
   */
  filterOptions(inputValue) { /*eslint react/sort-comp:0*/
    let filteredOptions = [];
    if (this.props.children.length > 0) {
      if (inputValue) {
        filteredOptions = filter(this.props.children, (entry) => {
          return this.props.filterFunc(inputValue, entry.props.value);
        });
      } else {
        filteredOptions = map(this.props.children, (entry) => { return entry; });
      }
      if (this.props.maxOptions) {
        filteredOptions = filteredOptions.splice(0, this.props.maxOptions);
      }
    }
    return filteredOptions;
  }

  render() {
    const hint = this.props.enableHint ? this._getHint() : undefined;
    const placeHolder = !hint ? this.props.placeholder : undefined;
    const wrapperStyle = extend({}, style.wrapperStyle, this.props.wrapperStyle);
    const inputStyle = extend({}, style.style, this.props.style);
    let hintInputStyle = extend({}, style.hintInputStyle);
    const menuStyle = extend({}, style.menuStyle, this.props.menuStyle);

    const inputClassName = unionClassNames(this.props.className, this._styleId);

    const tabIndex = this.props.tabIndex ? this.props.tabIndex : '0';

    // Currently there are no different hover styles for caret, like select they are probably not really needed.
    if (this.props.displayCaret) {
      if (this.props.disabled) {
        hintInputStyle = extend({}, hintInputStyle, style.disabledCaretToOpenStyle);
      } else if (this.state.isOpen) {
        hintInputStyle = extend({}, hintInputStyle, style.caretToCloseStyle);
      } else {
        hintInputStyle = extend({}, hintInputStyle, style.caretToOpenStyle);
      }
    }

    const computedMenuStyle = (this.state.isOpen && !this.props.disabled && this.state.filteredOptions && this.state.filteredOptions.length > 0) ? menuStyle : { display: 'none' };

    // using value for input makes it a controlled component and it will be changed in controlled manner if (1) user enters value, (2) user selects some option
    // value will be updated depending on whether user has passed value / valueLink / defaultValue as property
    return (
      <div style={ wrapperStyle }
           aria-label = { this.props['aria-label'] }
           aria-disabled = { this.props.disabled }
           {...this.state.wrapperProperties}>

        <input style={ hintInputStyle }
               value={ hint }
               tabIndex = { -1 }
               readOnly></input>

        <input disabled = { this.props.disabled }
               aria-disabled = { this.props.disabled }
               value={ this.state.inputValue }
               placeholder={ placeHolder }
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
              const isHovered = this.state.focusedOptionIndex === index;
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
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
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
  enableHint: React.PropTypes.bool,
  filterFunc: React.PropTypes.func,
  'aria-label': React.PropTypes.string
};

ComboBox.defaultProps = {
  disabled: false,
  displayCaret: false,
  enableHint: false,
  'aria-label': 'ComboBox',
  filterFunc: filterFunc
};
