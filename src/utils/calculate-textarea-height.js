import { canUseDOM } from 'react/lib/ExecutionEnvironment';

let hiddenTextarea;
const computedStyleCache = {};
const hiddenTextareaStyle = `
  height:0;
  visibility:hidden;
  overflow:hidden;
  position:absolute;
  z-index:-1000;
  top:0;
  right:0
`;

const stylesToCopy = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-transform',
  'width',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];

/**
 * Returns an object containing the computed style and the combined vertical
 * padding size, combined vertical border size and box-sizing value.
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

    const boxSizing = (
      computedStyle.getPropertyValue('box-sizing') ||
      computedStyle.getPropertyValue('-moz-box-sizing') ||
      computedStyle.getPropertyValue('-webkit-box-sizing')
    );

    let verticalPaddingSize = 0;
    verticalPaddingSize = (
      parseFloat(computedStyle.getPropertyValue('padding-bottom')) +
      parseFloat(computedStyle.getPropertyValue('padding-top'))
    );

    let verticalBorderSize = 0;
    verticalBorderSize = (
      parseFloat(computedStyle.getPropertyValue('border-bottom-width')) +
      parseFloat(computedStyle.getPropertyValue('border-top-width'))
    );

    const sizingStyle = stylesToCopy
      .map(styleName => `${styleName}:${computedStyle.getPropertyValue(styleName)}`)
      .join(';');

    // store the style, vertical padding size, vertical border size and
    // boxSizing inside the cache
    computedStyleCache[reactId] = {
      style: sizingStyle,
      verticalPaddingSize,
      verticalBorderSize,
      boxSizing
    };
  }

  return computedStyleCache[reactId];
}

/**
 * Returns an object containing height of the textare as if all the content
 * would be visible. The minHeight & maxHeight are in the object as well and are
 * based on minRows & maxRows.
 *
 * In order to improve the performance a hidden textarea is added to the DOM
 * and used for further caluculations. In addition the styling of each textarea
 * is cached to improve performance.
 */
export default function calculateTextareaHeight(textareaElement, textareaValue, minRows = null, maxRows = null, minHeight = null, maxHeight = null) {
  if (!canUseDOM) { return 0; }

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
    hiddenTextarea.setAttribute('class', 'belle-input-helper');
  }

  const {style, verticalPaddingSize, verticalBorderSize, boxSizing} = calculateStyling(textareaElement);

  hiddenTextarea.setAttribute('style', `${style};${hiddenTextareaStyle}`);
  // IE will return a height of 0 in case the textare is empty. To prevent
  // reducing the size to 0 we simply use a dummy text.
  hiddenTextarea.value = textareaValue ? textareaValue : '-';

  let calculatedMinHeight;
  let calculatedMaxHeight;
  let height = hiddenTextarea.scrollHeight;

  // for a textarea with border-box, the border width has to be added while
  // for content-box it's necessary to subtract the padding
  if (boxSizing === 'border-box') {
    // border-box: content + padding + border
    height = height + verticalBorderSize;
  } else if (boxSizing === 'content-box') {
    // content-box: content
    height = height - verticalPaddingSize;
  }

  if (minRows !== null && minHeight === null ||
      maxRows !== null && maxHeight === null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = '-';
    const singleRowHeight = hiddenTextarea.scrollHeight - verticalPaddingSize;

    if (minRows !== null && minHeight === null) {
      calculatedMinHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        calculatedMinHeight = calculatedMinHeight + verticalPaddingSize + verticalBorderSize;
      }
    }
    if (maxRows !== null && maxHeight === null) {
      calculatedMaxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        calculatedMaxHeight = calculatedMaxHeight + verticalPaddingSize + verticalBorderSize;
      }
    }
  }

  const finalMinHeight = minHeight || calculatedMinHeight;
  if (finalMinHeight) {
    height = Math.max(finalMinHeight, height);
  }

  const finalMaxHeight = maxHeight || calculatedMaxHeight;
  if (finalMaxHeight) {
    height = Math.min(finalMaxHeight, height);
  }

  return height;
}
