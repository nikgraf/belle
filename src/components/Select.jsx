"use strict";

import React, {Component} from 'react';
import {omit, extend, map, find, first} from 'underscore';

/**
 * Select component.
 */
export default class Select extends Component {

  constructor (properties) {
    super(properties);

    let selectedValue;
    if (this.props.value) {
      selectedValue = this.props.value;
    } else {
      const firstEntry = first(this.props.children);
      if (firstEntry) {
        selectedValue = firstEntry.props.value;
      }
    }

    this.state = {
      isOpen: false,
      selectedValue: selectedValue
    };
  }

  _onChange (event) {
    this.setState({
      selectedValue: event.target.dataset.belleValue,
      isOpen: false
    });
  }

  _onNativeChange (event) {
    this.setState({
      selectedValue: event.target.value,
      isOpen: false
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
      display: this.state.isOpen ? 'block' : 'none'
    };

    return (
      <div>

        <div onClick={ this._toggleOpen.bind(this) }>{ selectLabel }</div>

        <ul style={ drowdownStyle }>
          {
            map(this.props.children, (entry, index) => {
              return <li onClick={ this._onChange.bind(this) } key={ index }>{ entry }</li>;
            })
          }
        </ul>

        <select value={ this.state.selectedValue }
                onChange={ this._onNativeChange.bind(this) }
                style={ { display: 'block' } }>
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
