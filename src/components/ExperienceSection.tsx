import React, { useState } from 'react';
import { Briefcase, Building2, ChevronRight, CheckCircle } from 'lucide-react';
import { INTERNSHIPS } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(INTERNSHIPS[0].id);

  const activeInternship = INTERNSHIPS.find((i) => i.id === activeTab) || INTERNSHIPS[0];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#818cf8] font-code">
            BACKGROUND
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Experience
          </h2>
          <div className="w-12 h-1 bg-[#818cf8] mx-auto rounded-full mt-3"></div>
        </div>

        {/* Internships Box */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 text-left relative">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#818cf8]/20">
            <div className="p-2.5 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30">
              <Briefcase className="w-5 h-5 text-[#818cf8]" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Internships
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* List Column */}
            <div className="lg:col-span-6 space-y-3">
              {INTERNSHIPS.map((item) => {
                const isSelected = activeTab === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`p-4 rounded-xl transition-all cursor-pointer flex items-center justify-between border-l-4 ${
                      isSelected
                        ? 'bg-[#1e1b4b]/80 border-l-[#818cf8] border-y border-r border-[#818cf8]/30 text-white shadow-lg'
                        : 'bg-[#1a1b22]/50 border-l-[#818cf8]/40 border-y border-r border-transparent text-[#c6c5d5] hover:bg-[#1a1b22] hover:border-l-[#818cf8]'
                    }`}
                  >
                    <div>
                      <h4 className="font-semibold text-base text-white flex items-center gap-2">
                        <span>{item.role}</span>
                      </h4>
                      <p className="text-xs text-[#818cf8] font-code flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3 h-3" />
                        <span>{item.company}</span>
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 text-[#818cf8] transition-transform ${isSelected ? 'translate-x-1' : 'opacity-40'}`} />
                  </div>
                );
              })}
            </div>

            {/* Detail Column */}
            <div className="lg:col-span-6 bg-[#1a1b22]/90 rounded-xl p-6 border border-[#818cf8]/20 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#818cf8]/15">
                  <span className="text-xs uppercase tracking-widest text-[#818cf8] font-code">
                    INTERNSHIP DETAILS
                  </span>
                  <h4 className="text-xl font-bold text-white font-display mt-1">
                    {activeInternship.role}
                  </h4>
                  <p className="text-sm text-[#bdc2ff] font-medium flex items-center gap-1.5 mt-1">
                    <Building2 className="w-4 h-4 text-[#818cf8]" />
                    <span>{activeInternship.company}</span>
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#c6c5d5] leading-relaxed">
                  {activeInternship.description}
                </p>

                {/* Tech Skills Badges */}
                {activeInternship.skills && (
                  <div className="pt-2">
                    <span className="block text-xs font-code text-[#94a3b8] mb-2">Key Skills Applied:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeInternship.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-[#1e1b4b] border border-[#818cf8]/30 text-xs text-[#bdc2ff] font-code"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#818cf8]/10 flex items-center justify-between text-xs text-[#94a3b8] font-code">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" /> Certificate Completed
                </span>
                <span>Role Completed</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
