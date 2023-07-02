pragma solidity ^0.8.18;

contract BasicMarketplace {
    
    //first create a logic structure that will defined our product in MarketPlace
    struct Product {
        uint256 id;
        string itemName;
        address creator; //when a user create the Item we will capture address and store here.
        address owner;
        uint256 askingPrice;
        bool isSold;
    }

    //Another thing Smart Contract has to do is keep track of the mapping of the products
    //NOTE: this mapping will hold all of the products within the marketplace. 
    mapping(uint256=> Product) public products;

    uint256 public numProducts; //this will represent how many products we have. This variable
                                //we created is just a way for us to give a unique id to a 
                                //product. Once we create a new product, we will increment this
                                //variable here, that we are keeping track of how many products
                                //we have, and we are also assigning a new unique id to any new
                                //products that we add.
            
    //define an Event to save products.
    event savingsEvent(uint256 indexed _productId);
    
    constructor() {
        numProducts=0;    
    }


    //this functio nwill allow us to add a new Product to the marketplace.
    function addProduct(string memory itemName, uint256 askingPrice) public {
        Product storage product = products[numProducts]; //get the product Instance.

        //
        product.creator = msg.sender;
        product.owner = msg.sender; //NOTE: Initially both product.creator & product.owner are same
        product.askingPrice = askingPrice;
        product.itemName = itemName;
        product.isSold = false;

        //So once we have the above Instance assigned, next we will do is we will add it to the
        //products mapping that we are keeping track of. 
        products[numProducts] = Product(
            numProducts,
            product.itemName,
            product.creator,
            product.owner,
            product.askingPrice,
            product.isSold
        );

        //
        numProducts++;
    }

    //function to return a Single Product.
    function getProduct(uint256 productId) public view returns(Product memory) {
        return products[productId];
    }

    //function to return all of the Products in the MarketPlace.
    function getAllProduct() public view returns(Product[] memory) {
        Product[] memory prodList = new Product[](numProducts);

        for(uint256 i =0; i< numProducts; i++) {
            Product storage product = products[i];
            prodList[i]=product;
        }

        //
        return prodList;
    }

    //function to sell a Product , i.e. to change an Ownership of the product clicked on.
    function sellProduct(uint256 productId) public {
        Product storage product = products[productId];

        //
        product.owner = msg.sender;
        product.isSold = true;
    }

}