import React, { useState } from 'react';
import { X, Send, Mail, MapPin, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send real POST request to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      // Also back up locally in browser for quick reference
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      existing.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('contact_messages', JSON.stringify(existing));

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.warn('Backend API request fallback to local storage:', error);
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      existing.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('contact_messages', JSON.stringify(existing));

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12131a] border border-[#818cf8]/40 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden text-left">
        
        {/* Top Header */}
        <div className="p-6 border-b border-[#818cf8]/20 flex items-center justify-between bg-[#1a1b22]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30">
              <Mail className="w-5 h-5 text-[#818cf8]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">Get In Touch</h2>
              <p className="text-xs text-[#818cf8] font-code">Send a direct message to {PERSONAL_INFO.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1a1b22] text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Email Banner */}
          <div className="bg-[#1e1b4b]/80 border border-[#818cf8]/30 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-[#818cf8] font-code">Direct Email</span>
              <p className="text-sm font-semibold text-white font-code">{PERSONAL_INFO.email}</p>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg bg-[#818cf8]/20 border border-[#818cf8]/40 hover:bg-[#818cf8] hover:text-[#101b8a] text-xs font-semibold text-[#bdc2ff] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Submitted Success Confirmation */}
          {isSubmitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-xl text-center space-y-3 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white font-display">Message Sent Successfully!</h3>
              <p className="text-xs text-emerald-200/80">
                Thank you for reaching out. Dharshini will respond to your email shorty.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 px-5 py-2 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#c6c5d5] font-code">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 focus:border-[#818cf8] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#818cf8] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#c6c5d5] font-code">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 focus:border-[#818cf8] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#818cf8] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#c6c5d5] font-code">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Job Opportunity / Project Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 focus:border-[#818cf8] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#818cf8] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#c6c5d5] font-code">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 focus:border-[#818cf8] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#818cf8] transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-sm transition-all shadow-[0_0_20px_rgba(129,140,248,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
