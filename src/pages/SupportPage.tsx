import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { NeonInput } from '../components/NeonInput';
import { NeonButton } from '../components/NeonButton';
export function SupportPage() {
  const [formData, setFormData] = useState({
    userId: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    setErrorMessage('');
    try {
      // Discord webhook URL - replace with your actual webhook
      const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';
      const discordMessage = {
        content: `**New Support Message for senon.master**`,
        embeds: [{
          title: '📨 Support Form Submission',
          color: 0x00f0ff,
          fields: [{
            name: '👤 User ID',
            value: formData.userId || 'Not provided',
            inline: true
          }, {
            name: '📋 Subject',
            value: formData.subject || 'No subject',
            inline: true
          }, {
            name: '💬 Message',
            value: formData.message || 'No message',
            inline: false
          }],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'NightWave Support System'
          }
        }]
      };
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(discordMessage)
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      setSubmitStatus('success');
      setFormData({
        userId: '',
        subject: '',
        message: ''
      });
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Transmission failed. Please try again or contact support directly.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };
  const faqs = [{
    question: 'How do I set up the bot?',
    answer: 'Invite NightWave to your server using the invite link. Once joined, use the /setup command to initialize the music channel and DJ roles.'
  }, {
    question: 'Why is the audio lagging?',
    answer: "Lag is usually caused by Discord's voice server region. Try changing your voice channel region in channel settings. If issues persist, check our status page."
  }, {
    question: 'Is NightWave free?',
    answer: 'Core features are free forever. NightWave Premium unlocks 24/7 mode, volume control, and audio filters for $3/month.'
  }, {
    question: 'Can I use my own playlist?',
    answer: 'Yes! We support Spotify, YouTube, SoundCloud, and Apple Music playlists. Just paste the link in the chat.'
  }];
  return <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl font-bold text-white mb-4 text-glow-pink">
          DIAGNOSTICS
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-body mb-8">
          Troubleshoot issues or establish a direct line with our engineering
          team.
        </p>
        <a href="https://discord.gg/wSAUBH3xaV" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-display text-lg rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(88,101,242,0.5)] hover:shadow-[0_0_30px_rgba(88,101,242,0.8)]">
          <MessageSquare className="w-6 h-6" />
          Join Support Server
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-cyber-cyan mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" /> FAQ DATABASE
          </h2>
          {faqs.map((faq, index) => <FAQItem key={index} question={faq.question} answer={faq.answer} />)}
        </div>

        {/* Contact Form */}
        <div className="bg-cyber-dark/50 border border-cyber-gray p-8 rounded-lg relative">
          <h2 className="font-display text-2xl text-cyber-pink mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6" /> TRANSMIT MESSAGE
          </h2>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === 'success' && <motion.div initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400 font-mono text-sm">
                  Message transmitted to senon.master successfully!
                </p>
              </motion.div>}

            {submitStatus === 'error' && <motion.div initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 font-mono text-sm">{errorMessage}</p>
              </motion.div>}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <NeonInput label="User ID" placeholder="Discord User ID" value={formData.userId} onChange={e => setFormData({
            ...formData,
            userId: e.target.value
          })} />
            <NeonInput label="Subject" placeholder="Brief description" value={formData.subject} onChange={e => setFormData({
            ...formData,
            subject: e.target.value
          })} required />

            <div className="flex flex-col gap-2 w-full">
              <label className="font-mono text-sm text-cyber-cyan uppercase tracking-widest opacity-80">
                Message Data
              </label>
              <textarea className="w-full bg-cyber-dark/50 border-2 border-cyber-gray text-white font-body text-lg px-4 py-3 outline-none focus:border-cyber-pink focus:shadow-neon-pink transition-all duration-300 rounded-sm h-32 placeholder:text-gray-600" placeholder="Describe your issue..." value={formData.message} onChange={e => setFormData({
              ...formData,
              message: e.target.value
            })} required />
            </div>

            <NeonButton variant="secondary" fullWidth type="submit" disabled={submitStatus === 'sending'} icon={submitStatus === 'sending' ? undefined : <Send className="w-5 h-5" />}>
              {submitStatus === 'sending' ? 'Transmitting...' : 'Send Transmission'}
            </NeonButton>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 font-mono text-center">
              DIRECT LINE TO:{' '}
              <span className="text-cyber-cyan">senon.master</span>
            </p>
          </div>
        </div>
      </div>
    </div>;
}
function FAQItem({
  question,
  answer
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="border border-cyber-gray rounded-lg overflow-hidden bg-cyber-black/40">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
        <span className="font-display font-medium text-white">{question}</span>
        <ChevronDown className={`w-5 h-5 text-cyber-cyan transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} className="overflow-hidden">
            <div className="px-6 pb-4 text-gray-400 font-body leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}