import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onComplete: () => void;
}

export function Checkout({ isOpen, onClose, total, onComplete }: CheckoutProps) {
  const [address, setAddress] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={useCurrentLocation}
                onChange={() => setUseCurrentLocation(true)}
                className="text-green-600"
              />
              <span>Use Current Location</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={!useCurrentLocation}
                onChange={() => setUseCurrentLocation(false)}
                className="text-green-600"
              />
              <span>Enter Different Address</span>
            </label>
          </div>
          
          {!useCurrentLocation && (
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              rows={4}
            />
          )}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}