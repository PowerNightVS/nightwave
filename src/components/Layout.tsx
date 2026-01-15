import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GridBackground } from './GridBackground';
import { Menu, X, Music, Github, Twitter, Disc } from 'lucide-react';
export function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [{
    path: '/',
    label: 'Home'
  }, {
    path: '/features',
    label: 'Features'
  }, {
    path: '/streams',
    label: 'Streams'
  }, {
    path: '/about',
    label: 'About'
  }, {
    path: '/support',
    label: 'Support'
  }];
  return <GridBackground>
      <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-cyber-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 flex items-center justify-center bg-cyber-dark border border-cyber-cyan rounded-lg group-hover:shadow-neon-cyan transition-all duration-300">
                  <Music className="w-6 h-6 text-cyber-cyan" />
                </div>
                <span className="font-display text-2xl font-bold text-white tracking-wider group-hover:text-glow-cyan transition-all duration-300">
                  NIGHT<span className="text-cyber-cyan">WAVE</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map(link => <Link key={link.path} to={link.path} className={`relative font-mono text-sm uppercase tracking-widest hover:text-cyber-cyan transition-colors duration-300 ${location.pathname === link.path ? 'text-cyber-cyan' : 'text-gray-400'}`}>
                    {link.label}
                    {location.pathname === link.path && <motion.div layoutId="nav-underline" className="absolute -bottom-8 left-0 right-0 h-0.5 bg-cyber-cyan shadow-neon-cyan" />}
                  </Link>)}
                <button className="px-6 py-2 bg-cyber-pink/10 border border-cyber-pink text-cyber-pink font-mono text-sm hover:bg-cyber-pink hover:text-white transition-all duration-300 rounded-sm hover:shadow-neon-pink">
                  ADD TO DISCORD
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-white hover:text-cyber-cyan" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMobileMenuOpen && <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="md:hidden bg-cyber-black border-b border-white/10">
              <div className="px-4 pt-2 pb-8 space-y-4">
                {navLinks.map(link => <Link key={link.path} to={link.path} className="block font-mono text-lg text-gray-300 hover:text-cyber-cyan" onClick={() => setIsMobileMenuOpen(false)}>
                    {link.label}
                  </Link>)}
              </div>
            </motion.div>}
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-20">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-cyber-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Music className="w-6 h-6 text-cyber-purple" />
                  <span className="font-display text-xl font-bold text-white">
                    NIGHT<span className="text-cyber-purple">WAVE</span>
                  </span>
                </div>
                <p className="text-gray-400 max-w-sm font-body">
                  The next generation music bot for Discord. High fidelity
                  audio, advanced filters, and cyberpunk aesthetics.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-cyber-cyan mb-4">LINKS</h3>
                <ul className="space-y-2 text-gray-400 font-body">
                  <li>
                    <Link to="/about" className="hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/features" className="hover:text-white transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/support" className="hover:text-white transition-colors">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-cyber-pink mb-4">SOCIAL</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-white hover:shadow-neon-cyan transition-all p-2 rounded-full border border-transparent hover:border-cyber-cyan">
                    <Disc className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white hover:shadow-neon-purple transition-all p-2 rounded-full border border-transparent hover:border-cyber-purple">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white hover:shadow-neon-pink transition-all p-2 rounded-full border border-transparent hover:border-cyber-pink">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm font-mono">
                © 2024 NIGHTWAVE BOT. ALL SYSTEMS OPERATIONAL.
              </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse delay-75" />
                <div className="w-2 h-2 bg-cyber-pink rounded-full animate-pulse delay-150" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </GridBackground>;
}