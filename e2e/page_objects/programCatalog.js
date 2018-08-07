'use strict';

class ProgramCatalog {

    constructor() {
        this.logo = element(by.css('.header__navbar--logo'));
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

}

module.exports = new ProgramCatalog();