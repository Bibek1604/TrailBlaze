// src/Components/navbar/Nav.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Bell, LogOut } from 'lucide-react';
import { useLogout } from '../hooks/Auth';
import useAuthStore from '../store/AuthStore';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const { mutate: logout, isLoading } = useLogout();
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        clearUser();
        navigate('/login');
      },
    });
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl lg:text-xl font-bold text-green-700">
              Ghumne Sathi              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-xl text-gray-600 hover:text-green-700 px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className="text-xl text-gray-600 hover:text-green-700 px-3 py-2 rounded-md font-medium"
            >
              Destinations
            </Link>
            <Link
              to="/blogs"
              className="text-xl text-gray-600 hover:text-green-700 px-3 py-2 rounded-md font-medium"
            >
              Write Blog
            </Link>
            <Link
              to="/dashboard"
              className="text-xl text-gray-600 hover:text-green-700 px-3 py-2 rounded-md font-medium"
            >
              Dashboard
            </Link>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-green-700 focus:outline-none">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-xl text-gray-600 hover:text-green-700 focus:outline-none"
                >
                  <User className="h-6 w-6" />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform ${isProfileOpen ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
                >
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="flex items-center w-full px-4 py-2 text-xl text-red-700 hover:bg-gray-100 disabled:opacity-50 transition-all duration-300"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {isLoading ? 'Signing out...' : 'Sign out'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-xl px-3 py-2 rounded-md font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className="block text-xl px-3 py-2 rounded-md font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50"
            >
              Destinations
            </Link>
            <Link
              to="/blogs"
              className="block text-xl px-3 py-2 rounded-md font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50"
            >
              Write Blog
            </Link>
            <Link
              to="/dashboard"
              className="block text-xl px-3 py-2 rounded-md font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50"
            >
              Dashboard
            </Link>
            <div className="px-3 py-2 space-y-2">
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="flex items-center w-full px-3 py-2 rounded-md text-xl font-medium text-red-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                {isLoading ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
