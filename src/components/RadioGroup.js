import React, { Component, PropTypes } from 'react';
import Radio from './Radio';

const groupPropTypes = {
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string,
  children: PropTypes.node
};

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }
    this.state = {
      value,
    };

    this.onChange = this.onChange.bind(this);
  }

  static propTypes = groupPropTypes;

  render() {
    let children;
    const inputs = this.props.children.reduce((data, item) => {
      if (item && item.type !== undefined) {
        const props = item.props;
        data.push({
          disabled: false,
          ...props,
        });
      }
      return data;
    }, []);

    if (inputs && inputs.length > 0) {
      children = inputs.map((input, index) =>
          <div
            key={index}
            style={this.props.style}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
          >
            <Radio
              disabled={input.disabled}
              value={input.value}
              onChange={this.onChange}
              checked={this.state.value === input.value}
            >
              {input.children}
            </Radio>
          </div>
      );
    }

    return (
      <div>
        {children}
      </div>
    );
  }

  onChange(e) {
    const value = e.target.value;

    this.setState({
      value,
    });

    this.props.onChange(e);
  }
}
