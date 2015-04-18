"use strict";

import React, {Component} from 'react';
import {omit, extend, map, find, first, isEmpty, isUndefined} from 'underscore';

/**
 * Select component.
 */
export default class Select extends Component {

  constructor (properties) {
    super(properties);

    let selectedValue;
    if (this.props.value) {
      selectedValue = this.props.value;
    } else if (this.props.defaultValue) {
      selectedValue = this.props.defaultValue;
    } else if (!isEmpty(this.props.children)) {
      selectedValue = first(this.props.children).props.value;
    }

    this.state = {
      isOpen: false,
      selectedValue: selectedValue,
      focusedOption: undefined
    };
  }

  _onClick (event) {
    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: false
    });

    const entry = event.currentTarget.querySelector('[data-belle-value]');
    const select = React.findDOMNode(this.refs.belleNativeSelect);
    select.value = entry.getAttribute('data-belle-value');
    select.dispatchEvent(changeEvent);
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

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  _onMouseEnter (event) {
    const entry = event.currentTarget.querySelector('[data-belle-value]');
    this.setState({
      focusedOption: entry.getAttribute('data-belle-value')
    });
  }

  _toggleOpen () {
    this.setState({ isOpen: !this.state.isOpen });
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

    return (
      <div>

        <div onClick={ this._toggleOpen.bind(this) }
             style={ { background: '#FFF', padding: 10 } }>
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
                style={ { display: 'none' } }
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
