Feature: Browsing the Udacity program catalog
    As a user
    I want to search in the Udacity program catalog
    so that I can choose the proper course

Scenario: 1. The user should be able to use the search bar
  Given the Udacity course page is opened
   Then the Udacity logo should be visible
    And the search bar should be visible
    And the placeholder text should be "Search"

   When the course count is remembered
    And the text "android" is typed into the search bar
   Then the course count should be less than the remembered course count

   When the search bar is cleared
   Then the course count should equal to the remembered course count
   
Scenario: 2. The card details and the filter fields should work correctly
  Given the Udacity course page is opened
    
   When the course count is remembered
    And the text "javascript" is typed into the search bar
   Then the selected filters field should contain the following filters:
        |javascript|
    And the course count should equal to the result counter

   When the X filter closing button is clicked
   Then the "Results" label should not be visible
    And the characters should be removed automatically from the search bar
    And the course count should equal to the remembered course count


Scenario: 3. The card details, dropdown filter and filter fields should work correctly
  Given the Udacity course page is opened

   When the "Select Program Details" dropdown is clicked
    And the "Intermediate" skill level is selected
   Then the selected filters field should contain the following filters:
        |Intermediate|
    And the intermediate course level logo should be visible for all cards
    And the "Intermediate" course level label should be visible for all cards

Scenario: 4. The LEARN MORE button and short description should be visible
  Given the Udacity course page is opened

   When the details expander is clicked
   Then short description should be visible
    And 'LEARN MORE' button should be visible

Scenario: 5. Alternative course opening should work correctly
  Given the Udacity course page is opened

   When the text "javascript" is typed into the search bar
    And the "Intro To JavaScript" course card is clicked
   Then the opened page's title should be "Intro To JavaScript"