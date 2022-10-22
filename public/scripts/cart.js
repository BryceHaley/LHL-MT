let cart = [];

$(document).ready(() => {


  $(".menu-sections").on('click', ".add-button", function(e) {
    e.preventDefault();
    const menuColumn = $(this).parent().parent();
    const dishPrice = menuColumn.children(".dish-price");
    const dishTitle = dishPrice.children(".dish-title").text();
    const itemPrice = dishPrice.children(".item-price").text();
    let item = {itemId: dishTitle, orderId: itemPrice };
    cart.push(item);
    renderCartItems([cart[cart.length-1]]);
    cartTotal(cart);
  });

  const createCartElement = function(item) {
    let $cartItem = $(`
      <div class="cart-items">
        <div class="cart-item-details">
           <span class="item-name">Name:${item.itemId}</span>
           <span class="item-price">Price:$${item.orderId}</span>
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
    total += Number(cart[i].orderId);
    }
    $(".PRICE").text(total);
  };


  $(".button").on('click', function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/orders/new",
      data: { cart },
      success: function() {
        alert("Your order has been placed");
      }
    })
  })

})
