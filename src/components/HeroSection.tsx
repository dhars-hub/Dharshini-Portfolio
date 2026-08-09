import React from 'react';
import { ArrowRight, Mail, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenResume }) => {
  return (
    <section id="home" className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center bg-nebula-grid overflow-hidden">
      {/* Background glowing blurred radial background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-purple-600/15 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Centered Profile Picture Frame */}
        <div className="relative group mb-8">
          {/* Outer Glowing Gradient Ring */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#818cf8] via-[#7c3aed] to-[#89ceff] rounded-full blur-md opacity-80 group-hover:opacity-100 transition duration-500 animate-pulse"></div>

          {/* Profile Picture Container */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden p-1 bg-[#12131a] border-2 border-[#818cf8]/50 shadow-2xl">
            <img
              src={PERSONAL_INFO.profileImage}
              alt={PERSONAL_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Available Status Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#12131a]/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#818cf8]/40 shadow-lg flex items-center gap-2 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-bold text-white font-code tracking-wide">
              MCA 2027 • Open to Roles
            </span>
          </div>
        </div>

        {/* Centered Typography */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
            {PERSONAL_INFO.name}
          </h1>

          <p className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
            {PERSONAL_INFO.title}
          </p>

          <p className="text-[#c6c5d5] text-base sm:text-lg leading-relaxed font-body max-w-2xl mx-auto">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Specialization Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-xl">
          {["Python", "Java", "SQL", "Full Stack", "PHP", "Power BI", "Figma", "UI/UX"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-[#1e1b4b]/80 border border-[#818cf8]/30 text-xs font-semibold text-[#bdc2ff] font-code shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-sm sm:text-base transition-all shadow-[0_0_20px_rgba(129,140,248,0.4)] hover:shadow-[0_0_30px_rgba(129,140,248,0.6)] hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="px-7 py-3.5 rounded-full bg-[#1e1b4b] border border-[#818cf8]/70 hover:border-[#818cf8] text-[#e0e0ff] hover:text-white font-semibold text-sm sm:text-base transition-all hover:bg-[#2e2a72] hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <FileText className="w-4 h-4 text-[#818cf8]" />
            <span>Download PDF / Resume</span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-7 py-3.5 rounded-full bg-[#12131a] border border-[#818cf8]/50 hover:border-[#818cf8] text-white hover:text-[#818cf8] font-medium text-sm sm:text-base transition-all hover:bg-[#818cf8]/10 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Contact Me</span>
            <Mail className="w-4 h-4 text-[#818cf8]" />
          </button>
        </div>

      </div>
    </section>
  );
};
