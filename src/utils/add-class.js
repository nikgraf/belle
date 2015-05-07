"use strict";

/**
 * Returns a string with the new class added & prevents having duplicated classes.
 *
 * Originally taken from https://github.com/rackt/react-autocomplete/blob/master/lib/add-class.js
 */
export default function addClass(existingClasses, newClass) {
  if (!existingClasses) return newClass;
  if (existingClasses.indexOf(newClass) > -1) return existingClasses;
  return existingClasses + ' ' + newClass;
}
