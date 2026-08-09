import React from 'react';
import { User, MapPin, Mail, Award, Sparkles, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#818cf8] font-code bg-[#818cf8]/10 px-3 py-1 rounded-full border border-[#818cf8]/20">
            BIOGRAPHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            About Me
          </h2>
          <p className="text-sm text-[#94a3b8] font-body max-w-xl">
            A software developer with a strong foundation in computer applications, problem solving, and UI/UX engineering.
          </p>
        </div>

        {/* Main Bio Glass Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 text-left relative overflow-hidden border border-[#818cf8]/25 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <User className="w-5 h-5 text-[#818cf8]" />
                <span>Passionate Full Stack Developer & Tech Enthusiast</span>
              </h3>

              <p className="text-[#c6c5d5] text-base sm:text-lg leading-relaxed font-body">
                {PERSONAL_INFO.bio}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-code text-[#94a3b8]">
                <div className="flex items-center gap-1.5 bg-[#1a1b22] px-3 py-1.5 rounded-lg border border-[#818cf8]/20">
                  <MapPin className="w-4 h-4 text-[#818cf8]" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#1a1b22] px-3 py-1.5 rounded-lg border border-[#818cf8]/20">
                  <GraduationCap className="w-4 h-4 text-[#818cf8]" />
                  <span>Holy Cross College (Autonomous)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#1a1b22] px-3 py-1.5 rounded-lg border border-[#818cf8]/20">
                  <Mail className="w-4 h-4 text-[#818cf8]" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Stat Pill Cards */}
            <div className="md:col-span-4 space-y-3">
              <div className="bg-[#1a1b22] p-4 rounded-xl border border-[#818cf8]/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#818cf8] font-code block">Core Strengths</span>
                <p className="text-sm font-bold text-white font-display">Problem Solving & Analytics</p>
                <p className="text-xs text-[#94a3b8]">Full Stack Web & Software Solutions</p>
              </div>

              <div className="bg-[#1a1b22] p-4 rounded-xl border border-[#818cf8]/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#818cf8] font-code block">Current Focus</span>
                <p className="text-sm font-bold text-white font-display">Python, Java, Web Systems</p>
                <p className="text-xs text-[#94a3b8]">Power BI & Relational Databases</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
