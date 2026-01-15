import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sliders, Radio, Mic2, Layers, Wifi } from 'lucide-react';
export function FeaturesPage() {
  const features = [{
    icon: <Music className="w-8 h-8" />,
    title: 'Hi-Fi Audio',
    description: 'Lossless audio streaming at 384kbps for crystal clear sound reproduction.',
    color: 'text-cyber-cyan',
    border: 'hover:border-cyber-cyan'
  }, {
    icon: <Sliders className="w-8 h-8" />,
    title: 'Audio Filters',
    description: 'Real-time bass boost, nightcore, vaporwave, and 8D audio effects.',
    color: 'text-cyber-purple',
    border: 'hover:border-cyber-purple'
  }, {
    icon: <Radio className="w-8 h-8" />,
    title: '24/7 Radio',
    description: 'Continuous playback of curated lo-fi, synthwave, and cyberpunk playlists.',
    color: 'text-cyber-pink',
    border: 'hover:border-cyber-pink'
  }, {
    icon: <Mic2 className="w-8 h-8" />,
    title: 'Karaoke Mode',
    description: 'Remove vocals from tracks instantly for community karaoke nights.',
    color: 'text-cyber-cyan',
    border: 'hover:border-cyber-cyan'
  }, {
    icon: <Layers className="w-8 h-8" />,
    title: 'Playlist Sync',
    description: 'Import playlists from Spotify, Apple Music, and SoundCloud seamlessly.',
    color: 'text-cyber-purple',
    border: 'hover:border-cyber-purple'
  }, {
    icon: <Wifi className="w-8 h-8" />,
    title: 'Low Latency',
    description: 'Global CDN ensures under 50ms ping for responsive playback controls.',
    color: 'text-cyber-pink',
    border: 'hover:border-cyber-pink'
  }];
  return <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl font-bold text-white mb-4 text-glow-cyan">
          MODULES
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-body">
          Equipped with state-of-the-art audio processing units for superior
          performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => <motion.div key={feature.title} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }} className={`bg-cyber-dark/40 border border-cyber-gray p-8 rounded-lg backdrop-blur-sm transition-all duration-300 group ${feature.border} hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:-translate-y-1`}>
            <div className={`mb-6 ${feature.color} p-3 bg-white/5 rounded-lg inline-block group-hover:scale-110 transition-transform duration-300`}>
              {feature.icon}
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed font-body">
              {feature.description}
            </p>
          </motion.div>)}
      </div>
    </div>;
}