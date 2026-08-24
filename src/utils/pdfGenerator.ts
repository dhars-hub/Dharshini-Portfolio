import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, EDUCATION_LIST, SKILLS_DATA, INTERNSHIPS, CERTIFICATIONS, ACHIEVEMENTS, PROJECTS, WORKSHOPS } from '../data/portfolioData';

// Helper to sanitize non-ASCII / Unicode characters that cause jsPDF Helvetica encoding errors
function cleanText(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/[•●▪]/g, '-')
    .replace(/[–—]/g, '-')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[🏆📜⭐✨🎓💼📍✉🔗💡]/g, '')
    .replace(/[^\x00-\x7F]/g, ' ')
    .trim();
}

export function generateResumePDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Helper for checking page overflow
  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin + 4;
    }
  };

  // Helper for section title
  const renderSectionHeader = (title: string) => {
    checkPageOverflow(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 27, 75); // Dark indigo #1e1b4b
    doc.text(cleanText(title.toUpperCase()), margin, y);

    // Decorative underline
    doc.setDrawColor(99, 102, 241); // Indigo #6366f1
    doc.setLineWidth(0.6);
    doc.line(margin, y + 1.5, pageWidth - margin, y + 1.5);
    y += 7;
  };

  // 1. TOP HEADER
  doc.setFillColor(30, 27, 75);
  doc.rect(margin, y, contentWidth, 24, 'F');

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.text(cleanText(PERSONAL_INFO.name.toUpperCase()), margin + 6, y + 9);

  // Specific Role
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(165, 180, 252);
  doc.text(cleanText(PERSONAL_INFO.title.toUpperCase()), margin + 6, y + 16);

  // Contact info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240);
  doc.text('GitHub: github.com/dhars-hub', pageWidth - margin - 6, y + 8, { align: 'right' });
  doc.text('LinkedIn: linkedin.com/in/dharshini-b-44a34124a/', pageWidth - margin - 6, y + 14, { align: 'right' });
  doc.text('Location: Trichy, Tamil Nadu, India', pageWidth - margin - 6, y + 20, { align: 'right' });

  y += 28;

  // 2. PROFESSIONAL SUMMARY
  renderSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const summaryText = cleanText(
    `Passionate Full Stack Developer with expertise in Python, Java, SQL, modern MERN & Web Development, and human-centered design. Experienced in building scalable applications and intuitive user experiences with strong analytical and problem-solving skills, backed by a 9.00 CGPA academic track record in Master of Computer Applications (MCA).`
  );
  const splitBio = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitBio, margin, y);
  y += splitBio.length * 4.2 + 4;

  // 3. TECHNICAL SKILLS
  renderSectionHeader('Technical Skills');
  doc.setFontSize(8.5);
  SKILLS_DATA.forEach((category) => {
    checkPageOverflow(6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 27, 75);
    const catLabel = `- ${cleanText(category.title)}: `;
    doc.text(catLabel, margin, y);

    const titleWidth = doc.getTextWidth(catLabel);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const skillList = cleanText(category.skills.map((s) => s.name).join(', '));
    const splitSkills = doc.splitTextToSize(skillList, contentWidth - titleWidth);
    doc.text(splitSkills, margin + titleWidth, y);
    y += splitSkills.length * 4 + 1.5;
  });
  y += 3;

  // 4. EDUCATION
  renderSectionHeader('Academic Education');
  EDUCATION_LIST.forEach((edu) => {
    checkPageOverflow(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(edu.degree), margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text(`CGPA: ${cleanText(edu.cgpa)}`, pageWidth - margin, y, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const eduSub = cleanText(`${edu.institution}, ${edu.location} | Period: ${edu.period}`);
    doc.text(eduSub, margin, y + 4);
    y += 9;
  });
  y += 2;

  // 5. INTERNSHIPS & EXPERIENCE
  renderSectionHeader('Internships & Practical Experience');
  INTERNSHIPS.forEach((exp) => {
    checkPageOverflow(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(`${exp.role} - ${exp.company}`), margin, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(cleanText(exp.period), pageWidth - margin, y, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitDesc = doc.splitTextToSize(cleanText(exp.description), contentWidth);
    doc.text(splitDesc, margin, y + 4.2);
    y += 4.2 + splitDesc.length * 3.8 + 2;
  });

  // 6. FEATURED PROJECTS
  renderSectionHeader('Featured Engineering Projects');
  PROJECTS.forEach((proj) => {
    checkPageOverflow(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(`${proj.title} [${proj.badge}]`), margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(79, 70, 229);
    doc.text(`Stack: ${cleanText(proj.tech.join(', '))}`, pageWidth - margin, y, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitProjDesc = doc.splitTextToSize(cleanText(proj.description), contentWidth);
    doc.text(splitProjDesc, margin, y + 4.2);
    y += 4.2 + splitProjDesc.length * 3.8 + 2;
  });

  // 7. WORKSHOPS & CONFERENCES
  renderSectionHeader('Workshops & Seminars');
  WORKSHOPS.forEach((w) => {
    checkPageOverflow(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 27, 75);
    doc.text(`- ${cleanText(w.title)}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${cleanText(w.type)} | ${cleanText(w.year)}`, pageWidth - margin, y, { align: 'right' });
    y += 5;
  });
  y += 3;

  // 8. HONORS, AWARDS & CERTIFICATIONS
  renderSectionHeader('Honors, Awards & Certifications');
  CERTIFICATIONS.forEach((c) => {
    checkPageOverflow(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`[Certification] ${cleanText(c.title)} - ${cleanText(c.issuer)}`, margin, y);
    y += 4.5;
  });
  ACHIEVEMENTS.forEach((a) => {
    checkPageOverflow(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`[Award] ${cleanText(a.title)} - ${cleanText(a.issuer)}`, margin, y);
    y += 4.5;
  });

  // Save the generated PDF file directly
  doc.save('Dharshini_B_Resume.pdf');
}
