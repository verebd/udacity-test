'use strict';

class ProgramCatalog {

    constructor() {
        this.logo = element(by.css('.header__navbar--logo'));
        this.searchBar = element(by.css('.adjust-search input'));
        this.cards = element.all(by.css('.card__inner'));
        this.selectedFiltersField = element.all(by.css('.filters'));
        this.resultCounter = element(by.css('.result-count'));
        this.dropdownSelector = text => element(by.cssContainingText('.multiselect-dropdown', text));
        this.dropdownFilterSelector = text => element(by.cssContainingText('.multiselect-item-checkbox', text));
        this.courseLevelLogo = card => card.element(by.css('span > .course-level'));
        this.dropdownSelectorisVisible = element(by.css('.dropdown-list'));
        this.courseLevelText = card => card.element(by.css('.hidden-sm-down .capitalize'));
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
        return this.cards.count();
    }

    getPlaceholderText() {
        return this.searchBar.getAttribute('placeholder');
    }

    typeIntoSearchBar(text) {
        this.searchBar.sendKeys(text);
        return browser.sleep(3000);
    }

    clearSearchBar() {
        this.searchBar.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
        return this.searchBar.sendKeys(protractor.Key.BACK_SPACE);
    }

    selectedFilters() {
        return this.selectedFiltersField.getText();
    }

    getResultCounter() {
        return this.resultCounter.getText().then(text => {
            let regex = /Results? \((\d+)\)/;
            let token = text.match(regex);
            return +token[1];
        });
    }

    openFilterDropdown(text) {
        return this.dropdownSelectorisVisible.isVisible().then(value => {
            if (value === false){
                return this.dropdownSelector(text).click();
            }
            else {
                return false;
            }
        });
    }

    clickOnFilter(text) {
        return this.dropdownFilterSelector(text).click();
    }

    areCourseLevelLogosCorrect(level) {
        return this.cards.then(cards => {
            return Promise.all(cards.map(card => {
                return this.courseLevelLogo(card).getAttribute('class');
            })).then(results => {
                return results.every(result => {
                    return result.indexOf(level) > -1;
                });
            });
        });
    }

    correctCourseLevelTextIsVisible(level) {
        return this.cards.then(cards => {
            return Promise.all(cards.map(card => {
                return this.courseLevelText(card).getText();
            })).then(results => {
                return results.every(result => {
                    let isEqual = result.localeCompare(level);
                    if (isEqual === 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            });
        });
    }
}

module.exports = new ProgramCatalog();