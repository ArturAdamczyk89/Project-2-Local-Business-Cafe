// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = hamburger.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
    
    // Close menu when window is resized past mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
});

// Simple form validation for contact page
if (document.querySelector('#contact-form')) {
    const contactForm = document.querySelector('#contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        let isValid = true;
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const messageInput = document.querySelector('#message');
        
        // Reset error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.textContent = '');
        
        // Validate name
        if (nameInput.value.trim() === '') {
            document.querySelector('.name-error').textContent = 'Please enter your name';
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            document.querySelector('.email-error').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            document.querySelector('.message-error').textContent = 'Please enter your message';
            isValid = false;
        }
        
        if (!isValid) {
            event.preventDefault();
        }
    });
}

// Menu filter functionality
if (document.querySelector('.menu-filters')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Toggle active class on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide menu items based on filter
            menuItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cafeAromaCart')) || [];
    
    // DOM Elements
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total-value');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartFooter = document.querySelector('.cart-footer');
    
    // Add click event to cart icon to toggle dropdown
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            cartDropdown.classList.toggle('active');
            updateCartDisplay();
        });
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (cartDropdown && cartDropdown.classList.contains('active') && 
            !cartDropdown.contains(e.target) && 
            !cartIcon.contains(e.target)) {
            cartDropdown.classList.remove('active');
        }
    });
    
    // Add event listeners to all add-to-cart buttons
    const addButtons = document.querySelectorAll('.add-to-cart-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const id = menuItem.dataset.itemId;
            const name = menuItem.querySelector('h3').textContent;
            const price = parseFloat(menuItem.querySelector('.price').textContent.replace('£', ''));
            
            addToCart({id, name, price});
        });
    });
    
    // Add click events to all plus/minus buttons that exist initially
    setupQuantityControls();
    
    // Initial update of cart display
    updateCartCount();
    
    // Function to add item to cart
    function addToCart(item) {
        // Check if item is already in cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex > -1) {
            // Item exists, increase quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // Item doesn't exist, add it with quantity 1
            cart.push({...item, quantity: 1});
        }
        
        // Save updated cart to localStorage
        saveCart();
        
        // Update UI
        updateCartCount();
        updateMenuItemControls(item.id);
    }
    
    // Function to remove item from cart
    function removeFromCart(itemId) {
        // Find the item in cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
        
        if (existingItemIndex > -1) {
            if (cart[existingItemIndex].quantity === 1) {
                // If only 1 left, remove item completely
                cart = cart.filter(item => item.id !== itemId);
            } else {
                // Otherwise decrease quantity
                cart[existingItemIndex].quantity -= 1;
            }
            
            // Save updated cart to localStorage
            saveCart();
            
            // Update UI
            updateCartCount();
            updateMenuItemControls(itemId);
        }
    }
    
    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cafeAromaCart', JSON.stringify(cart));
    }
    
    // Function to update cart count badge
    function updateCartCount() {
        // Calculate total items in cart
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart count display
        if (cartCount) {
            if (totalItems > 0) {
                cartCount.textContent = totalItems;
                cartCount.style.display = 'flex';
            } else {
                cartCount.style.display = 'none';
            }
        }
    }
    
    // Function to update cart dropdown contents
    function updateCartDisplay() {
        if (!cartItems) return;
        
        // Clear current items
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            // Show empty cart message, hide cart footer
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (cartFooter) cartFooter.style.display = 'none';
        } else {
            // Hide empty message, show footer
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
            if (cartFooter) cartFooter.style.display = 'block';
            
            // Add each item to the cart display
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="item-details">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">£${item.price.toFixed(2)} × ${item.quantity}</span>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                    </div>
                `;
                cartItems.appendChild(cartItemElement);
            });
            
            // Set up event listeners for the quantity buttons
            cartItems.querySelectorAll('.minus-btn').forEach(button => {
                button.addEventListener('click', function() {
                    removeFromCart(this.dataset.id);
                    updateCartDisplay();
                });
            });
            
            cartItems.querySelectorAll('.plus-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const item = cart.find(item => item.id === this.dataset.id);
                    if (item) {
                        addToCart(item);
                        updateCartDisplay();
                    }
                });
            });
            
            // Update total price
            const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            if (cartTotal) {
                cartTotal.textContent = `£${totalPrice.toFixed(2)}`;
            }
        }
    }
    
    // Function to update menu item controls (show buttons or quantity controls)
    function updateMenuItemControls(itemId) {
        // Find all menu items with this ID
        const menuItems = document.querySelectorAll(`.menu-item[data-item-id="${itemId}"]`);
        
        menuItems.forEach(menuItem => {
            const addButton = menuItem.querySelector('.add-to-cart-btn');
            const quantityControls = menuItem.querySelector('.quantity-controls');
            const quantityValue = menuItem.querySelector('.quantity');
            
            // Find item in cart to get quantity
            const cartItem = cart.find(item => item.id === itemId);
            const quantity = cartItem ? cartItem.quantity : 0;
            
            if (quantity > 0) {
                // Item is in cart, show quantity controls, hide add button
                if (addButton) addButton.style.display = 'none';
                if (quantityControls) {
                    quantityControls.style.display = 'flex';
                    if (quantityValue) quantityValue.textContent = quantity;
                } else {
                    // Create quantity controls if they don't exist
                    createQuantityControls(menuItem, itemId, quantity);
                }
            } else {
                // Item is not in cart, show add button, hide quantity controls
                if (addButton) addButton.style.display = 'inline-block';
                if (quantityControls) quantityControls.style.display = 'none';
            }
        });
    }
    
    // Function to create quantity controls for a menu item
    function createQuantityControls(menuItem, itemId, quantity) {
        const priceElement = menuItem.querySelector('.price-with-controls');
        if (!priceElement) return;
        
        const addButton = menuItem.querySelector('.add-to-cart-btn');
        if (addButton) addButton.style.display = 'none';
        
        const controls = document.createElement('div');
        controls.className = 'quantity-controls';
        controls.innerHTML = `
            <button class="quantity-btn minus-btn" data-id="${itemId}">-</button>
            <span class="quantity">${quantity}</span>
            <button class="quantity-btn plus-btn" data-id="${itemId}">+</button>
        `;
        
        priceElement.appendChild(controls);
        
        const minusBtn = controls.querySelector('.minus-btn');
        const plusBtn = controls.querySelector('.plus-btn');
        
        minusBtn.addEventListener('click', function() {
            removeFromCart(itemId);
        });
        
        plusBtn.addEventListener('click', function() {
            const item = cart.find(item => item.id === itemId);
            if (item) {
                addToCart(item);
            }
        });
    }
    
    // Function to set up quantity controls for all menu items
    function setupQuantityControls() {
        // For each item in cart, update its menu display
        cart.forEach(item => {
            updateMenuItemControls(item.id);
        });
        
        // Add click handlers to existing quantity buttons
        document.querySelectorAll('.minus-btn').forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(this.dataset.id);
            });
        });
        
        document.querySelectorAll('.plus-btn').forEach(button => {
            button.addEventListener('click', function() {
                const item = cart.find(item => item.id === this.dataset.id);
                if (item) {
                    addToCart(item);
                }
            });
        });
    }
    
    // Initialize all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        // Make sure each menu item has the needed data attribute
        if (!item.dataset.itemId) {
            // Generate an ID from the item name if none exists
            const name = item.querySelector('h3').textContent;
            item.dataset.itemId = name.toLowerCase().replace(/\s+/g, '-');
        }
        
        // Update controls based on cart state
        updateMenuItemControls(item.dataset.itemId);
    });
    
    // Add checkout button functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Basic checkout functionality - can be expanded
            alert('Thank you for your order! Total: £' + 
                cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2));
            
            // Clear cart
            cart = [];
            saveCart();
            updateCartCount();
            updateCartDisplay();
            
            // Close dropdown
            cartDropdown.classList.remove('active');
            
            // Update all menu items to show "Add" buttons
            document.querySelectorAll('.menu-item').forEach(item => {
                updateMenuItemControls(item.dataset.itemId);
            });
        });
    }
});