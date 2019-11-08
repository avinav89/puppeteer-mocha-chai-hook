
var cred = require('/home/avinav/Desktop/puppeteer-mocha-chai-master/test/testData.js')
var loginSelector = require('/home/avinav/Desktop/puppeteer-mocha-chai-master/test/selectorLoginPage.js');

class HomePage {
    
    constructor(page) {
        this.page = page;
    };

    async getTitle() {
        return this.page.title();
    };

    async login() {
        try {
            await this.page.click(loginSelector.SGNBTN_Selector);
            await this.page.waitFor(2000);
            await this.page.type(loginSelector.USR_Selector, cred.USERNAME);
            await this.page.type(loginSelector.PWD_Selector, cred.PASSWORD);
            await this.page.click(loginSelector.SUBMIT_Selector);
            await this.page.waitFor(2000);
            await this.page.waitForXPath(loginSelector.ASSERTION_Selector);
            console.log('Process.ENV.URL')
            var [element_new] = await this.page.$x(loginSelector.ASSERTION_Selector);
            var text = await (await element_new.getProperty('textContent')).jsonValue();
            return (text);
        } catch (e) {
            await this.page.screenshot({ path: 'buddy-screenshotPTMe.png' });
            console.log('ERROR', e);
        }
        // finally {
        //     // await page.screenshot({ path:'buddy-screenshotPTM.png'});
        //     await browser.close();
        // }

    };

    async loginFail() {
        await this.page.click(loginSelector.SGNBTN_Selector);
        await this.page.waitFor(2000);
        await this.page.type(loginSelector.USR_Selector, cred.INVAL_USERNAME);
        await this.page.type(loginSelector.PWD_Selector, cred.INVAL_PASSWORD);
        await this.page.click(loginSelector.SUBMIT_Selector);
        this.page.waitFor(2000);
        await this.page.waitForXPath('// div[text()="Username and Password did not match."]');
        var [element_new] = await this.page.$x('// div[text()="Username and Password did not match."]');
        var text1 = await (await element_new.getProperty('textContent')).jsonValue();
        return (text1);

    };
}

module.exports = HomePage;