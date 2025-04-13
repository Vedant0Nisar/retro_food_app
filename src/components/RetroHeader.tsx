
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface RetroHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const RetroHeader: React.FC<RetroHeaderProps> = ({ title, showBackButton = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 w-full bg-retro-teal text-white py-4 px-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBackButton && location.pathname !== '/' && (
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 rounded-full hover:bg-retro-teal/80"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-xl md:text-2xl logo-text">{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default RetroHeader;
