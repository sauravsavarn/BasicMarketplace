App = {
    init: async function() {
        console.log("init is called");
        

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

