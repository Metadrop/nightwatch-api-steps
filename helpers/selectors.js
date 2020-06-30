/**
 * Utility functions to work with links.
 */

/**
 * Build a xpath link selector.
 *
 * @param {*} locator
 */
function buildLinkSelector(locator) {
    let xpath = '//a[contains(text(), "' + locator + '")'
    + ' or contains(@alt,"' + locator + '") or @id="' + locator + '"'
    + ' or contains(@title, "' + locator + '")]';
    return {selector: xpath, locateStrategy: 'xpath'};
}

/**
 * Build a xpath table row selector.
 *
 * @param {*} locator
 */
function buildTableRowSelector(text) {
    let xpath = '//table//tr/*[self::th or self::td][contains(*, "' + text + '") or contains(text(), "' + text + '")] ';
    return {selector: xpath, locateStrategy: 'xpath'};
}

/**
 * Build the selector for a button or input of type submit.
 *
 * @param {string} locator
 *   Button's text, or input's value.
 */
function buildButtonSelector(locator) {
    const query_conditions = '@name= "' + locator +'"'
    + ' or @id= "' + locator +'" or ';
    let xpath = '//button[' + query_conditions + 'normalize-space(text())="' + locator + '"]'
    + ' | //input[@type="submit" or @type="button"][' + query_conditions + '@value="'+ locator + '"]';
    return {selector: xpath, locateStrategy: 'xpath'};
}

/**
 * Build input selector for a specific type.
 *
 * It considers that the input is in the same container
 * than the label.
 *
 * It also searches for ID attribute directly on the input.
 *
 * @param {*} type
 * @param {*} label
 * @param {*} region
 */
function buildInputSelector(label, type, region) {
    let type_filter = '';

    if (typeof type === 'string') {
      type_filter = '[@type="' + type + '"]';
    }

    let xpath = '//*[self::input or self::select or self::textarea]' + type_filter + '[@id=//*[contains(text(), "' + label + '")]/ancestor::label/@for | //label[contains(text(), "' + label + '")]/@for]'
      + ' | //*[self::input' + type_filter + ' or self::select or self::textarea][@id="' + label + '"]';

    if (typeof region === 'string') {
      xpath = region + xpath;
    }

    return selector = {selector: xpath, locateStrategy: 'xpath'};
}

module.exports.buildLinkSelector = buildLinkSelector;
module.exports.buildTableRowSelector = buildTableRowSelector;
module.exports.buildInputSelector = buildInputSelector;
module.exports.buildButtonSelector = buildButtonSelector;
