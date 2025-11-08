
import React, { useState } from 'react';
import * as api from '../services/api';

const ReservationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.submitReservation({ ...formData, guests: Number(formData.guests) });
      setStatus('success');
      setFormData({ name: '', phone: '', date: '', time: '', guests: 1 });
    } catch (error) {
      console.error("Reservation failed:", error);
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-primary">Book a Table</h1>
          <p className="text-lg text-brand-light/80 mt-2">Reserve your spot for an unforgettable dining experience.</p>
        </div>
        <div className="bg-brand-secondary p-8 rounded-lg shadow-lg">
          {status === 'success' ? (
            <div className="text-center">
              <h2 className="text-2xl text-green-500 mb-4">Reservation Request Sent!</h2>
              <p>Thank you for your request. We will contact you shortly to confirm your booking.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 bg-brand-primary text-white font-bold py-2 px-6 rounded-md hover:bg-brand-accent transition">Make another reservation</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full bg-brand-dark border border-brand-light/20 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"/>
              <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="w-full bg-brand-dark border border-brand-light/20 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full bg-brand-dark border border-brand-light/20 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"/>
                <input type="time" name="time" required value={formData.time} onChange={handleChange} className="w-full bg-brand-dark border border-brand-light/20 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"/>
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-brand-light/70 mb-2">Number of Guests</label>
                <input type="number" id="guests" name="guests" min="1" max="12" required value={formData.guests} onChange={handleChange} className="w-full bg-brand-dark border border-brand-light/20 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"/>
              </div>
              <button type="submit" disabled={status === 'submitting'} className="w-full bg-brand-primary text-white font-bold py-3 rounded-md hover:bg-brand-accent transition disabled:bg-brand-primary/50">
                {status === 'submitting' ? 'Submitting...' : 'Request Reservation'}
              </button>
              {status === 'error' && <p className="text-red-500 text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
