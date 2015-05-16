"use strict";

import React, {Component} from 'react';

export default class Column extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      viewport: this._retrieve_viewport()
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this._resize_mixin_callback.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._resize_mixin_callback.bind(this));
  }

  _resize_mixin_callback () {
    console.log('wee');
    this.setState({
        viewport: this._retrieve_viewport()
    });
  }

  _retrieve_viewport () {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }

  render() {

    const style = (this.state.viewport.width <= 480) ? this.props.smallScreenStyle : this.props.mediumScreenStyle;

    return (
      <div style={ style }>
        { this.props.children }
      </div>
    );
  }
}

Column.propTypes = {
  smallScreenStyle: React.PropTypes.object.isRequired,
  mediumScreenStyle: React.PropTypes.object.isRequired
};
