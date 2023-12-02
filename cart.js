function addToCart(productName, price, imageURL) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cartItems.findIndex(item => item.productName === productName);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
        cartItems[existingItemIndex].price += price;
    } else {
        const newItem = { productName, price, quantity: 1, imageURL };
        cartItems.push(newItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Update the displayed cart
    displayCart();

    // Update the total amount
    calculateTotal();
}

function displayCart() {
    // Get the cart container element
    const cartContainer = document.getElementById('cart');

    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the previous content of the cart container
    cartContainer.innerHTML = '';

    // Display each item in the cart
    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        // Calculate the price for a single quantity
        const singleQuantityPrice = item.price / item.quantity;

        itemDiv.innerHTML = `
            <div class ="desc">
                <img src="${item.imageURL}" alt="${item.productName}" class="cart-image">
                <p class="cart-text"><strong>${item.productName}</strong></p>
                <hr>
            </div>
            <div class="price-container">
    <p>Product Price: $${singleQuantityPrice.toFixed(2)}</p>
    <p>Discount: $${calculateDiscount(singleQuantityPrice)}</p>
    <p>Delivery Charges: $${calculateDeliveryCharges()}</p>
</div>

            <div class="quantity-container">
                <p class="quantity-display">Quantity: </p>
                <div class="quantity-buttons">
                    <button onclick="decreaseQuantity(${index}, '${item.productName}', ${singleQuantityPrice})">-</button>
                    <p>${item.quantity}</p>
                    <button onclick="increaseQuantity('${item.productName}', ${singleQuantityPrice})">+</button>
                    <p class="prices"> Price :$${item.price}</p>
                    <button class="delete-button" onclick="deleteProduct(${index})">Delete</button>
                </div>
            </div>`;

        cartContainer.appendChild(itemDiv);
    });
}


function calculateTotal() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total amount
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    // Update the displayed total amount
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

function checkout() {
    // Clear the cart in localStorage
    localStorage.removeItem('cart');

    // Update the displayed cart and total amount
    displayCart();
    calculateTotal();

    // Inform the user that the checkout is complete
    alert('Checkout complete! Thank you for your purchase.');
}

// Call displayCart and calculateTotal on page load to show existing cart items and total amount
displayCart();
calculateTotal();

function increaseQuantity(productName, price) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.productName === productName);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
        cartItems[existingItemIndex].price += price;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCart();
        calculateTotal();
    }
}

function decreaseQuantity(index, productName, price) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.productName === productName);

    if (existingItemIndex !== -1 && cartItems[existingItemIndex].quantity > 1) {
        cartItems[existingItemIndex].quantity -= 1;
        cartItems[existingItemIndex].price -= price;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCart();
        calculateTotal();
    }
}

function deleteProduct(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
    calculateTotal();
}

function calculateDiscount(price) {
    // Your discount calculation logic here
    return price * 0; // Example: 10% discount
}

function calculateDeliveryCharges() {
    // Your delivery charges calculation logic here
    return 5.00; // Example: Fixed delivery charge
}