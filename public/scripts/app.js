// Client facing scripts here


//Create individual items
// const demoSendOrder = function() {
//   const demoOrder = 'items={"1":1,"3":6}';
//   $.post("/api/orders/new", demoOrder, function(data, status) {
//     console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
//   });
// };


$(document).ready(() => {


  const loadItems = function() {
    $.ajax({
      method: "GET",
      url: "/api/items",
    })
      .then((data) => {
        renderItems(data.items);
      });
  };


  const createItemElement = function(menuItems) {
    let $itemContainer = $(`
    <article class="dish-content">
      <img src="/images/cakes.jpg">

      <div class="menu-column">
        <div class="dish-price">
          <h2 class="dish-title">${menuItems.name}</h2>
          <h2 class="item-price">${menuItems.price}</h2>
       </div>
       <div class="dish-description">
          <h4 class="item-description">${menuItems.description}</h4>
        </div>
        <div class="dish-buttons">
          <button class="add-button" type="submit">ADD TO CART</button>
        </div>
      </div>

    </article>`);
    return $itemContainer;
  };


  const renderItems = function(items) {
    for (const item of items) {
      const $item = createItemElement(item);
      $(".menu-sections").append($item);
    }
  }

  loadItems();
  // demoSendOrder();

<<<<<<< HEAD
  // const addToCart = document.querySelectorAll("button")


=======
  const addToCart = document.querySelectorAll("button")
>>>>>>> c6c985633bb823d25c2ef2885923ea6d92d8505b
})

