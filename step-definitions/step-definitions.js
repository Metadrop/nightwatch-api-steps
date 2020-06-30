const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

const selectors = require('../helpers/selectors');

/** Visit path of the main url defined in .env */
Given(/^(?:I go to?|I am at?|I am on?|I visit) "([^"]*)"$/, (page) => {
  return client.goToUrl(client.globals.baseUrl + page);
});

/**
 * Visit homepage
 */
Given(/^(?:I go to?|I am at?|I am on?|I visit) homepage$/, () => {
  return client.goToUrl(client.globals.baseUrl);
});

/**
 * Assert there is an specific text in all the page.
 *
 * @TODO: regions!
 */
Then(/^I should see "([^"]*)"$/, (text) => {
  return client.assert.containsText('html', text)
});

/**
 * Assert there is not an specific text in all the page.
 *
 * @TODO: regions!
 */
Then(/^I should not see "([^"]*)"$/, (text) => {
  return client.assert.not.containsText('html', text)
});

/**
 * Wait for the needed seconds.
 */
Then('I wait for {int} seconds', async (seconds) => {
  return client.pause(seconds * 1000);
});

/**
 * @TODO
 */
Then(/^the url should contain "(.*)"$/, async (urlText) => {
  return client.expect.url().to.contain(urlText);
})

/**
 * Click specific element.
 */
When(/^(?:I click?|I follow?|) "([^"]*)"$/, (locator) => {
  return client.clickLink(locator);
})

/**
 * Assert link is visible.
 */
Then('I should see the link {string}', (locator) => {
  let selector = selectors.buildLinkSelector(locator);
  return client.assert.visible(selector);
})

/**
 * Assert link is not visible.
 */
Then('I should not see the link {string}', (locator) => {
  let selector = selectors.buildLinkSelector(locator);
  return client.expect.element(selector).to.be.not.present;
})

/**
 * Assert that a specific text is being seen in a specific table row.
 */
Then(/^I should see "([^"]*)" in the table row$/, (text) => {
  let xpath = selectors.buildTableRowSelector(text);
  return client.assert.visible(xpath);
});

/**
 * Assert that a specific text is not being seen in a specific table row.
 */
Then(/^I should not see "([^"]*)" in the table row$/, (text) => {
  let xpath = selectors.buildTableRowSelector(text);
  return client.expect.element(xpath).to.not.be.present;
});

/**
 * Select an option from a select list with a specific label.
 */
When('I select {string} from {string}', (option, label) => {
  let selector = {selector: '//div[label[contains(text(), "' + label + '")]]/select//option[text()="' + option + '"]', locateStrategy: 'xpath'};
  client.assert.visible(selector, 'Exists a option named "' + label + '" in a selector with "' + label + '" label.');
  return client.click(selector, "Clicks the option");
});

/**
 * Check a checkbox with a specific label.
 */
When('I check {string}', (label) => {
  return client.checkFormField(label, 'checkbox');
});

/**
 * Uncheck a checkbox with a specific label.
 */
When('I uncheck {string}', (label) => {
  return client.uncheck(label);
});

/**
 * Select radio button with a specific label.
 */
When('I select radio button {string}', (label) => {
  return client.checkFormField(label, 'radio');
});

/**
 * Fills a textfield with a specific label.
 */
When('I fill in {string} with {string}', (locator, value) => {
  return client.fillField(locator, value);
});

/**
 * Fills a textfield with a specific label in a region.
 */
When('I fill in {string} with {string} in {string} region', (locator, value, region) => {
  return client.fillField(locator, value, region);
});

/**
 * Attachs a file to a file field.
 */
When('I attach the file {string} to {string}', async (relative_path, locator) => {
  return client.attachFile(relative_path, locator);
});

/**
 * Take a screenshot with any name.
 */
When('I take a screenshot', () => {
  let date = new Date();
  let path = 'screenshot-'
  + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  + '-' + date.getHours() + date.getMinutes() + date.getSeconds() + '.png';
  return client.saveScreenshotInFolder(path);
});

/**
 * Take a screenshot with a specific name.
 */
When('I take a screenshot with name {string}', (name) => {
  return client.saveScreenshotInFolder(name + '.png');
});

When('I view the site on a {string} device', (device) => {
  return client.resizeWindowDevice(device);
});

/**
 * Assert there is a specific button in the page.
 */
Then(/^I (?:should )?see the button "([^"]*)"$/, (locator) => {
  let button = selectors.buildButtonSelector(locator);
  return client.assert.visible(button);
});
/**
 * Assert there is not a specific button in the page.
 */
Then(/^I should not see the button "([^"]*)"$/, (locator) => {
  let button = selectors.buildButtonSelector(locator);
  return client.expect.element(button).to.be.not.present;
});
/**
 * Press a button.
 */
When(/^(?:|I )?press (?:|the )?"([^"]*)"(?:| button)?$/, (locator) => {
  return client.pressButton(locator);
});
/**
* Assert there is a specific checkbox selected.
*/
Then(/^the checkbox "([^"]*)" (?:is|should be) checked$/, (label) => {
  let selector = selectors.buildInputSelector(label, 'checkbox');
  client.assert.visible(selector);
  return client.expect.element(selector).to.have.property('checked').equals(true);
});

/**
* Assert there is a specific checkbox not selected.
*/
Then(/^the "([^"]*)" checkbox should (?:be unchecked|not be checked)$/, (label) => {
  let selector = selectors.buildInputSelector(label, 'checkbox');
  client.assert.visible(selector);
  return client.expect.element(selector).to.have.property('checked').not.equals(true);
});

/**
 * Check a specific field contains a text.
 */
Then('the {string} field should contain {string}', (label, text) => {
  let selector = selectors.buildInputSelector(label);
  client.assert.visible(selector);
  return client.expect.element(selector).value.does.contain(text);
});

/**
 * CHeck a field does not contain a specific test.
 */
Then('the {string} field should not contain {string}', (label, text) => {
  let selector = selectors.buildInputSelector(label);
  client.assert.visible(selector);
  return client.expect.element(selector).value.does.not.contain(text);
});

/**
 * Wait for AJAX to finish.
 */
Then('I wait for AJAX to finish', async () => {
  await client.waitForAjax();
});

/**
 * Wait for AJAX to finish.
 */
Then('I wait for AJAX to finish at least {int} seconds', async (seconds) => {
  await client.waitForAjax(undefined, seconds);
});

/**
 * Wait for specific URL path to finish.
 */
Then('I wait for {string} AJAX request to finish', async (url) => {
  await client.waitForAjax(url);
});

/**
 * Wait for AJAX to finish.
 */
Then('I wait for {string} AJAX request to finish at least {int} seconds', async (url, seconds) => {
  await client.waitForAjax(url, seconds);
});
