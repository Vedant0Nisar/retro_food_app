
import React, { useState } from 'react';
import { Search, Calendar, User, MapPin } from 'lucide-react';
import RetroHeader from '../components/RetroHeader';
import RetroNavbar from '../components/RetroNavbar';
import { useOrder } from '../context/OrderContext';
import { format } from 'date-fns';

const History = () => {
  const { orders } = useOrder();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'date' | 'waiter' | 'table'>('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  const filteredOrders = orders.filter(order => {
    if (searchQuery === '') return true;
    
    switch (selectedFilter) {
      case 'date':
        return format(new Date(order.timestamp), 'yyyy-MM-dd').includes(searchQuery);
      case 'waiter':
        return order.waiterName.toLowerCase().includes(searchQuery.toLowerCase());
      case 'table':
        return order.tableNumber?.toString().includes(searchQuery);
      default:
        return (
          order.waiterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (order.customerName && order.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          order.tableNumber?.toString().includes(searchQuery) ||
          format(new Date(order.timestamp), 'yyyy-MM-dd').includes(searchQuery)
        );
    }
  });

  const getOrderDetails = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <div className="min-h-screen pb-16 bg-retro-cream">
      <RetroHeader title="Transaction History" />
      
      <main className="p-4">
        <div className="sticky top-16 z-10 bg-retro-cream pt-2 pb-4">
          <div className="flex items-center mb-4 relative">
            <Search className="absolute left-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="retro-input pl-10 w-full"
            />
          </div>
          
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1">
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedFilter === 'all'
                  ? 'bg-retro-teal text-white'
                  : 'bg-white border-2 border-retro-black'
              }`}
              onClick={() => setSelectedFilter('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1 ${
                selectedFilter === 'date'
                  ? 'bg-retro-teal text-white'
                  : 'bg-white border-2 border-retro-black'
              }`}
              onClick={() => setSelectedFilter('date')}
            >
              <Calendar size={16} /> Date
            </button>
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1 ${
                selectedFilter === 'waiter'
                  ? 'bg-retro-teal text-white'
                  : 'bg-white border-2 border-retro-black'
              }`}
              onClick={() => setSelectedFilter('waiter')}
            >
              <User size={16} /> Waiter
            </button>
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1 ${
                selectedFilter === 'table'
                  ? 'bg-retro-teal text-white'
                  : 'bg-white border-2 border-retro-black'
              }`}
              onClick={() => setSelectedFilter('table')}
            >
              <MapPin size={16} /> Table
            </button>
          </div>
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="retro-card p-8 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className={`retro-card p-4 cursor-pointer transition-all ${
                  selectedOrder === order.id ? 'ring-4 ring-retro-teal' : ''
                }`}
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.timestamp), 'MMM d, yyyy - h:mm a')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    <span className="bg-retro-teal text-white rounded-full px-2 py-0.5 text-xs">
                      {order.orderType === 'dine-in' ? 'Dine In' : 'Takeaway'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm">
                    <span className="font-medium">Waiter:</span> {order.waiterName}
                  </p>
                  {order.tableNumber && (
                    <p className="text-sm">
                      <span className="font-medium">Table:</span> {order.tableNumber}
                    </p>
                  )}
                  {order.customerName && (
                    <p className="text-sm">
                      <span className="font-medium">Customer:</span> {order.customerName}
                    </p>
                  )}
                </div>
                
                {selectedOrder === order.id && (
                  <div className="mt-4 pt-4 border-t border-muted">
                    <h4 className="font-semibold mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-2 border-t border-muted flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">${order.total.toFixed(2)}</span>
                    </div>
                    
                    <button className="btn-outline w-full mt-4">
                      Reprint Bill
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      
      <RetroNavbar />
    </div>
  );
};

export default History;
