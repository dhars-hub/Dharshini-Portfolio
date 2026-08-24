import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SlideDeck, SLIDES_DATA } from './components/SlideDeck';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { HighlightsSection } from './components/HighlightsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { ResumeModal } from './components/modals/ResumeModal';
import { ContactModal } from './components/modals/ContactModal';
import { ProjectDemoModal } from './components/modals/ProjectDemoModal';
import { AIBot } from './components/AIBot';

import { Project } from './types';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [demoProject, setDemoProject] = useState<Project | null>(null);

  // Deck Slide Navigation State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [viewMode, setViewMode] = useState<'slides' | 'scroll'>('slides');

  const handleSelectSlide = (targetIndex: number) => {
    if (targetIndex === currentSlideIndex) return;
    const direction = targetIndex > currentSlideIndex ? 1 : -1;
    setSlideDirection(direction);
    setCurrentSlideIndex(targetIndex);
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'slides' ? 'scroll' : 'slides'));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e3e1ec] font-body selection:bg-[#818cf8]/30 selection:text-[#bdc2ff] relative">
      
      {/* Navigation Header */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={handleSelectSlide}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {viewMode === 'slides' ? (
          /* Side-by-Side Paginated Slide Deck with Colorful Themes */
          <SlideDeck
            currentIndex={currentSlideIndex}
            direction={slideDirection}
            onSelectSlide={handleSelectSlide}
            onOpenResume={() => setResumeOpen(true)}
            onOpenContact={() => setContactOpen(true)}
            onOpenDemo={(project) => setDemoProject(project)}
          />
        ) : (
          /* Traditional Continuous Scroll Mode */
          <div className="pt-20">
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
            <ProjectsSection onOpenDemo={(project) => setDemoProject(project)} />
            <ContactSection onOpenResume={() => setResumeOpen(true)} />
            <Footer onOpenContact={() => setContactOpen(true)} />
          </div>
        )}
      </main>

      {/* Floating AI Assistant Bot */}
      <AIBot
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onSelectSlide={handleSelectSlide}
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
