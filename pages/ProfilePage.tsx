
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import { Order } from '../types';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await api.getOrderHistory(user.id);
          setOrders(userOrders);
        } catch (error) {
          console.error("Failed to fetch order history:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return null;

  const getStatusColor = (status: Order['status']) => {
    switch(status) {
      case 'Completed': return 'text-green-500';
      case 'Pending': return 'text-yellow-500';
      case 'Out for Delivery': return 'text-blue-500';
      case 'Cancelled': return 'text-red-500';
      default: return 'text-gray-400';
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-brand-primary mb-8">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-brand-secondary p-6 rounded-lg shadow-lg h-fit">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            {/* Edit profile functionality can be added here */}
          </div>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Saved Addresses</h2>
          <div>
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((address, index) => <p key={index} className="bg-brand-dark p-2 rounded">{address}</p>)
            ) : (
              <p className="text-brand-light/70">No saved addresses.</p>
            )}
            {/* Add/manage addresses functionality can be added here */}
          </div>
        </div>
        <div className="md:col-span-2 bg-brand-secondary p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-brand-dark p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">Order ID: {order.id}</p>
                      <p className="text-sm text-brand-light/70">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-brand-light/70">Total: ${order.total.toFixed(2)}</p>
                    </div>
                    <span className={`font-bold ${getStatusColor(order.status)}`}>{order.status}</span>
                  </div>
                  <div className="mt-2 text-sm">
                    {order.items.map(item => (
                      <p key={item.dish.id} className="text-brand-light/80 ml-2">&bull; {item.dish.name} x {item.quantity}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-brand-light/70">You have no past orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
