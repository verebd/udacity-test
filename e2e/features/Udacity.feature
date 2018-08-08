Feature: Browsing the Udacity program catalog
    As a user
    I want to search in the Udacity program catalog
    so that I can choose the proper course

Scenario: 1. The user should be able to use the search bar
  Given the Udacity course page is opened
   Then the Udacity logo should be visible
    And the search bar should be visible
    And the placeholder should be visible
    And the placeholder text should be 'Search'

   When the course count is remembered
    And the text 'android' is typed into the search bar
   Then the course count should be less than the remembered course count
    And the placeholder should be hidden

   When the search bar is cleared
   Then the placeholder text should be visible