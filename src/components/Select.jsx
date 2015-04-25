"use strict";

import React, {Component} from 'react';
import {omit, extend, map, find, first, isEmpty, isUndefined, findIndex, last} from 'underscore';

/**
 * Select component.
 */
export default class Select extends Component {

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

  _onClick (event) {
    event.preventDefault();

    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: false
    });

    const entry = event.currentTarget.querySelector('[data-belle-value]');
    const select = React.findDOMNode(this.refs.belleNativeSelect);
    select.value = entry.getAttribute('data-belle-value');
    select.dispatchEvent(changeEvent);

    // keep focus on select
    // TODO investigate on how to not loose the focus instead of setting it again
    React.findDOMNode(this.refs.belleNativeSelect).focus();
  }

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

  _onFocus (event) {
    this.setState({ isFocusedOn: true });
  }

  _onBlur (event) {
    this.setState({ isFocusedOn: false });
  }

  _onMouseEnter (event) {
    const entry = event.currentTarget.querySelector('[data-belle-value]');
    this.setState({
      focusedOption: entry.getAttribute('data-belle-value')
    });
  }

  _toggleOpen () {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen: isOpen });
    if (isOpen) {
      React.findDOMNode(this.refs.belleNativeSelect).focus();
    }
  }

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

  _onEnterKeyDown () {
    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: false
    });

    const select = React.findDOMNode(this.refs.belleNativeSelect);
    select.value = this.state.focusedOption;
    select.dispatchEvent(changeEvent);
  }

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
          this._onEnterKeyDown();
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
      padding: 10
    };

    return (
      <div>

        <div onClick={ this._toggleOpen.bind(this) }
             style={ labelStyle }>
          { selectLabel }
        </div>

        <ul style={ drowdownStyle }>
          {
            map(this.props.children, (entry, index) => {
              let entryStyle = { padding: 10 };
              if (entry.props.value == this.state.focusedOption) {
                extend(entryStyle, { background: '#DDD' });
              }
              return (
                <li onClick={ this._onClick.bind(this) }
                    key={ index }
                    onMouseEnter={ this._onMouseEnter.bind(this) }
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

const findIndexOfFocusedOption = (component) => {
  return findIndex(component.props.children, (element) => {
    return element.props.value === component.state.focusedOption;
  });
};

const hasNext = (list, currentIndex) => {
  return (currentIndex + 2 <= list.length);
};

const hasPrevious = (list, currentIndex) => {
  return (currentIndex - 1 >= 0);
};

const selectStyle = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1
}
