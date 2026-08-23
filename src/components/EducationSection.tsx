import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { EDUCATION_LIST } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-20 relative bg-[#0d0e15]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header (Centered with Theme Color & Styled Background) */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest font-code">
              ACADEMIC BACKGROUND
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Education Details & Qualifications
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>

          <p className="text-sm sm:text-base text-[#94a3b8] font-body max-w-2xl mx-auto text-center leading-relaxed pt-1">
            My academic journey spanning secondary school, undergraduate computer applications, and Master of Computer Applications (MCA).
          </p>
        </div>

        {/* Education Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {EDUCATION_LIST.map((item, index) => {
            const isOngoing = item.period.includes('2027');
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl p-6 sm:p-7 bg-[#12131a] border border-[#818cf8]/20 hover:border-[#818cf8]/60 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(129,140,248,0.15)] flex flex-col justify-between"
              >
                {/* Accent top gradient line */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#818cf8]/40 to-transparent group-hover:via-[#818cf8] transition-all"></div>

                <div className="space-y-4">
                  
                  {/* Top Bar with Icon & Status Tag */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30 group-hover:bg-[#818cf8] text-[#818cf8] group-hover:text-[#101b8a] transition-all">
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-bold font-code px-3 py-1 rounded-full border ${
                        isOngoing
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {isOngoing ? '● Currently Pursuing' : '✓ Completed'}
                      </span>
                      <span className="text-xs text-[#818cf8] font-code flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Degree Name & Institution */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-[#bdc2ff] transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-[#818cf8] font-body flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <span>{item.institution}</span>
                    </p>
                    <p className="text-xs text-[#94a3b8] font-code flex items-center gap-1 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#818cf8]" />
                      <span>{item.location}, Tamil Nadu</span>
                    </p>
                  </div>

                </div>

                {/* Score & CGPA Highlight Box */}
                <div className="mt-6 pt-4 border-t border-[#818cf8]/15 flex items-center justify-between bg-[#1a1b22]/80 p-3.5 rounded-xl border">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-[#c6c5d5] font-code">
                      Academic Score:
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-extrabold text-emerald-400 font-code">
                      {item.cgpa}
                    </span>
                    <span className="text-xs text-[#94a3b8] font-code">/ 10</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Academic Highlights Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-[#12131a] border border-[#818cf8]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/40 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#818cf8]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold font-display text-white">Consistently High Academic Achievement</h4>
              <p className="text-xs sm:text-sm text-[#94a3b8]">
                Maintained 8.5+ CGPA across all degrees and secondary schooling at Holy Cross institutions in Trichy.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="bg-[#1a1b22] px-4 py-2 rounded-xl border border-[#818cf8]/20 text-center">
              <span className="text-[10px] uppercase font-bold text-[#818cf8] font-code block">MCA CGPA</span>
              <span className="text-lg font-bold text-emerald-400 font-code">9.00 / 10</span>
            </div>
            <div className="bg-[#1a1b22] px-4 py-2 rounded-xl border border-[#818cf8]/20 text-center">
              <span className="text-[10px] uppercase font-bold text-[#818cf8] font-code block">BCA CGPA</span>
              <span className="text-lg font-bold text-emerald-400 font-code">8.51 / 10</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
