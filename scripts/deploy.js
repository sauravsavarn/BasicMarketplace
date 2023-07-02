// this will allow to deploy the BasicMarketplace solidity files to be deployed to the
// Hardhat local network.
const hrdhat = require("hardhat");

async function main() {
    // get the contract we targeting to deploy to local hardhat network.
    const BasicMarketplace = await hrdhat.ethers.getContractFactory("BasicMarketplace");

    //once we have the contract, then proceed to deploy
    const basicmarketplace = await BasicMarketplace.deploy();

    //once we run above command, that we needs to wait for it to be deployed
    await basicmarketplace.deployed();

    console.log("BasicMarketplace deployed to : " + basicmarketplace.address); //JUST LOG THE ADDRESS WHERE THIS BasicMarket place is deployed.    
}

// then lets execute this main() Function.
/* This simple script allows us to deploy the basic marketplace solidity contract 
   onto the hardhat local network. */
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });