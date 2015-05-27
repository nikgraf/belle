"use strict";

/**
 * Returns true if the provided property is a component of the provided name.
 *
 * @example
 * // Checks if the component is an Autocomplete
 * isComponentType('Autocomplete', this.props.children[0]);
 */
export default function isComponentOfType(componentName, reactElement) {
  return reactElement._isReactElement &&
    reactElement.type &&
    reactElement.type.name === componentName;
}
