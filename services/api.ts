
import { Dish, User, Order, Reservation, OrderStatus } from '../types';

// --- MOCK DATABASE ---
let mockDishes: Dish[] = [
  { id: '1', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 12.99, category: 'Main Course', imageUrl: 'https://picsum.photos/seed/pizza/400' },
  { id: '2', name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.', price: 8.99, category: 'Appetizer', imageUrl: 'https://picsum.photos/seed/salad/400' },
  { id: '3', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, pancetta, and black pepper.', price: 15.50, category: 'Main Course', imageUrl: 'https://picsum.photos/seed/pasta/400' },
  { id: '4', name: 'Tiramisu', description: 'Coffee-flavoured Italian dessert.', price: 7.00, category: 'Dessert', imageUrl: 'https://picsum.photos/seed/tiramisu/400' },
  { id: '5', name: 'Bruschetta', description: 'Toasted bread with garlic, tomatoes, and olive oil.', price: 6.50, category: 'Appetizer', imageUrl: 'https://picsum.photos/seed/bruschetta/400' },
  { id: '6', name: 'House Red Wine', description: 'A glass of our finest red wine.', price: 8.00, category: 'Drink', imageUrl: 'https://picsum.photos/seed/wine/400' },
];

let mockUsers: User[] = [
  { id: 'user-1', name: 'John Doe', email: 'user@example.com', role: 'user', addresses: ['123 Main St, Anytown, USA'] },
  { id: 'admin-1', name: 'Admin', email: 'admin@example.com', role: 'admin' },
];

let mockOrders: Order[] = [
    { id: 'order-1', userId: 'user-1', items: [{ dish: mockDishes[0], quantity: 2 }], total: 25.98, status: 'Completed', createdAt: new Date() }
];

let mockReservations: Reservation[] = [
    { id: 'res-1', name: 'Jane Smith', phone: '555-0101', date: '2023-10-28', time: '19:00', guests: 2, status: 'Confirmed' }
];
// --- END MOCK DATABASE ---

const simulateDelay = <T,>(data: T): Promise<T> => 
  new Promise(resolve => setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), 500));

// --- PUBLIC API ---
export const getMenu = () => simulateDelay(mockDishes);
export const getDish = (id: string) => {
    const dish = mockDishes.find(d => d.id === id);
    return dish ? simulateDelay(dish) : Promise.reject(new Error('Dish not found'));
}

// --- AUTH API ---
export const login = (email: string, password: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (user) { // In a real app, you'd check a hashed password
        const token = `mock-jwt-for-${user.id}`;
        return simulateDelay({ user, token });
    }
    return Promise.reject(new Error('Invalid credentials or user does not exist'));
}

export const register = (name: string, email: string, password: string) => {
    if (mockUsers.some(u => u.email === email)) {
        return Promise.reject(new Error('User with this email already exists'));
    }
    const newUser: User = { id: `user-${Date.now()}`, name, email, role: 'user' };
    mockUsers.push(newUser);
    const token = `mock-jwt-for-${newUser.id}`;
    return simulateDelay({ user: newUser, token });
}

export const getProfile = (token: string) => {
    const userId = token.replace('mock-jwt-for-', '');
    const user = mockUsers.find(u => u.id === userId);
    return user ? simulateDelay(user) : Promise.reject(new Error('Invalid token'));
}

// --- ORDERING API ---
export const submitOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = { 
        ...orderData, 
        id: `order-${Date.now()}`, 
        createdAt: new Date(),
        status: 'Pending'
    };
    mockOrders.push(newOrder);
    return simulateDelay(newOrder);
}

export const getOrder = (id: string) => {
    const order = mockOrders.find(o => o.id === id);
    return order ? simulateDelay(order) : Promise.reject(new Error('Order not found'));
}

export const getOrderHistory = (userId: string) => {
    const orders = mockOrders.filter(o => o.userId === userId);
    return simulateDelay(orders.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
}

// --- RESERVATION API ---
export const submitReservation = (resData: Omit<Reservation, 'id' | 'status'>) => {
    const newReservation: Reservation = {
        ...resData,
        id: `res-${Date.now()}`,
        status: 'Pending'
    };
    mockReservations.push(newReservation);
    return simulateDelay(newReservation);
}

// --- ADMIN API ---
export const getDashboardStats = () => {
    const stats = {
        totalRevenue: mockOrders.filter(o=>o.status === 'Completed').reduce((sum, o) => sum + o.total, 0),
        todaysOrders: mockOrders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length,
        pendingOrders: mockOrders.filter(o => o.status === 'Pending').length,
        totalCustomers: mockUsers.filter(u => u.role === 'user').length
    };
    return simulateDelay(stats);
}

export const getOrders = () => simulateDelay(mockOrders.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));

export const updateOrderStatus = (id: string, status: OrderStatus) => {
    const order = mockOrders.find(o => o.id === id);
    if (order) {
        order.status = status;
        return simulateDelay(order);
    }
    return Promise.reject(new Error('Order not found'));
}

export const addMenuItem = (dishData: Omit<Dish, 'id'>) => {
    const newDish: Dish = { ...dishData, id: `dish-${Date.now()}` };
    mockDishes.push(newDish);
    return simulateDelay(newDish);
}

export const updateMenuItem = (id: string, dishData: Partial<Dish>) => {
    const index = mockDishes.findIndex(d => d.id === id);
    if (index > -1) {
        mockDishes[index] = { ...mockDishes[index], ...dishData };
        return simulateDelay(mockDishes[index]);
    }
    return Promise.reject(new Error('Dish not found'));
}

export const deleteMenuItem = (id: string) => {
    mockDishes = mockDishes.filter(d => d.id !== id);
    return simulateDelay({ success: true });
}

export const getUsers = () => simulateDelay(mockUsers);

export const getReservations = () => simulateDelay(mockReservations.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

export const updateReservationStatus = (id: string, status: 'Confirmed' | 'Declined') => {
    const res = mockReservations.find(r => r.id === id);
    if (res) {
        res.status = status;
        return simulateDelay(res);
    }
    return Promise.reject(new Error('Reservation not found'));
}
