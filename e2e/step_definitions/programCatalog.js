'use strict';

const {
    defineSupportCode
} = require('cucumber');
const ProgramCatalog = require('../page_objects/programCatalog');

defineSupportCode(({
    Given,
    When,
    Then,
    setDefaultTimeout
}) => {
    setDefaultTimeout(GLOBAL_TIMEOUT);

    Given(/^the Udacity course page is opened$/, () => {
        return ProgramCatalog.load();
    });

    When(/^the course count is remembered$/, () => {
        return ProgramCatalog.countCourses().then(count => {
            ProgramCatalog.courseCount = count;
        });
    });

    When(/^the search bar is cleared$/, () => {
        ProgramCatalog.clearSearchBar();
        return browser.sleep(5000);
    });

    When(/^the "([^"].*)" dropdown is clicked$/, text => {
        return ProgramCatalog.openFilterDropdown(text);
    });

    When(/^the X "([^"].*)" filter closer button is clicked$/, text => {
        return ProgramCatalog.clickOnFilterCloser(text);
    });

    Then(/^the Udacity logo should be (visible|hidden)$/, visibility => {
        return expect(ProgramCatalog.isLogoVisible()).to.eventually.equal(visibility === 'visible');
    });

    Then(/^the search bar should be (visible|hidden)$/, visibility => {
        return expect(ProgramCatalog.isSearchBarVisible()).to.eventually.equal(visibility === 'visible');
    });

    Then(/^the placeholder text should be "([^"].*)"$/, text => {
        return expect(ProgramCatalog.getPlaceholderText()).to.eventually.equal(text);
    });

    Then(/^the text "([^"].*)" is typed into the search bar$/, text => {
        return ProgramCatalog.typeIntoSearchBar(text);
    });

    Then(/^the course count should (be less than|equal to) the remembered course count$/, condition => {
        browser.sleep(2000);
        switch (condition) {
            case "be less than":
                return expect(ProgramCatalog.countCourses()).to.be.eventually.at.most(ProgramCatalog.courseCount);
            case "equal to":
                return expect(ProgramCatalog.countCourses()).to.eventually.equal(ProgramCatalog.courseCount);
        }
    });

    Then(/^the selected filters field should contain the following filters:$/, filters => {
        let filtersArray = filters.raw()[0];
        return expect(ProgramCatalog.selectedFilters()).to.eventually.eql(filtersArray);
    });

    Then(/^the course count should equal to the result counter$/, () => {
        return ProgramCatalog.countCourses().then(courseCount => {
            return expect(ProgramCatalog.getResultCounter()).to.eventually.equal(courseCount);
        });
    });

    Then(/^the "([^"].*)" skill level is selected$/, text => {
        ProgramCatalog.clickOnFilter(text);
        return browser.sleep(3000);
    });

    Then(/^the (.*) course level logo should be visible for all cards$/, text => {
        return expect(ProgramCatalog.areCourseLevelLogosCorrect(text)).to.eventually.be.true;
    });

    Then(/^the "([^"].*)" course level label should be visible for all cards$/, level => {
        return expect(ProgramCatalog.isCorrectCourseLevelTextVisible(level)).to.eventually.be.true;
    });

    Then(/^the "([^"].*)" card's details expander is clicked$/, text => {
        return ProgramCatalog.clickOnTheExpander(text);
    });

    Then(/^the "([^"].*)" card's short description should be visible$/, text => {
        return expect(ProgramCatalog.isShortDescriptionVisible(text)).to.eventually.be.true;
    });

    Then(/^the "([^"].*)" card's short description is not an empty string$/, text => {
        return expect(ProgramCatalog.isShortDescriptionNotEmpty(text)).to.eventually.be.true;
    });

    Then(/^the "([^"].*)" card's 'LEARN MORE' button should be visible$/, text => {
        return expect(ProgramCatalog.isLearnMoreButtonVisible(text)).to.eventually.be.true;
    });

    Then(/^the "([^"].*)" card's title is clicked$/, text => {
        return ProgramCatalog.clickOnCardTitle(text);
    });

    Then(/^the opened page's title should be "([^"].*)"$/, text => {
        return expect(ProgramCatalog.getOpenedCourseTitleText(text)).to.eventually.equal(text);
    });

    Then(/^the "Results" label should not be visible$/, () => {
        return ProgramCatalog.isResultsLabelVisible();
    });
});