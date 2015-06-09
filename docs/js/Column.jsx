"use strict";

import React from 'react';
import {omit} from 'underscore';
import ViewportMixin from './mixin/viewport';

export default React.createClass({

  mixins: [ViewportMixin],

  propTypes: {
    smallScreenStyle: React.PropTypes.object.isRequired,
    mediumScreenStyle: React.PropTypes.object.isRequired
  },

  getInitialState(properties) {
    this.childProperties = omit(properties, [
      'style',
      'smallScreenStyle',
      'mediumScreenStyle'
    ]);
    return {};
  },

  componentWillReceiveProps(properties) {
    this.childProperties = omit(properties, [
      'style',
      'smallScreenStyle',
      'mediumScreenStyle'
    ]);
  },

  render() {
    const style = (this.state.viewport.width <= 480) ? this.props.smallScreenStyle : this.props.mediumScreenStyle;

    return (
      <div style={ style } {...this.childProperties}>
        { this.props.children }
      </div>
    );
  }
});
