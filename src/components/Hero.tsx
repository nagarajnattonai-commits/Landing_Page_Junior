import React from "react";
import { ArrowRight, Sparkles, Award, Shield, Users, Compass } from "lucide-react";
import { motion } from "motion/react";
import ThreeDTiltCard from "./ThreeDTiltCard";

interface HeroProps {
  onExploreClick: () => void;
  onWorkshopClick: () => void;
  onPathClick: (pathId: string) => void;
}

export default function Hero({ onExploreClick, onWorkshopClick, onPathClick }: HeroProps) {
  const journeys = [
    {
      id: "explorer",
      title: "AI Explorer",
      grade: "Class 4-7",
      description: "Discover AI through creativity, fun storytelling, and interactive games.",
      color: "border-l-4 border-cyan-500 bg-[#111] hover:bg-[#161616] text-[#F5F5F5] border-t border-r border-b border-white/5",
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      hoverColor: "group-hover:text-cyan-400"
    },
    {
      id: "creator",
      title: "AI Creator",
      grade: "Class 8-12",
      description: "Build actual AI models, learn Python programming, and deploy web applications.",
      color: "border-l-4 border-pink-500 bg-[#111] hover:bg-[#161616] text-[#F5F5F5] border-t border-r border-b border-white/5",
      icon: <Compass className="w-5 h-5 text-pink-400" />,
      hoverColor: "group-hover:text-pink-400"
    },
    {
      id: "teachers",
      title: "SkillX Pro",
      grade: "Educators",
      description: "Career-focused professional transformation and school-level AI curriculum.",
      color: "border-l-4 border-yellow-500 bg-[#111] hover:bg-[#161616] text-[#F5F5F5] border-t border-r border-b border-white/5",
      icon: <Award className="w-5 h-5 text-yellow-400" />,
      hoverColor: "group-hover:text-yellow-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] pt-24 pb-12 flex flex-col justify-center overflow-hidden bg-[#050505] text-[#F5F5F5]">
      {/* Background Decorative Tech Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto mb-10"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-3 inline-block"
          >
            <span className="text-[10px] font-mono font-bold border border-cyan-500 text-cyan-500 px-3 py-1 uppercase tracking-[0.2em]">
              Empowering the Next Generation
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight uppercase mb-4 leading-[0.95]"
          >
            Future <span className="text-transparent text-stroke-cyan-500">Skills</span><br/>
            & AI Learning
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 font-light leading-relaxed"
          >
            Age-appropriate AI programs designed to build awareness, creativity, and innovation for students from Class 4 to College.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <button
              id="hero-btn-explore"
              onClick={onExploreClick}
              className="w-full sm:w-auto bg-white text-black hover:bg-cyan-500 hover:text-black font-black uppercase tracking-[0.25em] px-8 py-3.5 rounded-none text-xs transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-btn-workshop"
              onClick={onWorkshopClick}
              className="w-full sm:w-auto bg-black text-white hover:bg-cyan-500 hover:text-black border border-white/15 hover:border-transparent font-bold uppercase tracking-[0.25em] px-8 py-3.5 rounded-none text-xs transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Join Now</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Quick Pathway Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-6">
            Your AI Learning Journey Starts Here
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {journeys.map((j, idx) => (
              <ThreeDTiltCard
                key={j.id}
                id={`hero-journey-card-${j.id}`}
                onClick={() => onPathClick(j.id)}
                className={`group p-6 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between rounded-none ${j.color}`}
                maxTilt={10}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-wider font-bold text-gray-400 uppercase">
                      {j.grade}
                    </span>
                    <div className="p-2 bg-black border border-white/10 rounded-none">
                      {j.icon}
                    </div>
                  </div>
                  <h3 className={`text-xl font-black font-display text-white mb-2 transition-colors ${j.hoverColor}`}>
                    {j.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">
                    {j.description}
                  </p>
                </div>
                <div className="flex items-center text-[11px] uppercase tracking-wider font-bold text-gray-400 space-x-1 transition-all duration-300 group-hover:translate-x-1.5 mt-auto group-hover:text-white">
                  <span>Explore Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </ThreeDTiltCard>
            ))}
          </div>
        </motion.div>

        {/* Floating Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-400 text-sm"
        >
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="block font-black text-white text-lg leading-none">15,000+</span>
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Students Trained</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="block font-black text-white text-lg leading-none">120+</span>
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">School Partners</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="block font-black text-white text-lg leading-none">Safe & Secure</span>
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Ethical AI Focus</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
