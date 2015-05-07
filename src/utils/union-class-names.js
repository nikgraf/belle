"use strict";

import {union} from 'underscore';

/**
 * Returns a string containing all classes without duplicates.
 *
 * Originally taken from https://github.com/rackt/react-autocomplete/blob/master/lib/union-class-names.js
 */
export default function unionClassNames(existingClasses, additionClasses) {
  if (!existingClasses && !additionClasses) return '';
  if (!existingClasses) return additionClasses;
  if (!additionClasses) return existingClasses;
  return union(existingClasses.split(' '), additionClasses.split(' ')).join(' ');
}
