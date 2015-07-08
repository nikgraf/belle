import React, {Component} from 'react';
import highlightJs from 'highlight.js';
import {omit, extend} from 'underscore';

const defaultStyle = {
  fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
  background: '#F5F5F5',
  whiteSpace: 'pre-wrap',
  padding: 10
};

export default class Code extends Component {

  constructor(properties) {
    super(properties);
    this.childProperties = omit(properties, 'style');
  }

  componentDidMount() {
    highlightJs.highlightBlock(React.findDOMNode(this));
  }

  componentWillReceiveProps(properties) {
    this.childProperties = omit(properties, 'style');
  }

  componentDidUpdate() {
    highlightJs.highlightBlock(React.findDOMNode(this));
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
  value: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};
