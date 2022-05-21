var etherProfile = artifacts.require("./etherProfile.sol");

module.exports = function(deployer){
  deployer.deploy(etherProfile);
}
