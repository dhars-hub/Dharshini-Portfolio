import React from 'react';
import { Github, ExternalLink, Code2, Play, Figma } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onOpenDemo: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenDemo }) => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Centered with Theme Color & Styled Background) */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 shadow-[0_0_15px_rgba(167,139,250,0.2)]">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-widest font-code">
              PORTFOLIO & LIVE BUILDS
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent drop-shadow-sm">
            Featured Projects & Live Builds
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]"></div>

          <p className="text-sm sm:text-base text-[#94a3b8] font-body max-w-2xl mx-auto text-center leading-relaxed pt-1">
            Real-world systems spanning automated toll gateways, fitness survey platforms, child-friendly MERN applications, and UI/UX prototypes.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#818cf8]/25 grid grid-cols-1 lg:grid-cols-12 gap-0 text-left group"
              >
                {/* Image Side */}
                <div
                  className={`lg:col-span-6 relative overflow-hidden min-h-[280px] lg:min-h-[380px] bg-[#12131a] ${
                    isImageLeft ? 'order-1' : 'order-1 lg:order-2'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isImageLeft
                        ? 'lg:bg-gradient-to-r from-transparent via-transparent to-[#1a1b22]/90'
                        : 'lg:bg-gradient-to-l from-transparent via-transparent to-[#1a1b22]/90'
                    }`}
                  ></div>
                </div>

                {/* Text Content Side */}
                <div
                  className={`lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#1a1b22]/90 ${
                    isImageLeft ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="inline-block">
                      <span className="px-3.5 py-1 rounded-full bg-[#818cf8] text-[#101b8a] text-[11px] font-bold font-code uppercase tracking-wider shadow-[0_0_12px_rgba(129,140,248,0.5)]">
                        {project.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-[#bdc2ff] transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#c6c5d5] leading-relaxed font-body">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {project.tech.map((t) => (
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
                  <div className="pt-6 mt-6 border-t border-[#818cf8]/15 flex flex-wrap items-center gap-3.5">
                    {!project.figmaUrl && (
                      <button
                        onClick={() => onOpenDemo(project)}
                        className="px-5 py-2.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(129,140,248,0.4)] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Interactive Demo</span>
                      </button>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-full bg-[#12131a] border border-[#818cf8]/30 hover:border-[#818cf8] text-white text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Github className="w-4 h-4 text-[#818cf8]" />
                        <span>View on GitHub</span>
                      </a>
                    )}

                    {project.figmaUrl && (
                      <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(129,140,248,0.4)]"
                      >
                        <Figma className="w-4 h-4 fill-current" />
                        <span>Open in Figma</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
