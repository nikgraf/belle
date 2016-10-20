"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isComponentOfType;
/**
 * Returns true if the provided element is a component of the provided type.
 *
 * @param classType {ReactElement class} - the class of a React Element
 * @param reactElement {ReactElement} - any React Element (not a real DOM node)
 *
 * @example
 * // Checks if the component is an Autocomplete
 * isComponentType(Autocomplete, this.props.children[0]);
 */
function isComponentOfType(classType, reactElement) {
  return reactElement && reactElement.type === classType;
}