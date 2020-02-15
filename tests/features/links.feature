Feature: As a developer I want to check links are clickable and present in the page.

@links
Scenario: Do operations with links.
    Given I go to homepage
    Then I should see the link "Secondary page"
    When I click "Secondary page"
    Then I should see "Nightwatch tests secondary page"
    And I should not see the link "Secondary page"
