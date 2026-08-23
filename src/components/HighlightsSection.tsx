import React from 'react';
import { Award, Trophy, CheckCircle, Star } from 'lucide-react';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../data/portfolioData';

export const HighlightsSection: React.FC = () => {
  return (
    <section id="highlights" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Centered with Theme Color & Styled Background) */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 shadow-[0_0_15px_rgba(251,113,133,0.2)]">
            <Trophy className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-widest font-code">
              ACHIEVEMENTS & CERTIFICATIONS
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
            Honors, Awards & Certifications
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-amber-500 rounded-full shadow-[0_0_10px_rgba(251,113,133,0.5)]"></div>

          <p className="text-sm sm:text-base text-[#94a3b8] font-body max-w-2xl mx-auto text-center leading-relaxed pt-1">
            Industry credentials, verified certificate programs, leadership roles, and collegiate event management accolades.
          </p>
        </div>

        {/* 2 Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* Column 1: Certifications & Courses */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-[#818cf8]/20 relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#818cf8]/20">
              <div className="p-2.5 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30">
                <Award className="w-5 h-5 text-[#818cf8]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Certifications & Courses
                </h3>
                <p className="text-xs text-[#94a3b8] font-code">NPTEL & Technical Certifications</p>
              </div>
            </div>

            <ul className="space-y-4">
              {CERTIFICATIONS.map((item) => (
                <li
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#1a1b22]/70 hover:bg-[#1a1b22] border border-[#818cf8]/10 hover:border-[#818cf8]/40 transition-all flex items-start gap-3.5 group"
                >
                  <div className="p-2 rounded-lg bg-[#1e1b4b] border border-[#818cf8]/30 shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-[#818cf8] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#bdc2ff] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    {item.issuer && (
                      <p className="text-xs text-[#818cf8] font-code font-medium">
                        Issued by: {item.issuer}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Achievements */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-[#818cf8]/20 relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#818cf8]/20">
              <div className="p-2.5 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30">
                <Trophy className="w-5 h-5 text-[#818cf8]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Achievements
                </h3>
                <p className="text-xs text-[#94a3b8] font-code">Leadership & Competition Excellence</p>
              </div>
            </div>

            <ul className="space-y-4">
              {ACHIEVEMENTS.map((item) => (
                <li
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#1a1b22]/70 hover:bg-[#1a1b22] border border-[#818cf8]/10 hover:border-[#818cf8]/40 transition-all flex items-start gap-3.5 group"
                >
                  <div className="p-2 rounded-lg bg-[#1e1b4b] border border-[#818cf8]/30 shrink-0 mt-0.5">
                    <Trophy className="w-4 h-4 text-[#818cf8] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#bdc2ff] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    {item.issuer && (
                      <p className="text-xs text-[#818cf8] font-code font-medium">
                        {item.issuer}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
