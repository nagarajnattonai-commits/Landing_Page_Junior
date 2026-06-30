import React, { useState } from "react";
import { BookOpen, Calendar, Clock, CheckCircle, ArrowRight, Award, ChevronDown, ChevronUp } from "lucide-react";
import { PROGRAMS_DATA } from "../data";
import { Program } from "../types";
import ThreeDTiltCard from "./ThreeDTiltCard";
import { motion, AnimatePresence } from "motion/react";

interface ProgramsProps {
  onEnrollSelect: (programId: string) => void;
  selectedProgramId?: string;
}

export default function Programs({ onEnrollSelect, selectedProgramId }: ProgramsProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "students" | "teachers">("all");
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<"full" | "installments">("full");

  const filteredPrograms = PROGRAMS_DATA.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "students") return p.id === "explorer" || p.id === "creator";
    if (activeFilter === "teachers") return p.id === "teachers";
    return true;
  });

  const toggleSyllabus = (programId: string) => {
    if (expandedSyllabus === programId) {
      setExpandedSyllabus(null);
    } else {
      setExpandedSyllabus(programId);
    }
  };

  const formatPrice = (price: number) => {
    if (paymentMode === "installments") {
      const monthly = Math.round(price / 3);
      return `₹${monthly.toLocaleString("en-IN")} / mo`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <section id="programs" className="py-14 bg-[#050505] text-[#F5F5F5] scroll-mt-12 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight mb-3">
            Choose Your <span className="text-transparent text-stroke-cyan-500">Learning Path</span>
          </h2>
          <p className="text-gray-400 text-xs max-w-xl mx-auto leading-relaxed">
            Age-appropriate programs designed for every stage. Select your cohort to start building critical future-ready AI skills.
          </p>

          {/* Interactive Navigation Filter */}
          <div className="mt-8 inline-flex p-1 bg-[#111] rounded-none border border-white/10">
            <button
              id="filter-all"
              onClick={() => setActiveFilter("all")}
              className={`px-5 py-2.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === "all"
                  ? "bg-white text-black font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Cohorts
            </button>
            <button
              id="filter-students"
              onClick={() => setActiveFilter("students")}
              className={`px-5 py-2.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === "students"
                  ? "bg-white text-black font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              For Students
            </button>
            <button
              id="filter-teachers"
              onClick={() => setActiveFilter("teachers")}
              className={`px-5 py-2.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === "teachers"
                  ? "bg-white text-black font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              For Educators
            </button>
          </div>

          {/* Interactive Payment Mode Toggle */}
          <div className="mt-6 flex items-center justify-center space-x-3 text-[11px] uppercase tracking-wider font-bold text-gray-500">
            <span className={paymentMode === "full" ? "text-white" : ""}>One-time Payment</span>
            <button
              id="payment-mode-toggle"
              onClick={() => setPaymentMode(paymentMode === "full" ? "installments" : "full")}
              className="w-10 h-6 bg-black rounded-full p-1 transition-colors border border-white/10 focus:outline-none cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full bg-cyan-500 transition-transform ${
                  paymentMode === "installments" ? "translate-x-4" : ""
                }`}
              />
            </button>
            <span className={paymentMode === "installments" ? "text-white" : ""}>
              3-Month EMI Plans (0% Interest)
            </span>
          </div>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => {
              const isHighlighted = program.id === "creator";
              const isSyllabusExpanded = expandedSyllabus === program.id;

              // Accent color config
              const accentTextClass = 
                program.id === "explorer" 
                  ? "text-cyan-400" 
                  : program.id === "creator" 
                  ? "text-pink-400" 
                  : "text-yellow-400";

              const accentBgClass = 
                program.id === "explorer" 
                  ? "bg-cyan-950/40 border-cyan-500/20 text-cyan-400" 
                  : program.id === "creator" 
                  ? "bg-pink-950/40 border-pink-500/20 text-pink-400" 
                  : "bg-yellow-950/40 border-yellow-500/20 text-yellow-400";

              const cardBorderClass = 
                isHighlighted
                  ? "border-pink-500/60 ring-1 ring-pink-500/20"
                  : selectedProgramId === program.id
                  ? "border-yellow-500"
                  : "border-white/5";

              const bulletColor = 
                program.id === "explorer"
                  ? "text-cyan-400"
                  : program.id === "creator"
                  ? "text-pink-400"
                  : "text-yellow-400";

              return (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <ThreeDTiltCard
                    id={`program-card-${program.id}`}
                    className={`relative border rounded-none transition-all duration-300 overflow-hidden flex flex-col justify-between h-full bg-[#111] ${cardBorderClass} ${selectedProgramId === program.id ? "ring-2 ring-yellow-500" : ""}`}
                    maxTilt={8}
                  >
                    {/* Visual Accent for Highlighted Card */}
                    {isHighlighted && (
                      <div className="absolute top-0 right-0 bg-pink-500 text-white font-mono font-bold text-[9px] uppercase tracking-widest py-1 px-4 rounded-none z-20">
                        Most Popular
                      </div>
                    )}

                    {/* Card Top */}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[10px] font-bold border px-3 py-1 rounded-none font-mono uppercase ${accentBgClass}`}>
                          {program.grade}
                        </span>
                        <span className="flex items-center space-x-1 text-[11px] font-mono uppercase text-gray-500 font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{program.duration}</span>
                        </span>
                      </div>

                      <h3 className="text-2xl font-black font-display text-white mb-3 uppercase tracking-tight">
                        {program.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">
                        {program.description}
                      </p>

                      {/* Program Price */}
                      <div className="border-t border-white/5 py-4 mb-6">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-3xl font-black font-mono text-white">
                            {formatPrice(program.price)}
                          </span>
                          {paymentMode === "installments" && (
                            <span className="text-xs text-gray-500 font-mono">for 3 months</span>
                          )}
                        </div>
                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block mt-2">
                          Syllabus: 12 live classes, 1-on-1 labs, manuals & certificates
                        </span>
                      </div>

                      {/* Core Program Outlines */}
                      <div className="space-y-4 mb-6">
                        <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                          Key Outcomes
                        </p>
                        <ul className="space-y-2.5">
                          {program.outcomes.slice(0, 4).map((outcome, idx) => (
                            <li key={idx} className="flex items-start text-xs text-gray-300">
                              <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 mr-2.5 ${bulletColor}`} />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Syllabus/Modules Interactive Accordion */}
                      <div className="border-t border-white/5 pt-4">
                        <button
                          id={`syllabus-toggle-${program.id}`}
                          onClick={() => toggleSyllabus(program.id)}
                          className="w-full flex items-center justify-between py-2 text-gray-300 hover:text-white transition-colors text-xs uppercase tracking-wider font-bold focus:outline-none cursor-pointer"
                        >
                          <span className="flex items-center space-x-2">
                            <BookOpen className={`w-4 h-4 ${accentTextClass}`} />
                            <span>{isSyllabusExpanded ? "Hide Modules" : "Explore 12-Week Syllabus"}</span>
                          </span>
                          {isSyllabusExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          )}
                        </button>

                        <AnimatePresence initial={false}>
                          {isSyllabusExpanded && (
                            <motion.div
                              id={`syllabus-content-${program.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden mt-3 grid grid-cols-1 gap-2 pl-6 pb-2"
                            >
                              {program.modules.map((mod, modIdx) => (
                                <div
                                  key={modIdx}
                                  className="text-xs text-gray-400 flex items-center space-x-2 py-1 bg-black rounded-none px-2.5 border border-white/5"
                                >
                                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-none font-bold uppercase ${accentBgClass}`}>
                                    Mod {modIdx + 1}
                                  </span>
                                  <span className="truncate font-light">{mod}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Card Action */}
                    <div className="p-6 bg-black border-t border-white/5 z-20">
                      <button
                        id={`enroll-btn-${program.id}`}
                        onClick={() => onEnrollSelect(program.id)}
                        className={`w-full py-4 px-4 rounded-none font-black text-xs uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                          isHighlighted
                            ? "bg-pink-500 text-white hover:bg-white hover:text-black"
                            : "bg-white text-black hover:bg-cyan-500"
                        }`}
                      >
                        <span>Enroll / Book Trial</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </ThreeDTiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quick School CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-[#111] rounded-none border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-yellow-500">
              School Partnership Opportunities
            </span>
            <h3 className="text-3xl font-black font-display text-white uppercase tracking-tight mt-2 mb-3 leading-none">
              Bring AI education to your entire school
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Equip your school with structured textbook alignment, physical lab blueprints, certified faculty training, and student AI showcase exhibitions.
            </p>
          </div>
          <button
            id="school-partnership-cta"
            onClick={() => onEnrollSelect("teachers")}
            className="shrink-0 bg-white hover:bg-yellow-500 text-black font-bold uppercase tracking-[0.2em] px-6 py-4 rounded-none text-xs transition-colors cursor-pointer"
          >
            Explore Partnerships
          </button>
        </motion.div>

      </div>
    </section>
  );
}
