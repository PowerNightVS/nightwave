import React from 'react';
import { motion } from 'framer-motion';
interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}
export function NeonButton({
  variant = 'primary',
  children,
  className = '',
  icon,
  fullWidth = false,
  ...props
}: NeonButtonProps) {
  const baseStyles = 'relative px-8 py-3 font-display font-bold tracking-wider uppercase transition-all duration-300 clip-path-slant-button group overflow-hidden';
  const variants = {
    primary: 'bg-transparent border-2 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-black shadow-[0_0_10px_rgba(0,240,255,0.3)] hover:shadow-neon-cyan',
    secondary: 'bg-transparent border-2 border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white shadow-[0_0_10px_rgba(176,38,255,0.3)] hover:shadow-neon-purple'
  };
  return <motion.button whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }} className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      <div className="relative z-10 flex items-center justify-center gap-2">
        {icon}
        {children}
      </div>

      {/* Glitch effect overlay on hover could go here */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
    </motion.button>;
}