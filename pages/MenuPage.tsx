
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import { Dish } from '../types';

const DishCard: React.FC<{ dish: Dish }> = ({ dish }) => (
  <Link to={`/dish/${dish.id}`} className="block bg-brand-secondary rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300">
    <div className="relative">
      <img src={dish.imageUrl} alt={dish.name} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-brand-light mb-2 truncate">{dish.name}</h3>
      <p className="text-brand-light/70 text-sm mb-4 truncate h-10">{dish.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-brand-primary">${dish.price.toFixed(2)}</span>
        <span className="text-xs font-medium bg-brand-primary/20 text-brand-primary px-2 py-1 rounded-full">{dish.category}</span>
      </div>
    </div>
  </Link>
);


const MenuPage: React.FC = () => {
  const [menu, setMenu] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await api.getMenu();
        setMenu(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(menu.map(d => d.category)))], [menu]);

  const filteredMenu = useMemo(() => {
    return menu
      .filter(dish => selectedCategory === 'All' || dish.category === selectedCategory)
      .filter(dish => dish.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [menu, selectedCategory, searchTerm]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div></div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-primary">Our Menu</h1>
        <p className="text-lg text-brand-light/80 mt-2">Crafted with the finest ingredients and culinary passion.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/3">
           <input
            type="text"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-secondary text-brand-light border border-brand-light/20 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-secondary text-brand-light hover:bg-brand-primary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMenu.length > 0 ? (
          filteredMenu.map(dish => <DishCard key={dish.id} dish={dish} />)
        ) : (
          <p className="col-span-full text-center text-brand-light/70 text-lg">No dishes found. Try adjusting your search or filters.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
