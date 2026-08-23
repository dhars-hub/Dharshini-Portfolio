import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  User,
  GraduationCap,
  Code2,
  Briefcase,
  Award,
  Trophy,
  FolderGit2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Layers,
  ArrowRight,
  ArrowLeft,
  Compass,
} from 'lucide-react';

import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperienceSection';
import { WorkshopsSection } from './WorkshopsSection';
import { HighlightsSection } from './HighlightsSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import { Project } from '../types';

export interface SlideItem {
  id: string;
  number: string;
  name: string;
  shortTitle: string;
  category: string;
  themeColor: string;
  glowColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  icon: React.FC<{ className?: string }>;
}

export const SLIDES_DATA: SlideItem[] = [
  {
    id: 'home',
    number: '01',
    name: 'Home & Introduction',
    shortTitle: 'Home',
    category: 'PROFILE',
    themeColor: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.25)',
    badgeBg: 'bg-indigo-500/15',
    badgeBorder: 'border-indigo-500/30',
    badgeText: 'text-indigo-400',
    icon: Sparkles,
  },
  {
    id: 'about',
    number: '02',
    name: 'About Dharshini',
    shortTitle: 'About',
    category: 'BIOGRAPHY',
    themeColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    badgeBg: 'bg-sky-500/15',
    badgeBorder: 'border-sky-500/30',
    badgeText: 'text-sky-400',
    icon: User,
  },
  {
    id: 'education',
    number: '03',
    name: 'Academic Education',
    shortTitle: 'Education',
    category: 'ACADEMICS',
    themeColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.25)',
    badgeBg: 'bg-emerald-500/15',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    icon: GraduationCap,
  },
  {
    id: 'skills',
    number: '04',
    name: 'Technical Skills & Stack',
    shortTitle: 'Skills',
    category: 'TECH STACK',
    themeColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.25)',
    badgeBg: 'bg-amber-500/15',
    badgeBorder: 'border-amber-500/30',
    badgeText: 'text-amber-400',
    icon: Code2,
  },
  {
    id: 'experience',
    number: '05',
    name: 'Internship Experience',
    shortTitle: 'Experience',
    category: 'CAREER',
    themeColor: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.25)',
    badgeBg: 'bg-blue-500/15',
    badgeBorder: 'border-blue-500/30',
    badgeText: 'text-blue-400',
    icon: Briefcase,
  },
  {
    id: 'workshops',
    number: '06',
    name: 'Workshops & Training',
    shortTitle: 'Workshops',
    category: 'UPSKILLING',
    themeColor: '#e879f9',
    glowColor: 'rgba(232, 121, 249, 0.25)',
    badgeBg: 'bg-fuchsia-500/15',
    badgeBorder: 'border-fuchsia-500/30',
    badgeText: 'text-fuchsia-400',
    icon: Award,
  },
  {
    id: 'highlights',
    number: '07',
    name: 'Leadership & Highlights',
    shortTitle: 'Highlights',
    category: 'ACHIEVEMENTS',
    themeColor: '#fb7185',
    glowColor: 'rgba(251, 113, 133, 0.25)',
    badgeBg: 'bg-rose-500/15',
    badgeBorder: 'border-rose-500/30',
    badgeText: 'text-rose-400',
    icon: Trophy,
  },
  {
    id: 'projects',
    number: '08',
    name: 'Featured Projects',
    shortTitle: 'Projects',
    category: 'PORTFOLIO',
    themeColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.25)',
    badgeBg: 'bg-purple-500/15',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-400',
    icon: FolderGit2,
  },
  {
    id: 'contact',
    number: '09',
    name: 'Connect & Contact',
    shortTitle: 'Contact',
    category: 'INQUIRIES',
    themeColor: '#22d3ee',
    glowColor: 'rgba(34, 211, 238, 0.25)',
    badgeBg: 'bg-cyan-500/15',
    badgeBorder: 'border-cyan-500/30',
    badgeText: 'text-cyan-400',
    icon: Mail,
  },
];

interface SlideDeckProps {
  currentIndex: number;
  direction: number;
  onSelectSlide: (index: number) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenDemo: (project: Project) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.32 },
      scale: { duration: 0.32 },
      filter: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 320 : -320,
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
      filter: { duration: 0.25 },
    },
  }),
};

export const SlideDeck: React.FC<SlideDeckProps> = ({
  currentIndex,
  direction,
  onSelectSlide,
  onOpenResume,
  onOpenContact,
  onOpenDemo,
}) => {
  const currentSlide = SLIDES_DATA[currentIndex] || SLIDES_DATA[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentIndex < SLIDES_DATA.length - 1) {
          onSelectSlide(currentIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          onSelectSlide(currentIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onSelectSlide]);

  // Touch Swipe navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe threshold (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < SLIDES_DATA.length - 1) {
        // Swiped Left -> go Next
        onSelectSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swiped Right -> go Prev
        onSelectSlide(currentIndex - 1);
      }
    }
    touchStartX.current = null;
  };

  // Scroll to top of slide on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const prevSlide = currentIndex > 0 ? SLIDES_DATA[currentIndex - 1] : null;
  const nextSlide =
    currentIndex < SLIDES_DATA.length - 1 ? SLIDES_DATA[currentIndex + 1] : null;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[90vh] pb-28 pt-20 overflow-x-hidden flex flex-col justify-between"
    >
      {/* Ambient Page Dynamic Glow Background */}
      <div
        className="fixed inset-0 pointer-events-none transition-colors duration-700 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 15%, ${currentSlide.glowColor} 0%, transparent 65%)`,
        }}
      />

      {/* Top Page Center Header Bar with Background Color */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-4 pb-2">
        <div 
          className="w-full flex items-center justify-between gap-3 p-3 sm:px-6 sm:py-3.5 rounded-2xl border shadow-lg transition-all duration-500 backdrop-blur-md"
          style={{
            backgroundColor: `${currentSlide.themeColor}18`,
            borderColor: `${currentSlide.themeColor}50`,
            boxShadow: `0 0 30px ${currentSlide.glowColor}`,
          }}
        >
          {/* Left: Section Number & Badge */}
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs sm:text-sm font-bold font-code uppercase tracking-wider px-3.5 py-1.5 rounded-full border shadow-sm flex items-center gap-2"
              style={{
                backgroundColor: `${currentSlide.themeColor}28`,
                borderColor: `${currentSlide.themeColor}70`,
                color: currentSlide.themeColor,
              }}
            >
              <currentSlide.icon className="w-4 h-4" />
              <span>{currentSlide.number} / 0{SLIDES_DATA.length} • {currentSlide.category}</span>
            </span>
          </div>

          {/* Right/Center: Entire Slide Title in Theme Color */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: currentSlide.themeColor }}
            />
            <span 
              className="text-sm sm:text-base md:text-lg font-extrabold font-display tracking-wide"
              style={{ color: currentSlide.themeColor }}
            >
              {currentSlide.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Animated Slide Body */}
      <div className="relative w-full flex-1">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {currentSlide.id === 'home' && (
              <HeroSection
                onOpenContact={onOpenContact}
                onOpenResume={onOpenResume}
                onNavigateToSection={(id) => {
                  const targetIdx = SLIDES_DATA.findIndex((s) => s.id === id);
                  if (targetIdx !== -1) onSelectSlide(targetIdx);
                }}
              />
            )}

            {currentSlide.id === 'about' && <AboutSection />}

            {currentSlide.id === 'education' && <EducationSection />}

            {currentSlide.id === 'skills' && <SkillsSection />}

            {currentSlide.id === 'experience' && <ExperienceSection />}

            {currentSlide.id === 'workshops' && <WorkshopsSection />}

            {currentSlide.id === 'highlights' && <HighlightsSection />}

            {currentSlide.id === 'projects' && (
              <ProjectsSection onOpenDemo={onOpenDemo} />
            )}

            {currentSlide.id === 'contact' && (
              <ContactSection onOpenResume={onOpenResume} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Navigation Controller Bar */}
      <div className="fixed bottom-4 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-[#0d0e16]/90 backdrop-blur-xl border border-[#818cf8]/25 rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-[0_10px_35px_rgba(0,0,0,0.75)] flex items-center justify-between gap-2 pointer-events-auto">
          
          {/* Previous Slide Button */}
          <button
            onClick={() => prevSlide && onSelectSlide(currentIndex - 1)}
            disabled={!prevSlide}
            aria-label="Previous Page"
            className={`px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              prevSlide
                ? 'bg-[#1a1b26] hover:bg-[#25263a] text-white border border-[#818cf8]/30 hover:border-[#818cf8]'
                : 'opacity-40 text-[#64748b] bg-transparent cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">
              {prevSlide ? prevSlide.shortTitle : 'Start'}
            </span>
          </button>

          {/* Center Slide Indicator Dots & Pills */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 px-1 max-w-[200px] sm:max-w-md no-scrollbar">
            {SLIDES_DATA.map((slide, idx) => {
              const isActive = idx === currentIndex;
              const IconComp = slide.icon;

              return (
                <button
                  key={slide.id}
                  onClick={() => onSelectSlide(idx)}
                  title={`${slide.number} - ${slide.name}`}
                  className={`group relative flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'px-3 py-1.5 shadow-md'
                      : 'w-7 h-7 sm:w-8 sm:h-8 hover:bg-white/10 text-[#94a3b8]'
                  }`}
                  style={{
                    backgroundColor: isActive ? `${slide.themeColor}22` : undefined,
                    border: isActive ? `1px solid ${slide.themeColor}80` : '1px solid transparent',
                  }}
                >
                  <IconComp
                    className={`w-3.5 h-3.5 transition-colors ${
                      isActive ? 'stroke-current' : 'opacity-70 group-hover:opacity-100'
                    }`}
                    style={{ color: isActive ? slide.themeColor : undefined }}
                  />
                  {isActive && (
                    <span
                      className="ml-1.5 text-[11px] font-bold font-code whitespace-nowrap hidden md:inline"
                      style={{ color: slide.themeColor }}
                    >
                      {slide.shortTitle}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Slide Button */}
          <button
            onClick={() => {
              if (nextSlide) {
                onSelectSlide(currentIndex + 1);
              } else {
                onSelectSlide(0); // Loop back to home
              }
            }}
            aria-label="Next Page"
            className="px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-semibold flex items-center gap-1.5 bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] shadow-[0_0_15px_rgba(129,140,248,0.4)] transition-all cursor-pointer"
          >
            <span className="hidden sm:inline">
              {nextSlide ? nextSlide.shortTitle : 'Back to Home'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  );
};
