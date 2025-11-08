
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../services/api';
import { Order } from '../types';

const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      try {
        const data = await api.getOrder(id);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div></div>;
  }

  if (!order) {
    return (
        <div className="text-center py-20">
            <h1 className="text-2xl text-red-500">Order Not Found</h1>
            <p className="mt-4">We couldn't find the order details. Please check your order history.</p>
             <Link to="/" className="mt-6 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-accent transition">Back to Home</Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-brand-secondary p-8 rounded-lg shadow-lg text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1 className="text-3xl font-serif text-brand-primary mb-2">Thank You For Your Order!</h1>
        <p className="text-brand-light/80 mb-6">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
        
        <div className="text-left bg-brand-dark p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-brand-light/20 pb-2">Order Summary (ID: {order.id})</h2>
            <div className="space-y-2 mb-4">
                {order.items.map(item => (
                    <div key={item.dish.id} className="flex justify-between">
                        <span>{item.dish.name} x {item.quantity}</span>
                        <span>${(item.dish.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-brand-light/20 pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
            </div>
             <p className="mt-4 text-sm text-brand-light/70">Estimated Delivery Time: 30-45 minutes.</p>
        </div>
        
        <Link to="/menu" className="mt-8 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-accent transition">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
