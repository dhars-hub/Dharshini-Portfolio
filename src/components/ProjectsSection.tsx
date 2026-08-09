import React from 'react';
import { Github, ExternalLink, Code2, Play, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onOpenDemo: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenDemo }) => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#818cf8] font-code">
            WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-[#818cf8] mx-auto rounded-full mt-3"></div>
        </div>

        {/* Projects Stack */}
        <div className="space-y-12">
          
          {/* Project 1: Streamline Toll Crossing Systems (Image Left, Text Right) */}
          {PROJECTS[0] && (
            <div className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#818cf8]/25 grid grid-cols-1 lg:grid-cols-12 gap-0 text-left group">
              
              {/* Image Side */}
              <div className="lg:col-span-6 relative overflow-hidden min-h-[280px] lg:min-h-[380px] bg-[#12131a]">
                <img
                  src={PROJECTS[0].image}
                  alt={PROJECTS[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#1a1b22]/90"></div>
              </div>

              {/* Text Content Side */}
              <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#1a1b22]/90">
                <div className="space-y-4">
                  {/* Lead Developer Badge */}
                  <div className="inline-block">
                    <span className="px-3.5 py-1 rounded-full bg-[#818cf8] text-[#101b8a] text-[11px] font-bold font-code uppercase tracking-wider shadow-[0_0_12px_rgba(129,140,248,0.5)]">
                      {PROJECTS[0].badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-[#bdc2ff] transition-colors">
                    {PROJECTS[0].title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#c6c5d5] leading-relaxed font-body">
                    {PROJECTS[0].description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {PROJECTS[0].tech.map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1b4b] border border-[#818cf8]/30 text-xs font-semibold text-[#bdc2ff] font-code"
                      >
                        <Code2 className="w-3 h-3 text-[#818cf8]" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-[#818cf8]/15 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenDemo(PROJECTS[0])}
                    className="px-5 py-2.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(129,140,248,0.4)] cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Interactive Demo</span>
                  </button>

                  <a
                    href={PROJECTS[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full bg-[#12131a] border border-[#818cf8]/30 hover:border-[#818cf8] text-white text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-[#818cf8]" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* Project 2: Ideas That Can Boost Fitness Activities (Text Left, Image Right) */}
          {PROJECTS[1] && (
            <div className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#818cf8]/25 grid grid-cols-1 lg:grid-cols-12 gap-0 text-left group">
              
              {/* Text Content Side (Left on Desktop) */}
              <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#1a1b22]/90 order-2 lg:order-1">
                <div className="space-y-4">
                  {/* Badge */}
                  <div className="inline-block">
                    <span className="px-3.5 py-1 rounded-full bg-[#818cf8] text-[#101b8a] text-[11px] font-bold font-code uppercase tracking-wider shadow-[0_0_12px_rgba(129,140,248,0.5)]">
                      {PROJECTS[1].badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-[#bdc2ff] transition-colors">
                    {PROJECTS[1].title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#c6c5d5] leading-relaxed font-body">
                    {PROJECTS[1].description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {PROJECTS[1].tech.map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1b4b] border border-[#818cf8]/30 text-xs font-semibold text-[#bdc2ff] font-code"
                      >
                        <Code2 className="w-3 h-3 text-[#818cf8]" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-[#818cf8]/15 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenDemo(PROJECTS[1])}
                    className="px-5 py-2.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(129,140,248,0.4)] cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Interactive Demo</span>
                  </button>

                  <a
                    href={PROJECTS[1].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full bg-[#12131a] border border-[#818cf8]/30 hover:border-[#818cf8] text-white text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-[#818cf8]" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>

              {/* Image Side (Right on Desktop) */}
              <div className="lg:col-span-6 relative overflow-hidden min-h-[280px] lg:min-h-[380px] bg-[#12131a] order-1 lg:order-2">
                <img
                  src={PROJECTS[1].image}
                  alt={PROJECTS[1].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-transparent to-[#1a1b22]/90"></div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
