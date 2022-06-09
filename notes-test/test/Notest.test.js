const Notes = artifacts.require("Notes");

contract("Notes", accounts=> {

    let instance;
    beforeEach("deploys a contract", async ()=> {
        instance = await Notes.new();
    })

    it("Evaluar", async ()=> {

        await instance.Evaluar("Marcos", 70, {from: accounts[0]});
        const id = web3.utils.keccak256("Marcos")
        const note = await instance.Notas.call(id);
        assert.equal(70, note)
    })

    it("only profesor can evaluate", async ()=> {

        try {
        await instance.Evaluar('77755N', 60, {from: accounts[1]});
        assert(false);
        } catch (e) {
            assert.equal('No tienes permisos para ejecutar esta funcion.', e.reason)
        }

    })

})