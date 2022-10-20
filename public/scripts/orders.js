const loadOrders = function() {
  $.get("/api/orders", (data, status) => {
    console.log(`data: ${JSON.stringify(data.items)}`);
    console.log(`status: ${status}`);
    renderOrders(data.items)
  });
};

const createOrderElement = function(order) {
  let $orderContainer = $(`
  <article class="order-content">
    <div class="menu-column">
      <div class="dish-price">
        <h2 class="dish-title">${order.order_id}</h2>
        <h2>${order.order_status}</h2>
     </div>
     <div class="dish-description">
        <h4>${order.total_cost}</h4>
        <h4>${order.status}</h4>
        <h4>${order.order_time}</h4>
        <h4>${order.projected_completion}</h4>
      </div>
    </div>
  </article>`);

  return $orderContainer;
};

const renderOrders = function(orders) {
  for (const order of orders) {
    const $order = createOrderElement(order);
    $(".order-sections").append($order);
  }
};

$(document).ready(() => {
  loadOrders();
});
