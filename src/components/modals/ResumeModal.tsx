import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, GraduationCap, Briefcase, Award, Code, MapPin, Mail, Printer, Sparkles, BookOpen, FileCheck2 } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_LIST, SKILLS_DATA, INTERNSHIPS, CERTIFICATIONS, ACHIEVEMENTS, PROJECTS, WORKSHOPS } from '../../data/portfolioData';
import { generateResumePDF } from '../../utils/pdfGenerator';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  if (!isOpen) return null;

  const handleDownloadDirectPDF = () => {
    setIsPdfGenerating(true);
    try {
      generateResumePDF();
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 3000);
    } catch (err) {
      console.error("PDF generation failed, falling back to browser print:", err);
      handleSaveAndPrintPDF();
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const generateFullResumeHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${PERSONAL_INFO.name} - Resume</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.45;
      font-size: 12px;
      padding: 24px;
    }
    .header {
      border-bottom: 2.5px solid #4f46e5;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .name {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #4f46e5;
      margin-top: 2px;
    }
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 6px;
      font-size: 11.5px;
      color: #475569;
    }
    .summary {
      margin-top: 8px;
      font-size: 11.5px;
      color: #334155;
      line-height: 1.5;
      background: #f8fafc;
      padding: 8px 12px;
      border-radius: 6px;
      border-left: 3px solid #4f46e5;
    }
    .section {
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 12.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #1e1b4b;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 7px 10px;
    }
    .card-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 12px;
    }
    .card-subtitle {
      color: #64748b;
      font-size: 11px;
      margin-top: 1px;
    }
    .badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      background: #e0e7ff;
      color: #3730a3;
    }
    .skills-group {
      margin-bottom: 4px;
    }
    .skills-group-title {
      font-weight: 700;
      font-size: 10.5px;
      color: #4338ca;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .skills-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
    }
    .skill-pill {
      font-size: 10px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 1px 5px;
      border-radius: 3px;
      color: #334155;
    }
    .item {
      margin-bottom: 7px;
      padding: 7px 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item-desc {
      font-size: 11px;
      color: #475569;
      margin-top: 2px;
    }
    .item-tech {
      font-size: 10px;
      color: #4f46e5;
      font-family: monospace;
      margin-top: 2px;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${PERSONAL_INFO.name}</div>
    <div class="title">${PERSONAL_INFO.title}</div>
    <div class="contact-info">
      <span>✉ ${PERSONAL_INFO.email}</span>
      <span>📍 ${PERSONAL_INFO.location}</span>
      <span>🎓 MCA (2025 - 2027)</span>
    </div>
    <div class="summary">
      ${PERSONAL_INFO.bio}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    <div class="grid-2">
      ${EDUCATION_LIST.map(e => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div class="card-title">${e.degree}</div>
            <span class="badge">CGPA: ${e.cgpa}</span>
          </div>
          <div class="card-subtitle">${e.institution}, ${e.location}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="grid-3">
      ${SKILLS_DATA.map(cat => `
        <div class="card">
          <div class="skills-group-title">${cat.title}</div>
          <div class="skills-pills">
            ${cat.skills.map(s => `<span class="skill-pill">${s.name}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Internships & Practical Experience</div>
    ${INTERNSHIPS.map(i => `
      <div class="item">
        <div class="item-header">
          <span class="card-title">${i.role} — <span style="color: #4f46e5; font-weight: normal;">${i.company}</span></span>
        </div>
        <div class="item-desc">${i.description}</div>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <div class="section-title">Featured Projects</div>
    ${PROJECTS.map(p => `
      <div class="item">
        <div class="item-header">
          <span class="card-title">${p.title}</span>
          <span class="badge">${p.badge}</span>
        </div>
        <div class="item-desc">${p.description}</div>
        <div class="item-tech">Tech: ${p.tech.join(', ')}</div>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <div class="section-title">Workshops & Seminars</div>
    <div class="grid-2">
      ${WORKSHOPS.map(w => `
        <div class="card">
          <div class="card-title">${w.title}</div>
          <div class="card-subtitle">${w.type} • ${w.year}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Honors, Awards & Certifications</div>
    <div class="grid-2">
      ${CERTIFICATIONS.map(c => `
        <div class="card">
          <div class="card-title">📜 ${c.title}</div>
          <div class="card-subtitle">${c.issuer}</div>
        </div>
      `).join('')}
      ${ACHIEVEMENTS.map(a => `
        <div class="card">
          <div class="card-title">🏆 ${a.title}</div>
          <div class="card-subtitle">${a.issuer}</div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;
  };

  const handleCopy = () => {
    const resumeText = `
${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.title}
Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}

OBJECTIVE & PROFILE:
${PERSONAL_INFO.bio}

EDUCATION:
${EDUCATION_LIST.map(e => `- ${e.degree}: ${e.institution}, ${e.location} (CGPA: ${e.cgpa})`).join('\n')}

TECHNICAL SKILLS:
${SKILLS_DATA.map(s => `${s.title}: ${s.skills.map(k => k.name).join(', ')}`).join('\n')}

INTERNSHIPS:
${INTERNSHIPS.map(i => `- ${i.role} at ${i.company}: ${i.description}`).join('\n')}

FEATURED PROJECTS:
${PROJECTS.map(p => `- ${p.title} (${p.badge}): ${p.description} [Tech: ${p.tech.join(', ')}]`).join('\n')}

WORKSHOPS & SEMINARS:
${WORKSHOPS.map(w => `- ${w.title} (${w.type}, ${w.year})`).join('\n')}

CERTIFICATIONS & ACHIEVEMENTS:
${CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer})`).join('\n')}
${ACHIEVEMENTS.map(a => `- ${a.title} (${a.issuer})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const resumeText = `====================================================
DHARSHINI B - RESUME / CURRICULUM VITAE
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

INTERNSHIPS & PRACTICAL EXPERIENCE:
${INTERNSHIPS.map(i => `• ${i.role} at ${i.company}\n  ${i.description}`).join('\n\n')}

FEATURED PROJECTS:
${PROJECTS.map(p => `• ${p.title} (${p.badge})\n  Tech: ${p.tech.join(', ')}\n  ${p.description}`).join('\n\n')}

WORKSHOPS & SEMINARS:
${WORKSHOPS.map(w => `• ${w.title} [${w.type} • ${w.year}]`).join('\n')}

CERTIFICATIONS & HONORS:
${CERTIFICATIONS.map(c => `• ${c.title} (${c.issuer})`).join('\n')}
${ACHIEVEMENTS.map(a => `• ${a.title} (${a.issuer})`).join('\n')}
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

  // Save / Print PDF & Direct PDF Document Download
  const handleSaveAndPrintPDF = () => {
    const htmlContent = generateFullResumeHtml();
    
    // 1. Direct download of the formatted resume document file
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `Dharshini_B_Resume.html`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 3000);

    // 2. Open printable view to trigger native browser Print / "Save as PDF" dialog
    try {
      const printIframe = document.createElement('iframe');
      printIframe.style.position = 'fixed';
      printIframe.style.right = '0';
      printIframe.style.bottom = '0';
      printIframe.style.width = '0';
      printIframe.style.height = '0';
      printIframe.style.border = '0';
      document.body.appendChild(printIframe);

      const frameDoc = printIframe.contentWindow?.document || printIframe.contentDocument;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(htmlContent);
        frameDoc.close();

        setTimeout(() => {
          printIframe.contentWindow?.focus();
          printIframe.contentWindow?.print();
          setTimeout(() => {
            document.body.removeChild(printIframe);
          }, 2000);
        }, 300);
      }
    } catch {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12131a] border border-[#818cf8]/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-left">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-[#818cf8]/20 flex flex-wrap items-center justify-between gap-3 bg-[#1a1b22]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30 shadow-md">
              <FileText className="w-5 h-5 text-[#818cf8]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">Dharshini B — Curriculum Vitae</h2>
              <p className="text-xs text-[#818cf8] font-code">Formatted Professional Resume</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#1e1b4b] border border-[#818cf8]/30 text-xs font-semibold text-[#bdc2ff] hover:text-white hover:border-[#818cf8] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Copy plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#818cf8]" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-3 py-1.5 rounded-lg bg-[#1e1b4b] border border-[#818cf8]/30 text-xs font-semibold text-[#bdc2ff] hover:text-white hover:border-[#818cf8] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Download text file (.txt)"
            >
              {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-[#818cf8]" />}
              <span>{downloaded ? 'Downloaded' : '.TXT'}</span>
            </button>

            {/* Print / Save as PDF Fallback */}
            <button
              onClick={handleSaveAndPrintPDF}
              className="px-3 py-1.5 rounded-lg bg-[#1e1b4b] border border-[#818cf8]/30 text-xs font-semibold text-[#bdc2ff] hover:text-white hover:border-[#818cf8] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Open browser print dialog to save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#818cf8]" />
              <span>Print View</span>
            </button>

            {/* Primary Direct PDF Download Button */}
            <button
              onClick={handleDownloadDirectPDF}
              disabled={isPdfGenerating}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#818cf8] to-[#6366f1] text-white text-xs font-bold transition-all hover:brightness-110 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(129,140,248,0.4)] disabled:opacity-60"
              title="Download Resume as PDF document"
            >
              {pdfDownloaded ? <Check className="w-4 h-4 text-white" /> : <Download className="w-4 h-4 text-white" />}
              <span>{pdfDownloaded ? 'PDF Downloaded!' : isPdfGenerating ? 'Generating PDF...' : 'Download PDF (.pdf)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1a1b22] text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-body text-[#e3e1ec]">
          
          {/* Header Resume Bio */}
          <div className="border-b border-[#818cf8]/20 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold font-display text-white">{PERSONAL_INFO.name}</h1>
                <p className="text-lg text-[#818cf8] font-semibold mt-0.5">{PERSONAL_INFO.title}</p>
              </div>
              <div className="flex flex-col gap-1 text-xs font-code text-[#94a3b8]">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#818cf8]" /> {PERSONAL_INFO.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#818cf8]" /> {PERSONAL_INFO.location}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[#c6c5d5] leading-relaxed mt-4 bg-[#1a1b22] p-4 rounded-xl border border-[#818cf8]/15">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <GraduationCap className="w-5 h-5" /> Academic Education
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_LIST.map((e) => (
                <div key={e.id} className="p-4 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 hover:border-[#818cf8]/40 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-white text-sm">{e.degree}</h4>
                    <span className="text-xs bg-[#818cf8]/20 text-[#bdc2ff] px-2 py-0.5 rounded font-code font-bold whitespace-nowrap">CGPA: {e.cgpa}</span>
                  </div>
                  <p className="text-xs text-[#c6c5d5] mt-1">{e.institution}, {e.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <Code className="w-5 h-5" /> Technical Expertise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SKILLS_DATA.map((cat) => (
                <div key={cat.title} className="p-4 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 space-y-2.5">
                  <h4 className="font-bold text-xs uppercase font-code text-[#818cf8]">{cat.title}</h4>
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

          {/* Internships & Practical Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <Briefcase className="w-5 h-5" /> Internships & Practical Experience
            </h3>
            <div className="space-y-3">
              {INTERNSHIPS.map((i) => (
                <div key={i.id} className="p-4 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white text-base">{i.role} — <span className="text-[#818cf8] font-normal">{i.company}</span></h4>
                  </div>
                  <p className="text-xs text-[#c6c5d5] leading-relaxed">{i.description}</p>
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
                <div key={p.id} className="p-4 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-base">{p.title}</h4>
                    <span className="text-[10px] font-bold bg-[#818cf8] text-[#101b8a] px-2.5 py-0.5 rounded font-code">{p.badge}</span>
                  </div>
                  <p className="text-xs text-[#c6c5d5] leading-relaxed">{p.description}</p>
                  <p className="text-[11px] text-[#818cf8] font-code pt-0.5">Technologies: {p.tech.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Workshops & Seminars */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <BookOpen className="w-5 h-5" /> Workshops & Seminars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WORKSHOPS.map((w) => (
                <div key={w.id} className="p-3.5 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20 flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-white text-xs">{w.title}</h4>
                    <span className="text-[11px] text-[#94a3b8] font-code">{w.year}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-code uppercase font-bold whitespace-nowrap">
                    {w.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Honors, Awards & Certifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#818cf8] flex items-center gap-2 border-b border-[#818cf8]/20 pb-2">
              <Sparkles className="w-5 h-5" /> Honors, Awards & Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20">
                  <h4 className="font-bold text-white text-xs">📜 {c.title}</h4>
                  <p className="text-[11px] text-[#94a3b8] font-code mt-0.5">{c.issuer}</p>
                </div>
              ))}
              {ACHIEVEMENTS.map((a) => (
                <div key={a.id} className="p-3.5 rounded-xl bg-[#1a1b22] border border-[#818cf8]/20">
                  <h4 className="font-bold text-white text-xs">🏆 {a.title}</h4>
                  <p className="text-[11px] text-[#94a3b8] font-code mt-0.5">{a.issuer}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#818cf8]/20 bg-[#1a1b22] flex items-center justify-end gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAndPrintPDF}
              className="px-4 py-2 rounded-full bg-[#1e1b4b] border border-[#818cf8]/30 hover:border-[#818cf8] text-[#c6c5d5] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#818cf8]" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={handleDownloadDirectPDF}
              disabled={isPdfGenerating}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#818cf8] to-[#6366f1] text-white text-xs font-bold transition-all hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isPdfGenerating ? 'Generating PDF...' : 'Download PDF (.pdf)'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#12131a] text-[#c6c5d5] hover:text-white border border-white/10 hover:border-white/20 text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

