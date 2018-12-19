var ScoreV1 = artifacts.require("ScoreV1");
var ScoreV2 = artifacts.require("ScoreV2");
var Proxy = artifacts.require("Proxy");


module.exports = function(deployer) {
  deployer.deploy(ScoreV1);
  deployer.deploy(ScoreV2);
  deployer.deploy(Proxy);
};
