"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import isComponentTypeOf from '../utils/is-component-of-type.js';
import {filter, findIndex} from 'underscore';

var selectConfig = {

  shouldPositionOptions: true,

  /**
   * Repositions to the optionsArea to position the focusedOption right on top
   * of the selected one.
   *
   * @param selectComponent {object} - the Select component itself accessible with `this`
   */
  repositionOptionsArea (selectComponent) {
    const optionsAreaNode = React.findDOMNode(selectComponent.refs.optionsArea);
    const optionsAreaStyle = window.getComputedStyle(optionsAreaNode, null);
    const optionsAreaWidth = parseFloat(optionsAreaStyle.getPropertyValue('width'));

    // In case of a placeholder no option is focused on initially
    let option, optionIndex;

    if (selectComponent.state.selectedValue) {
      optionIndex = findIndexOfSelectedOption(selectComponent);
    } else {
      optionIndex = 0;
    }
    option = optionsAreaNode.children[optionIndex];

    const optionsAreaHeight = parseFloat(optionsAreaStyle.getPropertyValue('height'));
    const optionsAreaTopBorderWidth = parseFloat(optionsAreaStyle.getPropertyValue('border-top-width'));

    // In order to work with legacy browsers the second paramter for pseudoClass
    // has to be provided http://caniuse.com/#feat=getcomputedstyle
    const optionStyle = window.getComputedStyle(option.children[0], null);
    const optionPaddingTop = parseFloat(optionStyle.getPropertyValue('padding-top'));
    const optionPaddingLeft = parseFloat(optionStyle.getPropertyValue('padding-top'));

    const selectedOptionWrapperNode = React.findDOMNode(selectComponent.refs.selectedOptionWrapper);
    const selectedOptionWrapperStyle = window.getComputedStyle(selectedOptionWrapperNode, null);
    const selectedOptionWrapperPaddingTop = parseFloat(selectedOptionWrapperStyle.getPropertyValue('padding-top'));
    const selectedOptionWrapperPaddingLeft = parseFloat(selectedOptionWrapperStyle.getPropertyValue('padding-top'));

    const newTop = option.offsetTop + optionPaddingTop - selectedOptionWrapperPaddingTop + optionsAreaTopBorderWidth;
    const newLeft = option.offsetLeft + optionPaddingLeft;

    // Top positioning
    if (optionsAreaHeight < optionsAreaNode.scrollHeight) {
      if(newTop + optionsAreaHeight > optionsAreaNode.scrollHeight) {
        // In case scrolling is not enough the box needs to be moved more to
        // the top to match the same position.
        const maxScrollTop = optionsAreaNode.scrollHeight - optionsAreaHeight;
        optionsAreaNode.scrollTop = maxScrollTop;
        optionsAreaNode.style.top = `-${newTop - maxScrollTop}px`;
      } else {
        // In case it's the first entry scrolling is not used to respect the
        // optionsArea's paddingTop.
        if (optionIndex === 0) {
          optionsAreaNode.scrollTop = 0;
          optionsAreaNode.style.top = `-${newTop}px`;
        } else {
          optionsAreaNode.scrollTop = newTop;
        }
      }
    } else {
      optionsAreaNode.style.top = `-${newTop}px`;
    }

    // Left positioning
    optionsAreaNode.style.left = `-${newLeft}px`;

    // Increasing the width
    //
    // Pro:
    // - It gives a option in the optionsArea the same width
    // as in the selectedOptionWrapper.
    // - There is space to keep the text of the option on the exact same pixel
    // when opening. The optionsArea is symetric in relation to the
    // selectedOptionWrapper.
    //
    // Con:
    // - Adding the padding could cause issue with design as it gets wider than
    // the original field.
    optionsAreaNode.style.width = `${optionsAreaWidth + newLeft * 2}px`;
  }
};

/**
 * Returns the index of the entry with a certain value from the component's
 * children.
 *
 * The index search includes separator & option components.
 */
const findIndexOfSelectedOption = (component) => {
  const filterFunction = (child) => (isComponentTypeOf('Option', child) || isComponentTypeOf('Separator', child));
  return findIndex(filter(component.props.children, filterFunction), (element) => {
    return element.props.value === component.state.selectedValue;
  });
};

export default selectConfig;
