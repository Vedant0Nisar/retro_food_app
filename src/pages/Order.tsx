
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Printer } from 'lucide-react';
import RetroHeader from '../components/RetroHeader';
import { useOrder } from '../context/OrderContext';
import { toast } from 'sonner';

const Order = () => {
  const navigate = useNavigate();
  const { 
    currentOrder, 
    orderType,
    tableNumber,
    waiterName,
    customerName,
    setCustomerName,
    updateQuantity, 
    removeFromOrder, 
    calculateTotal,
    completeOrder
  } = useOrder();
  
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrintBill = () => {
    if (orderType === 'takeaway' && !customerName) {
      toast.error("Please enter customer name for takeaway orders");
      return;
    }
    
    setIsPrinting(true);
    
    // Simulate printing process
    setTimeout(() => {
      setIsPrinting(false);
      completeOrder();
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-retro-cream">
      <RetroHeader title="Order Summary" showBackButton />
      
      <main className="p-4">
        <div className="retro-card p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Order Type:</span>
            <span className="bg-retro-teal text-white rounded-full px-3 py-1 text-sm">
              {orderType === 'dine-in' ? 'Dine In' : 'Takeaway'}
            </span>
          </div>
          
          {orderType === 'dine-in' && tableNumber && (
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Table Number:</span>
              <span className="font-medium">{tableNumber}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Waiter:</span>
            <span className="font-medium">{waiterName}</span>
          </div>
          
          {orderType === 'takeaway' && (
            <div className="mb-2">
              <label className="block mb-1 font-semibold">Customer Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="retro-input w-full"
                placeholder="Enter customer name"
              />
            </div>
          )}
        </div>
        
        <div className="retro-card p-4 mb-4">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          
          {currentOrder.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>Your order is empty</p>
              <button
                className="btn-primary mt-4"
                onClick={() => navigate('/menu')}
              >
                Go to Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4 mb-4">
              {currentOrder.map((item) => (
                <div key={item.id} className="border-b border-muted pb-4">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border-2 border-retro-black rounded-lg overflow-hidden">
                        <button
                          className="bg-retro-silver px-2 py-1"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          className="bg-retro-silver px-2 py-1"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        className="p-2 text-retro-red hover:bg-gray-100 rounded-full"
                        onClick={() => removeFromOrder(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-1">
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {currentOrder.length > 0 && (
            <div className="border-t border-muted pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
        
        {currentOrder.length > 0 && (
          <button
            className={`btn-secondary w-full flex items-center justify-center gap-2 ${
              isPrinting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={handlePrintBill}
            disabled={isPrinting}
          >
            <Printer size={20} />
            {isPrinting ? 'Printing...' : 'Print Bill & Complete Order'}
          </button>
        )}
      </main>
    </div>
  );
};

export default Order;
