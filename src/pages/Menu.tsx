
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Minus, ShoppingCart } from 'lucide-react';
import RetroHeader from '../components/RetroHeader';
import RetroNavbar from '../components/RetroNavbar';
import { menuItems } from '../data/mockData';
import { MenuItem } from '../types';
import { useOrder } from '../context/OrderContext';

const Menu = () => {
  const navigate = useNavigate();
  const { addToOrder, currentOrder, calculateTotal } = useOrder();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});

  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const popularItems = filteredMenuItems.filter(item => item.popular);
  const regularItems = filteredMenuItems.filter(item => !item.popular);
  
  const displayItems = [...popularItems, ...regularItems];
  
  const handleQuantityChange = (itemId: string, change: number) => {
    const currentQuantity = itemQuantities[itemId] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    setItemQuantities({
      ...itemQuantities,
      [itemId]: newQuantity,
    });
  };

  const handleAddToOrder = (item: MenuItem) => {
    const quantity = itemQuantities[item.id] || 1;
    if (quantity > 0) {
      addToOrder({ ...item, quantity });
      setItemQuantities({
        ...itemQuantities,
        [item.id]: 0,
      });
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-retro-cream">
      <RetroHeader title="Menu" showBackButton />
      
      <main className="p-4">
        <div className="sticky top-16 z-10 bg-retro-cream pt-2 pb-4">
          <div className="flex items-center mb-4 relative">
            <Search className="absolute left-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="retro-input pl-10 w-full"
            />
          </div>
          
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1">
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-retro-teal text-white'
                  : 'bg-white border-2 border-retro-black'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-retro-teal text-white'
                    : 'bg-white border-2 border-retro-black'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          {popularItems.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                Popular Items
                <span className="bg-retro-red text-white text-xs py-1 px-2 ml-2 rounded-full">
                  Popular
                </span>
              </h3>
            </div>
          )}
          
          <div className="space-y-4">
            {displayItems.map((item) => (
              <div key={item.id} className="retro-card p-4 relative">
                {item.popular && (
                  <div className="absolute top-2 right-2 bg-retro-red text-white text-xs py-1 px-2 rounded-full">
                    Popular
                  </div>
                )}
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center border-2 border-retro-black rounded-lg overflow-hidden">
                      <button
                        className="bg-retro-silver px-2 py-1"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 bg-white">
                        {itemQuantities[item.id] || 0}
                      </span>
                      <button
                        className="bg-retro-silver px-2 py-1"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      className="btn-primary mt-2 w-full py-1"
                      disabled={(itemQuantities[item.id] || 0) === 0}
                      onClick={() => handleAddToOrder(item)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {currentOrder.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t-2 border-retro-black p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{currentOrder.length} item(s)</p>
              <p className="text-lg font-bold">${calculateTotal().toFixed(2)}</p>
            </div>
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => navigate('/order')}
            >
              <ShoppingCart size={20} />
              View Order
            </button>
          </div>
        </div>
      )}
      
      <RetroNavbar />
    </div>
  );
};

export default Menu;
