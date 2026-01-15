import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, Clock, Users, Server } from 'lucide-react';
import { NeonButton } from '../components/NeonButton';

interface Stream {
  id: string;
  streamer: string;
  title: string;
  quality: string;
  url: string;
  viewers: number;
  startTime: string;
}

interface BotStatus {
  uptime: number;
  serversCount: number;
  membersCount: number;
  isOnline: boolean;
}

export function StreamsPage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [botStatus, setBotStatus] = useState<BotStatus | null>(null);
  const [user, setUser] = useState<{ username: string; id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('discord_token');
    if (token) {
      fetchUserData(token);
      fetchStreams();
      fetchBotStatus();
    }
    setLoading(false);
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchStreams = async () => {
    try {
      const response = await fetch('https://powernight.space/api/streams');
      const data = await response.json();
      setStreams(data || []);
    } catch (error) {
      console.error('Failed to fetch streams:', error);
    }
  };

  const fetchBotStatus = async () => {
    try {
      const response = await fetch('https://powernight.space/api/bot-status');
      const data = await response.json();
      setBotStatus(data);
    } catch (error) {
      console.error('Failed to fetch bot status:', error);
    }
  };

  const formatUptime = (milliseconds: number) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleDiscordLogin = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID || 'YOUR_CLIENT_ID';
    const redirectUri = `${window.location.origin}/auth/callback`;
    const scopes = ['identify', 'guilds'];
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join('%20')}`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    setUser(null);
    window.location.reload();
  };

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center text-cyber-cyan">Loading...</div>;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="relative min-h-[30vh] flex items-center justify-center px-4 py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto w-full text-center space-y-6 z-10"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-cyber-cyan/30 bg-cyber-cyan/5 rounded-full">
            <Radio className="w-4 h-4 text-cyber-cyan animate-pulse" />
            <span className="font-mono text-cyber-cyan text-sm tracking-widest">LIVE STREAMS</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold">
            <span className="text-cyber-cyan">WATCH</span> <span className="text-white">STREAMS</span>
          </h1>

          <p className="text-cyber-gray max-w-2xl mx-auto">
            {user ? `Welcome back, ${user.username}! Browse active streams.` : 'Login to view and manage streams'}
          </p>

          {!user && (
            <NeonButton onClick={handleDiscordLogin} className="mt-8">
              🔐 Login with Discord
            </NeonButton>
          )}
          {user && (
            <NeonButton onClick={handleLogout} className="mt-8">
              Logout
            </NeonButton>
          )}
        </motion.div>
      </section>

      {/* Bot Status */}
      {botStatus && (
        <section className="relative px-4 py-16 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="p-6 border border-cyber-cyan/20 bg-cyber-dark/50 rounded-lg backdrop-blur hover:border-cyber-cyan/50 transition">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${botStatus.isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-cyber-gray text-sm">Status</span>
              </div>
              <p className="text-cyber-cyan font-display text-xl">{botStatus.isOnline ? 'ONLINE' : 'OFFLINE'}</p>
            </div>

            <div className="p-6 border border-cyber-purple/20 bg-cyber-dark/50 rounded-lg backdrop-blur hover:border-cyber-purple/50 transition">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-cyber-purple" />
                <span className="text-cyber-gray text-sm">Uptime</span>
              </div>
              <p className="text-cyber-purple font-display text-xl">{formatUptime(botStatus.uptime)}</p>
            </div>

            <div className="p-6 border border-cyber-pink/20 bg-cyber-dark/50 rounded-lg backdrop-blur hover:border-cyber-pink/50 transition">
              <div className="flex items-center gap-3 mb-2">
                <Server className="w-4 h-4 text-cyber-pink" />
                <span className="text-cyber-gray text-sm">Servers</span>
              </div>
              <p className="text-cyber-pink font-display text-xl">{botStatus.serversCount}</p>
            </div>

            <div className="p-6 border border-cyber-cyan/20 bg-cyber-dark/50 rounded-lg backdrop-blur hover:border-cyber-cyan/50 transition">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-4 h-4 text-cyber-cyan" />
                <span className="text-cyber-gray text-sm">Members</span>
              </div>
              <p className="text-cyber-cyan font-display text-xl">{botStatus.membersCount.toLocaleString()}</p>
            </div>
          </motion.div>
        </section>
      )}

      {/* Streams Grid */}
      <section className="relative px-4 py-16 max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-3xl font-bold mb-12 text-cyber-cyan"
        >
          ACTIVE STREAMS ({streams.length})
        </motion.h2>

        {streams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center py-16"
          >
            <p className="text-cyber-gray text-lg">No active streams at the moment</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streams.map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition duration-300" />

                <div className="relative p-6 border border-cyber-cyan/30 bg-cyber-dark/80 rounded-lg backdrop-blur hover:border-cyber-cyan/60 transition duration-300">
                  {/* Live Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 text-xs font-mono">LIVE</span>
                  </div>

                  {/* Streamer Info */}
                  <div className="mb-4">
                    <h3 className="text-cyber-cyan font-display text-lg font-bold mb-1">
                      {stream.title}
                    </h3>
                    <p className="text-cyber-gray text-sm">by <span className="text-cyber-purple">{stream.streamer}</span></p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-cyber-gray">
                      <Users className="w-3 h-3 text-cyber-cyan" />
                      <span>{stream.viewers} viewers</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyber-gray">
                      <span className="px-2 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded text-cyber-cyan text-xs">
                        {stream.quality}
                      </span>
                    </div>
                  </div>

                  {/* Join Button */}
                  <a
                    href={stream.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 text-center text-white border border-cyber-cyan/50 rounded font-mono text-sm hover:bg-cyber-cyan/20 hover:border-cyber-cyan transition duration-300"
                  >
                    Join Stream →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
