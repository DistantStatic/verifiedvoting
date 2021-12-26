const { assert } = require('chai');
const { advanceTimeAndBlock } = require('./truffle_test_helper');

const VeriVote = artifacts.require('VeriVote');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract("VeriVote", function(accounts) {
    let contract;

    before(async () => {
        contract = await VeriVote.deployed();
    });

    it("should deploy", async function() {
        const address = contract.address;
        assert.notStrictEqual(address, '')
        assert.notStrictEqual(address, null)
        assert.notStrictEqual(address, undefined)
        assert.notStrictEqual(address, 0x0)
    })

    it("should not allow to enter race on deploy", async () => {
        return contract.enterRace({
            from: accounts[1],
            value: web3.utils.toWei('0.1', "ether")
        }).should.be.rejected;
    })
    
    it("should not allow voting without session", async () =>{
        return contract.vote(accounts[1], {
            from: accounts[0]
        }).should.be.rejected;
    })

    it("should allow creation of election", async () => {
        const hash = await web3.eth.getBlock('latest');
        const blockTime = hash.timestamp;
        return contract.createNewElection(
            blockTime + 100, 
            (1000 * 60 * 60 * 24 * 7)
            ).should.be.fulfilled;
    })

    it("should allow entrace to election once created", async () => {
        return contract.enterRace({
            from: accounts[1],
            value: web3.utils.toWei("0.1", "ether")
        }).should.be.fulfilled;
    })

    it("should not allow double entrance", async () => {
        return contract.enterRace({
            from: accounts[1],
            value: web3.utils.toWei("0.1", "ether")
        }).should.be.rejected;
    })

    it("should not allow voiting before session", async () => {
        return contract.vote(
            accounts[1],
        {
            from: accounts[0]
        }).should.be.rejected;
    })

    it("should not allow new election while election is ongoing", async () => {
        await advanceTimeAndBlock(150);
        const hash = await web3.eth.getBlock('latest');
        const blockTime = hash.timestamp;
        return contract.createNewElection(
            blockTime + 100, 
            (1000 * 60 * 60 * 24 * 7)
            ).should.be.rejected;
    })

    it("should allow vote once session starts", async () => {
        await advanceTimeAndBlock(150);
        return contract.vote(
            accounts[1],
            {
                from: accounts[0]
            }
        ).should.be.fulfilled;
    })

    it("should not allow double voting", async () => {
        return contract.vote(
            accounts[1],
            {
                from: accounts[0]
            }
        ).should.be.rejected;
    })

    it("should not allow voting after session", async () => {
        await advanceTimeAndBlock(1000 * 60 * 60 * 24 * 7)
        return contract.vote(
            accounts[1],
            {
                from: accounts[3]
            }
        ).should.be.rejected;
    })

    it("should  not allow entrance after session", async () => {
        return contract.enterRace({
            from: accounts[4],
            value: web3.utils.toWei("0.1", "ether")
        }).should.be.rejected;
    })

})
