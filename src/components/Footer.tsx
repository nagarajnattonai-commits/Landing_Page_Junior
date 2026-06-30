import React, { useState } from "react";
import { Brain, Phone, Mail, MapPin, Send, Heart } from "lucide-react";

interface FooterProps {
  onLinkClick: (sectionId: string) => void;
}

export default function Footer({ onLinkClick }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const quickLinks = [
    { label: "Home", id: "hero" },
    { label: "About Us", id: "why-choose" },
    { label: "SkillX Junior", id: "programs" },
    { label: "SkillX Pro", id: "programs" },
    { label: "CareerX", id: "programs" },
  ];

  const secondaryLinks = [
    { label: "Programs", id: "programs" },
    { label: "Events", id: "faq" },
    { label: "Contact", id: "enrollment-form" },
  ];

  return (
    <footer className="bg-[#050505] text-[#F5F5F5] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/5 pb-12 mb-12">
          
          {/* Column 1: Brand pitch */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => onLinkClick("hero")}>
              <img 
                src="/src/assets/images/skillx_logo_1782726033661.jpg" 
                alt="SkillX Logo" 
                className="w-9 h-9 object-cover rounded-sm"
                referrerPolicy="no-referrer"
              />
              <span className="font-display font-black uppercase text-xl tracking-tight text-white">
                Natton <span className="text-cyan-400">SkillX</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Empowering individuals with AI education, future skills training, and career transformation programs. Designing age-appropriate curricula for tomorrow's thinkers.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black font-display uppercase tracking-[0.2em] text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <button
                    id={`footer-quick-link-${idx}`}
                    onClick={() => onLinkClick(item.id)}
                    className="text-gray-400 hover:text-cyan-400 text-xs sm:text-sm transition-colors cursor-pointer text-left focus:outline-none uppercase font-mono font-bold"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Secondary links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black font-display uppercase tracking-[0.2em] text-white">Programs</h4>
            <ul className="space-y-2">
              {secondaryLinks.map((item, idx) => (
                <li key={idx}>
                  <button
                    id={`footer-sec-link-${idx}`}
                    onClick={() => onLinkClick(item.id)}
                    className="text-gray-400 hover:text-pink-400 text-xs sm:text-sm transition-colors cursor-pointer text-left focus:outline-none uppercase font-mono font-bold"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-black font-display uppercase tracking-[0.2em] text-white">Contact Us</h4>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm font-mono font-bold">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href="tel:+917795512226" className="hover:text-white transition-colors">+91 77955 12226</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href="mailto:nattonskillx@gmail.com" className="hover:text-white transition-colors">nattonskillx@gmail.com</a>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Bengaluru & Hubli, Karnataka, India</span>
                </li>
              </ul>
            </div>

            {/* Newsletter input */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black font-display uppercase tracking-[0.2em] text-white">Newsletter</h4>
              <p className="text-[11px] text-gray-400 font-light">Get the latest updates on courses, events, and educational resources.</p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  id="footer-email-sub"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-black border border-white/10 text-xs rounded-none px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 flex-1 text-white"
                />
                <button
                  type="submit"
                  id="footer-sub-submit"
                  className="bg-pink-500 hover:bg-white hover:text-black text-white p-2.5 rounded-none transition-colors focus:outline-none cursor-pointer border-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              
              {subscribed && (
                <p className="text-[11px] text-pink-400 font-mono font-bold animate-pulse uppercase">
                  ✓ Successfully subscribed! Check your inbox soon.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Legal Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-mono">
          <p>© 2026 Natton SkillX Junior Academy. All Rights Reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Powered by Future-Ready Digital Initiatives</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
          </p>
        </div>

      </div>
    </footer>
  );
}
