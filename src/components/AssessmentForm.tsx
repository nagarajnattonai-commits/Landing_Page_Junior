import React, { useState, useEffect } from "react";
import { Lead } from "../types";
import { 
  Building2, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Hourglass, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Tv 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AssessmentFormProps {
  selectedProgramId?: string;
  onLeadSubmitted?: (newLead: Lead) => void;
}

export default function AssessmentForm({ selectedProgramId, onLeadSubmitted }: AssessmentFormProps) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [selectedCohortAdvice, setSelectedCohortAdvice] = useState<string>("Standard Hubli & Bengaluru Cohorts");

  // Sync program select with prop to give contextual help
  useEffect(() => {
    if (selectedProgramId) {
      if (selectedProgramId === "explorer") {
        setSelectedCohortAdvice("AI Explorer Cohort (Class 4 to 8) - Primary focus on block coding, ML models, and fun AI projects");
      } else if (selectedProgramId === "creator") {
        setSelectedCohortAdvice("AI Creator Cohort (Class 9 to College) - Primary focus on Python, Prompting, and Custom App Deployment");
      } else if (selectedProgramId === "educator") {
        setSelectedCohortAdvice("AI for Educators Cohort - Focused on Lesson planning automation, evaluation assistance, and grading workflows");
      }
    }
  }, [selectedProgramId]);

  // GoHighLevel Script injection
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://links.bizautomation.io/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="enrollment-form" className="py-16 bg-[#050505] text-[#F5F5F5] scroll-mt-12 relative border-t border-white/5 overflow-hidden">
      {/* Decorative Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="mb-4 inline-block">
            <span className="text-[10px] font-mono font-bold border border-cyan-500 text-cyan-500 px-3 py-1.5 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-black/50">
              GHL Secure Enrollment Engine
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight mt-2 mb-4 leading-none">
            Secure Your <span className="text-transparent text-stroke-cyan-500">Free Workshop</span> Seat
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Register below to book your physical workshop slots, request course brochures, and coordinate direct campus onboarding for Hubli and Bengaluru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Cyberpunk Live Badges & Program Info */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Contextual Program Selected Badge */}
              <AnimatePresence mode="wait">
                {selectedProgramId && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-none relative"
                  >
                    <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-500" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                      ✓ Selected Cohort
                    </span>
                    <p className="text-xs text-gray-300 leading-snug">
                      {selectedCohortAdvice}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Board */}
              <div className="bg-[#111] border border-white/5 p-6 rounded-none relative">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold">
                    System Telemetry
                  </span>
                </div>
                
                <h3 className="text-lg font-black font-display text-white uppercase tracking-tight mb-2">
                  Hubli & Bengaluru Onboarding
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
                  Seats are allocated on a strictly first-come, first-served basis for upcoming practical labs.
                </p>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-mono">STATUS:</span>
                    <span className="text-cyan-400 font-mono font-bold">REGISTRATION OPEN</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-mono">SEATS LEFT:</span>
                    <span className="text-pink-500 font-mono font-bold">7 SLOTS REMAINING</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-mono">VERIFIED BY:</span>
                    <span className="text-white font-mono uppercase font-bold text-[10px]">SkillX Academic Board</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Premium Form Frame */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="bg-[#111] border border-white/10 rounded-none p-1 sm:p-2 relative flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              {/* Decorative Tech Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 z-10" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 z-10" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 z-10" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 z-10" />

              {/* Live Loader */}
              {!isIframeLoaded && (
                <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-6 space-y-4">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-10 h-10 border-2 border-t-cyan-500 border-r-cyan-500/20 border-b-cyan-500/20 border-l-cyan-500/20 rounded-full"
                  />
                  <div className="text-center">
                    <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                      Initializing Direct GHL Stream
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono mt-1">
                      Constructing secure endpoint socket...
                    </p>
                  </div>
                </div>
              )}

              {/* Iframe element */}
              <iframe
                src="https://links.bizautomation.io/widget/form/hhfHkEQEldzZjoDr0iYx"
                style={{ width: "100%", height: "100%", minHeight: "680px", border: "none", borderRadius: "8px" }}
                id="inline-hhfHkEQEldzZjoDr0iYx" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Training_Junior"
                data-height="655"
                data-layout-iframe-id="inline-hhfHkEQEldzZjoDr0iYx"
                data-form-id="hhfHkEQEldzZjoDr0iYx"
                title="Training_Junior"
                onLoad={() => setIsIframeLoaded(true)}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
