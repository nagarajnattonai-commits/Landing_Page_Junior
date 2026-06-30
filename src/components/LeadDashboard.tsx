import React, { useState, useEffect } from "react";
import { Lead } from "../types";
import { LayoutDashboard, Users, BarChart3, Download, RefreshCw, Database, Trash2, Eye, ShieldCheck, Mail, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LeadDashboardProps {
  leads: Lead[];
  onClearLeads: () => void;
  onSeedLeads: () => void;
}

export default function LeadDashboard({ leads, onClearLeads, onSeedLeads }: LeadDashboardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"leads" | "analytics">("leads");

  // Calculate statistics
  const totalLeads = leads.length;
  const explorerCount = leads.filter((l) => l.interestedProgram === "explorer").length;
  const creatorCount = leads.filter((l) => l.interestedProgram === "creator").length;
  const teacherCount = leads.filter((l) => l.interestedProgram === "teachers").length;

  const quizAverage = leads.reduce((acc, l) => {
    if (l.quizScore !== undefined) {
      return acc + l.quizScore;
    }
    return acc;
  }, 0) / (leads.filter((l) => l.quizScore !== undefined).length || 1);

  const exportLeadsToCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export!");
      return;
    }
    const headers = ["ID", "Full Name", "Email", "Phone", "School", "Grade", "Interested Program", "Quiz Score", "Submitted At"];
    const rows = leads.map((l) => [
      l.id,
      l.fullName,
      l.email,
      l.phone,
      l.schoolName || "N/A",
      l.grade,
      l.interestedProgram === "explorer" ? "AI Explorer" : l.interestedProgram === "creator" ? "AI Creator" : "AI for Teachers",
      l.quizScore !== undefined ? `${l.quizScore}/3` : "Skipped",
      new Date(l.submittedAt).toLocaleString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `skillx_meta_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="admin-dashboard-container" className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle button */}
      <button
        id="admin-dashboard-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black hover:bg-[#111] text-cyan-400 border border-white/10 hover:border-cyan-500 px-5 py-3.5 rounded-none flex items-center space-x-2 shadow-2xl focus:outline-none cursor-pointer group transition-all font-display uppercase tracking-wider font-black text-xs"
      >
        <LayoutDashboard className="w-5 h-5 group-hover:rotate-6 transition-transform text-pink-500" />
        <span>
          {isOpen ? "Close Leads Hub" : `Leads Hub (${totalLeads})`}
        </span>
      </button>

      {/* Slide up Dashboard Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="admin-dashboard-panel"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[540px] max-h-[80vh] bg-black border border-white/10 rounded-none shadow-2xl flex flex-col overflow-hidden"
          >
            
            {/* Header */}
            <div className="bg-[#111] border-b border-white/5 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-none bg-black border border-white/10 text-cyan-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black font-display text-white uppercase tracking-widest">
                    Natton SkillX Admin Console
                  </h3>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mt-0.5">
                    Meta Ads Campaigns Lead Tracker v1.2
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  id="admin-btn-export"
                  onClick={exportLeadsToCSV}
                  title="Export Leads as CSV"
                  className="p-2 bg-black hover:bg-pink-950/20 text-gray-400 hover:text-white rounded-none border border-white/10 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  id="admin-btn-clear"
                  onClick={onClearLeads}
                  title="Clear All Leads"
                  className="p-2 bg-black hover:bg-pink-950/20 text-pink-500 hover:text-pink-400 rounded-none border border-white/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Segment Controls */}
            <div className="bg-black border-b border-white/5 px-4 py-2 flex items-center space-x-2">
              <button
                id="admin-tab-leads"
                onClick={() => setActiveTab("leads")}
                className={`px-3 py-1.5 rounded-none text-[10px] font-black font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "leads" ? "bg-[#111] text-cyan-400 border border-cyan-500/35" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Lead Submissions ({totalLeads})
              </button>
              <button
                id="admin-tab-analytics"
                onClick={() => setActiveTab("analytics")}
                className={`px-3 py-1.5 rounded-none text-[10px] font-black font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "analytics" ? "bg-[#111] text-cyan-400 border border-cyan-500/35" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Campaign Analytics
              </button>
            </div>

            {/* Scrollable Workspace */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[50vh] scrollbar-thin scrollbar-thumb-[#111]">
              
              {/* TAB 1: Leads list */}
              {activeTab === "leads" && (
                <div id="admin-leads-list" className="space-y-3">
                  {totalLeads === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <Users className="w-12 h-12 text-gray-700 mx-auto" />
                      <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">No leads submitted yet. Fill the landing page form or click below to seed simulation data.</p>
                      <button
                        id="admin-btn-seed"
                        onClick={onSeedLeads}
                        className="bg-black hover:bg-[#111] text-cyan-400 border border-cyan-500/50 px-4 py-2.5 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center space-x-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Seed Simulated Leads</span>
                      </button>
                    </div>
                  ) : (
                    leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3.5 rounded-none border border-white/10 bg-black hover:border-white/15 transition-all text-xs"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="font-bold text-white block truncate max-w-[200px] uppercase font-mono">{lead.fullName}</span>
                            <span className="text-[10px] text-gray-500 font-mono block uppercase">Class/Grade: {lead.grade}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-none text-[9px] font-mono font-bold uppercase border ${
                            lead.interestedProgram === "explorer"
                              ? "bg-black text-cyan-400 border-cyan-500/50"
                              : lead.interestedProgram === "creator"
                              ? "bg-black text-pink-400 border-pink-500/50"
                              : "bg-black text-yellow-400 border-yellow-500/50"
                          }`}>
                            {lead.interestedProgram === "explorer" ? "Explorer" : lead.interestedProgram === "creator" ? "Creator" : "Teacher"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 border-t border-white/5 pt-2 font-mono">
                          <span className="flex items-center space-x-1">
                            <Mail className="w-3.5 h-3.5 text-gray-600" />
                            <span className="truncate">{lead.email}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Phone className="w-3.5 h-3.5 text-gray-600" />
                            <span>{lead.phone}</span>
                          </span>
                          <span className="col-span-2 truncate uppercase text-gray-500 text-[10px]">🏫 School: {lead.schoolName || "Not specified"}</span>
                          {lead.quizScore !== undefined && (
                            <span className="col-span-2 text-cyan-400 font-bold uppercase tracking-wide text-[10px]">
                              🎯 Fun AI-Q Score: {lead.quizScore} / {lead.quizMax}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: Analytics graphs */}
              {activeTab === "analytics" && (
                <div id="admin-analytics" className="space-y-6">
                  
                  {/* Headline Stats Cards */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-none border border-white/10 bg-[#111]">
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider">TOTAL LEADS</span>
                      <span className="text-lg font-display font-black text-white">{totalLeads}</span>
                    </div>
                    <div className="p-3 rounded-none border border-white/10 bg-[#111]">
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider">AI-Q AVG</span>
                      <span className="text-lg font-display font-black text-cyan-400">
                        {totalLeads > 0 ? `${quizAverage.toFixed(1)}/3` : "N/A"}
                      </span>
                    </div>
                    <div className="p-3 rounded-none border border-white/10 bg-[#111]">
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider">CR (%)</span>
                      <span className="text-lg font-display font-black text-white">4.8%</span>
                    </div>
                  </div>

                  {/* Visual lead breakdown bars */}
                  <div className="space-y-3.5 p-4 rounded-none border border-white/10 bg-black">
                    <h4 className="text-xs font-black font-display text-white uppercase tracking-wider mb-2">Cohort Interest Share</h4>
                    
                    {/* Explorer share */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono uppercase">
                        <span>AI Explorer (Class 4-7)</span>
                        <span className="font-bold">{explorerCount} leads ({totalLeads > 0 ? Math.round((explorerCount / totalLeads) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#111] border border-white/5 rounded-none overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 transition-all duration-300"
                          style={{ width: `${totalLeads > 0 ? (explorerCount / totalLeads) * 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Creator share */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono uppercase">
                        <span>AI Creator (Class 8-12)</span>
                        <span className="font-bold">{creatorCount} leads ({totalLeads > 0 ? Math.round((creatorCount / totalLeads) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#111] border border-white/5 rounded-none overflow-hidden">
                        <div
                          className="h-full bg-pink-500 transition-all duration-300"
                          style={{ width: `${totalLeads > 0 ? (creatorCount / totalLeads) * 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Teachers share */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono uppercase">
                        <span>AI for Teachers</span>
                        <span className="font-bold">{teacherCount} leads ({totalLeads > 0 ? Math.round((teacherCount / totalLeads) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#111] border border-white/5 rounded-none overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 transition-all duration-300"
                          style={{ width: `${totalLeads > 0 ? (teacherCount / totalLeads) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Campaign details */}
                  <div className="p-3.5 border border-white/10 bg-[#111] rounded-none space-y-1 text-xs">
                    <span className="block font-bold text-white uppercase tracking-wide text-[10px] font-display">Campaign Guidelines Checklist:</span>
                    <ul className="list-disc pl-4 space-y-1 text-gray-400 text-[11px] font-light">
                      <li>Primary Audience: Parents aged 30-50, school educators in Bengaluru/Hubli</li>
                      <li>Estimated Clicks-to-leads: 4.8% (Excellent Meta Ads metric)</li>
                      <li>Brochure auto-delivery: Active via download receipt trigger</li>
                    </ul>
                  </div>

                </div>
              )}

            </div>

            {/* Footer Console Details */}
            <div className="bg-[#111] border-t border-white/5 p-3.5 flex items-center justify-between text-[9px] font-mono text-gray-500 uppercase tracking-wider">
              <span className="flex items-center space-x-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Encrypted local dataset secure</span>
              </span>
              <span>2026 Sandbox API</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
 
    </div>
  );
}
