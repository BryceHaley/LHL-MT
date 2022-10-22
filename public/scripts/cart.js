let cart = [];

$(document).ready(() => {


  $(".menu-sections").on('click', ".add-button", function(e) {
    e.preventDefault();
    const menuColumn = $(this).parent().parent();
    const dishPrice = menuColumn.children(".dish-price");
    const dishTitle = dishPrice.children(".dish-title").text();
    const itemPrice = dishPrice.children(".item-price").text();
    let item = {item_name: dishTitle, total_price: itemPrice };
    cart.push(item);
    renderCartItems([cart[cart.length-1]]);
    cartTotal(cart);
  });

  const createCartElement = function(item) {
    let $cartItem = $(`
      <div class="cart-items">
        <div class="cart-item-details">
           <span class="item-name">Name: ${item.item_name}</span>
           <span class="item-price">Price: $${item.total_price}</span>
        </div>
      </div>`);
    return $cartItem;
  };


  const renderCartItems = function(cart) {
    for (const item of cart) {
      const $item = createCartElement(item);
      $(".cart").append($item);
    }
  };

  const cartTotal = function(cart) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
    total += Number(cart[i].total_price);
    }
    $(".PRICE").text(total);
  };



  $('.button').on('click', function(e) {
    e.preventDefault();
  })

  $(".cart-container").on('click', ".checkout-button", function(e) {
    e.preventDefault();
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
    total += Number(cart[i].total_price);
    }
    const shopperCartTotal = $(this);
    const cartTotal = shopperCartTotal.children(".PRICE")
    let order = {total_cost: cartTotal};

    $.ajax({
          method: 'POST',
          url: '/api/orders/new',
          data: {total_price : total},
          success: function(result) {
          },
          error: function(){
            alert('Error');
          }
        })
    });
    //checkout button to orders
    //use jquery to insert those values 
    //key value pair object to send post request
    //post ajax call to a route
})
