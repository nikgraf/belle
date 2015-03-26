"use strict";

/* jslint browser: true */

import {map, each, flatten} from 'underscore';
import CSSPropertyOperations from '../vendor/react/lib/CSSPropertyOperations';

let styleElement,
    styleStorage = {};

/**
 * Injects a style tag and adds the passed style for the provided pseudoClass.
 */
export default function (styleId, style, pseudoClass) {
  injectStyleTag();
  updateStore(styleId, style, pseudoClass);
  updateStyling();
}

/**
 * Injects a style tag and adds multiple passed styles.
 *
 * By using this function someone can make sure the DOM is updated only once.
 *
 * Usage:
 * ```
 * const styles = [
 *   {
 *     id: 'style-0.0.2',
 *     style: { color: '#F00' },
 *     pseudoClass: 'hover'
 *   }
 * ];
 * injectStyles(styles);
 * ```
 */
export function injectStyles(styles) {
  injectStyleTag();
  each(styles, (style) => {
    updateStore(style.id, style.style, style.pseudoClass);
  });
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
 * Injects the provided style into the styleStore.
 */
function injectStyleTag() {
  if (!styleElement) {
    styleElement = document.createElement('style');
    document.body.appendChild(styleElement);
    styleElement.setAttribute('class', 'belle-style');
  }
}

/**
 * Injects the provided style into the styleStore.
 */
function updateStore(styleId, style, pseudoClass) {
  styleStorage[styleId] = styleStorage[styleId] || {};
  styleStorage[styleId][pseudoClass] = style;
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
