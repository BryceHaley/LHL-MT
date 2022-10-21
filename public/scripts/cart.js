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

  })


  const createCartElement = function(item) {
    let $cartItem = $(`
        <div class="cart-items">
          <div class="cart-item-details">
            <span class="item-name">Name:${item.item_name}</span>
            <span class="item-price">Price:${item.total_price}</span>
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

})
