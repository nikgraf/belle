import React, { Component, PropTypes } from 'react';
import unionClassNames from '../../utils/union-class-names';

const buttonTypes = ['button', 'submit', 'reset']; // eslint-disable-line no-unused-vars

/**
 * Button component
 *
 * The button behaves exactly like a normal html button except:
 * - By default every button is of type="button" instead of "submit"
 */
export default class Button extends Component {

  static displayName = 'Button';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    type: PropTypes.oneOf(buttonTypes),
    theme: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'button',
  };

  render() {
    const { theme, className, ...otherProps } = this.props;
    return (
      <button
        className={ unionClassNames(theme.base, className) }
        {...otherProps}
      />
    );
  }
}
