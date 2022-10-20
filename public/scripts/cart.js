// const addcart = document.querySelectorAll('add-button')

let cart = [];
let item = {order_id, item_name, total_price, item_quantity};


$(document).ready(() => {

//Event listener to add items to cart
  $(".add-button").on('click', function () {
    cart.push(item);
    $.ajax({
      method: "POST",
      url: "/api/orders/new",
      data: item,
    }).then(() => {
      $.ajax({
        method:"GET",
        url: "/api/orders/:id",
      })
        .then((data) => {
          renderCartItems(data.items);
        })
    })
  });


  // const loadCartItems = function() {
  //   $.ajax({
  //     method: "GET",
  //     url: "/api/orders/:id",
  //   })
  //     .then((data) => {
  //       renderCartItems(data.items);
  //     })
  // }


  const createCartElement = function(item) {
    let $cartItem = $(`
      <div class="cart">
        <div class="cart-header">
          <div class="shopping-cart-total">
            <span class="Total">Total:</span>
            <span class="PRICE">$200.00</span>
          </div>
        </div>

          <div class="cart-items">
            <div class="cart-item-details">
              <span class="item-name">Name:${item.itemName}</span>
              <span class="item-price">Price:${item.price}</span>
              <span class="item-quantity">Quantity:${item.quantity}</span>
              <div class="button"><a href="#">Remove</a></div>
            </div>
          </div>

        <div class="button"><a href="#">Checkout</a></div>
      </div>`);
    return $cartItem;
  };


  const renderCartItems = function(cart) {
    for (const item of cart) {
      const $item = createCartElement($item);
      $(".cart-container").prepend($item);
    }
  };


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
