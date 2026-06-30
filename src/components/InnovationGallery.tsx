import React, { useState } from "react";
import { PROJECTS_DATA } from "../data";
import { StudentProject } from "../types";
import { Sparkles, Brain, Code, Play, RefreshCw, Send, CheckCircle2, User, AlertCircle, Heart, Star, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function InnovationGallery() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("crop-classifier");

  // State for Crop Classifier Simulator (Amit R.)
  const [leafType, setLeafType] = useState<"healthy" | "blight" | "wilted">("blight");
  const [classifying, setClassifying] = useState(false);
  const [classificationResult, setClassificationResult] = useState<any>(null);

  // State for Homework Buddy Simulator (Priya K.)
  const [buddyMessages, setBuddyMessages] = useState<Array<{ sender: "user" | "buddy"; text: string }>>([
    { sender: "buddy", text: "Hey! I'm Priya's Homework Buddy. Ask me any geometry theorem, and I will help you prove it step-by-step!" }
  ]);
  const [buddyTyping, setBuddyTyping] = useState(false);

  // State for Eco-Story Generative Reel (Sahil S.)
  const [currentEcoFrame, setCurrentEcoFrame] = useState(0);

  // State for AI Art Gallery Curator (Riya M.)
  const [activeArtPrompt, setActiveArtPrompt] = useState(0);

  // State for Study Scheduler (Kunal P.)
  const [schedulerSubject, setSchedulerSubject] = useState("Maths");
  const [schedulerHours, setSchedulerHours] = useState("4 Hours");
  const [generatedSchedule, setGeneratedSchedule] = useState<any>(null);

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  // Amit's Classifier Simulation
  const handleRunClassifier = () => {
    setClassifying(true);
    setClassificationResult(null);
    setTimeout(() => {
      setClassifying(false);
      if (leafType === "blight") {
        setClassificationResult({
          status: "Tomato Early Blight Detected",
          confidence: "97.6%",
          type: "Fungal Infection (Alternaria solani)",
          action: "Apply organic copper fungicide immediately. Prune leaves within 1 foot of the soil to increase airflow and dry out spores."
        });
      } else if (leafType === "healthy") {
        setClassificationResult({
          status: "Perfectly Healthy Tomato Leaf",
          confidence: "99.1%",
          type: "Optimal Health",
          action: "No active diseases detected! Continue current irrigation and ensure 6-8 hours of healthy direct sunlight."
        });
      } else {
        setClassificationResult({
          status: "Severe Wilting / Water Stress",
          confidence: "94.2%",
          type: "Abiotic Soil Stress",
          action: "Moisture levels below threshold. Irrigate deep at the root level early in the morning and add dry organic mulch to retain soil dampness."
        });
      }
    }, 1200);
  };

  // Priya's Homework Buddy Simulation
  const handleBuddyQuestion = (question: string) => {
    if (buddyTyping) return;
    const newMessages = [...buddyMessages, { sender: "user", text: question }];
    setBuddyMessages(newMessages);
    setBuddyTyping(true);

    setTimeout(() => {
      let reply = "";
      if (question.includes("Pythagoras")) {
        reply = "Great choice! Pythagoras Theorem states that in a right-angled triangle, a² + b² = c² (where c is the hypotenuse). Think of a square built on each side. How could we rearrange four equal right triangles inside a larger square to visualize this? Hint: What happens to the empty spaces inside?";
      } else if (question.includes("180")) {
        reply = "Classic proof! Imagine drawing a line parallel to the base of the triangle, touching the top vertex. Now look at the angles formed on that straight line. What mathematical rule matches alternate interior angles here?";
      } else {
        reply = "Thales' Theorem is super useful! If a line is drawn parallel to one side of a triangle intersecting the other two sides, it divides those sides in the same ratio. Have you tried drawing the heights of the two newly formed top triangles to compare their areas?";
      }
      setBuddyMessages((prev) => [...prev, { sender: "buddy", text: reply }]);
      setBuddyTyping(false);
    }, 1000);
  };

  const resetBuddyChat = () => {
    setBuddyMessages([
      { sender: "buddy", text: "Hey! I'm Priya's Homework Buddy. Ask me any geometry theorem, and I will help you prove it step-by-step!" }
    ]);
  };

  // Sahil's Eco-Story frames
  const ecoStoryFrames = [
    {
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
      title: "Frame 1: The Drying Riverbed",
      caption: "Once bustling with blue ripples, the local Cauvery tributaries had shrunk to parched golden mud cracks due to unmoderated thermal spikes."
    },
    {
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
      title: "Frame 2: Seedling Spark",
      caption: "Sahil's robotic seed dispersal drone maps critical barren segments and shoots organic clay-coated sapling pods into the parched cracks."
    },
    {
      img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=600&auto=format&fit=crop",
      title: "Frame 3: Community Greening",
      caption: "Empowered by micro-irrigation sensors, local community children adopt distinct grids, monitoring sapling root heat indexes on their phones."
    },
    {
      img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop",
      title: "Frame 4: The Return of Greenery",
      caption: "Six months later, consistent visual tracking confirms a 40% survival rate, bringing shading canopies and nesting birds back to the banks."
    }
  ];

  // Riya's Prompt Art data
  const artPieces = [
    {
      img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop",
      title: "The Cyberpunk Taj Mahal",
      prompt: "Photorealistic detailed rendering of Taj Mahal made of carbon fibre and glowing holographic cyan lines under a rainy neon skyline of 2099, cinematic lighting, 8k resolution.",
      technique: "Contrast & Volumetric Fogging"
    },
    {
      img: "https://images.unsplash.com/photo-1600100397608-f010e98038f4?q=80&w=600&auto=format&fit=crop",
      title: "Hampi Ruins in Watercolors",
      prompt: "Dreamy impressionist watercolor illustration of Stone Chariot Hampi during sunrise, wet-on-wet technique, golden reflections, soft pastel colors, masterfully blended, trending on ArtStation.",
      technique: "Vocabulary-driven Texture Mapping"
    },
    {
      img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop",
      title: "Mysore Palace in Futurism",
      prompt: "Solarpunk architectural redesign of Mysore Palace, lush vertical gardens hanging off balconies, integrated solar panels shaped like peacock feathers, hyper-futuristic glass domes, sunny afternoon.",
      technique: "Geometric prompt layering"
    }
  ];

  // Kunal's Scheduler Simulation
  const handleGenerateSchedule = () => {
    setGeneratedSchedule({
      subject: schedulerSubject,
      hours: schedulerHours,
      days: [
        { day: "Mon", focus: "Core Study block: " + schedulerSubject + " basics (active recall)" },
        { day: "Tue", focus: "Spaced Revision: Active recall test on Monday's concepts" },
        { day: "Wed", focus: "Secondary subjects & mock paper calibration" },
        { day: "Thu", focus: "Hard concepts revision: " + schedulerSubject + " weak areas" },
        { day: "Fri", focus: "Flashcard session and interactive peer explanation study" },
        { day: "Sat", focus: "Full subject mock practice and AI analytics diagnostic" },
        { day: "Sun", focus: "Active mental rest & next week buffer goal setting" }
      ]
    });
  };

  return (
    <section id="innovation" className="py-14 bg-[#050505] text-[#F5F5F5] scroll-mt-12 relative border-t border-white/5">
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
              Student Innovation Gallery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight mt-2 mb-3">
            Real <span className="text-transparent text-stroke-cyan-500">Student Projects</span>
          </h2>
          <p className="text-gray-400 text-xs max-w-xl mx-auto leading-relaxed">
            We don't just teach theory. Our students apply machine learning, python algorithms, prompt engineering, and generative media to solve real-world problems. Interact with their projects below!
          </p>
        </motion.div>

        {/* Project Tab Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12"
        >
          {PROJECTS_DATA.map((project) => {
            const isSelected = project.id === selectedProjectId;
            return (
              <button
                key={project.id}
                id={`project-tab-${project.id}`}
                onClick={() => setSelectedProjectId(project.id)}
                className={`p-4 rounded-none border text-left transition-all cursor-pointer focus:outline-none flex flex-col justify-between h-full ${
                  isSelected
                    ? "border-pink-500 bg-pink-950/20 text-white"
                    : "border-white/5 bg-[#111] hover:border-white/15 text-gray-400 hover:text-white"
                }`}
              >
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-pink-400 mb-1 font-bold">
                    {project.category}
                  </span>
                  <span className="block font-display font-black text-xs leading-tight uppercase">
                    {project.title}
                  </span>
                </div>
                <span className="block text-[9px] font-mono text-cyan-400 mt-2 font-semibold">
                  {project.developer.split(" ")[0]} ({project.developer.match(/\(([^)]+)\)/)?.[1] || "Class"})
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Layout: Info Side & Simulation Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between border border-white/5 rounded-none p-6 sm:p-8 bg-[#111]"
          >
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-[10px] font-bold bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-none font-mono uppercase">
                  {selectedProject.grade}
                </span>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">
                  {selectedProject.category} Project
                </span>
              </div>

              <h3 className="text-2xl font-black font-display text-white mb-3 uppercase tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="text-gray-400 text-xs font-mono mb-4">
                Developed by <span className="text-white font-bold">{selectedProject.developer}</span>
              </p>
              
              <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">
                {selectedProject.detailedDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono bg-black text-gray-300 border border-white/5 px-2.5 py-1 rounded-none uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center space-x-3 text-xs text-gray-500 font-mono">
              <Code className="w-4 h-4 text-cyan-500" />
              <span>Full source code available in student repository</span>
            </div>
          </motion.div>

          {/* Project Live Simulation Sandbox */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 border border-white/5 rounded-none bg-black flex flex-col overflow-hidden"
          >
            
            {/* Sandbox Topbar */}
            <div className="bg-[#111] border-b border-white/5 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-none bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-none bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-none bg-cyan-500" />
                </div>
                <span className="text-[10px] font-mono text-gray-500">
                  sandbox-terminal://{selectedProject.id}/live-simulator
                </span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded-none font-bold uppercase tracking-wider animate-pulse">
                ACTIVE DEPLOYMENT
              </span>
            </div>

            {/* Simulation Work Area */}
            <div className="p-6 flex-1 flex flex-col justify-center min-h-[320px]">
              
              {/* S1: Crop Classifier (Amit R.) */}
              {selectedProject.id === "crop-classifier" && (
                <div id="sim-crop-classifier" className="space-y-6">
                  <p className="text-xs text-gray-400 font-mono uppercase tracking-wider font-bold">
                    1. Select a tomato leaf specimen to test Amit's machine learning model:
                  </p>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      id="specimen-blight"
                      onClick={() => { setLeafType("blight"); setClassificationResult(null); }}
                      className={`p-3 rounded-none border text-center transition-all cursor-pointer ${
                        leafType === "blight"
                          ? "border-cyan-500 bg-cyan-950/20 text-white"
                          : "border-white/5 bg-[#111] text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="block text-xl mb-1">🍂</span>
                      <span className="text-xs font-bold uppercase font-mono tracking-wider">Blight Spot</span>
                    </button>
                    <button
                      id="specimen-healthy"
                      onClick={() => { setLeafType("healthy"); setClassificationResult(null); }}
                      className={`p-3 rounded-none border text-center transition-all cursor-pointer ${
                        leafType === "healthy"
                          ? "border-cyan-500 bg-cyan-950/20 text-white"
                          : "border-white/5 bg-[#111] text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="block text-xl mb-1">🌿</span>
                      <span className="text-xs font-bold uppercase font-mono tracking-wider">Healthy Leaf</span>
                    </button>
                    <button
                      id="specimen-wilted"
                      onClick={() => { setLeafType("wilted"); setClassificationResult(null); }}
                      className={`p-3 rounded-none border text-center transition-all cursor-pointer ${
                        leafType === "wilted"
                          ? "border-cyan-500 bg-cyan-950/20 text-white"
                          : "border-white/5 bg-[#111] text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="block text-xl mb-1">🥀</span>
                      <span className="text-xs font-bold uppercase font-mono tracking-wider">Water Stress</span>
                    </button>
                  </div>

                  <button
                    id="run-crop-model"
                    onClick={handleRunClassifier}
                    disabled={classifying}
                    className="w-full py-4 bg-white hover:bg-cyan-500 text-black font-black text-xs rounded-none flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer border-none uppercase tracking-widest"
                  >
                    {classifying ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Running TensorFlow Inference...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>DiagnoseSpecimen(specimen_img)</span>
                      </>
                    )}
                  </button>

                  {/* Inference Output */}
                  <AnimatePresence mode="wait">
                    {classificationResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-5 rounded-none border border-white/10 bg-[#111] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-cyan-400 flex items-center space-x-1 uppercase tracking-wider font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Inference Success</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 border border-white/10 rounded-none">
                            {classificationResult.confidence} Match
                          </span>
                        </div>
                        <h4 className="text-sm font-black uppercase text-white tracking-tight">{classificationResult.status}</h4>
                        <p className="text-[11px] text-gray-500 font-mono uppercase">Category: {classificationResult.type}</p>
                        <div className="text-xs text-gray-300 border-l-2 border-cyan-500 pl-3 italic mt-1 bg-black py-2.5 pr-2 rounded-none leading-relaxed font-light">
                          <strong className="text-cyan-400 uppercase font-mono text-[10px] tracking-wider block mb-1">AI Treatment Recommendation:</strong> {classificationResult.action}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* S2: Homework Buddy GPT (Priya K.) */}
              {selectedProject.id === "homework-buddy" && (
                <div id="sim-homework-buddy" className="flex flex-col h-[320px] justify-between">
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[220px] pr-2 scrollbar-thin scrollbar-thumb-slate-900">
                    {buddyMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-none px-4 py-3 text-xs ${
                            msg.sender === "user"
                              ? "bg-cyan-500 text-black font-bold"
                              : "bg-[#111] text-gray-300 border border-white/5 leading-relaxed font-light"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {buddyTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[#111] text-gray-500 rounded-none px-4 py-2.5 text-xs border border-white/5 animate-pulse font-mono uppercase text-[10px]">
                          Priya's Buddy is formulating a reply...
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono">Select a geometric proof to start:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        id="buddy-q-pythagoras"
                        onClick={() => handleBuddyQuestion("How do I prove the Pythagoras Theorem?")}
                        className="text-[10px] bg-[#111] hover:bg-white hover:text-black border border-white/5 py-2 px-3 rounded-none text-left text-gray-300 transition-colors truncate focus:outline-none cursor-pointer uppercase font-mono font-bold"
                      >
                        Pythagoras Theorem
                      </button>
                      <button
                        id="buddy-q-triangle"
                        onClick={() => handleBuddyQuestion("Can you help me prove that triangle angles equal 180°?")}
                        className="text-[10px] bg-[#111] hover:bg-white hover:text-black border border-white/5 py-2 px-3 rounded-none text-left text-gray-300 transition-colors truncate focus:outline-none cursor-pointer uppercase font-mono font-bold"
                      >
                        Angle Sum Property
                      </button>
                      <button
                        id="buddy-q-thales"
                        onClick={() => handleBuddyQuestion("Explain Thales' Theorem simply.")}
                        className="text-[10px] bg-[#111] hover:bg-white hover:text-black border border-white/5 py-2 px-3 rounded-none text-left text-gray-300 transition-colors truncate focus:outline-none cursor-pointer uppercase font-mono font-bold"
                      >
                        Thales' Theorem
                      </button>
                    </div>
                    <button
                      id="reset-buddy-chat"
                      onClick={resetBuddyChat}
                      className="text-[10px] text-cyan-400 hover:text-white uppercase font-mono font-bold tracking-wider block text-center pt-1"
                    >
                      Reset chat session
                    </button>
                  </div>
                </div>
              )}

              {/* S3: Eco-Story Generative Reel (Sahil S.) */}
              {selectedProject.id === "eco-story" && (
                <div id="sim-eco-story" className="space-y-4">
                  <div className="relative aspect-video rounded-none overflow-hidden border border-white/5 group">
                    <img
                      src={ecoStoryFrames[currentEcoFrame].img}
                      alt="Story frame"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    
                    {/* Frame Index Overlay */}
                    <span className="absolute top-3 left-3 bg-black/80 border border-white/10 text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded-none uppercase font-bold tracking-wider">
                      Frame {currentEcoFrame + 1} of 4
                    </span>

                    {/* Frame Text Overlays */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 border-t border-white/5">
                      <h4 className="text-xs font-black uppercase text-white tracking-wider mb-1">
                        {ecoStoryFrames[currentEcoFrame].title}
                      </h4>
                      <p className="text-[11px] text-gray-300 leading-normal font-light">
                        {ecoStoryFrames[currentEcoFrame].caption}
                      </p>
                    </div>
                  </div>

                  {/* Play Controls */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex space-x-1">
                      {ecoStoryFrames.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-none transition-all ${
                            idx === currentEcoFrame ? "w-6 bg-cyan-500" : "w-1.5 bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        id="eco-btn-prev"
                        onClick={() => setCurrentEcoFrame((prev) => (prev > 0 ? prev - 1 : 3))}
                        className="px-3 py-2 bg-[#111] hover:bg-white hover:text-black text-gray-300 text-[10px] font-mono font-bold uppercase rounded-none border border-white/10 transition-colors focus:outline-none cursor-pointer"
                      >
                        Prev Frame
                      </button>
                      <button
                        id="eco-btn-next"
                        onClick={() => setCurrentEcoFrame((prev) => (prev < 3 ? prev + 1 : 0))}
                        className="px-3 py-2 bg-pink-500 hover:bg-white hover:text-black text-white text-[10px] font-mono font-bold uppercase rounded-none border border-transparent transition-colors focus:outline-none cursor-pointer flex items-center space-x-1"
                      >
                        <span>Next Frame</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* S4: AI Art Gallery Curator (Riya M.) */}
              {selectedProject.id === "art-gallery" && (
                <div id="sim-art-gallery" className="space-y-4">
                  <div className="relative aspect-video rounded-none overflow-hidden border border-white/5 group">
                    <img
                      src={artPieces[activeArtPrompt].img}
                      alt="Art speculation"
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  </div>

                  {/* Carousel Thumbnails */}
                  <div className="grid grid-cols-3 gap-2">
                    {artPieces.map((piece, idx) => (
                      <button
                        key={idx}
                        id={`art-thumb-${idx}`}
                        onClick={() => setActiveArtPrompt(idx)}
                        className={`text-left p-2.5 border rounded-none transition-all focus:outline-none cursor-pointer ${
                          activeArtPrompt === idx
                            ? "border-pink-500 bg-pink-950/20 text-white"
                            : "border-white/5 bg-[#111] text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="block text-[10px] font-bold uppercase font-mono tracking-wider truncate">{piece.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Piece Data */}
                  <div className="p-3.5 rounded-none border border-white/5 bg-[#111]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                        Style Technique: {artPieces[activeArtPrompt].technique}
                      </span>
                      <span className="text-[10px] font-mono bg-black px-1.5 py-0.5 border border-white/10 rounded-none text-gray-400">
                        Canva AI Engine
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 font-mono italic leading-relaxed font-light">
                      " {artPieces[activeArtPrompt].prompt} "
                    </p>
                  </div>
                </div>
              )}

              {/* S5: Smart Study Scheduler (Kunal P.) */}
              {selectedProject.id === "study-scheduler" && (
                <div id="sim-study-scheduler" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 font-mono">
                        Toughest Subject
                      </label>
                      <select
                        id="sched-subject-select"
                        value={schedulerSubject}
                        onChange={(e) => { setSchedulerSubject(e.target.value); setGeneratedSchedule(null); }}
                        className="w-full bg-[#111] border border-white/10 text-xs rounded-none p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      >
                        <option value="Maths">Mathematics (Trig/Algebra)</option>
                        <option value="Physics">Physics (Mechanics/Optics)</option>
                        <option value="Chemistry">Chemistry (Organic/Valence)</option>
                        <option value="Biology">Biology (Cytology/Circulation)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 font-mono">
                        Daily Study Goal
                      </label>
                      <select
                        id="sched-hours-select"
                        value={schedulerHours}
                        onChange={(e) => { setSchedulerHours(e.target.value); setGeneratedSchedule(null); }}
                        className="w-full bg-[#111] border border-white/10 text-xs rounded-none p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      >
                        <option value="2 Hours">2 Hours / Day (Normal)</option>
                        <option value="4 Hours">4 Hours / Day (Optimum)</option>
                        <option value="6 Hours">6 Hours / Day (Supercharged)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    id="run-scheduler-btn"
                    onClick={handleGenerateSchedule}
                    className="w-full py-4 bg-white hover:bg-yellow-400 text-black font-black text-xs rounded-none flex items-center justify-center space-x-2 transition-colors cursor-pointer border-none uppercase tracking-widest"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Run SpacedRepetitionOptimizer.py</span>
                  </button>

                  <AnimatePresence mode="wait">
                    {generatedSchedule && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3.5 rounded-none border border-white/10 bg-[#111] space-y-2.5"
                      >
                        <span className="text-[10px] font-mono text-cyan-400 flex items-center space-x-1 uppercase tracking-wider font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Generated Optimal 7-Day Micro-Schedule</span>
                        </span>
                        
                        <div className="grid grid-cols-7 gap-1.5 text-center">
                          {generatedSchedule.days.map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="group relative bg-black border border-white/5 rounded-none py-2 cursor-help hover:border-cyan-500 transition-colors"
                            >
                              <span className="block text-[10px] font-mono font-bold text-gray-400">{item.day}</span>
                              <div className="w-1.5 h-1.5 rounded-none bg-cyan-500 mx-auto mt-1" />
                              
                              {/* Hover tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 hidden group-hover:block bg-[#111] text-[10px] text-gray-300 p-3 rounded-none border border-white/10 shadow-xl z-20 text-left leading-relaxed">
                                {item.focus}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-[9px] text-gray-500 text-center font-mono uppercase font-bold tracking-wider">
                          💡 Hover over the days to view Spaced Repetition Focus blocks
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

            </div>

            {/* Sandbox Status Bar */}
            <div className="bg-black/80 border-t border-white/5 px-5 py-2.5 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-none bg-cyan-500 animate-ping" />
                <span>Port 3000 online • Sandbox secure</span>
              </span>
              <span>Memory Heap: 14.2 MB</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
