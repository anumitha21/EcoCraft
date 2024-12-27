class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.saveToLocalStorage();
  }

  updateQuantity(id, quantity) {
    if (quantity === 0) {
      this.items = this.items.filter(item => item.id !== id);
    } else {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    }
    this.saveToLocalStorage();
  }

  clear() {
    this.items = [];
    this.saveToLocalStorage();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  loadFromLocalStorage() {
    const stored = localStorage.getItem('cart');
    if (stored) {
      this.items = JSON.parse(stored);
    }
  }
}