"use strict";

import React, {Component} from 'react';
import {omit, extend, map, find} from 'underscore';

/**
 * Select component.
 */
export default class Select extends Component {

  constructor (properties) {
    super(properties);
    this.state = {
      isOpen: false,
      selectedValue: this.props.value
    };
  }

  _onChange (event) {
    this.setState({
      selectedValue: event.target.dataset.belleValue,
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

        <select value={ this.state.selectedValue } style={ { display: 'block' } }>
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
