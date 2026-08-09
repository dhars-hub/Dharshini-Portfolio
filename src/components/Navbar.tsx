import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Highlights', href: '#highlights' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact', onClick: onOpenContact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'education', 'skills', 'experience', 'highlights', 'projects'];
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
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, customOnClick?: () => void) => {
    if (customOnClick) {
      e.preventDefault();
      customOnClick();
      setMobileMenuOpen(false);
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/85 backdrop-blur-md border-b border-[#818cf8]/20 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-xl sm:text-2xl font-bold font-display text-white hover:text-[#818cf8] transition-colors flex items-center gap-2 group shrink-0 whitespace-nowrap"
        >
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
            {PERSONAL_INFO.name}
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#818cf8] animate-pulse"></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-4 xl:gap-6 text-xs lg:text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.onClick)}
                className={`transition-colors py-1 px-1.5 lg:px-2 relative text-[#c6c5d5] hover:text-white whitespace-nowrap ${
                  isActive ? 'text-white font-semibold' : ''
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#818cf8] rounded-full shadow-[0_0_8px_#818cf8]"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* View Full Resume CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#1e1b4b] border border-[#818cf8]/40 hover:border-[#818cf8] text-[#e0e0ff] hover:text-white text-xs sm:text-sm font-medium transition-all shadow-[0_0_15px_rgba(129,140,248,0.15)] hover:shadow-[0_0_25px_rgba(129,140,248,0.35)] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-[#818cf8]" />
            <span>View Full Resume</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#1a1b22] text-[#e3e1ec] hover:text-white border border-[#818cf8]/20 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12131a]/95 backdrop-blur-xl border-b border-[#818cf8]/20 px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.onClick)}
                className="text-lg font-medium text-[#c6c5d5] hover:text-white py-1 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#818cf8] text-[#101b8a] font-semibold text-sm shadow-lg cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
