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

module.exports.buildLinkSelector = buildLinkSelector;