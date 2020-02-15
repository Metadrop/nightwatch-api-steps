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
  let selector = {selector: '//label[contains(text(), "' + label + '")]/../select//option[text()="' + option + '"]', locateStrategy: 'xpath'};
  client.assert.visible(selector, 'Exists a option named "' + label + '" in a selector with "' + label + '" label.');
  return client.click(selector, "Clicks the option");
});

/**
 * Check a checkbox with a specific label.
 */
When('I check {string}', (label) => {
  let selector = {selector: '//label[contains(text(), "' + label + '")]/../input[@type="checkbox"]', locateStrategy: 'xpath'};
  client.assert.visible(selector);
  client.expect.element(selector).to.have.property('checked').not.equals(true);
  return client.click(selector);
});

/**
 * Uncheck a checkbox with a specific label.
 */
When('I uncheck {string}', (label) => {
  let selector = {selector: '//label[contains(text(), "' + label + '")]/../input[@type="checkbox"]', locateStrategy: 'xpath'};
  client.assert.visible(selector);
  client.expect.element(selector).to.have.property('checked').equals(true);
  return client.click(selector);
});

/**
 * Select radio button with a specific label.
 */
When('I select radio button {string}', (label) => {
  let selector = {selector: '//label[contains(text(), "' + label + '")]/../input[@type="radio"]', locateStrategy: 'xpath'};
  client.assert.visible(selector);
  client.expect.element(selector).to.have.property('checked').not.equals(true);
  return client.click(selector);
});

/**
 * Fills a textfield with a specific label.
 */
When('I fill in {string} with {string}', (locator, value) => {
  let selector = {selector: '//label[contains(text(), "' + locator + '")]/../*[self::input or self::select]', locateStrategy: 'xpath'};
  client.assert.visible(selector);
  return client.setValue(selector, value);
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
  let path = client.globals.getScreenshotRealPath(client.globals.generateScreenshotFileName());
  console.log('Screenshot saved at ' + path);
  return client.saveScreenshot(path);
});

/**
 * Take a screenshot with a specific name.
 */
When('I take a screenshot {string}', (name) => {
  let path = client.globals.getScreenshotRealPath(name + '.png');
  console.log('Screenshot saved at ' + path);
  return client.saveScreenshot(path);
});

When('I view the site on a {string} device', (device) => {
  console.log(typeof(client.globals.devices[device].width));
  if (typeof(client.globals.devices) != undefined && typeof(client.globals.devices[device]) === 'object'
    && typeof(client.globals.devices[device].width) === "number"
    && typeof(client.globals.devices[device].height) === "number") {
    let dimensions = client.globals.devices[device];
    return client.resizeWindow(dimensions.width, dimensions.height);
  }
  else {
    throw new Error('Device ' + device + ' not found.');
  }
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
  const query_conditions = '@name= "' + locator +'"'
  + ' or @title= "' + locator +'"'
  + ' or @alt= "' + locator +'"'
  + ' or @id= "' + locator +'" or ';
  let xpath = '//button[' + query_conditions + 'normalize-space(text())="' + locator + '"]'
  + ' | //input[@type="submit" or @type="button"][' + query_conditions + '@value="'+ locator + '"]';
  let selector = {selector: xpath, locateStrategy: 'xpath'};
  client.assert.visible(selector);
  return client.click(selector);
});
/**
* Assert there is a specific checkbox selected.
*/
Then(/^the checkbox "([^"]*)" (?:is|should be) checked$/, (label) => {
  let selector = {selector: '//label[contains(text(), "' + label + '")]/../input[@type="checkbox"]', locateStrategy: 'xpath'};
  client.assert.visible(selector);
  return client.expect.element(selector).to.have.property('checked').equals(true);
});

/**
* Assert there is a specific checkbox not selected.
*/
Then(/^the "([^"]*)" checkbox should (?:be unchecked|not be checked)$/, (label) => {
  let selector = {selector: '//label[contains(text(), "' + label + '")]/../input[@type="checkbox"]', locateStrategy: 'xpath'};
  client.assert.visible(selector);
  return client.expect.element(selector).to.have.property('checked').not.equals(true);
});

/**
 * Check a specific field contains a text.
 */
Then('the {string} field should contain {string}', (label, text) => {
  let selector = {selector: '//label[contains(text(), "' + label + '")]/../*[self::input or self::select]', locateStrategy: 'xpath'};
  client.assert.visible(selector);
  return client.expect.element(selector).value.does.contain(text);
});

/**
 * CHeck a field does not contain a specific test.
 */
Then('the {string} field should not contain {string}', (label, text) => {
  let selector = {selector: '//label[contains(text(), "' + label + '")]/../*[self::input or self::select]', locateStrategy: 'xpath'};
  client.assert.visible(selector);
  return client.expect.element(selector).value.does.not.contain(text);
});
