
import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { Order, OrderStatus } from '../../types';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await api.updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  
  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-light mb-8">Order Management</h1>
      <div className="bg-brand-secondary shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-dark">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-brand-dark hover:bg-brand-dark/50">
                  <td className="p-4 font-mono text-sm">{order.id.substring(0,8)}...</td>
                  <td className="p-4">{order.guestDetails?.name || `User ID: ${order.userId?.substring(0, 6)}`}</td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-4">${order.total.toFixed(2)}</td>
                  <td className="p-4">{order.status}</td>
                  <td className="p-4">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-brand-dark border border-brand-light/20 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
