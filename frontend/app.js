App = {
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
        const resourceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        //#############

        $.getJSON("../sampleData.json", function(data){
            console.log(data);

            var allItemsDIV = $("#allItems");
            var itemTemplate = $("#itemTemplate");
            console.log("data.length = " + data.length);
            //
            for(i=0; i<data.length; i++) {
                itemTemplate.find(".itemName").text(data[i].itemName);
                itemTemplate.find(".itemCreator").text(data[i].itemCreator);
                itemTemplate.find(".itemOwner").text(data[i].itemOwner);
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

        //
        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on("click", ".btn_add", App.handleAdd);
        $(document).on("click", ".buy_btn", {id: this.id}, App.handleBuy);
    },

    handleAdd: function() {
        console.log("handling add item...");
    },

    handleBuy: function(event) {
        var productId = $(event.target).data("id");
        console.log("handling buying product with id: " + productId);
    },

};

$(function(){
    $(window).on('load', function(){ App.init();});
    // $(window).load(function(){
    //     App.init();
    // })
});

