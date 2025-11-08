
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const subtotal = cartTotal;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + taxes;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-brand-primary mb-8 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-brand-light/80 mb-4">Your cart is empty.</p>
          <Link to="/menu" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-accent transition duration-300">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-brand-secondary p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b border-brand-light/20 pb-4">
                <h2 className="text-2xl font-semibold text-brand-light">Order Items</h2>
                <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Clear All</button>
            </div>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.dish.id} className="flex items-center justify-between p-4 bg-brand-dark rounded-md">
                  <div className="flex items-center gap-4">
                    <img src={item.dish.imageUrl} alt={item.dish.name} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                      <h3 className="font-semibold text-brand-light">{item.dish.name}</h3>
                      <p className="text-sm text-brand-light/70">${item.dish.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-brand-light/20 rounded-md">
                      <button onClick={() => updateQuantity(item.dish.id, item.quantity - 1)} className="px-3 py-1 hover:bg-brand-primary/20">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.dish.id, item.quantity + 1)} className="px-3 py-1 hover:bg-brand-primary/20">+</button>
                    </div>
                    <span className="font-semibold w-20 text-right">${(item.dish.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.dish.id)} className="text-red-500 hover:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brand-secondary p-6 rounded-lg shadow-lg h-fit">
            <h2 className="text-2xl font-semibold text-brand-light mb-4 border-b border-brand-light/20 pb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (8%)</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl text-brand-light pt-4 border-t border-brand-light/20 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="block w-full text-center mt-6 bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-accent transition duration-300">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
