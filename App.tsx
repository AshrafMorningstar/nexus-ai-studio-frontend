import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { NexusHub } from './components/NexusHub';
import { RoleDashboard } from './components/sections/RoleDashboard';
import { RoleType } from './types';
import { PROFILES } from './constants';

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  // Mouse tracking for dynamic background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement for the background
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 overflow-hidden relative">
      
      {/* Dynamic Background Blob */}
      <motion.div 
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none z-0"
        style={{ 
            x: springX, 
            y: springY,
            translateX: '-50%',
            translateY: '-50%'
        }}
      />
      <div className="fixed inset-0 bg-slate-950/80 z-0 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
            {!selectedRole ? (
            <motion.div
                key="hub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-screen"
            >
                <NexusHub onSelectRole={setSelectedRole} />
            </motion.div>
            ) : (
            <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full min-h-screen"
            >
                <RoleDashboard 
                    profile={PROFILES[selectedRole]} 
                    onBack={() => setSelectedRole(null)} 
                />
            </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;