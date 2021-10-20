const { assert } = require('chai');
const { advanceTimeAndBlock } = require('./truffle_test_helper');

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
        return contract.enterRace({
            from: accounts[1], 
            value: web3.utils.toWei('0.1', 'ether')
        }).should.be.rejected;
    })

    it("should not allow voting without session", async function() {
        return contract.castVote(accounts[1], 
            {from: accounts[0]})
            .should.be.rejected;
    })

    it("should allow new start date", async function() {
        let hash = await web3.eth.getBlock('latest')
        let blockTime = hash.timestamp
        return contract.setVoteStartDate(blockTime + 30).should.be.fulfilled;
    })

    it("should not allow a new start date while in preSession", async function() {
        let hash = await web3.eth.getBlock('latest')
        let blockTime = hash.timestamp
        return contract.setVoteStartDate(blockTime).should.be.rejected;
    })

    it("should allow entrance to race", async function() {
        let result = new Promise((resolve, reject) =>{
            //timeout only necessary in mined blockchain testing
            //ganache requires manual time advancing
            setTimeout(() => {
                resolve(contract.enterRace({
                    from: accounts[1], 
                    value: web3.utils.toWei('0.1', 'ether')
                }).should.be.fulfilled)
            }, 20 * 1000)
        })
        return await result;
    })

    it ("should reject candidate entrance while in session" , async function() {
        //should be commented out on mined blockchain
        //ganache requires manual time advancing
        await advanceTimeAndBlock(40)
        let result = new Promise((resolve, reject) =>{
            //timeout only necessary in mined blockchain testing
            setTimeout(() => {
                resolve(contract.enterRace({
                    from: accounts[2], 
                    value: web3.utils.toWei('0.1', 'ether')
                }).should.be.rejected)
            }, 20 * 1000)
        })
        return await result;
    })
});
