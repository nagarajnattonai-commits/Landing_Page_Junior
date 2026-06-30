import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import InnovationGallery from "./components/InnovationGallery";
import ParentVisions from "./components/ParentVisions";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import AssessmentForm from "./components/AssessmentForm";
import LeadDashboard from "./components/LeadDashboard";
import Footer from "./components/Footer";
import ThreeDBackground from "./components/ThreeDBackground";
import { Lead } from "./types";

const INITIAL_SEEDS: Lead[] = [
  {
    id: "l1",
    fullName: "Rohan Gowda",
    email: "rohan.gowda@gmail.com",
    phone: "9845012345",
    schoolName: "Delhi Public School Bengaluru North",
    grade: "Class 9",
    interestedProgram: "creator",
    quizScore: 3,
    quizMax: 3,
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "l2",
    fullName: "Ananya Patil",
    email: "ananya.patil@gmail.com",
    phone: "7760923456",
    schoolName: "KLE Society School Hubli",
    grade: "Class 6",
    interestedProgram: "explorer",
    quizScore: 2,
    quizMax: 3,
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "l3",
    fullName: "Mr. Shridhar Hegde",
    email: "shridhar.hegde@outlook.com",
    phone: "9448123456",
    schoolName: "Sanskrit Vidyalaya Hubli",
    grade: "Educators",
    interestedProgram: "teachers",
    quizScore: undefined,
    quizMax: 3,
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>(undefined);

  // Load leads from localStorage on mount
  useEffect(() => {
    const localLeads = localStorage.getItem("skillx_leads");
    if (localLeads) {
      setLeads(JSON.parse(localLeads));
    } else {
      // Seed initial mock leads
      localStorage.setItem("skillx_leads", JSON.stringify(INITIAL_SEEDS));
      setLeads(INITIAL_SEEDS);
    }
  }, []);

  // Handle section scrolling
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Pre-select program and scroll down to form
  const handleEnrollSelect = (programId: string) => {
    setSelectedProgramId(programId);
    scrollToSection("enrollment-form");
  };

  const handleLeadSubmitted = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleClearLeads = () => {
    if (window.confirm("Are you sure you want to clear all leads?")) {
      localStorage.removeItem("skillx_leads");
      setLeads([]);
    }
  };

  const handleSeedLeads = () => {
    localStorage.setItem("skillx_leads", JSON.stringify(INITIAL_SEEDS));
    setLeads(INITIAL_SEEDS);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-cyan-500 selection:text-black overflow-x-hidden antialiased font-sans relative">
      {/* Interactive 3D Node & Particle Constellation Background */}
      <ThreeDBackground />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-[900px] bg-[#111] -skew-x-12 translate-x-20 z-0 pointer-events-none opacity-50"></div>
      <div className="absolute top-[600px] -left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[2200px] right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[3800px] left-10 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Navbar Navigation */}
      <Navbar
        onNavClick={scrollToSection}
        onBookClick={() => scrollToSection("enrollment-form")}
      />

      {/* 2. Hero Interactive Board */}
      <Hero
        onExploreClick={() => scrollToSection("programs")}
        onWorkshopClick={() => scrollToSection("enrollment-form")}
        onPathClick={handleEnrollSelect}
      />

      {/* 3. Choose Your Learning Path (Programs) */}
      <Programs
        onEnrollSelect={handleEnrollSelect}
        selectedProgramId={selectedProgramId}
      />

      {/* 4. Why Parents Choose (Value Props) */}
      <ParentVisions />

      {/* 6. Student Projects Sandbox Gallery */}
      <InnovationGallery />

      {/* 7. Community Endorsements (Testimonials) */}
      <Testimonials />

      {/* 8. Frequently Asked Questions */}
      <FAQ />

      {/* 9. Interactive Fun Quiz & Lead Capture Wizard */}
      <AssessmentForm
        selectedProgramId={selectedProgramId}
        onLeadSubmitted={handleLeadSubmitted}
      />

      {/* 10. Floating Lead & Analytics Dashboard for Client/Advertiser */}
      <LeadDashboard
        leads={leads}
        onClearLeads={handleClearLeads}
        onSeedLeads={handleSeedLeads}
      />

      {/* 11. Footer details, map links, and subscription */}
      <Footer onLinkClick={scrollToSection} />
    </div>
  );
}
