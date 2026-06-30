import React, { useState, useEffect } from "react";
import { Brain, Menu, X, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  onBookClick: () => void;
}

export default function Navbar({ onNavClick, onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Program Details", id: "programs" },
    { label: "Why Choose Us", id: "why-choose" },
    { label: "Student Creations", id: "innovation" },
    { label: "FAQs", id: "faq" },
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavClick(id);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => handleItemClick("hero")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <img 
              src="/src/assets/images/skillx_logo_1782726033661.jpg" 
              alt="SkillX Logo" 
              className="w-9 h-9 object-cover rounded-sm transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight uppercase text-white leading-none">
                SkillX <span className="text-cyan-500">Junior</span>
              </span>
              <span className="text-[8px] uppercase tracking-widest text-slate-400 font-mono font-bold mt-0.5">
                Future Academy
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className="text-slate-300 hover:text-cyan-400 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact & CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="tel:+917795512226"
              id="nav-call-link"
              className="flex items-center text-slate-300 hover:text-cyan-400 text-xs font-mono tracking-wider space-x-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>+91 77955 12226</span>
            </a>
            <button
              id="nav-btn-workshop"
              onClick={onBookClick}
              className="px-6 py-2 bg-white text-black hover:bg-cyan-500 hover:text-black transition-colors duration-300 font-bold uppercase tracking-widest text-xs rounded-none cursor-pointer"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-cyan-400 focus:outline-none p-1.5"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#050505] border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className="block w-full text-left py-2.5 text-xs uppercase tracking-widest font-bold text-slate-300 hover:text-cyan-400 border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <a
                  href="tel:+917795512226"
                  id="mobile-nav-call"
                  className="flex items-center text-slate-300 hover:text-cyan-400 text-xs font-semibold font-mono space-x-2 py-1"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>+91 77955 12226</span>
                </a>
                <button
                  id="mobile-nav-workshop"
                  onClick={() => {
                    setIsOpen(false);
                    onBookClick();
                  }}
                  className="w-full bg-white text-black py-3 rounded-none text-center font-bold text-xs uppercase tracking-widest transition-colors hover:bg-cyan-500"
                >
                  Join Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
