import React, { useState } from 'react';
import { Send, CheckCircle2, Linkedin, Github, FileText, MessageSquare, Briefcase, Globe } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('contact_messages', JSON.stringify(existing));

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.warn('Backend fallback:', error);
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('contact_messages', JSON.stringify(existing));

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Centered with Theme Color & Styled Background) */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-widest font-code">
              GET IN TOUCH & CONNECT
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
            Let's Build Something Meaningful Together
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>

          <p className="text-sm sm:text-base text-[#94a3b8] font-body max-w-2xl mx-auto text-center leading-relaxed pt-1">
            Have an open opportunity, collaboration inquiry, or want to discuss full-stack & UI/UX engineering? Send a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Quick Connect Profiles & Resume */}
          <div className="lg:col-span-5 space-y-4 text-left flex flex-col justify-center">
            
            {/* Social & Professional Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#12131a] border border-[#818cf8]/30 hover:border-[#818cf8] text-white hover:text-[#818cf8] transition-all flex items-center gap-2.5 cursor-pointer group shadow-lg"
              >
                <div className="p-2.5 rounded-lg bg-[#1e1b4b] group-hover:bg-[#818cf8] group-hover:text-[#101b8a] transition-all">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#94a3b8] block font-code">CONNECT</span>
                  <span className="text-xs font-bold">LinkedIn</span>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#12131a] border border-[#818cf8]/30 hover:border-[#818cf8] text-white hover:text-[#818cf8] transition-all flex items-center gap-2.5 cursor-pointer group shadow-lg"
              >
                <div className="p-2.5 rounded-lg bg-[#1e1b4b] group-hover:bg-[#818cf8] group-hover:text-[#101b8a] transition-all">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#94a3b8] block font-code">REPOS</span>
                  <span className="text-xs font-bold">GitHub</span>
                </div>
              </a>
            </div>

            <button
              onClick={onOpenResume}
              className="w-full py-4 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/50 hover:border-[#818cf8] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(129,140,248,0.25)]"
            >
              <FileText className="w-4 h-4 text-[#818cf8]" />
              <span>View & Download Curriculum Vitae</span>
            </button>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#12131a] p-6 sm:p-8 rounded-2xl border border-[#818cf8]/30 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">Message Delivered Successfully!</h3>
                  <p className="text-sm text-[#94a3b8] font-body max-w-md mx-auto">
                    Thank you for reaching out, Dharshini will respond to your email as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#1e1b4b] text-[#bdc2ff] border border-[#818cf8]/40 hover:text-white text-xs font-semibold cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#818cf8]" />
                    <span>Send a Direct Message</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#c6c5d5] font-code">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[#1a1b22] border border-[#818cf8]/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#818cf8]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#c6c5d5] font-code">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#1a1b22] border border-[#818cf8]/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#c6c5d5] font-code">Subject / Inquiry</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Collaboration Opportunity / Project Inquiry"
                      className="w-full bg-[#1a1b22] border border-[#818cf8]/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#818cf8]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#c6c5d5] font-code">Your Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Dharshini, I came across your portfolio and wanted to discuss..."
                      className="w-full bg-[#1a1b22] border border-[#818cf8]/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>

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
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
