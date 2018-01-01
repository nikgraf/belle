import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ComboBoxItem } from '../molecules';
import { comboBoxStyle } from '../../style';
import {
  omit,
  filterReactChildren,
  has,
  isEmpty,
  find,
  getArrayForReactChildren,
  uniqueId,
  injectStyles,
  removeAllStyles,
  unionClassNames
} from '../../utils';

const comboBoxPropTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  valueLink: PropTypes.shape({
    value: PropTypes.string,
    requestChange: PropTypes.func.isRequired,
  }),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  wrapperProps: PropTypes.object,
  menuProps: PropTypes.object,
  caretProps: PropTypes.object,
  onUpdate: PropTypes.func,
  onInputMatch: PropTypes.func,
  tabIndex: PropTypes.number,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  caretClassName: PropTypes.string,
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  hintStyle: PropTypes.object,
  menuStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  disabledStyle: PropTypes.object,
  disabledHoverStyle: PropTypes.object,
  hoverStyle: PropTypes.object,
  caretToOpenStyle: PropTypes.object,
  caretToCloseStyle: PropTypes.object,
  disabledCaretToOpenStyle: PropTypes.object,
  maxOptions: PropTypes.number,
  displayCaret: PropTypes.bool,
  enableHint: PropTypes.bool,
  filterFunc: PropTypes.func,
  'aria-label': PropTypes.string,
};

/**
 * Update hover comboBoxStyle for the specified styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param caretStyleId {string} - unique is assigned as class to caret span
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, caretStyleId, properties) {
  const hoverStyle = {
    ...comboBoxStyle.hoverStyle,
    ...properties.hoverStyle,
  };
  const focusStyle = {
    ...comboBoxStyle.focusStyle,
    ...properties.focusStyle,
  };
  const disabledHoverStyle = {
    ...comboBoxStyle.disabledHoverStyle,
    ...properties.disabledHoverStyle,
  };
  const caretFocusStyle = {
    ...comboBoxStyle.caretFocusStyle,
  };

  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover',
    },
    {
      id: styleId,
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true,
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus',
    },
    {
      id: caretStyleId,
      style: caretFocusStyle,
      pseudoClass: 'focus',
    },
  ];
  injectStyles(styles);
}

/**
 * Returns an object with properties that are relevant for the wrapper div.
 */
function sanitizeWrapperProps(properties) {
  return omit(properties, [
    'style',
    'aria-label',
    'aria-disabled',
  ]);
}

/**
 * Returns an object with properties that are relevant for the input box.
 */
function sanitizeInputProps(properties) {
  return omit(properties, Object.keys(comboBoxPropTypes));
}

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeCaretProps(properties) {
  return omit(properties, [
    'style',
    'className',
    'onClick',
    'tabIndex',
  ]);
}

/**
 * Returns an object with properties that are relevant for the combo-box menu.
 */
function sanitizeMenuProps(properties) {
  return omit(properties, [
    'style',
    'ref',
    'role',
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
export class ComboBox extends Component {

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
      isOpen: false,
      focusedOptionIndex: undefined,
      inputValue: inputValue || '',
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      inputProps: sanitizeInputProps(properties),
      caretProps: sanitizeCaretProps(properties.caretProps),
      menuProps: sanitizeMenuProps(properties.menuProps),
    };

    this.filteredOptions = ComboBox.filterOptions(inputValue, properties);
  }

  static displayName = 'ComboBox';

  static propTypes = comboBoxPropTypes;

  static childContextTypes = {
    isDisabled: PropTypes.bool.isRequired,
    isHoveredValue: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    disabled: false,
    displayCaret: false,
    enableHint: false,
    'aria-label': 'ComboBox',
    filterFunc, // TODO rename to filterFunction in 4.0.0
    tabIndex: 0,
    children: [],
  };

  getChildContext() {
    let value;
    if (typeof this.state.focusedOptionIndex !== 'undefined') {
      value = this.filteredOptions[this.state.focusedOptionIndex].props.value;
    }

    return {
      isDisabled: this.props.disabled,
      isHoveredValue: value,
    };
  }

  /**
   * This method will calculate the hint that should be present in comboBox at some point in time. Rules:
   * 1. If menu is not open hint is undefined
   * 2. If menu is open but there are no filteredOptions hint is undefined
   * 3. If if some option is highlighted hint is equal to its value
   * 4. If no option is highlighted but some value is present in input box hint is equal to value of first filteredOptions
   * If user has typed some text in input box and there is a hint(according to above calculations), the starting of hint
   * is replaced by the text input by user ( this is to make sure that case of letters in hint is same as that in input box
   * value and overlap is perfect.)
   * todo: simplify logic in method below
   */
  _getHint() {
    if (this.state.isOpen) {
      const filteredOptions = this.filteredOptions;
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
            } else if (position === -1) {
              return hint;
            }
          } else {
            return hint;
          }
        }
      }
    }

    return undefined;
  }

  /**
   * Generates the style-id & inject the focus & hover style.
   */
  componentWillMount() {
    const id = uniqueId();
    this._styleId = `style-id${id}`;
    this._caretStyleId = `caretStyle-id${id}`;
    updatePseudoClassStyle(this._styleId, this._caretStyleId, this.props);
  }

  componentWillReceiveProps(properties) {
    const newState = {
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      inputProps: sanitizeInputProps(properties),
      caretProps: sanitizeCaretProps(properties.caretProps),
      menuProps: sanitizeMenuProps(properties.menuProps),
    };

    if (has(properties, 'valueLink')) {
      newState.inputValue = properties.valueLink.value || '';
    } else if (has(properties, 'value')) {
      newState.inputValue = properties.value || '';
    }

    if (newState.inputValue) {
      newState.filteredOptions = ComboBox.filterOptions(newState.inputValue, properties);
    }

    this.setState(newState);

    removeAllStyles([this._styleId, this._caretStyleId]);
    updatePseudoClassStyle(this._styleId, this._caretStyleId, properties);
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeAllStyles([this._styleId, this._caretStyleId]);
  }

  /**
   * Update focusedOptionIndex when an option is touched.
   */
  _onTouchStartAtOption = (event, index) => {
    if (!this.props.disabled && event.touches.length === 1) {
      this._touchStartedAt = index;
      this.setState({ focusedOptionIndex: index });
    }
  };

  /**
   * Triggers a change event after the user touched on an Option.
   */
  _onTouchEndAtOption = (event, index) => {
    if (!this.props.disabled && this._touchStartedAt) {
      if (this._touchStartedAt === index) {
        event.preventDefault();
        this._triggerChange(this._getValueForIndex(index));
      }

      this._touchStartedAt = undefined;
    }
  };

  /**
   * Update focusedOptionIndex to undefined on touch cancel.
   */
  _onTouchCancelAtOption = () => {
    if (!this.props.disabled) {
      this._touchStartedAt = undefined;
      this.setState({ focusedOptionIndex: undefined });
    }
  };

  /**
   * Closed opened combo-box options and removed focusStyles on blur.
   */
  _onBlur = (event) => {
    if (!this.props.disabled) {
      this.setState({
        isOpen: false,
        focusedOptionIndex: undefined,
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  /**
   * Set focused state when element is focused.
   */
  _onFocus = (event) => {
    if (!this.props.disabled) {
      this.setState({
        isOpen: true,
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  /**
   * Open/ Close menu when create is clicked.
   */
  _onCaretClick = () => {
    if (!this.props.disabled) {
      const isOpen = !this.state.isOpen;
      this.setState({
        isOpen,
      });
    }
  };

  /**
   * Update focusedOptionIndex for component when mouse enters an option.
   */
  _onMouseEnterAtOption = (index) => {
    if (!this.props.disabled) {
      this.setState({
        focusedOptionIndex: index,
      });
    }
  };

  /**
   * Set focusedOptionIndex to undefined.
   */
  _onMouseLeaveAtOption = () => {
    if (!this.props.disabled) {
      this.setState({
        focusedOptionIndex: undefined,
      });
    }
  };

  /**
   * Update component value when an option is clicked.
   */
  _onClickAtOption = (index) => {
    if (!this.props.disabled) {
      this._triggerChange(this._getValueForIndex(index));
    }
  };

  /**
   * Handle keyDown in input (when input is focused):
   * 1. ComboBox is closed and ArrowDown/ ArrowUp is pressed -> open the ComboBox
   * 2. ComboBox is opened and ArrowDown is pressed -> highlight next option
   * 3. ComboBox is opened and ArrowUp is pressed -> highlight previous option
   * 4. ComboBox is opened and ArrowRight is pressed -> value of hint is copied over to inputBox
   * 5. ComboBox is opened and Enter/ Tab is pressed -> update input value to value of option
   * 6. ComboBox is opened and Esc is pressed -> close ComboBox
   */
  _onKeyDown = (event) => {
    if (!this.props.disabled) {
      if (!this.state.isOpen) {
        if (event.key === 'ArrowDown' ||
          event.key === 'ArrowUp') {
          event.preventDefault();
          this.setState({
            isOpen: true,
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
          if (this.props.enableHint) {
            event.preventDefault();
            const hint = this._getHint();
            if (hint) {
              this._userUpdateValue(hint);
            }
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
          });
        }
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  /**
   * Highlight next option when arrowDown key is pressed.
   * Highlight first option if currently last option is focused.
   */
  _onArrowDownKeyDown = () => {
    let index = 0;
    if (this.state.focusedOptionIndex !== undefined && (this.state.focusedOptionIndex + 1) < this.filteredOptions.length) {
      index = this.state.focusedOptionIndex + 1;
    }

    this.setState({
      focusedOptionIndex: index,
    });
  };

  /**
   * Highlight previous option when arrowUp key is pressed.
   * Highlight last option if currently first option is focused.
   */
  _onArrowUpKeyDown() {
    if (this.filteredOptions.length > 0) {
      let index = this.filteredOptions.length - 1;
      if (this.state.focusedOptionIndex) {
        index = this.state.focusedOptionIndex - 1;
      }

      this.setState({
        focusedOptionIndex: index,
      });
    }
  }

  /**
   * Update value of Input box to the value of highlighted option.
   */
  _onEnterOrTabKeyDown() {
    if (this.state.focusedOptionIndex >= 0) {
      this._triggerChange(this.filteredOptions[this.state.focusedOptionIndex].props.value);
    }
  }

  /**
   * The function will return options (if any) who's value is same as value of the combo-box input.
   */
  _findMatch(value) {
    return find(this.filteredOptions, (entry) => entry.props.value === value);
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
        focusedOptionIndex: undefined,
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        isOpen: false,
        focusedOptionIndex: undefined,
      });
    } else {
      this.setState({
        inputValue: value,
        isOpen: false,
        focusedOptionIndex: undefined,
      });
      this.filteredOptions = ComboBox.filterOptions(value, this.props);
    }

    const obj = { value, isOptionSelection: true, isMatchingOption: true };
    const matchedOption = this._findMatch(value);
    obj.identifier = matchedOption ? matchedOption.props.identifier : undefined;

    if (this.props.onUpdate) {
      this.props.onUpdate(obj);
    }
  }

  /**
   * The function is called when user type/ paste value in the input box.
   */
  _onChange = (event) => {
    const value = event.target.value;
    this._userUpdateValue(value);
  };

  /**
   * Returns the value of the child with a certain index.
   */
  _getValueForIndex(index) {
    return this.filteredOptions[index].props.value;
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
        focusedOptionIndex: undefined,
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        isOpen: true,
        focusedOptionIndex: undefined,
      });
    } else {
      this.setState({
        inputValue: value,
        isOpen: true,
        focusedOptionIndex: undefined,
      });
      this.filteredOptions = ComboBox.filterOptions(value, this.props);
    }

    const obj = { value, isOptionSelection: false, isMatchingOption: false };

    const matchedOption = this._findMatch(value);
    if (matchedOption) {
      obj.identifier = matchedOption.props.identifier;
      obj.isMatchingOption = true;
    }

    if (this.props.onUpdate) {
      this.props.onUpdate(obj);
    }
  }

  /**
   * Function to filter options using input value.
   */
  static filterOptions(inputValue, properties) { /* eslint react/sort-comp:0*/
    let filteredOptions = [];
    if (!isEmpty(properties.children)) {
      if (inputValue) {
        filteredOptions = filterReactChildren(properties.children, (entry) => (
          properties.filterFunc(inputValue, entry.props.value)
        ));
      } else {
        filteredOptions = getArrayForReactChildren(properties.children, (entry) => entry);
      }

      if (properties.maxOptions) {
        filteredOptions = filteredOptions.splice(0, properties.maxOptions);
      }
    }

    return filteredOptions;
  }

  render() {
    let inputStyle = {
      ...comboBoxStyle.style,
      ...this.props.style,
    };
    const hintStyle = {
      ...comboBoxStyle.hintStyle,
      ...this.props.hintStyle,
    };
    const wrapperStyle = {
      ...comboBoxStyle.wrapperStyle,
      ...this.props.wrapperStyle,
    };
    const menuStyle = {
      ...comboBoxStyle.menuStyle,
      ...this.props.menuStyle,
    };

    const hint = this.props.enableHint ? this._getHint() : undefined;
    const placeHolder = !hint ? this.props.placeholder : undefined;
    const inputClassName = unionClassNames(this.props.className, this._styleId);
    const tabIndex = this.props.tabIndex ? this.props.tabIndex : '0';

    if (this.props.disabled) {
      inputStyle = {
        ...inputStyle,
        ...comboBoxStyle.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    // todo: Currently there are no different hover styles for caret, like select they are probably not really needed.
    let caretStyle;
    if (this.props.displayCaret) {
      if (this.props.disabled) {
        caretStyle = {
          ...comboBoxStyle.caretToOpenStyle,
          ...this.props.caretToOpenStyle,
          ...comboBoxStyle.disabledCaretToOpenStyle,
          ...this.props.disabledCaretToOpenStyle,
        };
      } else if (this.state.isOpen) {
        caretStyle = {
          ...comboBoxStyle.caretToCloseStyle,
          ...this.props.caretToCloseStyle,
        };
      } else {
        caretStyle = {
          ...comboBoxStyle.caretToOpenStyle,
          ...this.props.caretToOpenStyle,
        };
      }
    }

    const computedMenuStyle = (this.state.isOpen && !this.props.disabled && this.filteredOptions && this.filteredOptions.length > 0) ? menuStyle : { display: 'none' };

    // using value for input makes it a controlled component and it will be changed in controlled manner if (1) user enters value, (2) user selects some option
    // value will be updated depending on whether user has passed value / valueLink / defaultValue as property
    return (
      <div
        style={ wrapperStyle }
        aria-label = { this.props['aria-label'] }
        aria-disabled = { this.props.disabled }
        {...this.state.wrapperProps}
      >
        <input
          style={ hintStyle }
          value={ hint }
          tabIndex = { -1 }
          key="style-hint"
          readOnly
        />

        <input
          disabled = { this.props.disabled }
          aria-disabled = { this.props.disabled }
          value={ this.state.inputValue }
          placeholder={ placeHolder }
          style={ inputStyle }
          className={ inputClassName }
          onChange={ this._onChange }
          tabIndex={ tabIndex }
          onBlur={ this._onBlur }
          onFocus={ this._onFocus }
          onKeyDown={ this._onKeyDown }
          aria-autocomplete="list"
          key="combo-input"
          {...this.state.inputProps}
        />
        <span
          style={ caretStyle }
          className = { this._caretStyleId }
          onClick = { this._onCaretClick }
          tabIndex = { -1 }
          {...this.state.caretProps}
        />

        <ul
          style={ computedMenuStyle }
          role="listbox"
          aria-expanded={ this.state.isOpen }
          {...this.state.menuProps}
        >
          {
            React.Children.map(this.filteredOptions, (entry, index) => ((
              <ComboBoxItem
                key={ index }
                index={ index }
                onItemTouchStart={ this._onTouchStartAtOption }
                onItemTouchEnd={ this._onTouchEndAtOption }
                onItemTouchCancel={ this._onTouchCancelAtOption }
                onItemClick={ this._onClickAtOption }
                onItemMouseEnter={ this._onMouseEnterAtOption }
                onItemMouseLeave={ this._onMouseLeaveAtOption }
              >
                { entry }
              </ComboBoxItem>
            )))
          }
        </ul>

      </div>
    );
  }
}
