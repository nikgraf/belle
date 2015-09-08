import belle from 'belle';
import bootstrap3Theme from './bootstrap-3';
import belleWithClassicFocusTheme from './belle-with-classic-focus';

/**
 * Get a URL query parameter from the hash.
 */
export function getParameterByName(name) {
  const parsedName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + parsedName + '=([^&#]*)');
  const results = regex.exec(location.hash);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Updates the deepest structure while keeping the original reference of the outer objects.
 */
function updateStructure(targetObject, object) {
  for (const componentName in object) {
    if (object.hasOwnProperty(componentName)) {
      for (const styleName in object[componentName]) {
        if (object[componentName].hasOwnProperty(styleName)) {
          targetObject[componentName][styleName] = object[componentName][styleName];
        }
      }
    }
  }
}

function initializeTheme() {
  const theme = getParameterByName('theme');

  if (theme === 'bootstrap') {
    updateStructure(belle.style, bootstrap3Theme.style);
    updateStructure(belle.config, bootstrap3Theme.config);
  } else if (theme === 'belle-with-default-focus') {
    updateStructure(belle.style, belleWithClassicFocusTheme.style);
    updateStructure(belle.config, belleWithClassicFocusTheme.config);
  }
}

export default initializeTheme;
