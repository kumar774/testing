
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { Dish } from '../types';
import { useCart } from '../context/CartContext';

const DishDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchDish = async () => {
      try {
        const data = await api.getDish(id);
        setDish(data);
      } catch (error) {
        console.error("Failed to fetch dish:", error);
        navigate('/menu');
      } finally {
        setLoading(false);
      }
    };
    fetchDish();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (dish) {
      addToCart(dish, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div></div>;
  }

  if (!dish) {
    return <div className="text-center py-20 text-xl text-brand-light">Dish not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-brand-secondary rounded-lg shadow-xl overflow-hidden md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
        <div className="p-4">
          <img src={dish.imageUrl} alt={dish.name} className="w-full h-auto object-cover rounded-lg aspect-square" />
        </div>
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-serif text-brand-primary mb-4">{dish.name}</h1>
          <span className="text-xs font-medium bg-brand-primary/20 text-brand-primary px-2 py-1 rounded-full mb-4 self-start">{dish.category}</span>
          <p className="text-brand-light/80 mb-6">{dish.description}</p>
          <p className="text-4xl font-bold text-brand-light mb-8">${dish.price.toFixed(2)}</p>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-brand-light/20 rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-xl hover:bg-brand-primary/20">-</button>
              <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-xl hover:bg-brand-primary/20">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-grow bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-accent transition-all duration-300 ${added ? 'bg-green-500' : ''}`}
            >
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
          
          <button onClick={() => navigate('/menu')} className="text-brand-primary hover:underline">
            &larr; Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishDetailPage;
