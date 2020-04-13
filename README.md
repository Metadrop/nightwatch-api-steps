# Nightwatch API steps

[![npm version](https://badge.fury.io/js/nightwatch-api-steps.svg)](https://badge.fury.io/js/nightwatch-api-steps)
[![Build Status](https://travis-ci.org/Metadrop/nightwatch-api-steps.svg?branch=master)](https://travis-ci.org/Metadrop/nightwatch-api-steps)
[![github](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/Metadrop/nightwatch-api-steps)

Generic steps that can be used from [nightwatch api](https://github.com/mucsi96/nightwatch-api).

## Installation

Install it with
`npm install nightwatch-api-steps`

### Usage
To add it to your nightwatch api [nightwatch api](https://github.com/mucsi96/nightwatch-api) configuration, follow these steps:

- Add these lines to your nightwatch.json file:

```
  "custom_commands_path": [
    ...
    "node_modules/nightwatch-api-steps/commands"
  ],
```

- In your cucumber run command, append this parameter: `--require node_modules/nightwatch-api-steps/step-definitions/`

## Steps

| Step                                                              | What it does   | Usage   |  Alternatives |
|-------------------------------------------------------------------|---|---|---|
| **I go to :path** | Goes to an specific path | I go to "/user/login" | I am at :path; I am on :path , I visit :path |
| **I go to homepage** | Goes to homepage, defined in base_url | I go to homepage | I am at :path; I am on :path , I visit :path |
| **I should see :text**                                        |  Check that the current page contains a text |  I should see "Page title" |   |
| **I should see :text**                                        |  Check that the current page does not contains contains a text |  I should not see "Cookies banner" |   |
| **I wait :seconds seconds**                                        |  Wait for seconds. |  I wait 5 seconds  |    |
| **The url should contain :text**                                        |  Check the url contains some specific text |  The url should contain "/contact"  |   |
| **I click :text**                                        |  Click a element with a specific text. |  I click "Who we are"  |  I follow :text  |
| **I should see the link :text**                                        |  Assert there exists a link with a specific text. |  I should see the link "Shop"  |    |
| **I should not see the link :text**                                        |  Assert there not exists a link with a specific text. |  I should not see the link "Shop"  |    |
| **I should see :text in the table row**                                        |  Assert there exists a table row with a specific text. |  I should see "Status" in the table row  |    |
| **I should not see :text in the table row**                                        |  Assert there not exists a table row with a specific text. |  I should not see "Status" in the table row  |    |
| **I select :option from :selector**                                        |  Select a specific option from a <select> input. |  I select "10€" from "Price"  |    |
| **I check :option**                                        |  Check a specific option from a checkbox. |  I check "I accept terms and conditions."  |    |
| **I uncheck :option**                                        |  Uncheck a specific option from a checkbox. |  I uncheck "I want to receive commercial emails from Company."  |    |
| **I select radio button :option**                                        |  Check a radio button.  |  I select radio button "Female"  |
| **I fill in :label with :value**                                        |  Fill an input with any value.  |  I fill in "Name" with "John"  |
| **I attach the file :filename to :input**                            |  Attach a file to a <input type="file"> | I attach the file "pool_profile_picture.png" to "Profile"  |   |
| **I take a screenshot**                                               |  Takes an screenshot | I take a screenshot  |   |   |
| **I take a screenshot with name :filename**                                               |  Take a screenshot, and save it with a specific name | I take a screenshot with name "products_page.png"  |   |
| **I view the site on a :device device**                              |  Resize the window to the dimensions of the specified device | I view the site on a "Iphone X" device  |   |
| **I should see the button :text**                        |  Assert a button with the specified content is visible.  | I should see the button "Pay now" |   |
| **I should not see the button :text**                        |  Assert a button with the specified content is not visible.  | I should not see the button "Cancel" |   |
| **I press the button**                | Press a button.  | I press the button "Pay now"  |   |
| **the checkbox :checkbox should be checked**               | Assert a specific checkbox is checked  | the checkbox "I accept terms and conditions" should be checked  | the checkbox :checkbox is checked  |   |
| **the checkbox :checkbox should not be checked**               | Assert a specific checkbox is not checked  | the checkbox "I want to receive commercial emails from Company." should not be checked  | the checkbox :checkbox is unchecked  |   |
| **the :label field should contain :string**                        | Assert a input with a specific label contains a specific value | the "Name" field should contain "John"  |   |
| **the :label field should not contain :string**                        | Assert a input with a specific label does not ontains a specific value | the "Name" field should not contain "Doe"  |   |
| **I wait for AJAX to finish**                        | Wait a current XHR http request finishes | I wait for AJAX to finish  |   |
| **I wait for AJAX to finish at least :seconds seconds**                        | Wait a current XHR http request finishes during a specific number of seconds | I wait for AJAX to finish at least 5 seconds  |   |
| **I wait for :path AJAX request to finish**                        | Wait a XHR done to a specific URL finishes  |  I wait for "https://example.com/ajax" AJAX request to finish |   |
| **I wait for :path AJAX request to finish at least :seconds seconds**                        | Wait a current XHR http request to a specific path finishes during a specific number of seconds | I wait for "https://example.com/ajax" AJAX request to finish at least 5 seconds  |   | 

Sponsored by [Metadrop](http://metadrop.net/).
