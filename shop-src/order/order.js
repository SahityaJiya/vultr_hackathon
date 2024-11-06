document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-item');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingCost = 5.00;
  
    function updateTotal() {
      let subtotal = 0;
      products.forEach(product => {
        const price = parseFloat(product.dataset.price);
        const quantity = product.querySelector('.quantity').value;
        subtotal += price * quantity;
      });
      subtotalElement.innerText = subtotal.toFixed(2);
      totalElement.innerText = (subtotal + shippingCost).toFixed(2);
    }
  
    products.forEach(product => {
      product.querySelector('.quantity').addEventListener('change', updateTotal);
    });
  
    updateTotal();
  
    // Handle order form submission
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Order placed successfully!');
      orderForm.reset();
      updateTotal();
    });
  
    // Handle cancel button click
    const cancelButton = document.getElementById('cancel');
    cancelButton.addEventListener('click', () => {
      orderForm.reset();
      alert('Order canceled.');
      updateTotal();
    });
  });
  