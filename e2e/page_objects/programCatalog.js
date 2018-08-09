'use strict';

class ProgramCatalog {

    constructor() {
        this.logo = element(by.css('.header__navbar--logo'));
        this.searchBar = element(by.css('.adjust-search input'));
        this.card = element.all(by.css('.card__inner'));
        this.selectedFiltersField = element.all(by.css('.filters'));
        this.resultCounter = element(by.css('.result-count'));
        this.courseCount = null;
    }

    load() {
        browser.get('https://eu.udacity.com/courses/all');
        this.waitForLogo();
        return browser.sleep(5000);
    }

    isLogoVisible() {
        return this.logo.isVisible();
    }

    waitForLogo() {
        return browser.wait(() => {
            return this.isLogoVisible();
        });
    }

    isSearchBarVisible() {
        return this.searchBar.isVisible();
    }

    countCourses() {
        return this.card.count();
    }

    getPlaceholderText() {
        return this.searchBar.getAttribute('placeholder');
    }

    typeIntoSearchBar(text) {
        this.searchBar.sendKeys(text);
        return browser.sleep(3000);
    }

    clearSearchBar() {
        this.searchBar.sendKeys(protractor.Key.chord(protractor.Key.CONTROL,"a"));
        return this.searchBar.sendKeys(protractor.Key.BACK_SPACE);
    }

    selectedFilters() {
        return this.selectedFiltersField.getText();
    }

    getResultCounter() {
       return this.resultCounter.getText().then( text => {
           let regex = /Results? \((\d+)\)/;
           let token = text.match(regex);
           return +token[1];
       });
    }

}

module.exports = new ProgramCatalog();