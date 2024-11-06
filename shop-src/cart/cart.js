// Select elements for cart items and totals
const cartItems = document.querySelectorAll('.section');
const cartSubTotal = document.querySelector('.cart-sub-total');
const cartTax = document.querySelector('.cart-tax');
const cartFinalTotal = document.querySelector('.cart-final-total');

// Function to update subtotal, tax, and final total
function updateTotals() {
    let subtotal = 0;

    // Calculate subtotal based on each item's price and quantity
    const currentCartItems = document.querySelectorAll('.section'); // Get fresh list of items
    currentCartItems.forEach(item => {
        const price = parseFloat(item.dataset.price);
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        subtotal += price * quantity;
    });

    // Calculate tax and final total
    const tax = subtotal * 0.05;
    const finalTotal = subtotal + tax;

    // Update UI with formatted totals
    cartSubTotal.textContent = `Rs ${subtotal.toFixed(2)}`;
    cartTax.textContent = `Rs ${tax.toFixed(2)}`;
    cartFinalTotal.textContent = `Rs ${finalTotal.toFixed(2)}`;
}

// Loop through each cart item to add functionality for quantity buttons and removal
cartItems.forEach(item => {
    const plusButton = item.querySelector('.plus');
    const minusButton = item.querySelector('.minus');
    const quantityElement = item.querySelector('.quantity');
    const removeButton = item.querySelector('.cart-remove-button');

    // Increase quantity and update totals
    plusButton.addEventListener('click', () => {
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        updateTotals();
    });

    // Decrease quantity (minimum of 1) and update totals
    minusButton.addEventListener('click', () => {
        const currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 1) {
            quantityElement.textContent = currentQuantity - 1;
            updateTotals();
        }
    });

    // Remove item from cart and update totals, reset totals if cart is empty
    removeButton.addEventListener('click', () => {
        item.remove();
        updateTotals();

        // Check if the cart is empty and reset totals if so
        const currentCartItems = document.querySelectorAll('.section');
        if (currentCartItems.length === 0) {
            cartSubTotal.textContent = "Rs 0.00";
            cartTax.textContent = "Rs 0.00";
            cartFinalTotal.textContent = "Rs 0.00";
        }
    });
});

// Initial call to set totals on page load
updateTotals();
