const { assert } = require(chai);
const { advancetimeAndBlock } = require('./truffle_test_helper');

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
        assert.notStrictEquial(address, '')
    })
})