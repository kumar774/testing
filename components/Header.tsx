
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservation' },
  ];

  return (
    <header className="bg-brand-dark/80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-brand-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold font-serif text-brand-primary">
              Gourmet Grove
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-brand-light hover:text-brand-primary transition duration-300">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-brand-light hover:text-brand-primary transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-accent text-brand-dark text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <Link to="/profile" className="text-brand-light hover:text-brand-primary transition duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-brand-secondary rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="block px-4 py-2 text-sm text-brand-light/70">{user.name}</span>
                  {user.role === 'admin' && <Link to="/admin" className="block px-4 py-2 text-sm text-brand-light hover:bg-brand-primary">Admin Panel</Link>}
                  <Link to="/profile" className="block px-4 py-2 text-sm text-brand-light hover:bg-brand-primary">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-brand-light hover:bg-brand-primary">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block text-brand-light hover:text-brand-primary transition duration-300">Login</Link>
            )}
             <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-light hover:text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
           <div className="md:hidden pb-4">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} className="block py-2 text-center text-brand-light hover:text-brand-primary transition duration-300" onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
              {!user && <Link to="/auth" className="block py-2 text-center text-brand-light hover:text-brand-primary transition duration-300" onClick={() => setIsMenuOpen(false)}>Login</Link>}
           </div>
        )}
      </div>
    </header>
  );
};

export default Header;
