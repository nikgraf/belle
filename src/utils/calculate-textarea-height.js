import { canUseDOM } from 'react/lib/ExecutionEnvironment';

let hiddenTextarea;
const computedStyleCache = {};
const hiddenTextareaStyle = 'height:0;visibility:hidden;overflow:hidden;position:absolute;z-index:-1000;top:0;right:0';

/**
 * Returns an object containing the computed style and the combined vertical padding.
 *
 * This style is returned as string to be applied as attribute of an element.
 */
function calculateStyling(node) {
  const reactId = node.getAttribute('data-reactid');

  // calculate the computed style only once it's not in the cache
  if (!computedStyleCache[reactId]) {
    // In order to work with legacy browsers the second paramter for pseudoClass
    // has to be provided http://caniuse.com/#feat=getcomputedstyle
    const computedStyle = window.getComputedStyle(node, null);
    let verticalPadding = 0;
    const stylesToCopy = [
      'line-height', 'padding-top', 'padding-bottom', 'font-size',
      'font-weight', 'font-family', 'width', 'padding-left', 'padding-right',
      'border-width', 'box-sizing'
    ];

    // for a textarea with border-box, it's not necessary to subtract the padding
    if (computedStyle.getPropertyValue('box-sizing') !== 'border-box' &&
        computedStyle.getPropertyValue('-moz-box-sizing') !== 'border-box' &&
        computedStyle.getPropertyValue('-webkit-box-sizing') !== 'border-box') {
      verticalPadding = (
        parseFloat(computedStyle.getPropertyValue('padding-bottom')) +
        parseFloat(computedStyle.getPropertyValue('padding-top'))
      );
    }

    // store the style & vertical padding inside the cache
    computedStyleCache[reactId] = {
      style: stylesToCopy.map(styleName => `${styleName}:${computedStyle.getPropertyValue(styleName)}`).join(';'),
      verticalPadding: verticalPadding
    };
  }

  return computedStyleCache[reactId];
}

/**
 * Returns the height of the textare as if all the content would be visible.
 *
 * In order to improve the performance a hidden textarea is added to the DOM
 * and used for further caluculations. In addition the styling of each textarea
 * is cached to improve performance.
 */
export default function(textareaElement, textareaValue) {
  if (!canUseDOM) { return 0; }

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
    hiddenTextarea.setAttribute('class', 'belle-input-helper');
  }

  const {style, verticalPadding} = calculateStyling(textareaElement);

  hiddenTextarea.setAttribute('style', `${style};${hiddenTextareaStyle}`);

  hiddenTextarea.value = textareaValue ? textareaValue : 'dummy';

  return (hiddenTextarea.scrollHeight - verticalPadding);
}
