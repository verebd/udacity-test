'use strict';

class ProgramCatalog {

    constructor() {
        this.logo = element(by.css('.header__navbar--logo'));
        this.searchBar = element(by.css('.col-sm-12'));
        this.courseCount = null;
    }

    load() {
        browser.get('https://eu.udacity.com/courses/all');
        return this.waitForLogo();
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

    allCourse() {
        browser.sleep(5000).then(element.all(by.css('.card__inner')).count().then(function(count) {
            this.courseCount = count;
            console.log(this.courseCount);
          }));
    }
}

module.exports = new ProgramCatalog();