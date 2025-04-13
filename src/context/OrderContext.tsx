
import React, { createContext, useState, useContext } from 'react';
import { OrderItem, OrderSummary } from '../types';
import { orderHistory } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface OrderContextType {
  currentOrder: OrderItem[];
  orderType: 'dine-in' | 'takeaway';
  tableNumber: number | null;
  waiterName: string;
  customerName: string;
  orders: OrderSummary[];
  setOrderType: (type: 'dine-in' | 'takeaway') => void;
  setTableNumber: (table: number | null) => void;
  setWaiterName: (name: string) => void;
  setCustomerName: (name: string) => void;
  addToOrder: (item: OrderItem) => void;
  removeFromOrder: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearOrder: () => void;
  completeOrder: () => void;
  calculateTotal: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [waiterName, setWaiterName] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [orders, setOrders] = useState<OrderSummary[]>(orderHistory);

  const addToOrder = (item: OrderItem) => {
    const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
    
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + item.quantity);
    } else {
      setCurrentOrder([...currentOrder, item]);
    }
  };

  const removeFromOrder = (itemId: string) => {
    setCurrentOrder(currentOrder.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(itemId);
      return;
    }
    
    setCurrentOrder(
      currentOrder.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearOrder = () => {
    setCurrentOrder([]);
    setTableNumber(null);
    setCustomerName('');
  };

  const calculateTotal = () => {
    return currentOrder.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const completeOrder = () => {
    if (currentOrder.length === 0) {
      toast.error("Can't complete an empty order");
      return;
    }

    if (orderType === 'dine-in' && tableNumber === null) {
      toast.error("Please select a table for dine-in orders");
      return;
    }

    if (waiterName === '') {
      toast.error("Please enter waiter name");
      return;
    }

    if (orderType === 'takeaway' && customerName === '') {
      toast.error("Please enter customer name for takeaway orders");
      return;
    }

    const newOrder: OrderSummary = {
      id: uuidv4().substring(0, 8),
      tableNumber,
      orderType,
      items: [...currentOrder],
      total: calculateTotal(),
      waiterName,
      customerName: orderType === 'takeaway' ? customerName : undefined,
      timestamp: new Date(),
      status: 'completed',
    };

    setOrders([newOrder, ...orders]);
    toast.success("Order completed successfully!");
    clearOrder();
  };

  const value = {
    currentOrder,
    orderType,
    tableNumber,
    waiterName,
    customerName,
    orders,
    setOrderType,
    setTableNumber,
    setWaiterName,
    setCustomerName,
    addToOrder,
    removeFromOrder,
    updateQuantity,
    clearOrder,
    completeOrder,
    calculateTotal,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
