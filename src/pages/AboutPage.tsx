import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Shield, Code } from 'lucide-react';
export function AboutPage() {
  const stats = [{
    label: 'Uptime',
    value: '99.9%',
    color: 'text-cyber-cyan'
  }, {
    label: 'Latency',
    value: '12ms',
    color: 'text-cyber-purple'
  }, {
    label: 'Users',
    value: '2.4M+',
    color: 'text-cyber-pink'
  }];
  return <div className="max-w-7xl mx-auto px-4 py-20">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-center mb-16">
        <h1 className="font-display text-5xl font-bold text-white mb-4 text-glow-purple">
          SYSTEM CORE
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-body">
          NightWave is built on advanced audio processing architecture designed
          for the modern digital age.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {stats.map((stat, index) => <motion.div key={stat.label} initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: index * 0.1
      }} className="bg-cyber-dark/50 border border-cyber-gray p-8 text-center rounded-lg hover:border-cyber-cyan transition-colors duration-300 group">
            <h3 className="font-mono text-gray-500 text-sm uppercase tracking-widest mb-2">
              {stat.label}
            </h3>
            <p className={`font-display text-6xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
              {stat.value}
            </p>
          </motion.div>)}
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="font-display text-3xl text-white">ORIGIN PROTOCOL</h2>
          <p className="text-gray-300 leading-relaxed">
            Initiated in 2023, NightWave was designed to bridge the gap between
            high-fidelity audio streaming and community interaction. Unlike
            standard bots, NightWave utilizes a proprietary audio engine that
            enhances bass frequencies and clarifies vocals in real-time.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our infrastructure is distributed across 12 global regions, ensuring
            minimal latency regardless of your server's location. The system is
            maintained by a collective of audio engineers and code enthusiasts
            dedicated to the cyberpunk ethos.
          </p>
        </div>
        <div className="relative h-80 bg-cyber-dark border border-cyber-gray rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="font-mono text-cyber-cyan text-xs mb-1">
              SERVER ROOM 04
            </div>
            <div className="font-display text-xl text-white">TOKYO NODE</div>
          </div>
        </div>
      </div>
    </div>;
}