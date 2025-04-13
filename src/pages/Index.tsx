
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, ShoppingBag } from 'lucide-react';
import RetroHeader from '../components/RetroHeader';
import RetroNavbar from '../components/RetroNavbar';
import { useOrder } from '../context/OrderContext';
import { tables, waiters } from '../data/mockData';

const Index = () => {
  const navigate = useNavigate();
  const { setOrderType, setTableNumber, setWaiterName, waiterName } = useOrder();
  const [selectedOrderType, setSelectedOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [selectedWaiter, setSelectedWaiter] = useState<string>(waiterName);

  const handleProceedToMenu = () => {
    if (selectedOrderType === 'dine-in' && !selectedTable) {
      alert('Please select a table for dine-in orders');
      return;
    }

    if (!selectedWaiter) {
      alert('Please select a waiter');
      return;
    }

    setOrderType(selectedOrderType);
    setTableNumber(selectedTable);
    setWaiterName(selectedWaiter);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen pb-16 bg-retro-cream">
      <RetroHeader title="Retro Eats" />
      
      <main className="p-4">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="retro-card p-6 mb-8">
              <h2 className="text-2xl text-center mb-6">Start New Order</h2>
              
              <div className="mb-6">
                <label className="block mb-2 font-semibold">Order Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`p-4 flex flex-col items-center justify-center rounded-lg border-2 ${
                      selectedOrderType === 'dine-in'
                        ? 'bg-retro-teal text-white border-retro-black'
                        : 'bg-white border-retro-black'
                    }`}
                    onClick={() => setSelectedOrderType('dine-in')}
                  >
                    <Utensils size={24} className="mb-2" />
                    <span>Dine In</span>
                  </button>
                  
                  <button
                    className={`p-4 flex flex-col items-center justify-center rounded-lg border-2 ${
                      selectedOrderType === 'takeaway'
                        ? 'bg-retro-red text-white border-retro-black'
                        : 'bg-white border-retro-black'
                    }`}
                    onClick={() => setSelectedOrderType('takeaway')}
                  >
                    <ShoppingBag size={24} className="mb-2" />
                    <span>Takeaway</span>
                  </button>
                </div>
              </div>
              
              {selectedOrderType === 'dine-in' && (
                <div className="mb-6">
                  <label htmlFor="table" className="block mb-2 font-semibold">
                    Select Table
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {tables.map((table) => (
                      <button
                        key={table.id}
                        className={`p-3 rounded-md text-center ${
                          table.status !== 'available'
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : selectedTable === table.id
                            ? 'bg-retro-teal text-white'
                            : 'bg-white border-2 border-retro-black'
                        }`}
                        onClick={() => {
                          if (table.status === 'available') {
                            setSelectedTable(table.id);
                          }
                        }}
                        disabled={table.status !== 'available'}
                      >
                        {table.id}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="waiter" className="block mb-2 font-semibold">
                  Waiter Name
                </label>
                <select
                  id="waiter"
                  value={selectedWaiter}
                  onChange={(e) => setSelectedWaiter(e.target.value)}
                  className="retro-select w-full"
                >
                  <option value="">Select Waiter</option>
                  {waiters.map((waiter) => (
                    <option key={waiter.id} value={waiter.name}>
                      {waiter.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                className="btn-primary w-full"
                onClick={handleProceedToMenu}
              >
                Proceed to Menu
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <RetroNavbar />
    </div>
  );
};

export default Index;
