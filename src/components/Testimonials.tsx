import React, { useState } from "react";
import { TESTIMONIALS_DATA } from "../data";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  return (
    <section className="py-14 bg-[#050505] text-[#F5F5F5] overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="mb-3 inline-block">
            <span className="text-[10px] font-mono font-bold border border-cyan-500 text-cyan-500 px-3 py-1 uppercase tracking-[0.2em]">
              Endorsed by the Community
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight mt-2">
            What Our <span className="text-transparent text-stroke-cyan-500">Community</span> Says
          </h2>
        </motion.div>

        {/* Testimonial Swipe / Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto border border-white/10 bg-black rounded-none p-8 sm:p-12 shadow-2xl"
        >
          
          {/* Big Quote mark */}
          <div className="absolute top-6 left-6 text-cyan-500/10 pointer-events-none">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>

          <div className="relative z-10 text-center space-y-6">
            
            {/* Star ratings */}
            <div className="flex justify-center space-x-1">
              {[...Array(TESTIMONIALS_DATA[activeIdx].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl font-display font-medium text-gray-200 italic leading-relaxed"
              >
                "{TESTIMONIALS_DATA[activeIdx].quote}"
              </motion.p>
            </AnimatePresence>

            {/* Author details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-4 border-t border-white/5 max-w-xs mx-auto"
              >
                <h4 className="text-base font-black text-white font-display uppercase tracking-wider">
                  {TESTIMONIALS_DATA[activeIdx].author}
                </h4>
                <p className="text-xs text-gray-500 font-mono mt-0.5 uppercase font-bold">
                  {TESTIMONIALS_DATA[activeIdx].role}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Nav arrows on sides */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
            <button
              id="testimonial-prev"
              onClick={handlePrev}
              className="p-2 rounded-none bg-black border border-white/10 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
            <button
              id="testimonial-next"
              onClick={handleNext}
              className="p-2 rounded-none bg-black border border-white/10 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator dots */}
          <div className="flex justify-center space-x-1.5 mt-8 relative z-10">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                id={`testimonial-dot-${idx}`}
                onClick={() => setActiveIdx(idx)}
                className={`h-1.5 rounded-none transition-all focus:outline-none cursor-pointer ${
                  idx === activeIdx ? "w-6 bg-cyan-500" : "w-2 bg-[#222]"
                }`}
              />
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
