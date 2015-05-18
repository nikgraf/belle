"use strict";

/* jslint browser: true */

import {map, each, flatten} from 'underscore';
import CSSPropertyOperations from '../vendor/react/lib/CSSPropertyOperations';

let styleElement,
    styleStorage = {};

/**
 * Injects a style tag and adds the passed style for the provided pseudoClass.
 */
export default function (styleId, style, pseudoClass, disabled) {
  injectStyleTag();
  updateStore(styleId, style, pseudoClass, disabled);
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
    updateStore(style.id, style.style, style.pseudoClass, style.disabled);
  });
  updateStyling();
}

/**
 * Removes all pseudoClass styles based on the provided styleId.
 */
export function removeStyle(styleId) {
  delete styleStorage[styleId];
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
function updateStore(styleId, style, pseudoClass, disabled) {
  styleStorage[styleId] = styleStorage[styleId] || {};
  if (disabled) {
    styleStorage[styleId].disabledPseudoClasses = styleStorage[styleId].disabledPseudoClasses || {};
    styleStorage[styleId].disabledPseudoClasses[pseudoClass] = style;
  } else {
    styleStorage[styleId].pseudoClasses = styleStorage[styleId].pseudoClasses || {};
    styleStorage[styleId].pseudoClasses[pseudoClass] = style;
  }
}

/**
 * Constructs all the stored styles & injects them to the DOM.
 */

function createMarkupOnPseudoClass(pseudoClasses, id, disabled) {
  return map(pseudoClasses, (style, pseudoClass) => {
    const styleString = CSSPropertyOperations.createMarkupForStyles(style);
    const styleWithImportant = styleString.replace(/;/g, ' !important;');

    return disabled ?
        `.${id}[disabled]:${pseudoClass} {${styleWithImportant}}`:
        `.${id}:${pseudoClass} {${styleWithImportant}}`;
  });
}

function updateStyling() {
  const styles = map(styleStorage, (storageEntry, id) => {
    console.log(storageEntry);
    let pseudoClassesArray = [];

    if(storageEntry.pseudoClasses) {
      pseudoClassesArray.push(createMarkupOnPseudoClass(storageEntry.pseudoClasses, id, false));
    }
    if(storageEntry.disabledPseudoClasses) {
      pseudoClassesArray.push(createMarkupOnPseudoClass(storageEntry.disabledPseudoClasses, id, true));
    }

    return pseudoClassesArray;
  });
  styleElement.innerHTML = flatten(styles).join(' ');
}
