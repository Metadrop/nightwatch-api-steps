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
    let xpath = '//table//tr[contains(*, "' + text + '")]';
    return {selector: xpath, locateStrategy: 'xpath'};
}

module.exports.buildLinkSelector = buildLinkSelector;
module.exports.buildTableRowSelector = buildTableRowSelector;