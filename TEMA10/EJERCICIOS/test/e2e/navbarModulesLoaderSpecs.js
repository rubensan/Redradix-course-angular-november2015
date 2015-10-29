'use strict';

describe('GNAs - Loading diferent GNA modules Scenario from navbar', function() {

	beforeEach(function() {
		browser.get('/');
	});
	
	it('should load correctly the modules when clicking at the navbar links ', function() {

		// navbar directive is present 
		var navbar = element(by.id('navbar'));
		expect(navbar.isDisplayed()).toBe(true);
		
		// At start, promise  module is the one active'
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/promise');
		// 2 Going to Manual Module
		var manualModuleLink = element.all(by.css('li')).get(5);
		manualModuleLink.click();
		browser.sleep(1000);
		// 2 Checking NAVBAR link as ACTIVE
		expect(manualModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO UILogic  ///////////
		var UILogicModuleLink = element.all(by.css('li')).get(4);
		UILogicModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/uilogic');
		// 2 Checking NAVBAR link as ACTIVE
		expect(UILogicModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO Directive  ///////////
		var directiveModuleLink = element.all(by.css('li')).get(3);
		directiveModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/directive');
		// 2 Checking NAVBAR link as ACTIVE
		expect(directiveModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO Service  ///////////
		var serviceModuleLink = element.all(by.css('li')).get(2);
		serviceModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/service');
		// 2 Checking NAVBAR link as ACTIVE
		expect(serviceModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO Api  ///////////
		var apiModuleLink = element.all(by.css('li')).get(1);
		apiModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/api');
		// 2 Checking NAVBAR link as ACTIVE
		expect(apiModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO Promise  ///////////
		var promiseModuleLink = element.all(by.css('li')).get(0);
		promiseModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/promise');
		// 2 Checking NAVBAR link as ACTIVE
		expect(promiseModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT
	});

});

