Feature: As a developer I want to test form behaviours so I ensure my website quality.

@form
Scenario: Fill a form
    Given I go to "/"
    And I view the site on a "mobile_portrait" device
    Then I fill in "Textfield" with "Textfield value"
    And I check "Checkbox not checked"
    And I uncheck "Checkbox checked"
    And I select "Option 2" from "Select"
    And I select radio button "Radio button"
    And I attach the file "640x480.png" to "File"
