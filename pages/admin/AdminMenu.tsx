
import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { Dish } from '../../types';

const AdminMenu: React.FC = () => {
  const [menu, setMenu] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const data = await api.getMenu();
      setMenu(data);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingDish(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('Are you sure you want to delete this item?')) {
        try {
            await api.deleteMenuItem(id);
            fetchMenu();
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setEditingDish(null);
    fetchMenu();
  };
  
  if (loading) return <p>Loading menu...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-light">Menu Management</h1>
        <button onClick={handleAddNew} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-accent">Add New Dish</button>
      </div>

      <div className="bg-brand-secondary shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-brand-dark">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map(dish => (
              <tr key={dish.id} className="border-b border-brand-dark hover:bg-brand-dark/50">
                <td className="p-4">{dish.name}</td>
                <td className="p-4">{dish.category}</td>
                <td className="p-4">${dish.price.toFixed(2)}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(dish)} className="text-blue-400 hover:underline mr-4">Edit</button>
                  <button onClick={() => handleDelete(dish.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <DishEditModal dish={editingDish} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
    </div>
  );
};

const DishEditModal: React.FC<{ dish: Dish | null; onClose: () => void; onSave: () => void; }> = ({ dish, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Dish>>(
        dish || { name: '', description: '', price: 0, category: 'Appetizer', imageUrl: 'https://picsum.photos/400' }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (dish) {
                await api.updateMenuItem(dish.id, formData);
            } else {
                await api.addMenuItem(formData as Omit<Dish, 'id'>);
            }
            onSave();
        } catch (error) {
            console.error("Failed to save dish", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-brand-secondary p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">{dish ? 'Edit Dish' : 'Add New Dish'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Dish Name" value={formData.name} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded" required />
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded" required step="0.01" />
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded" required>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drink">Drink</option>
                    </select>
                    <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded" required />
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="bg-brand-light/20 py-2 px-4 rounded">Cancel</button>
                        <button type="submit" className="bg-brand-primary text-white py-2 px-4 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminMenu;
