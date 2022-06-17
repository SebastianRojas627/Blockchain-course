const TestAmazon = artifacts.require('TestAmazon')

contract('TestAmazon', accounts => {

    let instance;
    beforeEach("deploys a contract", async ()=> {
        instance = await TestAmazon.new();
    })

    it("only store owner can add products", async ()=> {
        
        try {
            await instance.addProduct(({id: 1, name: "er", stock: 5, price: 20}), {from: accounts[9]});
            assert(false)
        } catch (e) {
            assert.equal("You are not the owner.", e.reason)
        }
    })

    it("product name must be longer than 5 characters", async ()=> {
        
        try {
            await instance.addProduct(({id: 1, name: "er", stock: 5, price: 20}), {from: accounts[0]});
            assert(false)
        } catch (e) {
            assert.equal("The name of product should be more than 5.", e.reason)
        }
    })

    it("only store owner can add products", async ()=> {
        
        try {
            await instance.addQuantity(1, 7, {from: accounts[9]});
            assert(false)
        } catch (e) {
            assert.equal("You are not the owner.", e.reason)
        }
    })

    it("only store owner close the store", async ()=> {
        
        try {
            await instance.closeOrOpenAmazon(false, {from: accounts[9]});
            assert(false)
        } catch (e) {
            assert.equal("You are not the owner.", e.reason)
        }
    })

    it("only store owner can withdraw store income to his personal account", async ()=> {
        
        try {
            await instance.withdrawAllMoney({from: accounts[9]});
            assert(false)
        } catch (e) {
            assert.equal("You are not the owner.", e.reason)
        }
    })

    it("purchases cannot exceed the available quantity of the product", async () => {

        await instance.addProduct(({id: 1, name: "polera", stock: 5, price: 2}), {from: accounts[0]});
        await instance.addQuantity(1, 7, {from: accounts[0]});
        await instance.buyProduct(1, 2, {from: accounts[8], value: web3.utils.toWei("5", "ether")});
        const product = await instance.listProducts.call(1);
        assert(product.stock >= 4)
    })

    it("client gets a discount of 1 when buying more than 10 items", async () => {

        await instance.addProduct(({id: 4, name: "polera", stock: 20, price: 1}), {from: accounts[0]});
        await instance.addQuantity(4, 20, {from: accounts[0]});
        const initialBalance = await web3.eth.getBalance(accounts[7])
        await instance.buyProduct(4, 11, {from: accounts[7], value: web3.utils.toWei("11", "ether")});
        const finalBalance = await web3.eth.getBalance(accounts[7])
        const product = await instance.listProducts.call(4);
        const totalBalance = finalBalance + (product.price * 10)
        assert.equal(initialBalance, totalBalance)
    })

})
