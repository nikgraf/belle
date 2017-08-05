import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import highlightJs from 'highlight.js';
import { isEqual, omit, extend } from 'underscore';

const defaultStyle = {
  fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
  background: '#F5F5F5',
  whiteSpace: 'pre-wrap',
  padding: 10,
};

export default class Code extends Component {

  constructor(properties) {
    super(properties);
    this.childProperties = omit(properties, 'style');
  }

  componentDidMount() {
    highlightJs.highlightBlock(ReactDOM.findDOMNode(this));
  }

  componentWillReceiveProps(properties) {
    this.childProperties = omit(properties, 'style');
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value === this.props.value && isEqual(nextProps.style, this.props.style)) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    highlightJs.highlightBlock(ReactDOM.findDOMNode(this));
  }

  render() {
    const style = extend({}, defaultStyle, this.props.style);

    return (<pre style={ style } {...this.childProperties}>
        <code>
          { this.props.value }
        </code>
      </pre>);
  }
}

Code.propTypes = {
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
};
