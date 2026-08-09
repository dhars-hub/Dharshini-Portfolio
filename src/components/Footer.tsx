import React from 'react';
import { Linkedin, Github, Mail, ArrowUp, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 bg-[#0d0e15] border-t border-[#818cf8]/20 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
        
        {/* Brand Name */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            {PERSONAL_INFO.name}
          </h2>
          <p className="text-sm text-[#818cf8] font-medium tracking-wide">
            Built with Passion
          </p>
          <div className="w-16 h-1 bg-[#818cf8] mx-auto rounded-full mt-3 shadow-[0_0_12px_#818cf8]"></div>
        </div>

        {/* Social Links Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 sm:px-6 sm:py-3 rounded-2xl sm:rounded-full bg-[#1e1b4b] border border-[#818cf8]/30 hover:border-[#818cf8] text-white hover:text-[#818cf8] transition-all hover:-translate-y-1 shadow-lg flex items-center gap-2 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-[#818cf8]/20 group-hover:bg-[#818cf8] group-hover:text-[#101b8a] transition-colors">
              <Linkedin className="w-4 h-4 text-[#818cf8] group-hover:text-[#101b8a]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider font-code">LINKEDIN</span>
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 sm:px-6 sm:py-3 rounded-2xl sm:rounded-full bg-[#1e1b4b] border border-[#818cf8]/30 hover:border-[#818cf8] text-white hover:text-[#818cf8] transition-all hover:-translate-y-1 shadow-lg flex items-center gap-2 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-[#818cf8]/20 group-hover:bg-[#818cf8] group-hover:text-[#101b8a] transition-colors">
              <Github className="w-4 h-4 text-[#818cf8] group-hover:text-[#101b8a]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider font-code">GITHUB</span>
          </a>

          <button
            onClick={onOpenContact}
            className="p-3.5 sm:px-6 sm:py-3 rounded-2xl sm:rounded-full bg-[#1e1b4b] border border-[#818cf8]/30 hover:border-[#818cf8] text-white hover:text-[#818cf8] transition-all hover:-translate-y-1 shadow-lg flex items-center gap-2 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-[#818cf8]/20 group-hover:bg-[#818cf8] group-hover:text-[#101b8a] transition-colors">
              <Mail className="w-4 h-4 text-[#818cf8] group-hover:text-[#101b8a]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider font-code">EMAIL</span>
          </button>
        </div>

        {/* Back to Top */}
        <div className="pt-6">
          <button
            onClick={scrollToTop}
            className="inline-flex flex-col items-center gap-1.5 text-xs text-[#94a3b8] hover:text-[#818cf8] transition-colors cursor-pointer group"
          >
            <div className="p-2.5 rounded-full bg-[#1a1b22] border border-[#818cf8]/30 group-hover:border-[#818cf8] group-hover:bg-[#1e1b4b] transition-all group-hover:-translate-y-1 shadow-md">
              <ArrowUp className="w-4 h-4 text-[#818cf8]" />
            </div>
            <span className="font-code uppercase tracking-widest font-semibold">BACK TO TOP</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#818cf8]/10 text-xs text-[#94a3b8] font-code">
          <p>© 2026 DHARSHINI B. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </footer>
  );
};
