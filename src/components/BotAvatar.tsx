import React from 'react';
import { motion } from 'framer-motion';
export function BotAvatar() {
  return <motion.div animate={{
    y: [0, -20, 0]
  }} transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }} className="relative w-64 h-64 md:w-96 md:h-96">
      {/* Glow Effect Behind */}
      <div className="absolute inset-0 bg-cyber-cyan/20 blur-[60px] rounded-full animate-pulse" />

      <img src="/ChatGPT_Image_Nov_28,_2025,_02_55_29_AM.png" alt="NightWave Bot" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,240,255,0.6)]" />
    </motion.div>;
}