const BasicMarketplace = artifacts.require("BasicMarketplace");

module.exports = function(deployer) {
  deployer.deploy(BasicMarketplace);
};
