const loadOrders = function() {
  $.get("/api/orders", (data, status) => {
    console.log(`data: ${JSON.stringify(data.items)}`);
    console.log(`status: ${status}`);
  });
}

$(document).ready(() => {
  loadOrders();
});
