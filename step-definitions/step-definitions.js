const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

/** Visit path of the main url defined in .env */
Given(/^(?:I go to?|I am at?|I am on?|I visit) "([^"]*)"$/, (page) => {
  return client.url(client.globals.baseUrl + page).waitForElementVisible('body', 1000);
});

/**
 * Visit homepage
 */
Given(/^(?:I go to?|I am at?|I am on?|I visit) homepage$/, () => {
  return client.url(client.globals.baseUrl).waitForElementVisible('body', 1000);
});

/**
 * Assert there is an specific text in all the page.
 *
 * @TODO: regions!
 */
Then(/^I should see "([^"]*)"$/, (title) => {
  return client.assert.containsText('html', title);
});

/**
 * Assert there is not an specific text in all the page.
 *
 * @TODO: regions!
 */
Then(/^I should not see "([^"]*)"$/, (title) => {
  return client.assert.not.containsText('html', title);
});

/**
 * Scroll to specific element with a offset, if defined.
 */
When(/^I scroll to "([^"]*)"(?: with "([^"]*)")?$/, (selector, offset) => {
  if (typeof offset === 'undefined') {
    offset = 0;
  }

  return client.moveToElement(selector, offset, offset);
});

/**
 * Wait for the needed seconds.
 */
Then('I wait for {int} seconds', async (seconds) => {
  return client.pause(seconds * 1000)
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
  const xpath = '//*[contains(text(), "' + locator + '")'
  + ' or contains(class, "' + locator + '")'
  + ' or contains(@alt,"' + locator + '") or @id="' + locator + '"'
  + ' or contains(@title, "' + locator + '")]';
  let selector = {selector: xpath, locateStrategy: 'xpath'};
  client.assert.visible(locator);
  return client.click(selector);
})

/**
 * Assert link is visible.
 */
Then('I should see the link {string}', (locator) => {
  const xpath = '//a[contains(text(), "' + locator + '")'
  + ' or contains(@href, "' + locator + '")'
  + ' or contains(@alt,"' + locator + '") or @id="' + locator + '"'
  + ' or contains(@title, "' + locator + '")]';
  let selector = {selector: xpath, locateStrategy: 'xpath'};
  return client.assert.visible(selector);
})

/**
 * Assert link is not visible.
 */
Then('I should not see the link {string}', (locator) => {
  const xpath = '//a[contains(text(), "' + locator + '")'
  + ' or contains(@href, "' + locator + '")'
  + ' or contains(@alt,"' + locator + '") or @id="' + locator + '"'
  + ' or contains(@title, "' + locator + '")]';
  let selector = {selector: xpath, locateStrategy: 'xpath'};
  return client.expect.element(selector).to.be.not.present;
})


/**
 * Assert that a specific text is being seen in a specific table row.
 */
Then(/^I should see "([^"]*)" in the table row$/, (text) => {
  return client.assert.containsText('table tr', text);
});

/**
 * Assert that a specific text is not being seen in a specific table row.
 */
Then(/^I should not see "([^"]*)" in the table row$/, (text) => {
  return client.assert.not.containsText('table tr', text);
});

/**
 * Click in a link of a table row.
 *
 * @TODO: make it works like 'I click {string}' step!
 */
Then('I click {string} in the table row', (selector) => {
  return client.click('xpath', '//a[contains(text(), "' + selector + '")]');
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
  let selector = {selector: '//label[contains(text(), "' + locator + '")]/../input[@type="file"]', locateStrategy: 'xpath'};
  let fullpath = client.globals.getFilesRealPath(relative_path);
  client.assert.visible(selector);
  return await client.setValue(selector, fullpath);
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
