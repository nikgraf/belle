import React, { Component, PropTypes } from 'react';
import style from '../style/radio';

const radioPropTypes = {
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  textStyle: PropTypes.object,
  inputDefaultStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  wrapperRadioStyle: PropTypes.object,
  disabledStyle: PropTypes.object,
  wrapperCheckedRadioStyle: PropTypes.object,
  inputStyleChecked: PropTypes.object,
};

export default class Radio extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
      checked: properties.defaultChecked === true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  static displayName = 'Radio';
  static propTypes = radioPropTypes;

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  render() {
    const {
      name,
      value,
      onFocus,
      onBlur,
    } = this.props;


    let wrapperStyle = {
      ...style.style,
      ...this.props.style,
    };

    let wrapperRadioStyle = {
      ...style.wrapperRadioStyle,
      ...this.props.wrapperRadioStyle,
    };

    let inputStyle = {
      ...style.inputStyle,
      ...this.props.inputStyle,
    };

    let textStyle = {
      ...style.textStyle,
      ...this.props.textStyle,
    };

    let inputDefaultStyle = {
      ...style.inputDefaultStyle,
      ...this.props.inputDefaultStyle,
    };

    if (this.props._isDisabled) {
      inputStyle = {
        ...inputStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    if (this.state.checked && !this.props._isDisabled) {
      wrapperRadioStyle = {
        ...wrapperRadioStyle,
        ...style.wrapperCheckedRadioStyle,
        ...this.props.wrapperCheckedRadioStyle,
      };
      inputStyle = {
        ...inputStyle,
        ...style.inputStyleChecked,
        ...this.props.inputStyleChecked,
      };
    }

    return (
      <label style={wrapperStyle}>
        <span style={wrapperRadioStyle}>
          <input
            ref="input"
            type="radio"
            name={name}
            value={value}
            onChange={this.handleChange}
            style={inputDefaultStyle}
            checked={this.state.checked}
          />
          <span style={inputStyle}></span>
        </span>
        {this.props.children !== undefined ? <span style={textStyle}>{this.props.children}</span> : null}
      </label>
    );
  }

  handleChange(event) {
    this.setState({ checked: event.target.checked });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }
}
