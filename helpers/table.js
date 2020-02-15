/**
 * Utility functions to work with tables.
 */

/**
 * Build a xpath table row selector.
 *
 * @param {*} locator 
 */
function buildTableRowSelector(text) {
    let xpath = '//table//tr[contains(*, "' + text + '")]';
    return {selector: xpath, locateStrategy: 'xpath'};
}

module.exports.buildTableRowSelector = buildTableRowSelector;