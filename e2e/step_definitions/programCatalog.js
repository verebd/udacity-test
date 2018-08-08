'use strict';

const {defineSupportCode} = require('cucumber');
const ProgramCatalog = require('../page_objects/programCatalog');

defineSupportCode(({Given, When, Then, setDefaultTimeout}) => {
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

    Then(/^the placeholder should be visible$/, () => {

    });

    Then(/^the placeholder text should be 'Search'$/, () => {

    });

    When(/^the course count is remembered$/, () => {
        return ProgramCatalog.allCourse();
    });
});