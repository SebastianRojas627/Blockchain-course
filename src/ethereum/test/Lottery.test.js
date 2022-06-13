const Lottery = artifacts.require("Lottery");

contract("Lottery", accounts=> {

    let instance;
    beforeEach("deploys a contract", async ()=> {
        instance = await Lottery.new();
    })

    it("allows one account to enter", async ()=> {

        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});

        const players = await instance.getPlayers.call();
        assert.equal(accounts[1], players[0])
        assert.equal(1, players.length)
    })

    it("allows multiple accounts to enter", async ()=> {

        await instance.enter({from: accounts[0], value: web3.utils.toWei("3", "ether")})
        await instance.enter({from: accounts[1], value: web3.utils.toWei("4", "ether")})
        await instance.enter({from: accounts[2], value: web3.utils.toWei("5", "ether")})

        const players = await instance.getPlayers.call()

        assert.equal(accounts[0], players[0])
        assert.equal(accounts[1], players[1])
        assert.equal(accounts[2], players[2])
        assert.equal(3, players.length);
    })

    it("require minimum amount of ether to enter", async ()=> {
        
        try {
            await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")})
            assert(true)
        } catch (e) {
            assert.equal("Minimum of 2.1 ether to enter", e.reason)
        }
    })

    it("only manager can pick a winner", async ()=> {
        
        try {
            await instance.pickWinner({from: accounts[1]});
            assert(true) //fuerza que el test falle, con true fuerza que el test pase
        } catch (e) {
            assert.equal("You are not the manager", e.reason)
        }
    })

    it("sends money to winner and resets the array", async() => {

        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const initialBalancePlayer = await web3.eth.getBalance(accounts[1])
        const initialBalanceLottery = await web3.eth.getBalance(instance.address)
        
        await instance.pickWinner({from: accounts[0]});
        const finalBalancePlayer = await web3.eth.getBalance(accounts[1])
        const total = parseFloat(initialBalanceLottery) + parseFloat(initialBalancePlayer);
        const players = await instance.getPlayers.call();

        assert.equal(finalBalancePlayer, total)
        assert.equal(0, players.length)

    })


})