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

    Then(/^the Udacity logo should be (visible|hidden)$/, visibility => {
        return expect(ProgramCatalog.isLogoVisible()).to.eventually.equal(visibility === 'visible');
    });

    Then(/^the search bar should be (visible|hidden)$/, visibility => {
        return expect(ProgramCatalog.isSearchBarVisible()).to.eventually.equal(visibility === 'visible');
    });

    Then(/^the placeholder text should be "(.*)"$/, text => {
        return expect(ProgramCatalog.getPlaceholderText()).to.eventually.equal(text);
    });

    When(/^the course count is remembered$/, () => {
        return ProgramCatalog.countCourses().then(count => {
            ProgramCatalog.courseCount = count;
        });
    });

    Then(/^the text "(.*)" is typed into the search bar$/, text => {
        return ProgramCatalog.typeIntoSearchBar(text);
    });

    Then(/^the course count should be (less than|equal to) the remembered course count$/, condition => {
        browser.sleep(2000);
        switch (condition) {
            case "less than": 
                return expect(ProgramCatalog.countCourses()).to.be.eventually.at.most(ProgramCatalog.courseCount);
            case "equal to":
                return expect(ProgramCatalog.countCourses()).to.eventually.equal(ProgramCatalog.courseCount);
        }
    });

    When(/^the search bar is cleared$/, () => {
        ProgramCatalog.clearSearchBar();
        return browser.sleep(5000);
    });
});