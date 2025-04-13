
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  popular: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface OrderSummary {
  id: string;
  tableNumber: number | null;
  orderType: 'dine-in' | 'takeaway';
  items: OrderItem[];
  total: number;
  waiterName: string;
  timestamp: Date;
  customerName?: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Waiter {
  id: string;
  name: string;
}

export interface Table {
  id: number;
  status: 'available' | 'occupied' | 'reserved';
}
