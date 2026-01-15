import React from 'react';
export function GridBackground({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="relative min-h-screen w-full overflow-hidden bg-cyber-black">
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
      backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
      transformOrigin: 'top center'
    }} />

      {/* Vignette & Gradient Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-cyber-black via-transparent to-cyber-black pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyber-black via-transparent to-cyber-black pointer-events-none" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>;
}