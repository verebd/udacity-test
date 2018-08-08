'use strict';

class ProgramCatalog {

    constructor() {
        this.logo = element(by.css('.header__navbar--logo'));
        this.searchBar = element(by.css('.adjust-search input'));
        this.courseCount = null;
    }

    load() {
        browser.get('https://eu.udacity.com/courses/all');
        this.waitForLogo();
        return browser.sleep(3000);
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
        return element.all(by.css('.card__inner')).count();
    }

    getPlaceholderText() {
        return this.searchBar.getAttribute('placeholder');
    }
}

module.exports = new ProgramCatalog();