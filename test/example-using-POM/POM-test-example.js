const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const HomePage = require('./pages/homePage');
// const ResultsPage = require('./pages/resultsPage');
// var cred = require('../testData.js')
// var loginSelector = require('../selectorLoginPage.js');



describe.only('AD Puppeteer with Page Object Model', () => {

    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://192.168.108.77:2020/');        
        // await page.goto(process.env.URLL);        
    });

    afterEach(async () => {
        await browser.close();
    });

    it('should have the correct page title', async () => {
        const homePage = new HomePage(page);
        expect(await homePage.getTitle()).to.eql('Authorised Dealer, Authorised Dealers Buyers & Suppliers List');
    });

    it('user should login with valid credential', async () => {
        const homePage1 = new HomePage(page);
        expect(await homePage1.login()).to.eql('Welcome To Authorised Dealer Admin');
    });

    it('user should login with invalid credential', async () => {
        const homePage2 = new HomePage(page);
        expect(await homePage2.loginFail()).to.equal('Username and Password did not match.');
    });  

});
