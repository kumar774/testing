
export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Drink';
  imageUrl: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  addresses?: string[];
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  userId?: string;
  guestDetails?: { name: string; email: string; phone: string; address: string };
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'Pending' | 'Confirmed' | 'Declined';
}
