import React, { Component, PropTypes } from 'react';
import Radio from './Radio';

const groupPropTypes = {
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  style:  PropTypes.object
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

  onChange(e) {
    const lastValue = this.state.value;
    const value = e.target.value;

    this.setState({
      value,
    });

    this.props.onChange(e);
  }

  render() {
    let children;
    let inputs = this.props.children.reduce((data, item) => {
      if (item && item.type !== undefined) {
        let props = item.props;
        data.push({
          disabled: false,
          ...props,
        })
      }
      return data;
    }, []);

    if (inputs && inputs.length > 0) {
      children = inputs.map((input, index) => {
        return (
          <div key={index} style={this.props.style}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}>
            <Radio
              disabled={input.disabled}
              value={input.value}
              onChange={this.onChange}
              checked={this.state.value === input.value}
            >
              {input.children}
            </Radio>
          </div>
        )
      });
    }

    return (
      <div>
        {children}
      </div>
    );
  }
}