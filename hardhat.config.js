/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 31337,
      // The chain ID number used by Hardhat Network's blockchain. Default value: 31337.
    },
  },
};
