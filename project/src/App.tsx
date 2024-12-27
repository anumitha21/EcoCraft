import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Toast } from './components/Toast';
import { products } from './data/products';
import type { CartItem } from './types';
import { ShoppingBag, Leaf } from 'lucide-react';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const addToCart = (productId: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const product = products.find(p => p.id === productId)!;
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowToast(true);
  };

  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      quantity === 0
        ? prev.filter(item => item.id !== id)
        : prev.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section className="pt-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Sustainable Products for a Greener Tomorrow</h1>
          <p className="text-xl mb-8">Shop eco-friendly and sustainable products that make a difference.</p>
          <a href="#shop" className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50">
            Shop Now
          </a>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === null ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">₹{product.price}</span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-green-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">About EcoCrafts</h2>
          <p className="text-lg text-gray-700">
            EcoCrafts is dedicated to providing sustainable and eco-friendly products 
            to help you reduce your environmental footprint. Our mission is to make 
            eco-friendly living accessible and affordable for everyone.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              rows={4}
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <p>© 2024 EcoCrafts. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400">Privacy Policy</a>
              <a href="#" className="hover:text-green-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onClearCart={clearCart}
      />

      <Toast 
        message="Added to cart successfully!"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;