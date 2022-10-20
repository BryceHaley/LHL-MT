const cart = []
const item = {id, itemName, price, quantity}

$(".add-button").on('click', function () {
    cart.push(item)
})

$(".checkout-button").on('click', function () {
    let itemObj = JSON.parse(cart)
    
    //send to database
})

{/* <div class="cart-container">
  <div class="cart">
    <div class="cart-header">
      <div class="shopping-cart-total">
        <span class="Total">Total:</span>
        <span class="PRICE">$200.00</span>
      </div>
    </div>
  
      <div class="cart-items">
        <div class="cart-item-details">
          <span class="item-name">Name:</span>
          <span class="item-price">Price:</span>
          <span class="item-quantity">Quantity:</span>
          <div class="button"><a href="#">Remove</a></div>
        </div>
      </div>

    <div class="button"><a href="#">Checkout</a></div>
  </div>
</div> */}

// const demoSendOrder = function() {
//     const demoOrder = 'items={"1":1,"3":6}';
//     $.post("/api/orders/new", demoOrder, function(data, status) {
//       console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
//     });
//   };

//create an object or an array with the cart item
//when clicking add to cart button, add the data of item to array
//when user clicks checkout -> change cart items to JSON and send to database

// getting the cart to produce a JSON like this: {"1":1,"2":1,"3":1}'
// if we get that, we know our POST commands will work
// once you get the JSON, test it in curl with something like: 
// curl -X POST -i localhost:8080/api/orders/new -d 'items={"1":1,"2":1,"3":1} 
//to ensure your json is well formatted and check that the db does update with SELECT * FROM order_items