import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { CartItem } from '../types';
import { Checkout } from './Checkout';
import { OrderConfirmation } from './OrderConfirmation';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClearCart: () => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onClearCart }: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    setShowCheckout(false);
    setShowOrderConfirmation(true);
    onClearCart();
  };

  const handleConfirmationClose = () => {
    setShowOrderConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-200px)]">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <Checkout 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        total={total}
        onComplete={handleOrderComplete}
      />

      <OrderConfirmation 
        isVisible={showOrderConfirmation}
        onHide={handleConfirmationClose}
      />
    </>
  );
}