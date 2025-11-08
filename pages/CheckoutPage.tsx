
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import * as api from '../services/api';

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '', address: '' });

  const taxes = cartTotal * 0.08;
  const total = cartTotal + taxes;

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async () => {
    try {
        const orderData = {
            items: cartItems,
            total,
            ...(user ? { userId: user.id } : { guestDetails })
        };
        const newOrder = await api.submitOrder(orderData);
        clearCart();
        navigate(`/order-confirmation/${newOrder.id}`);
    } catch (error) {
        console.error("Failed to submit order", error);
        alert("There was an issue placing your order. Please try again.");
    }
  };

  if (cartItems.length === 0) {
      navigate("/menu");
      return null;
  }

  const renderStep = () => {
    switch (step) {
      case 1: // Delivery Details
        return (
          <div>
            <h2 className="text-2xl font-semibold text-brand-primary mb-6">Delivery Details</h2>
            {user ? (
              <div>
                <p>Delivering to: {user.name}</p>
                <p>Address: {user.addresses?.[0] || 'Please add an address in your profile.'}</p>
                <button onClick={() => setStep(2)} className="w-full mt-6 bg-brand-primary text-white font-bold py-3 rounded-md hover:bg-brand-accent transition">Continue to Summary</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Full Name" required value={guestDetails.name} onChange={handleDetailsChange} className="bg-brand-dark border border-brand-light/20 p-2 rounded" />
                  <input type="email" name="email" placeholder="Email" required value={guestDetails.email} onChange={handleDetailsChange} className="bg-brand-dark border border-brand-light/20 p-2 rounded" />
                  <input type="tel" name="phone" placeholder="Phone Number" required value={guestDetails.phone} onChange={handleDetailsChange} className="bg-brand-dark border border-brand-light/20 p-2 rounded" />
                  <input type="text" name="address" placeholder="Delivery Address" required value={guestDetails.address} onChange={handleDetailsChange} className="md:col-span-2 bg-brand-dark border border-brand-light/20 p-2 rounded" />
                </div>
                <button type="submit" className="w-full mt-6 bg-brand-primary text-white font-bold py-3 rounded-md hover:bg-brand-accent transition">Continue to Summary</button>
              </form>
            )}
          </div>
        );
      case 2: // Order Summary
        return (
          <div>
            <h2 className="text-2xl font-semibold text-brand-primary mb-6">Order Summary</h2>
            <div className="space-y-2 mb-4">
                {cartItems.map(item => (
                    <div key={item.dish.id} className="flex justify-between">
                        <span>{item.dish.name} x {item.quantity}</span>
                        <span>${(item.dish.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-brand-light/20 pt-4 space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
             <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)} className="bg-brand-light/20 text-white font-bold py-3 px-6 rounded-md hover:bg-brand-light/30 transition">Back</button>
                <button onClick={() => setStep(3)} className="bg-brand-primary text-white font-bold py-3 px-6 rounded-md hover:bg-brand-accent transition">Continue to Payment</button>
            </div>
          </div>
        );
      case 3: // Payment
        return (
          <div>
            <h2 className="text-2xl font-semibold text-brand-primary mb-6">Payment</h2>
            <div className="bg-brand-dark p-6 rounded-md border border-brand-accent text-center">
                <p className="text-brand-light/80 mb-4">This is a placeholder for a payment gateway like Stripe or Razorpay. Clicking "Place Order" will simulate a successful payment.</p>
                <div className="flex justify-between mt-6">
                    <button onClick={() => setStep(2)} className="bg-brand-light/20 text-white font-bold py-3 px-6 rounded-md hover:bg-brand-light/30 transition">Back</button>
                    <button onClick={handleSubmitOrder} className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-500 transition">Place Order</button>
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
         <h1 className="text-4xl font-serif text-center text-brand-primary mb-8">Checkout</h1>
         <div className="bg-brand-secondary p-8 rounded-lg shadow-lg">
            {renderStep()}
         </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
