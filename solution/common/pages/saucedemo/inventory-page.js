

class InventoryPage{

    titleLocator = '.title'
    shoppingCartLinkLocator = '.shopping_cart_link'
    constructor(page){
        this.page = page
    }

    async getTitleLocator(){
        return this.titleLocator
    }

    async clickShoppingCartLink(){
        this.page.waitForSelector(this.shoppingCartLinkLocator)
        this.page.click(this.shoppingCartLinkLocator)
    }
}

module.exports = InventoryPage