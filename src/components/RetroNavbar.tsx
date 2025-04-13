
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, Clock, Settings } from 'lucide-react';

const RetroNavbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/' },
    { icon: <Menu size={22} />, label: 'Menu', path: '/menu' },
    { icon: <Clock size={22} />, label: 'History', path: '/history' },
    { icon: <Settings size={22} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t-2 border-retro-black py-2">
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-1 ${
              currentPath === item.path
                ? 'text-retro-teal font-medium'
                : 'text-retro-black'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default RetroNavbar;
