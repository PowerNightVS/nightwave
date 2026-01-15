import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
export function ServerCounter() {
  const [count, setCount] = useState(0);
  const spring = useSpring(0, {
    bounce: 0,
    duration: 2000
  });
  const display = useTransform(spring, current => Math.round(current).toLocaleString());
  useEffect(() => {
    spring.set(15847);
  }, [spring]);
  return <div className="relative p-6 bg-cyber-dark/80 border border-cyber-gray backdrop-blur-sm rounded-lg overflow-hidden group hover:border-cyber-purple transition-colors duration-300">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(176,38,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-cyber-purple font-mono text-sm tracking-widest uppercase mb-2">
          Live Servers
        </span>
        <motion.div className="text-4xl md:text-5xl font-display font-bold text-white text-glow-purple">
          {display}
        </motion.div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 mt-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs text-gray-400 font-mono">SYSTEM ONLINE</span>
        </div>
      </div>
    </div>;
}