/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");


const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;
module.exports = {
   solidity: "0.8.7",
   defaultNetwork: "rinkeby",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [PRIVATE_KEY]
      },
      rinkeby: {
         url: API_URL,
         accounts: [PRIVATE_KEY]
      },
      mainnet: {
         url: API_URL, // or any other JSON-RPC provider
         accounts: [PRIVATE_KEY]
     }
   },
   etherscan: {
      apiKey: ETHERSCAN_API_KEY, 
    },
}