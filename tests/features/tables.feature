Feature: As a developer I want to check the tables has proper data.

@tables
Scenario: Check a table has content in a row.
    Given I go to homepage
    Then I should see "Table row 1" in the table row
    Then I should not see "Unexistent table row" in the table row
