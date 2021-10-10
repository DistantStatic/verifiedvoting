const { assert } = require('chai');

const VerifiedVoting = artifacts.require("VerifiedVoting");

require('chai')
    .use(require('chai-as-promised'))
    .should()
    
contract("VerifiedVoting", function (accounts) {
    let contract;

    before(async() => {
        contract = await VerifiedVoting.deployed();
    });

    it("should deploy", async function() {
        const address = contract.address
        assert.notStrictEqual(address, '')
        assert.notStrictEqual(address, null)
        assert.notStrictEqual(address, undefined)
        assert.notStrictEqual(address, 0x0)
    });

    it("should not allow to enter race on deploy", async function() {
        contract.enterRace({
            from: accounts[1], 
            value: web3.utils.toWei('0.1', 'ether')
        }).should.be.rejected;
    })

    it("should not allow voting without session", async function() {
        contract.castVote(accounts[1], 
            {from: accounts[0]})
            .should.be.rejected;
    })
});
