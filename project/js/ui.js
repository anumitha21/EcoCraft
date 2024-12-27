class UI {
  static showToast(message) {
    const toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    toast.querySelector('span').textContent = message;
    setTimeout(() => toast.classList.add('hidden'), 3000);
  }

  static showOrderConfirmation() {
    const confirmation = document.getElementById('orderConfirmation');
    confirmation.classList.add('active');
    setTimeout(() => {
      confirmation.classList.remove('active');
    }, 3000);
  }

  static updateCartCount(count) {
    const cartCount = document.getElementById('cartCount');
    if (count > 0) {
      cartCount.textContent = count;
      cartCount.classList.remove('hidden');
    } else {
      cartCount.classList.add('hidden');
    }
  }

  static renderCategories(categories, selectedCategory) {
    const container = document.getElementById('categories');
    container.innerHTML = `
      <button class="category-btn ${!selectedCategory ? 'active' : ''}" data-category="">
        All
      </button>
      ${categories.map(category => `
        <button class="category-btn ${category === selectedCategory ? 'active' : ''}" data-category="${category}">
          ${category}
        </button>
      `).join('')}
    `;
  }

  static renderProducts(products) {
    const container = document.getElementById('products');
    container.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">₹${product.price}</span>
            <button class="btn btn-primary" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  static renderCart(items, total) {
    const container = document.getElementById('cartItems');
    container.innerHTML = items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <h3 class="product-name">${item.name}</h3>
          <p class="product-price">₹${item.price}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
          </div>
        </div>
      </div>
    `).join('');
    
    document.getElementById('cartTotal').textContent = `₹${total}`;
    document.getElementById('checkoutTotal').textContent = `₹${total}`;
  }
}