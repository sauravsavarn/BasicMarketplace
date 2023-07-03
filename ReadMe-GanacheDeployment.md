Outline Steps, how to use GANACHE Truffle Suite to Deploy a Smart Contract in Solidity (Blockchain) - <br/>

Truffle Installation & Smart Contract COMPILATION & DEPLOYMENT TO GANACHE NETWORK:
    To install Truffle following steps to be followed:

    1. First, install truffle either as global or local to the project

        $> npm install -g truffle ====> to install truffle as in global space.

        $> npm install --save-dev truffle ===> to install truffle specific to project as dev dependencies.

    2. Secondly, create the truffle project
       NOTE: this is going to change the current project to truffle project whcih is going to create 
             below file structures as :

             Once this operation is completed, you'll now have a project structure with the following items:

                contracts/: Directory for Solidity contracts
                migrations/: Directory for scriptable deployment files
                test/: Directory for test files for testing your application and contracts
                truffle-config.js: Truffle configuration file

       a. When truffle is installed as in global space, then use below command to create the truffle
          project

          $> truffle init

          NOTE: above command will create the project structure as mentioned above, but all the directories
                will be empty. As Truffle removed the inclusion of .sol on truffle init since v5.5.27. Now truffle init generates the empty folder structure and the git files you noted.

          $> truffle unbox

          NOTE: above command will generate the project structure as mentioned above, with all the directories
                and included files inside it as below

            |
            |
            contracts
            |    |-- ConvertLib.sol
            |    |-- MetaCoin.sol
            |    |-- Migrations.sol
            |
            |
            migrations
            |    |-- 1_initial_migration.js
            |    |-- 2_deploy_contracts.js
            |
            |
            test
                |-- metacoin.js
                |-- TestMetacoin.sol


       b. When truffle is installed as in local space, then use below command to create the truffle
          project

          $> ./node_modules/.bin/truffle init

          NOTE: above command will create the project structure as mentioned above, but all the directories
                will be empty. As Truffle removed the inclusion of .sol on truffle init since v5.5.27. Now truffle init generates the empty folder structure and the git files you noted.

          $> ./node_modules/.bin/truffle unbox

          NOTE: above command will generate the project structure as mentioned above, with all the directories
                and included files inside it as below

            |
            |
            contracts
            |    |-- ConvertLib.sol
            |    |-- MetaCoin.sol
            |    |-- Migrations.sol
            |
            |
            migrations
            |    |-- 1_initial_migration.js
            |    |-- 2_deploy_contracts.js
            |
            |
            test
                |-- metacoin.js
                |-- TestMetacoin.sol
                    
    3. Thirdly, make changes to the 'truffle-config.js' file as:

        module.exports = {
            networks: {
                development: {
                // host: "localhost",
                host: "127.0.0.1",
                port: 7545,
                network_id: "*", // Match any network id
                gas: 5000000
                }
            },
            compilers: {
                solc: {
                version: "0.8.18",
                settings: {
                    optimizer: {
                    enabled: true, // Default: false
                    runs: 200      // Default: 200
                    },
                }
                }
            }
        };

        NOTE: Here we changed to port to 7545 from 8545. As 8545 is the port to connect ganache from cli.     
              Whereas here we are using Ganache Desktop Application which has exported port to 8545.
              Also, since we are using Solidity Version as ^0.8.18 (which is the latest as of now), so it
              is also required to changed the solc (which is solidity compiler) version from existing to 
              the updated one which we are using for our solidity files.


    4. Fourth, Initiate truffle command to compile the source code.
       a. When truffle is installed as in global space, then use below command to create the truffle
          project

          $> truffle compile

       b. When truffle is installed as in local space, then use below command to create the truffle
          project

          $> ./node_modules/.bin/truffle compile

    5. Fifth, Initiate truffle command to deploy the smart contract to the Ganache local network.
       a. When truffle is installed as in global space, then use below command to create the truffle
          project

          $> truffle migrate

       b. When truffle is installed as in local space, then use below command to create the truffle
          project

          $> ./node_modules/.bin/truffle migrate

    6. Sixth, Initiate truffle command when there is changes in Smart Contract.
        NOTE: whenever there is a change in Smart Contract, this changes will not be deployed by the
              Truffle with only "truffle migrate" command. we need to use the below command, so that
              Truffle understand that there is actually a change in the Smart Contract and thus 
              compile and deploy to the Ganache local Network

       a. When truffle is installed as in global space, then use below command to create the truffle
          project

          $> truffle migrate --reset

       b. When truffle is installed as in local space, then use below command to create the truffle
          project

          $> ./node_modules/.bin/truffle migrate --reset


Some good references for Truffle & Ganache: <br/>

    1. Ganache - ONE CLICK BLOCKCHAIN
        https://trufflesuite.com/ganache/

    2. How to use GANACHE Truffle Suite to Deploy a Smart Contract in Solidity (Blockchain)?
        https://www.geeksforgeeks.org/how-to-use-ganache-truffle-suite-to-deploy-a-smart-contract-in-solidity-blockchain/

    3. Create a project
        https://trufflesuite.com/docs/truffle/how-to/create-a-project/

    4. Creating & Deploying a Smart Contract using Truffle framework & Ganache-CLI — Part 2
        https://medium.com/coinmonks/creating-deploying-a-smart-contract-using-truffle-framework-ganache-cli-part-2-f2dcf400fbde

    5. Truffle now supports console.log in Solidity smart contracts
        https://trufflesuite.com/blog/truffle-now-supports-console-logging-in-solidity-smart-contract/

    6. Ganache - Ethereum workspace overview
        https://trufflesuite.com/docs/ganache/concepts/ethereum-workspace/overview/

    7. Truffle init not creating Migration.sol file
        https://stackoverflow.com/questions/73486030/truffle-init-not-creating-migration-sol-file


                     
    

