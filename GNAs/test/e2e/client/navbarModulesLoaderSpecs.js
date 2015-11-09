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
		// 3 Checking NAVBAR link as ACTIVE
		expect(manualModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 4 Checking that the module is actually PRESENT AT THE CONTENT
		expect(element(by.css('input[ng-model="randomNumber"]')).isPresent()).toBe(true);

		///////////// CLICK TO UILogic  ///////////
		var UILogicModuleLink = element.all(by.css('li')).get(4);
		UILogicModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/uilogic');
		// 2 Checking NAVBAR link as ACTIVE
		expect(UILogicModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT
		expect(element(by.xpath('//div[@ng-controller="gnaUIlogicCtrl"]')).isPresent()).toBe(true);

		///////////// CLICK TO Directive  ///////////
		var directiveModuleLink = element.all(by.css('li')).get(3);
		directiveModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/directive');
		// 2 Checking NAVBAR link as ACTIVE
		expect(directiveModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT
		expect(element(by.xpath('//div[@gna-directive-module-directive]')).isPresent()).toBe(true);
		expect(element(by.xpath('//div[@mod="25"]')).isPresent()).toBe(true);
		expect(element(by.xpath('//div[@interval="1000"]')).isPresent()).toBe(true);
  
		///////////// CLICK TO Service  ///////////
		var serviceModuleLink = element.all(by.css('li')).get(2);
		serviceModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/service');
		// 2 Checking NAVBAR link as ACTIVE
		expect(serviceModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT
		expect(element(by.xpath('//div[@gna-directive-module-service]')).isPresent()).toBe(true);
		expect(element(by.xpath('//div[@mod="10000"]')).isPresent()).toBe(true);
		expect(element(by.xpath('//div[@interval="800"]')).isPresent()).toBe(true);

		///////////// CLICK TO Api  ///////////
		var apiModuleLink = element.all(by.css('li')).get(1);
		apiModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/api');
		// 2 Checking NAVBAR link as ACTIVE
		expect(apiModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT
		expect(element(by.xpath('//div[@gna-api]')).isPresent()).toBe(true);
		expect(element(by.xpath('//div[@mod="2235"]')).isPresent()).toBe(true);
		expect(element(by.xpath('//div[@interval="500"]')).isPresent()).toBe(true);

		///////////// CLICK TO Promise  ///////////
		var promiseModuleLink = element.all(by.css('li')).get(0);
		promiseModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/promise');
		// 2 Checking NAVBAR link as ACTIVE
		expect(promiseModuleLink.element(by.css('.link-active')).isPresent()).toBe(true);
		// 3 Checking that the module is actually PRESENT AT THE CONTENT
		expect(element(by.xpath('//div[@gna-promise]')).isPresent()).toBe(true);
		expect(element(by.xpath('//div[@mod="224435"]')).isPresent()).toBe(true);
		expect(element(by.xpath('//div[@interval="1500"]')).isPresent()).toBe(true);
	});

});

