import React from 'react';
import { ShoppingBag, Leaf } from 'lucide-react';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Navbar({ cartItemsCount, onCartClick }: NavbarProps) {
  return (
    <nav className="bg-green-700 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-6 w-6" />
          <span className="text-xl font-bold">EcoCrafts</span>
        </div>
        
        <div className="flex items-center space-x-8">
          <a href="#" className="hover:text-green-200">Home</a>
          <a href="#shop" className="hover:text-green-200">Shop</a>
          <a href="#about" className="hover:text-green-200">About</a>
          <a href="#contact" className="hover:text-green-200">Contact</a>
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-green-600 rounded-full"
          >
            <ShoppingBag className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}