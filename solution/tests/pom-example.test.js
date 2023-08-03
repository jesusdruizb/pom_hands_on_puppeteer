const puppeteer = require('puppeteer')
const expect = require('chai').expect
const LoginPage = require('../common/pages/saucedemo/login-page')
const InventoryPage = require('../common/pages/saucedemo/inventory-page')
const CartPage = require('../common/pages/saucedemo/cart-page')

describe('POM Hands on', async function(){

    let browser = null
    let page = null

    beforeEach(async function(){
        browser = await puppeteer.launch({
            timeout: 15000,
            headless: false,
            defaultViewport: {
                width: 1024,
                height: 768},
            slowMo: 50,
        })
    })

    afterEach(async function(){
        await browser.close()
    })

    it('Saucedemo Login page test - Locked-out user', async function(){
        // arrange
        const username = 'locked_out_user'
        const password = 'secret_sauce'
        page = await browser.newPage()
        const loginPage = new LoginPage(page)
        const errorMessageLocator = await loginPage.getErrorMessageLocator()
        // act
        await loginPage.visit()
        await loginPage.login(username,password)

        //assert
        const errorMessageElement = await page.waitForSelector(errorMessageLocator)
        const errorMessage = await (await errorMessageElement.getProperty('textContent')).jsonValue()
        expect(errorMessage).to.eq('Epic sadface: Sorry, this user has been locked out.')


    })

    it('Saucedemo Login page test - Standard user', async function(){
        // arrange
        const url = 'https://www.saucedemo.com/'
        const username = 'standard_user'
        const password = 'secret_sauce'
        page = await browser.newPage()
        const loginPage = new LoginPage(page)
        const inventoryPage = new InventoryPage()
        const inventoryTitleLocator = await inventoryPage.getTitleLocator()
        // act
        await loginPage.visit()
        await loginPage.login(username,password)

        //assert
        const titleElement = await page.waitForSelector(inventoryTitleLocator)
        const title = await (await titleElement.getProperty('textContent')).jsonValue()
        expect(title).to.eq('Products')


    })

    it('Saucedemo Cart - Navigate to Cart', async function(){
        // arrange
        const url = 'https://www.saucedemo.com/'
        const username = 'standard_user'
        const password = 'secret_sauce'
        page = await browser.newPage()
        const loginPage = new LoginPage(page)
        const inventoryPage = new InventoryPage(page)
        const cartPage = new CartPage()
        const cartTitleLocator = await cartPage.getTitleLocator()
        // act
        await loginPage.visit()
        await loginPage.login(username,password)
        await inventoryPage.clickShoppingCartLink()

        //assert
        const titleElement = await page.waitForSelector(cartTitleLocator)
        const title = await (await titleElement.getProperty('textContent')).jsonValue()
        expect(title).to.eq('Products')

    })

})