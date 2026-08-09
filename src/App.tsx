import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { HighlightsSection } from './components/HighlightsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';

import { ResumeModal } from './components/modals/ResumeModal';
import { ContactModal } from './components/modals/ContactModal';
import { ProjectDemoModal } from './components/modals/ProjectDemoModal';

import { Project } from './types';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [demoProject, setDemoProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e3e1ec] font-body selection:bg-[#818cf8]/30 selection:text-[#bdc2ff] relative">
      
      {/* Navigation Header */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Page Sections */}
      <main className="relative z-10">
        <HeroSection
          onOpenContact={() => setContactOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        <AboutSection />

        <EducationSection />

        <SkillsSection />

        <ExperienceSection />

        <WorkshopsSection />

        <HighlightsSection />

        <ProjectsSection
          onOpenDemo={(project) => setDemoProject(project)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <ProjectDemoModal
        project={demoProject}
        onClose={() => setDemoProject(null)}
      />

    </div>
  );
}
