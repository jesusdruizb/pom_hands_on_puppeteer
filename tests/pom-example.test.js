const puppeteer = require('puppeteer')
const expect = require('chai').expect

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
        const url = 'https://www.saucedemo.com/'
        const username = 'locked_out_user'
        const password = 'secret_sauce'
        page = await browser.newPage()

        // act
        await page.goto(url)
        await page.waitForSelector('#user-name')
        await page.type('#user-name',username)
        await page.waitForSelector('#password')
        await page.type('#password',password)
        await page.waitForSelector('#login-button')
        await page.click('#login-button')

        //assert
        const errorMessageElement = await page.waitForSelector('#login_button_container > div > form > div.error-message-container.error > h3')
        const errorMessage = await (await errorMessageElement.getProperty('textContent')).jsonValue()
        expect(errorMessage).to.eq('Epic sadface: Sorry, this user has been locked out.')


    })

    it('Saucedemo Login page test - Standard user', async function(){
        // arrange
        const url = 'https://www.saucedemo.com/'
        const username = 'standard_user'
        const password = 'secret_sauce'
        page = await browser.newPage()

        // act
        await page.goto(url)
        await page.waitForSelector('#user-name')
        await page.type('#user-name',username)
        await page.waitForSelector('#password')
        await page.type('#password',password)
        await page.waitForSelector('#login-button')
        await page.click('#login-button')

        //assert
        const titleElement = await page.waitForSelector('.title')
        const title = await (await titleElement.getProperty('textContent')).jsonValue()
        expect(title).to.eq('Products')


    })

    it('Saucedemo Cart - Navigate to Cart', async function(){
        // arrange
        const url = 'https://www.saucedemo.com/'
        const username = 'standard_user'
        const password = 'secret_sauce'
        page = await browser.newPage()

        // act
        await page.goto(url)
        await page.waitForSelector('#user-name')
        await page.type('#user-name',username)
        await page.waitForSelector('#password')
        await page.type('#password',password)
        await page.waitForSelector('#login-button')
        await page.click('#login-button')
        await page.waitForSelector('.shopping_cart_link')
        await page.click('.shopping_cart_link')

        //assert
        const titleElement = await page.waitForSelector('.title')
        const title = await (await titleElement.getProperty('textContent')).jsonValue()
        expect(title).to.eq('Products')


    })

})