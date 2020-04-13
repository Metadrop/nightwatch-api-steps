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
 * It consider that the input is in the dame container
 * than the label.
 *
 * @param {*} type
 * @param {*} label
 */
function buildInputSelector(label, type) {
    let type_filter = '';
    if (typeof type === 'string') {
        type_filter = '[@type="' + type + '"]';
    }
    return selector = {selector: '//div[label[contains(text(), "' + label + '")]]/*[self::input' + type_filter + ' or self::select]', locateStrategy: 'xpath'};
}


module.exports.buildLinkSelector = buildLinkSelector;
module.exports.buildTableRowSelector = buildTableRowSelector;
module.exports.buildInputSelector = buildInputSelector;
module.exports.buildButtonSelector = buildButtonSelector;
