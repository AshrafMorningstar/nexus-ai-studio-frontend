import React from 'react';
import { motion } from 'framer-motion';

export const Spinner: React.FC<{ color?: string }> = ({ color = "text-white" }) => {
  return (
    <div className={`flex justify-center items-center ${color}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-4 border-current border-t-transparent rounded-full"
      />
    </div>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-slate-800/30 border border-white/5 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 w-3/4 bg-slate-700 rounded" />
        <div className="h-5 w-5 bg-slate-700 rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-slate-700/50 rounded" />
        <div className="h-4 w-5/6 bg-slate-700/50 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-slate-700 rounded" />
        <div className="h-5 w-16 bg-slate-700 rounded" />
      </div>
    </div>
  );
};