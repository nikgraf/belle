import React, { PropTypes } from 'react';
import { omit } from 'underscore';

export default React.createClass({

  propTypes: {
    smallScreenStyle: PropTypes.object.isRequired,
    mediumScreenStyle: PropTypes.object.isRequired,
    children: PropTypes.any,
  },

  contextTypes: {
    viewport: PropTypes.any,
  },

  getInitialState() {
    this.childProperties = omit(this.props, [
      'style',
      'smallScreenStyle',
      'mediumScreenStyle',
    ]);
    return {};
  },

  componentWillReceiveProps(properties) {
    this.childProperties = omit(properties, [
      'style',
      'smallScreenStyle',
      'mediumScreenStyle',
    ]);
  },

  render() {
    const style = (this.context.viewport.width <= 480) ? this.props.smallScreenStyle : this.props.mediumScreenStyle;

    return (
      <div style={ style } {...this.childProperties}>
        { this.props.children }
      </div>
    );
  },
});
