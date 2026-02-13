import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/10 ${className}`}
    >
      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium">Back to Nexus</span>
    </button>
  );
};
