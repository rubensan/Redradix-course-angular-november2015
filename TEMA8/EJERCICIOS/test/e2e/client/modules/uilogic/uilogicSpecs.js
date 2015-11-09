describe('Module Uilogic', function() {

	beforeEach(function() {
		browser.get('/');
	});
	
	it('start the generation of random numbers when clicking on the button', function() {

		// navbar directive is present 
		var navbar = element(by.id('navbar'));
		expect(navbar.isDisplayed()).toBe(true);

		///////////// CLICK TO UILogic  ///////////
		var UILogicModuleLink = element.all(by.css('li')).get(1);
		UILogicModuleLink.click();
		browser.sleep(1000);
		// 1 Checking URL
		expect(browser.getCurrentUrl()).toContain('/uilogic');
		// 2 Checking that the module is actually PRESENT AT THE CONTENT
		expect(element(by.xpath('//div[@ng-controller="gnaUIlogicCtrl"]')).isPresent()).toBe(true);
		// 3 Getting the current random number and checking that there isn´t --> it´s equal '-'
		expect(element(by.css('.number')).isPresent()).toBe(true);
		// 4 Getting the button that generates a random number and clicking it
		var randomNumber = element(by.binding('randomNumber'));
		expect(randomNumber.getText()).toBe('-');
		// 5 Clicking on the button must generate a new number ('-' is a number now)
		var button = element(by.css('.btn'));
		button.click();
		browser.sleep(3000);
		randomNumber = element(by.binding('randomNumber'));
		expect(randomNumber.getText()).not.toBe('-');		
	});

});

