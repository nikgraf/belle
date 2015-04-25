"use strict";

import React, {Component} from 'react';
import {omit, extend, map, find, first, isEmpty, isUndefined, findIndex, last} from 'underscore';

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
    } else if (!isEmpty(this.props.children)) {
      selectedValue = first(this.props.children).props.value;
    }

    this.state = {
      isFocusedOn: false,
      isOpen: false,
      selectedValue: selectedValue,
      focusedOption: selectedValue
    };
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
    event.preventDefault();

    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: false
    });

    const entry = event.currentTarget.querySelector('[data-belle-value]');
    const select = React.findDOMNode(this.refs.belleNativeSelect);
    // TODO investigate if this is aligned with a natively dispatched change event
    // So far only a changed value has been identified.
    select.value = entry.getAttribute('data-belle-value');
    select.dispatchEvent(changeEvent);

    // TODO investigate on how to not loose the focus instead of setting it again
    // Keep focus on native select to align the behaviour with the native select.
    React.findDOMNode(this.refs.belleNativeSelect).focus();
  }

  /**
   * After a choice has been selected the selection area gets closed and the selection processed.
   *
   * Depending on the component's properties the value gets updated and the
   * provided change callback for onChange or valueLink is called.
   */
  _onChange (event) {
    if(isUndefined(this.props.value)) {
      this.setState({
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
    this.setState({ isFocusedOn: false });
  }

  /**
   * In order to inform the user which Option is active the component keeps
   * track of when an option is in focus of the user and depending on that
   * provide a visual indicator.
   */
  _onMouseEnterAtOption (event) {
    const entry = event.currentTarget.querySelector('[data-belle-value]');
    this.setState({
      focusedOption: entry.getAttribute('data-belle-value')
    });
  }

  /**
   * Toggle the selection area of the component.
   */
  _toggleOpen () {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen: isOpen });
    if (isOpen) {
      React.findDOMNode(this.refs.belleNativeSelect).focus();
    }
  }

  /**
   * Update focus for the options for an already open selection area.
   *
   * The user experience of HTML's native select is good and the goal here is to
   * achieve the same behaviour.
   *
   * - Focus on the first entry in case no options is focused on.
   * - Switch focus to the next option in case one option already has focus.
   */
  _onArrowDownKeyDown () {
    if (this.state.focusedOption) {
      const indexOfFocusedOption = findIndexOfFocusedOption(this);

      if (hasNext(this.props.children, indexOfFocusedOption)) {
        this.setState({
          focusedOption: this.props.children[indexOfFocusedOption + 1].props.value
        });
      }
    } else {
      this.setState({
        focusedOption: first(this.props.children).props.value
      });
    }
  }

  /**
   * Update focus for the options for an already open selection area.
   *
   * The user experience of HTML's native select is good and the goal here is to
   * achieve the same behaviour.
   *
   * - Focus on the last entry in case no options is focused on.
   * - Switch focus to the previous option in case one option already has focus.
   */
  _onArrowUpKeyDown () {
    if (this.state.focusedOption) {
      const indexOfFocusedOption = findIndexOfFocusedOption(this);

      if (hasPrevious(this.props.children, indexOfFocusedOption)) {
        this.setState({
          focusedOption: this.props.children[indexOfFocusedOption - 1].props.value
        });
      }
    } else {
      this.setState({
        focusedOption: last(this.props.children).props.value
      });
    }
  }

  /**
   * After the user pressed the `Enter` or `Space` key for an already open
   * selection area the focused option is selected.
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
    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: false
    });

    const select = React.findDOMNode(this.refs.belleNativeSelect);
    // TODO investigate if this is aligned with a natively dispatched change event
    // So far only a changed value has been identified.
    select.value = this.state.focusedOption;
    select.dispatchEvent(changeEvent);
  }

  /**
   * Manages the keyboard events.
   *
   * In case the Select is in focus, but closed ArrowDown, ArrowUp, Enter and
   * Space will result in opening the selection area.
   *
   * In case the selection area is already open each key press will have
   * different effects already documented in the related methods.
   *
   * Pressing Escape will close the selection area.
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
    const selectedEntry = find(this.props.children, (entry) => {
      return entry.props.value == this.state.selectedValue;
    });
    const selectLabel = selectedEntry ? selectedEntry : "Choose a City";

    const drowdownStyle = {
      display: this.state.isOpen ? 'block' : 'none',
      listStyleType: 'none',
      background: '#FFF',
      padding: 0,
      margin: 0
    };

    const labelStyle = {
      outline: this.state.isFocusedOn ? '1px solid blue' : 'none',
      background: '#FFF',
      padding: 10,
      position: 'relative'
    };

    return (
      <div>

        <div onClick={ this._toggleOpen.bind(this) }
             style={ labelStyle }>
          { selectLabel }
          <span style={ this.state.isOpen ? caretUpStyle : caretDownStyle }></span>
        </div>

        <ul style={ drowdownStyle }>
          {
            map(this.props.children, (entry, index) => {
              let entryStyle = { padding: 10 };
              if (entry.props.value == this.state.focusedOption) {
                extend(entryStyle, { background: '#DDD' });
              }
              return (
                <li onClick={ this._onClickAtOption.bind(this) }
                    key={ index }
                    onMouseEnter={ this._onMouseEnterAtOption.bind(this) }
                    style={ entryStyle }>
                  { entry }
                </li>
              );
            })
          }
        </ul>

        <select value={ this.state.selectedValue }
                onChange={ this._onChange.bind(this) }
                onFocus={ this._onFocus.bind(this) }
                onBlur={ this._onBlur.bind(this) }
                onKeyDown={ this._onKeyDown.bind(this) }
                style={ selectStyle }
                ref="belleNativeSelect">
          {
            map(this.props.children, (entry, index) => {
              return (
                <option key={ index } value={ entry.props.value }>
                  { entry.props.value }
                </option>
              );
            })
          }
        </select>

      </div>
    );
  }
}

Select.displayName = 'Belle Select';

/**
 * Returns the index of the entry with a certain value from the component's
 * children.
 */
const findIndexOfFocusedOption = (component) => {
  return findIndex(component.props.children, (element) => {
    return element.props.value === component.state.focusedOption;
  });
};


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

// TODO verify that this is the best way to hide the native select while keeping
// allowing to focus on it
const selectStyle = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1
};

const caretDownStyle = {
  height: 0,
  width: 0,
  content: ' ',
  position: 'absolute',
  top: 20,
  right: 10,
  borderTop: '6px solid #666',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent'
};

const caretUpStyle = {
  height: 0,
  width: 0,
  content: ' ',
  position: 'absolute',
  top: 20,
  right: 10,
  borderBottom: '6px solid #666',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent'
};
