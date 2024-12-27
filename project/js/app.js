// Initialize cart and state
const cart = new Cart();
let selectedCategory = null;

// Load cart from localStorage
cart.loadFromLocalStorage();

// Get unique categories
const categories = [...new Set(products.map(p => p.category))];

// Initial render
UI.renderCategories(categories, selectedCategory);
UI.renderProducts(products);
UI.updateCartCount(cart.getItemCount());

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Category selection
  document.getElementById('categories').addEventListener('click', (e) => {
    if (e.target.classList.contains('category-btn')) {
      selectedCategory = e.target.dataset.category;
      UI.renderCategories(categories, selectedCategory);
      UI.renderProducts(selectedCategory ? 
        products.filter(p => p.category === selectedCategory) : 
        products
      );
    }
  });

  // Add to cart
  document.getElementById('products').addEventListener('click', (e) => {
    if (e.target.dataset.productId) {
      const product = products.find(p => p.id === parseInt(e.target.dataset.productId));
      cart.addItem(product);
      UI.showToast('Added to cart successfully!');
      UI.updateCartCount(cart.getItemCount());
    }
  });

  // Cart modal
  const cartModal = document.getElementById('cartModal');
  document.getElementById('cartBtn').addEventListener('click', () => {
    cartModal.classList.add('active');
    UI.renderCart(cart.items, cart.getTotal());
  });

  // Close modals
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
      });
    });
  });

  // Update cart quantities
  document.getElementById('cartItems').addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-btn')) {
      const id = parseInt(e.target.dataset.id);
      const item = cart.items.find(item => item.id === id);
      if (item) {
        const newQuantity = e.target.dataset.action === 'increase' ? 
          item.quantity + 1 : 
          item.quantity - 1;
        cart.updateQuantity(id, newQuantity);
        UI.renderCart(cart.items, cart.getTotal());
        UI.updateCartCount(cart.getItemCount());
      }
    }
  });

  // Checkout
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    cartModal.classList.remove('active');
    document.getElementById('checkoutModal').classList.add('active');
  });

  // Address type selection
  document.querySelectorAll('input[name="addressType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const addressInput = document.getElementById('addressInput');
      addressInput.classList.toggle('hidden', e.target.value === 'current');
    });
  });

  // Place order
  document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('checkoutModal').classList.remove('active');
    UI.showOrderConfirmation();
    cart.clear();
    UI.updateCartCount(0);
  });

  // Contact form
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    UI.showToast('Message sent successfully!');
    e.target.reset();
  });
});