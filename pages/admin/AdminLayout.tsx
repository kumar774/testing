
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    }

    const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
        `flex items-center px-4 py-3 rounded-md transition-colors ${
        isActive ? 'bg-brand-primary text-white' : 'text-brand-light/80 hover:bg-brand-primary/20 hover:text-white'
        }`;

    return (
        <aside className="w-64 bg-brand-secondary p-4 flex flex-col">
            <h1 className="text-2xl font-bold font-serif text-brand-primary mb-8 px-2">Admin Panel</h1>
            <nav className="flex-grow space-y-2">
                <NavLink to="/admin/dashboard" className={navLinkClasses}>Dashboard</NavLink>
                <NavLink to="/admin/orders" className={navLinkClasses}>Orders</NavLink>
                <NavLink to="/admin/menu" className={navLinkClasses}>Menu</NavLink>
                <NavLink to="/admin/reservations" className={navLinkClasses}>Reservations</NavLink>
                <NavLink to="/admin/users" className={navLinkClasses}>Users</NavLink>
            </nav>
            <div>
                 <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-md text-brand-light/80 hover:bg-red-500/20 hover:text-white">
                    Logout
                </button>
            </div>
        </aside>
    );
}

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-brand-dark">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
