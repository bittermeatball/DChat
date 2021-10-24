const UserLocation = artifacts.require('UserLocation');

module.exports = function (deployer) {
  deployer.deploy(UserLocation);
};
