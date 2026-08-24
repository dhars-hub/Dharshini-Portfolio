import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles, LayoutGrid, Layers, Columns } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SLIDES_DATA } from './SlideDeck';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  currentSlideIndex?: number;
  onSelectSlide?: (index: number) => void;
  viewMode?: 'slides' | 'scroll';
  onToggleViewMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenContact,
  currentSlideIndex = 0,
  onSelectSlide,
  viewMode = 'slides',
  onToggleViewMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home', index: 0 },
    { name: 'About', id: 'about', index: 1 },
    { name: 'Education', id: 'education', index: 2 },
    { name: 'Skills', id: 'skills', index: 3 },
    { name: 'Experience', id: 'experience', index: 4 },
    { name: 'Workshops', id: 'workshops', index: 5 },
    { name: 'Highlights', id: 'highlights', index: 6 },
    { name: 'Projects', id: 'projects', index: 7 },
    { name: 'Contact', id: 'contact', index: 8 },
  ];

  useEffect(() => {
    if (viewMode === 'scroll') {
      const handleScroll = () => {
        setScrolled(window.scrollY > 30);

        const sections = [
          'home',
          'about',
          'education',
          'skills',
          'experience',
          'workshops',
          'highlights',
          'projects',
          'contact',
        ];
        const scrollPosition = window.scrollY + 120;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrolled(false);
    }
  }, [viewMode]);

  const handleNavClick = (
    e: React.MouseEvent,
    item: { name: string; id: string; index: number }
  ) => {
    e.preventDefault();
    if (viewMode === 'slides' && onSelectSlide) {
      onSelectSlide(item.index);
    } else {
      const targetEl = document.getElementById(item.id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(item.id);
      }
    }
    setMobileMenuOpen(false);
  };

  const activeSlideData = SLIDES_DATA[currentSlideIndex] || SLIDES_DATA[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || viewMode === 'slides'
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#818cf8]/20 shadow-lg py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand Name */}
        <button
          onClick={(e) => handleNavClick(e, navLinks[0])}
          className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white hover:text-[#818cf8] transition-colors flex items-center gap-2 group shrink-0 whitespace-nowrap cursor-pointer text-left"
        >
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-400 bg-clip-text text-transparent whitespace-nowrap">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] font-code text-[#818cf8] font-semibold -mt-1 hidden sm:block">
              {PERSONAL_INFO.title}
            </span>
          </div>
          <span
            className="inline-block w-2 h-2 rounded-full transition-colors duration-500 animate-pulse self-center"
            style={{ backgroundColor: activeSlideData.themeColor }}
          />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium bg-[#12131a]/80 p-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const isSlideActive =
              viewMode === 'slides'
                ? currentSlideIndex === link.index
                : activeSection === link.id;

            const slideConfig = SLIDES_DATA[link.index];
            const themeColor = slideConfig?.themeColor || '#818cf8';

            return (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link)}
                className={`transition-all duration-300 py-1.5 px-3 rounded-full relative font-body text-xs cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSlideActive
                    ? 'text-white font-bold shadow-sm'
                    : 'text-[#94a3b8] hover:text-[#e3e1ec] hover:bg-white/5'
                }`}
                style={{
                  backgroundColor: isSlideActive ? `${themeColor}25` : undefined,
                  borderColor: isSlideActive ? `${themeColor}60` : 'transparent',
                  borderWidth: isSlideActive ? '1px' : '0px',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: isSlideActive ? themeColor : 'transparent',
                    opacity: isSlideActive ? 1 : 0,
                  }}
                />
                <span style={{ color: isSlideActive ? themeColor : undefined }}>
                  {link.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Mode Switch + Resume CTA */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          
          {/* View Mode Switcher */}
          {onToggleViewMode && (
            <button
              onClick={onToggleViewMode}
              title={viewMode === 'slides' ? 'Switch to Continuous Scroll View' : 'Switch to Side-by-Side Slide Deck View'}
              className="p-2.5 rounded-full bg-[#161722] border border-[#818cf8]/30 hover:border-[#818cf8] text-[#bdc2ff] hover:text-white transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {viewMode === 'slides' ? (
                <>
                  <Columns className="w-4 h-4 text-[#818cf8]" />
                  <span className="hidden xl:inline font-code text-[11px]">Slide Mode</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4 text-[#34d399]" />
                  <span className="hidden xl:inline font-code text-[11px]">Scroll Mode</span>
                </>
              )}
            </button>
          )}

          {/* View Full Resume CTA Button */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#1e1b4b] border border-[#818cf8]/50 hover:border-[#818cf8] text-[#e0e0ff] hover:text-white text-xs sm:text-sm font-medium transition-all shadow-[0_0_15px_rgba(129,140,248,0.2)] hover:shadow-[0_0_25px_rgba(129,140,248,0.4)] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-[#818cf8]" />
            <span>Full Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger & Mode Switch */}
        <div className="lg:hidden flex items-center gap-2">
          {onToggleViewMode && (
            <button
              onClick={onToggleViewMode}
              className="p-2 rounded-lg bg-[#161722] text-[#bdc2ff] border border-[#818cf8]/30 text-xs"
              title="Toggle View Mode"
            >
              {viewMode === 'slides' ? <Columns className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1a1b22] text-[#e3e1ec] hover:text-white border border-[#818cf8]/20 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12131a]/95 backdrop-blur-xl border-b border-[#818cf8]/20 px-6 py-6 transition-all animate-fadeIn">
          <nav className="grid grid-cols-2 gap-2.5">
            {navLinks.map((link) => {
              const isSlideActive =
                viewMode === 'slides'
                  ? currentSlideIndex === link.index
                  : activeSection === link.id;
              const slideConfig = SLIDES_DATA[link.index];
              const themeColor = slideConfig?.themeColor || '#818cf8';

              return (
                <button
                  key={link.name}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-left px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm border transition-all cursor-pointer flex items-center justify-between ${
                    isSlideActive
                      ? 'text-white font-bold bg-[#1e1b4b]'
                      : 'text-[#c6c5d5] hover:text-white bg-[#161722] border-white/5'
                  }`}
                  style={{
                    borderColor: isSlideActive ? `${themeColor}80` : undefined,
                    color: isSlideActive ? themeColor : undefined,
                  }}
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] font-code opacity-70">
                    0{link.index + 1}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#818cf8] text-[#101b8a] font-bold text-xs sm:text-sm shadow-lg cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
