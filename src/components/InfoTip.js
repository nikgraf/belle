import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import style from '../style/info-tip';
import {injectStyles} from '../utils/inject-style';

/**
 * Injects pseudo classes for styles into the DOM.
 */
function updatePseudoClassStyle() {
  const styles = [
    {
      id: 'testing',
      style: style.leftPointStyle,
      pseudoClass: 'after',
    },
  ];
  injectStyles(styles);
}

/**
 * InfoTip component
 *
 * The component provides info-tips for other components.
 */
export default class InfoTip extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      showToolTip: false
    };
    this.targetId = properties.targetId;
    this.position = properties.position;
  }

  static displayName = 'InfoTip';

  static propTypes = {
    children: PropTypes.any.isRequired,
    targetId: PropTypes.string.isRequired,
    position: PropTypes.string,
    style: PropTypes.object
  };

  /**
   * Setting default prop values.
   */
  static defaultProps = {
    position: 'right'
  };

  componentDidMount() {
    this._findTargetDetails();
    updatePseudoClassStyle();
  }

  componentWillReceiveProps(properties) {
    if (this.targetId !== properties.targetId) {
      this.targetId = properties.targetId;
      this._findTargetDetails();
    }
    if (this.position !== properties.position) {
      this.position = properties.position;
    }
  }

  _findTargetDetails() {
    const targetElm = document.querySelectorAll('[data-infotip-id="' + this.targetId + '"]')[0];
    if (targetElm) {
      this._attachListeners(targetElm);
      this._calculateDimensions(targetElm);
    }
  }

  _attachListeners(targetElm) {
    targetElm.addEventListener('mouseenter', () => {
      this.setState({
        showToolTip: true
      });
    });
    targetElm.addEventListener('mouseleave', () => {
      this.setState({
        showToolTip: true
      });
    });
  }

  // Inspired by: https://github.com/wwayne/react-tooltip/
  _calculateDimensions(targetElm) {
    let left;
    let top;
    // finding width and height of tooltip
    const node = ReactDOM.findDOMNode(this);
    const tipWidth = node.clientWidth;
    const tipHeight = node.clientHeight;
    // finding position of target element
    const targetBoundingRect = targetElm.getBoundingClientRect();
    const targetTop = targetBoundingRect.top;
    const targetLeft = targetBoundingRect.left;
    const targetWidth = targetElm.clientWidth;
    const targetHeight = targetElm.clientHeight;
    // calculating top and left of infoTip
    if (this.position === 'top') {
      left = targetLeft - (tipWidth / 2) + (targetWidth / 2);
      top = targetTop - tipHeight - 8;
    } else if (this.position === 'bottom') {
      left = targetLeft - (tipWidth / 2) + (targetWidth / 2);
      top = targetTop + targetHeight + 8;
    } else if (this.position === 'left') {
      left = targetLeft - tipWidth - 6;
      top = targetTop + (targetHeight / 2) - (tipHeight / 2);
    } else if (this.position === 'right') {
      left = targetLeft + targetWidth + 6;
      top = targetTop + (targetHeight / 2) - (tipHeight / 2);
    }
    this.infoTipPositions = {
      top,
      left
    };
  }

  /**
   * Returns the HTML function to be rendered by this component.
   */
  render() {
    const infoTipStyle = {
      ...style.style,
      ...this.props.style,
      ...this.infoTipPositions,
      ...{ visibility: this.state.showToolTip ? 'visible' : 'hidden'}
    };
    return (
      <div style={ infoTipStyle }
           className="testing">
        { this.props.children }
      </div>
    );
  }
}

/** TODO:
- implementing separate styling for success, warning, error, info, etc, is that needed
**/
