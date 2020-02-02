Feature: As a developer I want to test form behaviours so I ensure my website quality.

@form @sunnyday
Scenario: Fill a form
    Given I go to "/"
    And I view the site on a "mobile_portrait" device
    Then the "Textfield" field should not contain "Textfield value"
    When I fill in "Textfield" with "Textfield value"
    Then the "Textfield" field should contain "Textfield value"
    When I check "Checkbox not checked"
    Then the checkbox "Checkbox not checked" should be checked
    When I uncheck "Checkbox checked"
    Then the "Checkbox checked" checkbox should not be checked 
    And I select "Option 2" from "Select"
    And I select radio button "Radio button"
    And I attach the file "640x480.png" to "File"

@form @submit @button
Scenario: Press a <button>.
    Given I go to "/"
    Then I should not see "Confirm page"
    When I press "Button"
    Then I should see "Confirm page"
    And the url should contain "/confirm_page.html"

@form @submit @input-submit
Scenario: Press a submit input.
    Given I go to "/"
    Then I should not see "Confirm page"
    When I press "Button as input"
    Then I should see "Confirm page"
    And the url should contain "/confirm_page.html"
