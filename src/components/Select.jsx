"use strict";

import React, {Component} from 'react';
import {omit, extend, filter, find, first, isEmpty, isUndefined, findIndex, last, size, some, uniqueId} from 'underscore';
import unionClassNames from '../utils/union-class-names';
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
 * For more advanced examples please see:
 * nikgraf.github.io/belle/#/component/select
 *
 * This component was inpired by:
 * - Jet Watson: https://github.com/JedWatson/react-select
 * - Instructure React Team: https://github.com/instructure-react/react-select-box
 */
export default class Select extends Component {

  /*
   * Initialize the component based on the provided properties.
   *
   * By default the Select is closed & the focused option in case the user opens
   * it will be the selected option.
   */
  constructor (properties) {
    super(properties);

    let selectedValue, focusedOptionValue;

    if (this.props.valueLink) {
      selectedValue = this.props.valueLink.value;
      focusedOptionValue = selectedValue;
    } else if (this.props.value) {
      selectedValue = this.props.value;
      focusedOptionValue = selectedValue;
    } else if (this.props.defaultValue) {
      selectedValue = this.props.defaultValue;
      focusedOptionValue = selectedValue;
    } else if (!isEmpty(this.props.children) && !some(this.props.children, isPlaceholder)) {
      selectedValue = first(filter(this.props.children, isOption)).props.value;
      focusedOptionValue = selectedValue;
    } else if (!isEmpty(this.props.children)) {
      focusedOptionValue = first(filter(this.props.children, isOption)).props.value;
    }

    this.state = {
      isOpen: false,
      isFocused: false,
      selectedValue: selectedValue,
      focusedOptionValue: focusedOptionValue,
      selectedOptionWrapperProperties: sanitizePropertiesForSelectedOptionWrapper(properties),
      wrapperProperties: sanitizePropertiesForWrapper(properties.wrapperProps),
      optionsAreaProperties: sanitizePropertiesForOptionsArea(properties.optionsAreaProps),
      caretProperties: sanitizePropertiesForCaret(properties.caretProps),
      selectedOptionWrapperId: properties.id ? properties.id : `belle-select-id-${uniqueId()}`
    };
  }

  componentWillReceiveProps(properties) {
    if (properties.valueLink) {
      this.setState({
        selectedValue: properties.valueLink.value,
        focusedOptionValue: properties.valueLink.value,
        selectedOptionWrapperProperties: sanitizePropertiesForSelectedOptionWrapper(properties),
        wrapperProperties: sanitizePropertiesForWrapper(properties.wrapperProps),
        optionsAreaProperties: sanitizePropertiesForOptionsArea(properties.optionsAreaProps),
        caretProperties: sanitizePropertiesForCaret(properties.caretProps),
        selectedOptionWrapperId: properties.id ? properties.id : `belle-select-id-${uniqueId()}`
      });
    } else if (properties.value) {
      this.setState({
        selectedValue: properties.value,
        focusedOptionValue: properties.value,
        selectedOptionWrapperProperties: sanitizePropertiesForSelectedOptionWrapper(properties),
        wrapperProperties: sanitizePropertiesForWrapper(properties.wrapperProps),
        optionsAreaProperties: sanitizePropertiesForOptionsArea(properties.optionsAreaProps),
        caretProperties: sanitizePropertiesForCaret(properties.caretProps),
        selectedOptionWrapperId: properties.id ? properties.id : `belle-select-id-${uniqueId()}`
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
   * In case shouldPositionOptions is active the scrollTop position is stored
   * to be applied later on. The optionsArea is hidden to make sure it is
   * not displayed beofre repositioned.
   */
  componentWillUpdate(nextProperties, nextState) {
    if (nextProperties.shouldPositionOptions) {
      const optionsAreaNode = React.findDOMNode(this.refs.optionsArea);
      this.cachedOptionsAreaScrollTop = optionsAreaNode.scrollTop;
      optionsAreaNode.style.display = 'none';
    }
  }

  /**
   * In case shouldPositionOptions is active when opening the optionsArea it is
   * repositioned & switched to be visible.
   */
  componentDidUpdate(previousProperties, previousState) {
    if (this.props.shouldPositionOptions) {
      const optionsAreaNode = React.findDOMNode(this.refs.optionsArea);

      // the optionsArea was just opened
      if (!previousState.isOpen && this.state.isOpen) {
        if(this.props.positionOptions) {
          this.props.positionOptions(this);
        } else {
          repositionOptionsArea(this);
        }
      // restore the old scrollTop position
      } else {
        optionsAreaNode.scrollTop = this.cachedOptionsAreaScrollTop;
      }

      if (this.state.isOpen) {
        const optionsAreaStyle = extend({}, style.optionsAreaStyle, this.props.optionsAreaStyle);
        optionsAreaNode.style.display = optionsAreaStyle.display;
      }
    }
  }

  /**
   * After the user clicks on an Option the state is changed & a change event is
   * dispatched on this component.
   *
   * Belle's philosophy dicdates to fire a change event in order to be aligned
   * with the behaviour of the native HTML select.
   */
  _onClickAtOption (event) {
    const entry = event.currentTarget.querySelector('[data-belle-value]');
    this._triggerChange(entry.getAttribute('data-belle-value'));
  }

  /**
   * After an option has been selected the options area gets closed and the
   * selection processed.
   *
   * Depending on the component's properties the value gets updated and the
   * provided change callback for onChange or valueLink is called.
   */
  _triggerChange (value) {
    if(isUndefined(this.props.value)) {
      this.setState({
        focusedOptionValue: value,
        selectedValue: value,
        isOpen: false
      });
    } else {
      this.setState({
        isOpen: false
      });
    }

    if (this.props.valueLink) {
      this.props.valueLink.requestChange(value);
    } else if (this.props.onChange) {
      // TODO investigate how to properly simulate a change event that includes
      // all the usual properties documented here:
      // https://facebook.github.io/react/docs/events.html
      const wrapperNode = React.findDOMNode(this);
      wrapperNode.value = value;
      this.props.onChange({target: wrapperNode});
    }
  }

  /**
   * In order to inform the user which element in the document is active the
   * component keeps track of when it's de-selected and depending on that
   * close the optionsArea.
   */
  _onBlur (event) {
    this.setState({
      isOpen: false,
      isFocused: false
    });

    if (this.props.wrapperProperties && this.props.wrapperProperties.onBlur) {
      this.props.wrapperProperties.onBlur(event);
    }
  }

  /**
   * In order to inform the user which element in the document is active the
   * component keeps track of when it's de-selected and depending on that
   * close the optionsArea.
   */
  _onFocus (event) {
    this.setState({
      isFocused: true
    });

    if (this.props.wrapperProperties && this.props.wrapperProperties.onFocus) {
      this.props.wrapperProperties.onFocus(event);
    }
  }

  /**
   * In order to inform the user which Option is active the component keeps
   * track of when an option is in focus by the user and depending on that
   * provide a visual indicator.
   */
  _onMouseEnterAtOption (event) {
    const entry = event.currentTarget.querySelector('[data-belle-value]');
    this.setState({
      focusedOptionValue: entry.getAttribute('data-belle-value')
    });
  }

  /**
   * Toggle the options area of the component.
   */
  _toggleOptionsArea (event) {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }

    if (this.props.onClick) {
      this.props.onClick(event);
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

      if (hasNext(filter(this.props.children, isOption), indexOfFocusedOption)) {
        this.setState({
          focusedOptionValue: filter(this.props.children, isOption)[indexOfFocusedOption + 1].props.value
        });
      }
    } else {
      this.setState({
        focusedOptionValue: first(filter(this.props.children, isOption)).props.value
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

      if (hasPrevious(filter(this.props.children, isOption), indexOfFocusedOption)) {
        this.setState({
          focusedOptionValue: filter(this.props.children, isOption)[indexOfFocusedOption - 1].props.value
        });
      }
    } else {
      this.setState({
        focusedOptionValue: last(filter(this.props.children, isOption)).props.value
      });
    }
  }

  /**
   * After the user pressed the `Enter` or `Space` key for an already open
   * options area the focused option is selected.
   *
   * Same as _onClickAtOption this update the state & dispatches a change event.
   *
   * Belle's philosophy dicdates to fire a change event in order to be aligned
   * with the behaviour of the native HTML select.
   */
  _onEnterOrSpaceKeyDown () {
    this._triggerChange(this.state.focusedOptionValue);
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

    if(filter(this.props.children, isOption).length > 0) {

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

    if (this.props.wrapperProperties && this.props.wrapperProperties.onKeyDown) {
      this.props.wrapperProperties.onKeyDown(event);
    }
  }

  render () {
    const defaultStyle = extend({}, style.style, this.props.style);
    const focusStyle = extend({}, style.focusStyle, this.props.focusStyle);
    const wrapperStyle = extend({}, style.wrapperStyle, this.props.wrapperStyle);
    const optionsAreaStyle = extend({}, style.optionsAreaStyle, this.props.optionsAreaStyle);
    const caretToOpenStyle = extend({}, style.caretToOpenStyle, this.props.caretToOpenStyle);
    const caretToCloseStyle = extend({}, style.caretToCloseStyle, this.props.caretToCloseStyle);

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
    const hasCustomTabIndex = this.props.wrapperProperties && this.props.wrapperProperties.tabIndex;
    const tabIndex = hasCustomTabIndex ? this.props.wrapperProperties.tabIndex : '0';

    return (
      <div style={ wrapperStyle }
           tabIndex={ tabIndex }
           onKeyDown={ this._onKeyDown.bind(this) }
           onBlur={ this._onBlur.bind( this) }
           onFocus={ this._onFocus.bind( this) }
           ref="wrapper"
           {...this.state.wrapperProperties} >

        <div onClick={ this._toggleOptionsArea.bind(this) }
             style={ this.state.isFocused ? focusStyle : defaultStyle }
             className={ unionClassNames(this.props.className, this._styleId) }
             ref="selectedOptionWrapper"
             role="button"
             aria-expanded={ this.state.isOpen }
             id={ this.state.selectedOptionWrapperId }
             {...this.state.selectedOptionWrapperProperties} >
          { selectedOptionOrPlaceholder }
          <span style={ this.state.isOpen ? caretToCloseStyle : caretToOpenStyle }
                {...this.state.caretProperties}>
          </span>
        </div>

        <ul style={ computedOptionsAreaStyle }
            role="listbox"
            aria-labelledby={ this.state.selectedOptionWrapperId }
            ref="optionsArea"
            {...this.state.optionsAreaProperties} >
          {
            React.Children.map(this.props.children, (entry, index) => {
              // filter out all non-Option Components
              if (isOption(entry)) {
                const isHovered = entry.props.value == this.state.focusedOptionValue;
                const option = React.addons.cloneWithProps(entry, {
                  _isHovered: isHovered
                });

                return (
                  <li onClick={ this._onClickAtOption.bind(this) }
                      key={ index }
                      onMouseEnter={ this._onMouseEnterAtOption.bind(this) }
                      role="option"
                      aria-selected={ isHovered }>
                    { option }
                  </li>
                );
              } else if (isSeparator(entry)) {
                return (
                  <li key={ index }
                      role="presentation">
                    { entry }
                  </li>
                );
              }
            })
          }
        </ul>

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
    React.PropTypes.number
  ]),
  onChange: React.PropTypes.func,
  valueLink: React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    requestChange: React.PropTypes.func.isRequired
  }),
  className: React.PropTypes.string,
  shouldPositionOptions: React.PropTypes.bool,
  positionOptions: React.PropTypes.func,
  style: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  hoverStyle: React.PropTypes.object,
  wrapperStyle: React.PropTypes.object,
  optionsAreaStyle: React.PropTypes.object,
  caretToOpenStyle: React.PropTypes.object,
  caretToCloseStyle: React.PropTypes.object,
  wrapperProps: React.PropTypes.object,
  optionsAreaProps: React.PropTypes.object,
  caretProps: React.PropTypes.object
};

Select.defaultProps = {
  shouldPositionOptions: true
};

/**
 * Returns the index of the entry with a certain value from the component's
 * children.
 *
 * The index search includes separator & option components.
 */
const findIndexOfSelectedOption = (component) => {
  const filterFunction = (child) => (isOption(child) || isSeparator(child));
  return findIndex(filter(component.props.children, filterFunction), (element) => {
    return element.props.value === component.state.selectedValue;
  });
};

/**
 * Returns the index of the entry with a certain value from the component's
 * children.
 *
 * The index search includes only option components.
 */
const findIndexOfFocusedOption = (component) => {
  return findIndex(filter(component.props.children, isOption), (element) => {
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
 * Returns true if the provided property is a Separator component from Belle.
 */
function isSeparator(reactElement) {
  return reactElement._isReactElement &&
    reactElement.type &&
    reactElement.type.name === 'Separator';
}

/**
 * Verifies that the children is an array containing only Options & at maximum
 * one Placeholder.
 */
function validateArrayOfOptionsAndMaximumOnePlaceholder (props, propName, componentName) {
  const error = React.PropTypes.arrayOf(optionOrPlaceholderOrSeparatorPropType).isRequired(props, propName, componentName);
  if (error) return error;

  const placeholders = filter(props[propName], isPlaceholder);
  if (size(placeholders) > 1) {
    return new Error(`Invalid children supplied to \`${componentName}\`, expected only one Placeholder component.`);
  }
}

/**
 * Verifies that the provided property is an Option or Placeholder component from Belle.
 */
function optionOrPlaceholderOrSeparatorPropType(props, propName, componentName) {
  if (!(props[propName] &&
        isOption(props[propName]) ||
        isPlaceholder(props[propName]) ||
        isSeparator(props[propName]))
     ) {
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

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizePropertiesForSelectedOptionWrapper(properties) {
  return omit(properties, [
    'onClick',
    'style',
    'className',
    'ref',
    'shouldPositionOptions',
    'positionOptions',
    'focusStyle',
    'hoverStyle',
    'wrapperStyle',
    'optionsAreaStyle',
    'caretToOpenStyle',
    'caretToCloseStyle',
    'value',
    'defaultValue',
    'onChange',
    'valueLink',
    'role',
    'aria-expanded',
    'id'
  ]);
}

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizePropertiesForWrapper(wrapperProperties) {
  return omit(wrapperProperties, [
    'style',
    'ref',
    'tabIndex',
    'onKeyDown',
    'onBlur',
    'onFocus'
  ]);
}

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizePropertiesForOptionsArea(optionsAreaProperties) {
  return omit(optionsAreaProperties, [
    'style',
    'ref',
    'aria-labelledby',
    'role'
  ]);
}

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizePropertiesForCaret(caretProperties) {
  return omit(caretProperties, [
    'style',
    'ref'
  ]);
}

/**
 * Repositions to the optionsArea to position the focusedOption right on top
 * of the selected one.
 *
 * @param selectComponent {object} - the Select component itself accessible with `this`
 */
function repositionOptionsArea(selectComponent) {
  const optionsAreaNode = React.findDOMNode(selectComponent.refs.optionsArea);
  const optionsAreaStyle = window.getComputedStyle(optionsAreaNode, null);
  const optionsAreaWidth = parseFloat(optionsAreaStyle.getPropertyValue('width'));

  // In case of a placeholder no option is focused on initially
  let option, optionIndex;

  if (selectComponent.state.selectedValue) {
    optionIndex = findIndexOfSelectedOption(selectComponent);
  } else {
    optionIndex = 0;
  }
  option = optionsAreaNode.children[optionIndex];

  const optionsAreaHeight = parseFloat(optionsAreaStyle.getPropertyValue('height'));

  // In order to work with legacy browsers the second paramter for pseudoClass
  // has to be provided http://caniuse.com/#feat=getcomputedstyle
  const optionStyle = window.getComputedStyle(option.children[0], null);
  const optionPaddingTop = parseFloat(optionStyle.getPropertyValue('padding-top'));
  const optionPaddingLeft = parseFloat(optionStyle.getPropertyValue('padding-top'));

  const selectedOptionWrapperNode = React.findDOMNode(selectComponent.refs.selectedOptionWrapper);
  const selectedOptionWrapperStyle = window.getComputedStyle(selectedOptionWrapperNode, null);
  const selectedOptionWrapperPaddingTop = parseFloat(selectedOptionWrapperStyle.getPropertyValue('padding-top'));
  const selectedOptionWrapperPaddingLeft = parseFloat(selectedOptionWrapperStyle.getPropertyValue('padding-top'));

  const newTop = option.offsetTop + optionPaddingTop - selectedOptionWrapperPaddingTop;
  const newLeft = option.offsetLeft + optionPaddingLeft;

  // Top positioning
  if (optionsAreaHeight < optionsAreaNode.scrollHeight) {
    if(newTop + optionsAreaHeight > optionsAreaNode.scrollHeight) {
      // In case scrolling is not enough the box needs to be moved more to
      // the top to match the same position.
      const maxScrollTop = optionsAreaNode.scrollHeight - optionsAreaHeight;
      optionsAreaNode.scrollTop = maxScrollTop;
      optionsAreaNode.style.top = `-${newTop - maxScrollTop}px`;
    } else {
      // in case it's the first entry scrolling is not used to respect the
      // optionsArea's paddingTop
      if (optionIndex === 0) {
        const optionsAreaPaddingTop = parseFloat(optionsAreaStyle.getPropertyValue('padding-top'));
        optionsAreaNode.scrollTop = 0;
        optionsAreaNode.style.top = `-${newTop}px`;
      } else {
        optionsAreaNode.scrollTop = newTop;
      }
    }
  } else {
    optionsAreaNode.style.top = `-${newTop}px`;
  }

  // Left positioning
  optionsAreaNode.style.left = `-${newLeft}px`;

  // Increasing the width
  //
  // Pro:
  // - It gives a option in the optionsArea the same width
  // as in the selectedOptionWrapper.
  // - There is space to keep the text of the option on the exact same pixel
  // when opening. The optionsArea is symetric in relation to the
  // selectedOptionWrapper.
  //
  // Con:
  // - Adding the padding could cause issue with design as it gets wider than
  // the original field.
  optionsAreaNode.style.width = `${optionsAreaWidth + newLeft * 2}px`;
}
