import React from "react";
import { Briefcase, ShieldAlert, Cpu, Sparkles, Presentation, Award } from "lucide-react";
import { motion } from "motion/react";

export default function ParentVisions() {
  const valueProps = [
    {
      icon: <Briefcase className="w-6 h-6 text-cyan-400" />,
      title: "Future-Ready Skills",
      tagline: "Prepare your child for tomorrow's jobs",
      desc: "By 2030, over 85% of jobs will require fluid literacy with AI workflows. We give children the conceptual blueprints so they remain builders and decision-makers, not just users.",
      tagColor: "text-cyan-400",
      hoverClass: "group-hover:text-cyan-400"
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-pink-400" />,
      title: "Safe & Responsible AI",
      tagline: "Learn ethical AI usage and online safety",
      desc: "We focus deeply on AI ethics, digital safety, intellectual property rights, and copyright awareness. Students learn to spot biases and utilize AI safely and morally.",
      tagColor: "text-pink-400",
      hoverClass: "group-hover:text-pink-400"
    },
    {
      icon: <Cpu className="w-6 h-6 text-yellow-400" />,
      title: "Project-Based Learning",
      tagline: "Build real projects, not just theory",
      desc: "No dry worksheets. Every single week, your child completes interactive mini-projects like chatbots, classifiers, or visual reels, graduating with an actual digital portfolio.",
      tagColor: "text-yellow-400",
      hoverClass: "group-hover:text-yellow-400"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: "Creativity & Innovation",
      tagline: "Unlock creative potential with AI tools",
      desc: "AI amplifies human imagination. Students pair literature, history, and agricultural concerns with prompt-engineered tools, turning ideas into animated realities instantly.",
      tagColor: "text-cyan-400",
      hoverClass: "group-hover:text-cyan-400"
    },
    {
      icon: <Presentation className="w-6 h-6 text-pink-400" />,
      title: "Confidence Building",
      tagline: "Present projects and showcase skills",
      desc: "Our cohorts culminate in an interactive Science Fair style virtual showcase. Students present their logic, defend their prompt designs, and explain their models to judges.",
      tagColor: "text-pink-400",
      hoverClass: "group-hover:text-pink-400"
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-400" />,
      title: "Certification Programs",
      tagline: "Recognized certificates for every student",
      desc: "Each level contains rigorous milestone evaluations. Graduates earn physical and digitized, verifiable SkillX Certificates that enrich future school and college applications.",
      tagColor: "text-yellow-400",
      hoverClass: "group-hover:text-yellow-400"
    }
  ];

  return (
    <section id="why-choose" className="py-14 bg-[#050505] text-[#F5F5F5] scroll-mt-12 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="mb-3 inline-block">
            <span className="text-[10px] font-mono font-bold border border-cyan-500 text-cyan-500 px-3 py-1 uppercase tracking-[0.2em]">
              Unrivaled Educational Standard
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight mt-2 mb-3">
            Why Parents <span className="text-transparent text-stroke-cyan-500">Choose SkillX</span>
          </h2>
          <p className="text-gray-400 text-xs max-w-xl mx-auto leading-relaxed">
            Empowering the next generation with future-ready skills, robust digital safety guidelines, and confidence-building presentation forums.
          </p>
        </motion.div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueProps.map((item, index) => (
            <motion.div
              key={index}
              id={`value-prop-card-${index}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
              className="group border border-white/5 bg-[#111] p-6 sm:p-8 rounded-none hover:border-white/15 transition-all duration-300 relative overflow-hidden"
            >
              {/* Icon container */}
              <div className="mb-6 inline-flex p-3 rounded-none bg-black border border-white/10 group-hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Title & Tagline */}
              <h3 className={`text-xl font-black font-display text-white mb-1 transition-colors ${item.hoverClass}`}>
                {item.title}
              </h3>
              <p className={`font-mono font-bold text-[10px] uppercase tracking-wider mb-4 ${item.tagColor}`}>
                {item.tagline}
              </p>

              {/* Description */}
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
