document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');

    let cart = [];

    // Список товарів для категорії "Настільні ігри"
    const products = [
        { id: 1, name: "Монополія", price: 500, img: "images/monopoly.jpg" },
        { id: 2, name: "Уно", price: 150, img: "images/uno.jpg" },
        { id: 3, name: "Дженга", price: 300, img: "images/jenga.jpg" },
        { id: 4, name: "Скраббл", price: 400, img: "images/scrabble.jpg" }
    ];

    // Функція для відображення товарів
    function displayProducts() {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} грн</p>
                <button onclick="addToCart(${product.id})">Додати у корзину</button>
            `;
            productList.appendChild(productCard);
        });
    }

    // Додавання товару у корзину
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        const existingProduct = cart.find(p => p.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        updateCartCount();
    }

    // Оновлення кількості товарів біля іконки корзини
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Відкриття корзини
    window.openCart = function() {
        cartModal.style.display = 'block';
        displayCartItems();
    }

    // Закриття корзини
    window.closeCart = function() {
        cartModal.style.display = 'none';
    }

    // Відображення товарів у корзині
    function displayCartItems() {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} (${item.quantity} шт.) - ${item.price * item.quantity} грн
                <button onclick="removeFromCart(${item.id})">✖</button>
            `;
            cartItems.appendChild(li);
        });
    }

    // Видалення товару з корзини
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartCount();
        displayCartItems();
    }

    // Функція для оформлення замовлення
    window.checkout = function() {
        alert("Дякуємо за покупку!");
        cart = [];
        updateCartCount();
        closeCart();
    }

    displayProducts();
});
