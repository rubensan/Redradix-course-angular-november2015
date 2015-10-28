'use strict';

describe('GNAs - Loading diferent GNA modules Scenario from navbar', function() {

	beforeEach(function() {
		browser.get('/');
	});
	
	it('should load correctly the modules when clicking at the navbar links ', function() {

		// navbar directive is present 
		var navbar = element(by.id('navbar'));
		expect(navbar.isDisplayed()).toBe(true);
		
		// At start, manual  module is the one active'
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/manual');
		// 2 Checking NAVBAR link as ACTIVE
		var manualModuleLink = element.all(by.css('li')).get(0);
		expect(manualModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO UILogic  ///////////
		var UILogicModuleLink = element.all(by.css('li')).get(1);
		UILogicModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/uilogic');
		// 2 Checking NAVBAR link as ACTIVE
		expect(UILogicModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO Directive  ///////////
		var directiveModuleLink = element.all(by.css('li')).get(2);
		directiveModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/directive');
		// 2 Checking NAVBAR link as ACTIVE
		expect(directiveModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO Service  ///////////
		var serviceModuleLink = element.all(by.css('li')).get(3);
		serviceModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/service');
		// 2 Checking NAVBAR link as ACTIVE
		expect(serviceModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT

		///////////// CLICK TO Api  ///////////
		var apiModuleLink = element.all(by.css('li')).get(4);
		apiModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/api');
		// 2 Checking NAVBAR link as ACTIVE
		expect(apiModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT
	});

});

