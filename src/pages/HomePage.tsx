import React from 'react';
import { motion } from 'framer-motion';
import { BotAvatar } from '../components/BotAvatar';
import { NeonButton } from '../components/NeonButton';
import { NeonInput } from '../components/NeonInput';
import { ServerCounter } from '../components/ServerCounter';
import { Zap, Shield, Radio } from 'lucide-react';
export function HomePage() {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-8 z-10">
            <div className="inline-block px-4 py-1 border border-cyber-cyan/30 bg-cyber-cyan/5 rounded-full">
              <span className="font-mono text-cyber-cyan text-sm tracking-widest">
                SYSTEM V2.0 ONLINE
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white text-glow-cyan">NEXT GEN</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-pink">
                AUDIO SYSTEM
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl font-body max-w-xl border-l-2 border-cyber-purple pl-6">
              Experience high-fidelity music playback with advanced filters,
              24/7 uptime, and a cyberpunk aesthetic for your Discord server.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://discord.com/oauth2/authorize?client_id=1359486500995203&permissions=3699842303917120&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
                <NeonButton variant="primary" icon={<Zap className="w-5 h-5" />}>
                  Invite Bot
                </NeonButton>
              </a>
              <NeonButton variant="secondary" icon={<Radio className="w-5 h-5" />}>
                View Dashboard
              </NeonButton>
            </div>

            <div className="pt-8">
              <ServerCounter />
            </div>
          </motion.div>

          {/* Visual Content */}
          <div className="relative flex justify-center items-center z-10">
            <BotAvatar />
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-md mx-auto bg-cyber-dark/90 border border-cyber-gray p-8 rounded-lg backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              ACCESS TERMINAL
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              AUTHENTICATE VIA DISCORD OAUTH
            </p>
          </div>

          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <NeonInput label="Username / ID" id="username" placeholder="Enter your Discord tag" type="text" />
            <NeonInput label="Access Key" id="password" placeholder="••••••••" type="password" />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" className="accent-cyber-cyan" />
                <span>Remember Session</span>
              </label>
              <a href="#" className="text-cyber-cyan hover:text-white transition-colors">
                Lost Key?
              </a>
            </div>

            <NeonButton variant="primary" fullWidth>
              Initialize Link
            </NeonButton>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 font-mono">
              SECURE CONNECTION ESTABLISHED. END-TO-END ENCRYPTION ACTIVE.
            </p>
          </div>
        </div>
      </section>
    </div>;
}