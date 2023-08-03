

class LoginPage{

    usernameInputSelector = '#user-name'
    passwordInputSelector = '#password'
    loginButtonSelector = '#login-button'
    ownUrl = 'https://www.saucedemo.com/'
    errorMessageLocator = '#login_button_container > div > form > div.error-message-container.error > h3'
    constructor(page) {
        this.page = page
    }

    async getErrorMessageLocator(){
        return this.errorMessageLocator
    }

    async visit(){
        await this.page.goto(this.ownUrl)
    }
    async typeUsername(text){
        await this.page.waitForSelector(this.usernameInputSelector)
        await this.page.type(this.usernameInputSelector,text)
    }

    async typePassword(text){
        await this.page.waitForSelector(this.passwordInputSelector)
        await this.page.type(this.passwordInputSelector,text)
    }

    async clickLoginButton(){
        await this.page.waitForSelector(this.loginButtonSelector)
        await this.page.click(this.loginButtonSelector)
    }

    async login(username, password){
        await this.typeUsername(username)
        await this.typePassword(password)
        await this.clickLoginButton()
    }
}

module.exports=LoginPage