App = {
    contract: {}, //creating a new variable here to hold the contract we have.
    init: async function() {
        console.log("init is called");

        //#############
        //What we done in this block of code is connected our frontend to the Hardhat network
        //that is running locally on our machine. And we have done that using Metamask and the 
        //account that was created when we started the local Hardhat network. 
        /** ** Now starting to write some of #Web3 specific code, that will connect our #Wallet
         *     to the Frontend,
         *  ** */
        
        //Initializing our provider
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

        //to send the transaction here, we needs to sign the transaction thus needs to requests the accounts
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();

        //
        document.getElementById("wallet").innerText = "Your wallet address is: " + userAddress;

        // NOTE : below resourceAddress was printed when deployed the Contract BasicMarketplace locally to hardhat.
        const resourceAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
        //#############

        //Now instead of getting data from the sample data json file, we are going to actually pull
        //it from the contract itself. To do that, we need access to the Contract's ABI. When we 
        //compiled the SmartContract, this ABI for the contract was created and it was put in the
        //artifacts folder. NOTE: Browse artifacts directory to locate ABI file named "BasicMarketplace.json",
        //which is the same name as the solidity contract. This ABI will allow the frontend or the JS code
        //to interact with the marketplace or the basic market solidity file. So, instead of getting data
        //directly from the JSON file that was marked up, what we will do is we will directly get the ABI.
        //like below changes...
        //$.getJSON("../sampleData.json", function(data){
        $.getJSON("../artifacts/contracts/BasicMarketplace.sol/BasicMarketplace.json", function(BasicMarketplaceArtifact){
            
            //########
            //Now that we have the artifacts, We can go and get the contract. So we will define here a
            //const here that holds the contract and we will use the Ethers library to get the contract.
            const contract = new ethers.Contract(resourceAddress, BasicMarketplaceArtifact.abi, signer); 
            //NOTE: this is a function within the Web3 or EtherJS library that allows us to interact with 
            //      the ABI. The first argument to the Contract function is the resource address. Now the
            //      resource address is the address on the blockchain, on which the contract was deployed.
            //      The Second argument we need is the interface or the ABI. 
            //      The Third argument is the Signer. So, this is the Metamask Signer that we have here,
            //      the provider signer that we specified here. 

            //NOTE: Now this contract constant has the contract that we can start to interact with. We are
            //      able to achieve this because we are using Ether JS provider.
            
            
            //Now we have the contract that we pulled using the ABI, we can set it to the app.contract
            //variable. This done to store the contract we get using the ABI as global to this JS file. 
            //NOTE: as now we have this instance of contract, we can directly start interacting with the
            //      SmartContract deployed to the Network.
            App.contract = contract;
            
            //########
            

            //console.log(data);

            var allItemsDIV = $("#allItems");
            var itemTemplate = $("#itemTemplate");
            //console.log("data.length = " + data.length);

            //########
            //Now get the data using contract's function 'getAllProduct'.
            //Below we pull data from the smart contract and then set it up with the UI elements in 
            //the front end using getProducts functions.
            contract.getAllProduct().then((data)=> {
                console.log(data);

                //
                for(i=0; i<data.length; i++) {
                    itemTemplate.find(".itemName").text(data[i].itemName);
                    itemTemplate.find(".itemCreator").text(data[i].creator);
                    itemTemplate.find(".itemOwner").text(data[i].owner);
                    itemTemplate.find(".askingPrice").text(data[i].askingPrice);
                    itemTemplate.find(".itemStatus").text(data[i].isSold? "Sold" : "Available");
                    
                    if(data[i].isSold) {
                        itemTemplate.find(".buy_btn").hide();
                    } else {
                        itemTemplate.find(".buy_btn").show();
                    }

                    //changing data-id attribute dynamically.
                    itemTemplate.find(".buy_btn").attr("data-id", data[i].id);

                    //
                    console.log("called count = " + (i));
                    allItemsDIV.append(itemTemplate.html());
                }
            });
            //########

            
        });

        //
        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on("click", ".btn_add", App.handleAdd);
        $(document).on("click", ".buy_btn", {id: this.id}, App.handleBuy);
    },

    handleAdd: function() {
        console.log("handling add item...");

        //#########
        let itemName = $("#new_itemname").val();
        let askingPrice = $("#new_askingprice").val();

        console.log("New Item Name = " + itemName + " - Asking Price = " + askingPrice);
        App.contract.addProduct(itemName, askingPrice).then((data)=> {
             console.log(data);

        });
        //#########
    },

    handleBuy: function(event) {
        var productId = $(event.target).data("id");
        console.log("handling buying product with id: " + productId);

        App.contract.sellProduct(productId);
    },

};

$(function(){
    $(window).on('load', function(){ App.init();});
    // $(window).load(function(){
    //     App.init();
    // })
});

