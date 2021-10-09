const VerifiedVoting = artifacts.require('VerifiedVoting');

module.exports = function(deployer) {
    deployer.deploy(VerifiedVoting);
}