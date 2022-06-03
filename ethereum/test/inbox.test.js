const Inbox = artifacts.require('Inbox')

contract('Inbox', accounts => {

    it('getMessage', async() => {

        const instance = await Inbox.deployed();
        const message = await instance.getMessage.call();
        assert.equal(message, 'Hi');

    });

    it('setMessage', async() => {

        const instance = await Inbox.deployed();
        await instance.setMessage('Hi Sebas', {from: accounts[0]});
        const message = await instance.getMessage.call();
        assert.equal(message, 'Hi Sebas')

    });

    it('setMessage should not change var message', async  () => {

        try {
            const instance = await Inbox.deployed();
            await instance.setMessage('just Owner', {from: accounts[0]});
        } catch (e) {
            assert.equal(e.reason , 'solo el Owner puede cambiar el mensaje.');
        }

    })

})
