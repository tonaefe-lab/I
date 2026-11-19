
// =========================
// HEROS SHOPPING CART
// =========================

let cart = JSON.parse(localStorage.getItem("herosCart")) || [];

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const navCartCount = document.getElementById("nav-cart-count");
const cartTotal = document.getElementById("cart-total");

const formatPrice = amount =>
    amount.toLocaleString("en-NG");

// Save cart to local storage
function saveCart() {
    localStorage.setItem("herosCart", JSON.stringify(cart));
}

// Add products to cart
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", () => {

        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image,
            quantity: 1
        };

        const existingProduct = cart.find(
            item => item.id === product.id
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        saveCart();
        displayCart();

        button.textContent = "Added!";
        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 1000);

    });

});

// Display cart
function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is currently empty.</p>';
    }

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "₦" + formatPrice(item.price);

        const controls = document.createElement("div");
        controls.className = "cart-controls";

        const decrease = document.createElement("button");
        decrease.textContent = "−";
        decrease.setAttribute("aria-label", "Decrease quantity");
        decrease.addEventListener("click", () => {
            changeQuantity(item.id, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.setAttribute("aria-label", "Increase quantity");
        increase.addEventListener("click", () => {
            changeQuantity(item.id, 1);
        });

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.className = "remove-item";
        remove.addEventListener("click", () => {
            removeItem(item.id);
        });

        controls.append(decrease, quantity, increase, remove);
        details.append(name, price, controls);
        cartItem.append(image, details);

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = count;
    navCartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);

}

// Change quantity
function changeQuantity(id, amount) {

    const product = cart.find(item => item.id === id);

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart();
    displayCart();

}

// Remove product
function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
    displayCart();

}

// Checkout demonstration
document.getElementById("checkout-btn")
    .addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty. Add a product first!");
            return;
        }

        alert(
            "Your order is ready for checkout. " +
            "HEROS payment processing has not been connected yet."
        );

    });

// Load saved cart when page opens
displayCart();


// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});

// Close menu after clicking a navigation link
navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


// =========================
// NEWSLETTER DEMONSTRATION
// =========================

const newsletterForm =
    document.getElementById("newsletter-form");

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        document.getElementById("newsletter-email").value;

    document.getElementById("newsletter-message").textContent =
        "Thank you! Newsletter signup is a demonstration for now.";

    newsletterForm.reset();

});
