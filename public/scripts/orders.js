const loadOrders = function() {
  let orderIds;
  console.log("TEST")

  $.ajax("/api/orders", { method: 'GET', async: false})
  .done(function(data) {
    console.log("DATA", data)
    //console.log(`data: ${JSON.stringify(data.items)}`);
    orderIds = renderOrders(data.items)
  });
  return orderIds;
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
        <h4>${order.order_time}</h4>
        <h4>${order.projected_completion}</h4>
      </div>
    </div>
  </article>`);

  return $orderContainer;
};

const renderOrders = function(orders) {
  const orderIds = [];
  for (const order of orders) {
    console.log("ORDERS", order)
    const $order = createOrderElement(order);
    $(".order-details").append($order);
    orderIds.push(order.order_id);
  }
  return orderIds;
};

$(() => {
  const orderIds = loadOrders();
  console.log(orderIds);

  $("form").submit(function(event) {
    event.preventDefault();
    //console.log(`delay: ${$("#delay").val()}`);
    //console.log(`status: ${$("#status").val()}`);
    //console.log(`id: ${$("#orderId").val()}`);
    const orderId = $("#orderId").val();
    const newStatus = $("#status").val();
    const newDelay = $("#delay").val();
    console.log(orderId, newStatus, newDelay)

    if(orderIds.includes(parseInt(orderId))) {
      if(newStatus) {
        const postStatusBody = `status=${newStatus}&id=${orderId}`;
        $.post('/api/orders/set_status', postStatusBody, function(data, status) {
          console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        });
      }
      if(newDelay) {
        const postDelayBody = `delay=${newDelay}&id=${orderId}`;
        $.post('/api/orders/update_wait_time', postDelayBody, function(data, status) {
          console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        });
      }
      $(".order-details").empty();
      loadOrders();
    } else {
      alert("Id is not valid!");
      console.log(typeof orderId);
      console.log(orderIds)
    }
  });
});
