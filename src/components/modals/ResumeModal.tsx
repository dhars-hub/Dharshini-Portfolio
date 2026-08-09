import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, GraduationCap, Briefcase, Award, Code, MapPin, Mail, Printer } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_LIST, SKILLS_DATA, INTERNSHIPS, CERTIFICATIONS, ACHIEVEMENTS, PROJECTS } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const resumeText = `
${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.title}
Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}

OBJECTIVE:
${PERSONAL_INFO.bio}

EDUCATION:
${EDUCATION_LIST.map(e => `- ${e.degree}: ${e.institution}, ${e.location} (CGPA: ${e.cgpa})`).join('\n')}

TECHNICAL SKILLS:
${SKILLS_DATA.map(s => `${s.title}: ${s.skills.map(k => k.name).join(', ')}`).join('\n')}

INTERNSHIPS:
${INTERNSHIPS.map(i => `- ${i.role} at ${i.company}: ${i.description}`).join('\n')}

FEATURED PROJECTS:
${PROJECTS.map(p => `- ${p.title} (${p.badge}): ${p.description}`).join('\n')}

CERTIFICATIONS:
${CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer})`).join('\n')}

ACHIEVEMENTS:
${ACHIEVEMENTS.map(a => `- ${a.title}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const resumeText = `====================================================
DHARSHINI B - RESUME
Full Stack Developer & UI/UX Designer
Email: ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}
====================================================

PROFILE SUMMARY:
${PERSONAL_INFO.bio}

EDUCATION:
${EDUCATION_LIST.map(e => `• ${e.degree} | ${e.institution}, ${e.location} | CGPA: ${e.cgpa}`).join('\n')}

TECHNICAL EXPERTISE:
${SKILLS_DATA.map(s => `• ${s.title}: ${s.skills.map(k => k.name).join(', ')}`).join('\n')}

FEATURED PROJECTS:
${PROJECTS.map(p => `• ${p.title} (${p.badge})\n  Tech: ${p.tech.join(', ')}\n  ${p.description}`).join('\n\n')}

CERTIFICATIONS & HIGHLIGHTS:
${CERTIFICATIONS.map(c => `• ${c.title} (${c.issuer})`).join('\n')}

ACHIEVEMENTS:
${ACHIEVEMENTS.map(a => `• ${a.title}`).join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Dharshini_B_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12131a] border border-[#818cf8]/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-[#818cf8]/20 flex items-center justify-between bg-[#1a1b22]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30">
              <FileText className="w-5 h-5 text-[#818cf8]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">Dharshini B - Resume</h2>
              <p className="text-xs text-[#818cf8] font-code">Formatted Professional CV</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-[#1e1b4b] border border-[#818cf8]/30 text-xs font-semibold text-[#bdc2ff] hover:text-white hover:border-[#818cf8] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Copy text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#818cf8]" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-[#1e1b4b] border border-[#818cf8]/30 text-xs font-semibold text-[#bdc2ff] hover:text-white hover:border-[#818cf8] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Download text file"
            >
              {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-[#818cf8]" />}
              <span className="hidden sm:inline">{downloaded ? 'Downloaded' : 'Text File'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 sm:px-4 sm:py-1.5 rounded-lg bg-[#818cf8] text-[#101b8a] text-xs font-bold transition-all hover:bg-[#939cf8] flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Save directly as PDF or Print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Save / Print PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#1a1b22] text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-body text-[#e3e1ec]">
          
          {/* Header Resume Bio */}
          <div className="border-b border-[#818cf8]/20 pb-6">
            <h1 className="text-3xl font-extrabold font-display text-white">{PERSONAL_INFO.name}</h1>
            <p className="text-lg text-[#818cf8] font-semibold mt-0.5">{PERSONAL_INFO.title}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-code text-[#94a3b8] mt-3">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#818cf8]" /> {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#818cf8]" /> {PERSONAL_INFO.location}
              </span>
            </div>
            <p className="text-sm text-[#c6c5d5] leading-relaxed mt-4 bg-[#1a1b22] p-4 rounded-xl border border-[#818cf8]/15">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <GraduationCap className="w-5 h-5" /> Education
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_LIST.map((e) => (
                <div key={e.id} className="p-4 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-sm">{e.degree}</h4>
                    <span className="text-xs bg-[#818cf8]/20 text-[#bdc2ff] px-2 py-0.5 rounded font-code font-bold">CGPA: {e.cgpa}</span>
                  </div>
                  <p className="text-xs text-[#c6c5d5] mt-1">{e.institution}, {e.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <Code className="w-5 h-5" /> Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SKILLS_DATA.map((cat) => (
                <div key={cat.title} className="p-4 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase font-code text-[#818cf8]">{cat.title}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="text-[11px] px-2 py-0.5 rounded bg-[#1e1b4b] text-[#bdc2ff] border border-[#818cf8]/20 font-code">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Training */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <Briefcase className="w-5 h-5" /> Internships & Training
            </h3>
            <div className="space-y-3">
              {INTERNSHIPS.map((i) => (
                <div key={i.id} className="p-4 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20">
                  <h4 className="font-bold text-white text-base">{i.role} — <span className="text-[#818cf8] font-normal">{i.company}</span></h4>
                  <p className="text-xs text-[#c6c5d5] mt-1">{i.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <Award className="w-5 h-5" /> Featured Projects
            </h3>
            <div className="space-y-3">
              {PROJECTS.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-base">{p.title}</h4>
                    <span className="text-[10px] font-bold bg-[#818cf8] text-[#101b8a] px-2 py-0.5 rounded font-code">{p.badge}</span>
                  </div>
                  <p className="text-xs text-[#c6c5d5]">{p.description}</p>
                  <p className="text-[11px] text-[#818cf8] font-code pt-1">Technologies: {p.tech.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#818cf8]/20 bg-[#1a1b22] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#818cf8] text-[#101b8a] text-xs font-bold hover:bg-[#939cf8] transition-all cursor-pointer"
          >
            Close Resume
          </button>
        </div>

      </div>
    </div>
  );
};
