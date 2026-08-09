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
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#818cf8] font-code">
            LEARNING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Workshops & Seminars
          </h2>
          <div className="w-12 h-1 bg-[#818cf8] mx-auto rounded-full mt-3"></div>
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
