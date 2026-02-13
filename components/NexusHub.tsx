import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { PROFILES } from '../constants';
import { RoleType } from '../types';

interface NexusHubProps {
  onSelectRole: (role: RoleType) => void;
}

export const NexusHub: React.FC<NexusHubProps> = ({ onSelectRole }) => {
  const [isHovering, setIsHovering] = useState<RoleType | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for rotation
  const rotateX = useMotionValue(-10);
  const rotateY = useMotionValue(45);

  // Spring physics for smooth movement and inertia
  const springConfig = { damping: 20, stiffness: 150, mass: 1 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Velocity tracking for inertia
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Auto-rotation loop
  useAnimationFrame((t, delta) => {
    if (!isDragging && !isHovering) {
      // Apply momentum or auto-rotate
      if (Math.abs(velocityX.current) > 0.01 || Math.abs(velocityY.current) > 0.01) {
        // Friction
        velocityX.current *= 0.95;
        velocityY.current *= 0.95;
        
        rotateY.set(rotateY.get() + velocityX.current);
        rotateX.set(rotateX.get() - velocityY.current);
      } else {
        // Default auto-rotation
        rotateY.set(rotateY.get() + 0.05 * (delta / 16));
      }
    }
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    // Stop momentum
    velocityX.current = 0;
    velocityY.current = 0;
    // Capture pointer to track outside container
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    lastMousePos.current = { x: e.clientX, y: e.clientY };

    // Update rotation based on drag
    const sensitivity = 0.3;
    const newY = rotateY.get() + deltaX * sensitivity;
    const newX = rotateX.get() - deltaY * sensitivity;

    rotateY.set(newY);
    rotateX.set(newX);

    // Update velocity for inertia
    velocityX.current = deltaX * sensitivity;
    velocityY.current = deltaY * sensitivity;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, role: RoleType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectRole(role);
    }
  };

  // Cube dimensions
  const cubeSize = 280; // px
  const translateZ = cubeSize / 2;

  // CSS for the 3D cube faces
  const getFaceTransform = (index: number) => {
    const tz = `translateZ(${translateZ}px)`;
    switch (index) {
      case 0: return `rotateY(0deg) ${tz}`; // Front
      case 1: return `rotateY(90deg) ${tz}`; // Right
      case 2: return `rotateY(180deg) ${tz}`; // Back
      case 3: return `rotateY(-90deg) ${tz}`; // Left
      case 4: return `rotateX(90deg) ${tz}`; // Top
      case 5: return `rotateX(-90deg) ${tz}`; // Bottom
      default: return '';
    }
  };

  const roles = Object.values(PROFILES);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        
        <div className="relative z-10 flex flex-col items-center mb-16 pointer-events-none select-none">
            <motion.h1 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4 text-center tracking-tight"
            >
                ASHRAF MORNINGSTAR
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-400 text-lg md:text-xl tracking-wide uppercase"
            >
                The Nexus Portfolio
            </motion.p>
        </div>

      {/* 3D Scene Container */}
      <div 
        ref={containerRef}
        className="relative z-20 outline-none touch-none"
        style={{ width: cubeSize, height: cubeSize, cursor: isDragging ? 'grabbing' : 'grab' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        tabIndex={-1}
        role="application"
        aria-label="3D Role Selection Cube"
      >
        <motion.div
          className="w-full h-full relative"
          style={{ 
            transformStyle: 'preserve-3d',
            rotateX: springRotateX,
            rotateY: springRotateY
          }}
        >
            {/* Roles Faces */}
            {roles.map((role, idx) => {
                const Icon = role.icon;
                return (
                    <motion.button
                        key={role.id}
                        className={`absolute inset-0 flex flex-col items-center justify-center p-6 border-2 border-${role.color}-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:border-${role.color}-400 focus:outline-none focus:ring-4 focus:ring-${role.color}-500/50`}
                        style={{ 
                            transform: getFaceTransform(idx),
                            backfaceVisibility: 'hidden',
                        }}
                        onMouseEnter={() => setIsHovering(role.id)}
                        onMouseLeave={() => setIsHovering(null)}
                        onClick={(e) => {
                            // Prevent click if we were just dragging
                            if (Math.abs(velocityX.current) < 0.5 && Math.abs(velocityY.current) < 0.5) {
                                onSelectRole(role.id);
                            }
                        }}
                        onKeyDown={(e) => handleKeyDown(e, role.id)}
                        aria-label={`Select ${role.title} Role`}
                        tabIndex={0}
                    >
                        <div 
                          className={`p-4 rounded-full bg-${role.color}-500/10 mb-4 transition-transform duration-300 transform group-hover:scale-110 group-hover:rotate-12`}
                        >
                            <Icon className={`w-10 h-10 text-${role.color}-400`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 select-none">{role.shortTitle}</h3>
                        <p className="text-xs text-slate-400 text-center line-clamp-2 select-none">{role.tagline}</p>
                        
                        <div className={`mt-4 px-3 py-1 rounded-full border border-${role.color}-500/30 text-${role.color}-400 text-xs uppercase tracking-wider group-hover:bg-${role.color}-500/10 transition-colors select-none`}>
                            Explore
                        </div>
                    </motion.button>
                );
            })}
             {/* Top and Bottom Caps to close the cube */}
             {[4, 5].map((idx) => (
                <div 
                    key={idx}
                    className="absolute inset-0 bg-slate-800/95 border border-slate-700"
                    style={{ 
                        transform: getFaceTransform(idx),
                        backfaceVisibility: 'hidden'
                    }}
                />
             ))}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-slate-500 text-sm pointer-events-none select-none"
      >
        <p>Drag to rotate &bull; Click to explore</p>
      </motion.div>
    </div>
  );
};