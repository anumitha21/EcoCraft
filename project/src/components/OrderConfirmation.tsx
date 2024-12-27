import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface OrderConfirmationProps {
  isVisible: boolean;
  onHide: () => void;
}

export function OrderConfirmation({ isVisible, onHide }: OrderConfirmationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-600" />
        <h2 className="text-2xl font-semibold">Order Placed!</h2>
        <p className="text-gray-600">Thank you for shopping with EcoCrafts</p>
      </div>
    </div>
  );
}