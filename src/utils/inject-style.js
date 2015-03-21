"use strict";

/* jslint browser: true */

import {map, flatten} from 'underscore';
import CSSPropertyOperations from '../vendor/react/lib/CSSPropertyOperations';

let styleElement,
    styleStorage = {};

/**
 * Injects a style tag and adds the passed style for the provided pseudoClass.
 */
export default function (styleId, style, pseudoClass) {
  if (!styleElement) {
    styleElement = document.createElement('style');
    document.body.appendChild(styleElement);
    styleElement.setAttribute('class', 'belle-style');
  }

  styleStorage[styleId] = styleStorage[styleId] || {};
  styleStorage[styleId][pseudoClass] = style;

  updateStyling();
}

/**
 * Removes all pseudoClass styles based on the provided styleId.
 */
export function removeStyle(styleId) {
  styleStorage[styleId] = undefined;
  updateStyling();
}

/**
 * Constructs all the stored styles & injects them to the DOM.
 */
function updateStyling() {
  const styles = map(styleStorage, (pseudoClasses, id) => {
    return map(pseudoClasses, (style, pseudoClass) => {
      const styleString = CSSPropertyOperations.createMarkupForStyles(style);
      const styleWithImportant = styleString.replace(/;/g, ' !important;');
      return `.${id}:${pseudoClass} {${styleWithImportant}}`;
    });
  });
  styleElement.innerHTML = flatten(styles).join(' ');
}
