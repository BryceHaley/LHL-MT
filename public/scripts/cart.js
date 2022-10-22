let cart = [];
const cartKey = {coke: "1", cake: "2", koala: "3", cookie: "4"};

const makePostBody = function(cart, cartKey) {
  const postBody = {"1":0, "2":0, "3":0, "4":0};
  for (const item of cart) {
    postBody[cartKey[item.item_name]]++;
  }
  return postBody;
}

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
           <span class="item-name">Name:${item.item_name}</span>
           <span class="item-price">Price:$${item.total_price}</span>
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
  });

  $('#checkout').on('click', function(e) {
    e.preventDefault();
    const postBody = makePostBody(cart, cartKey);
    const order = `items=${JSON.stringify(postBody)}`
    console.log(order);
    $.post("/api/orders/new", order, function(data, status) {
      console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
    });
  })
});

/*
//Create individual items
const demoSendOrder = function() {
  const demoOrder = 'items={"1":1,"3":6}';
  $.post("/api/orders/new", demoOrder, function(data, status) {
    console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
  });
};
*/
