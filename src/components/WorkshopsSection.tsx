import React from 'react';
import { BookOpen, Presentation, Video, Globe, Sparkles } from 'lucide-react';
import { WORKSHOPS } from '../data/portfolioData';

export const WorkshopsSection: React.FC = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Seminar':
        return <span className="text-[11px] font-semibold text-purple-300 bg-purple-900/40 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-code">Seminar</span>;
      case 'Webinar':
        return <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-900/40 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-code">Webinar</span>;
      case 'Summit':
        return <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-900/40 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-code">Summit</span>;
      case 'Workshop':
        return <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-900/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-code">Workshop</span>;
      default:
        return <span className="text-[11px] font-semibold text-blue-300 bg-blue-900/40 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-code">{type}</span>;
    }
  };

  return (
    <section id="workshops" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Centered with Theme Color & Styled Background) */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/30 text-fuchsia-300 shadow-[0_0_15px_rgba(232,121,249,0.2)]">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span className="text-xs font-bold uppercase tracking-widest font-code">
              CONTINUOUS LEARNING & CONFERENCES
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display bg-gradient-to-r from-fuchsia-400 via-pink-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Workshops & Seminars
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-fuchsia-400 to-purple-500 rounded-full shadow-[0_0_10px_rgba(232,121,249,0.5)]"></div>

          <p className="text-sm sm:text-base text-[#94a3b8] font-body max-w-2xl mx-auto text-center leading-relaxed pt-1">
            Active participant in specialized technology summits, full-stack design workshops, and AI engineering webinars.
          </p>
        </div>

        {/* 2-Column Grid matching screenshot layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {WORKSHOPS.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-xl p-6 relative border border-[#818cf8]/20 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-[#818cf8]" />
                    <span className="text-xs text-[#818cf8] font-code font-medium">{item.year}</span>
                  </div>
                  {getTypeBadge(item.type)}
                </div>

                <h3 className="text-lg font-bold font-display text-white group-hover:text-[#bdc2ff] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="pt-4 mt-2 border-t border-[#818cf8]/10 flex items-center justify-between text-[11px] text-[#94a3b8] font-code">
                <span>Academic & Industry Engagement</span>
                <span className="text-[#818cf8] font-medium">Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
