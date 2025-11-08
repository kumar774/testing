
import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { Reservation } from '../../types';

const AdminReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await api.getReservations();
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'Confirmed' | 'Declined') => {
    try {
        await api.updateReservationStatus(id, status);
        fetchReservations();
    } catch (error) {
        console.error("Failed to update reservation:", error);
    }
  };

  if (loading) return <p>Loading reservations...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-light mb-8">Reservation Management</h1>
      <div className="bg-brand-secondary shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-brand-dark">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id} className="border-b border-brand-dark hover:bg-brand-dark/50">
                <td className="p-4">{res.name}</td>
                <td className="p-4">{res.phone}</td>
                <td className="p-4">{res.date} at {res.time}</td>
                <td className="p-4 text-center">{res.guests}</td>
                <td className="p-4">{res.status}</td>
                <td className="p-4">
                  {res.status === 'Pending' && (
                    <div className="flex gap-2">
                        <button onClick={() => handleStatusChange(res.id, 'Confirmed')} className="bg-green-600 text-white text-sm py-1 px-3 rounded hover:bg-green-500">Confirm</button>
                        <button onClick={() => handleStatusChange(res.id, 'Declined')} className="bg-red-600 text-white text-sm py-1 px-3 rounded hover:bg-red-500">Decline</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReservations;
