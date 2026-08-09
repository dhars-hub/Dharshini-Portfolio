import React, { useState } from 'react';
import { Code, Layers, Wrench, CheckCircle2, Sparkles } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-[#818cf8]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#818cf8]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#818cf8]" />;
      default:
        return <Code className="w-5 h-5 text-[#818cf8]" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#818cf8] font-code">
            EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Technical Skills
          </h2>
          <div className="w-12 h-1 bg-[#818cf8] mx-auto rounded-full mt-3"></div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {SKILLS_DATA.map((category) => (
            <div
              key={category.title}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#818cf8]/15">
                  <div className="p-2.5 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30">
                    {getIcon(category.iconName)}
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                {category.title === 'Domain' ? (
                  <ul className="space-y-3">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                        className={`flex items-center gap-3 text-sm text-[#e3e1ec] p-2.5 rounded-lg transition-all cursor-pointer ${
                          selectedSkill === skill.name
                            ? 'bg-[#818cf8]/20 border border-[#818cf8] text-white font-medium'
                            : 'hover:bg-[#1a1b22] border border-transparent'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-sm bg-[#818cf8]"></span>
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => {
                      const isSelected = selectedSkill === skill.name;
                      return (
                        <button
                          key={skill.name}
                          onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                          className={`px-3.5 py-1.5 rounded-md text-xs font-semibold font-code transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-[#818cf8] text-[#101b8a] border-[#818cf8] shadow-[0_0_12px_#818cf8]'
                              : skill.color || 'bg-[#1a1b22] text-[#c6c5d5] border-[#818cf8]/20 hover:border-[#818cf8]'
                          }`}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Interactive Helper Text */}
              <div className="mt-6 pt-4 border-t border-[#818cf8]/10 text-[11px] text-[#94a3b8] font-code flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#818cf8]" />
                <span>{selectedSkill === null ? 'Click skill to highlight' : `Selected: ${selectedSkill}`}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
