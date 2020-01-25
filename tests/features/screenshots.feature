Feature: As a developer I want to do screenshots so I can check how the site looks like 

@screenshots
Scenario: Fill a form
    Given I go to "/"
    Then I should see "Nightwatch tests"
    And I take a screenshot
    And I take a screenshot "my-landing-page"
