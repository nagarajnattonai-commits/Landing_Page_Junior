import React, { useState } from "react";
import { FAQ_DATA } from "../data";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-14 bg-[#050505] text-[#F5F5F5] scroll-mt-12 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
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
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight mt-2 mb-3">
            Frequently Asked <span className="text-transparent text-stroke-cyan-500">Questions</span>
          </h2>
          <p className="text-gray-400 text-xs max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our SkillX Junior courses, certifications, and CBSE alignment.
          </p>
        </motion.div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                id={`faq-item-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.08, 0.4) }}
                className={`border rounded-none transition-all duration-300 ${
                  isOpen
                    ? "border-pink-500 bg-black"
                    : "border-white/5 bg-[#111] hover:border-white/15"
                }`}
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-black uppercase text-sm text-white hover:text-cyan-400 focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className="w-5 h-5 text-pink-500 shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-white/5 text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
