import { Program, StudentProject, Testimonial, FAQItem, QuizQuestion } from "./types";

export const PROGRAMS_DATA: Program[] = [
  {
    id: "explorer",
    title: "AI Explorer",
    grade: "Class 4-7",
    description: "Discover the magical world of Artificial Intelligence through fun activities, games, and creative projects.",
    price: 8000,
    duration: "12 Weeks",
    audience: "4th to 7th Standard",
    modules: [
      "AI Basics",
      "AI Assistants",
      "Prompt Engineering",
      "Writing Tools",
      "Creative Tools",
      "Storytelling",
      "Learning Tools",
      "Coding & AI",
      "Media Creation"
    ],
    outcomes: [
      "Understand AI Basics",
      "Create AI Artwork",
      "Build Stories with AI",
      "Learn Prompt Writing",
      "Explore Beginner Coding",
      "Understand AI Ethics",
      "Present AI Projects"
    ],
    bannerImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "creator",
    title: "AI Creator",
    grade: "Class 8-12",
    description: "Build real-world AI projects, learn Python programming, and master advanced AI tools for innovation and future readiness.",
    price: 12000,
    duration: "12 Weeks",
    audience: "8th to 12th Standard",
    modules: [
      "Python Basics for AI",
      "Machine Learning Concepts",
      "Computer Vision & NLP",
      "Advanced Prompt Engineering",
      "AI Web App Development",
      "Data Visualization",
      "AI Ethics & Safety",
      "Capstones & Portfolios"
    ],
    outcomes: [
      "Build Custom AI Web Apps",
      "Write Python Code",
      "Train Simple ML Models",
      "Deploy AI Chatbots",
      "Analyze Visual Datasets",
      "Develop Critical Problem Solving",
      "Earn SkillX Pro Badge"
    ],
    bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "teachers",
    title: "AI for Teachers",
    grade: "Educators",
    description: "Empower educators with cutting-edge AI tools for rapid lesson planning, assessment automation, and next-generation classroom engagement.",
    price: 15000,
    duration: "6 Weeks",
    audience: "School Teachers & Principals",
    modules: [
      "Generative AI in Education",
      "Automated Lesson Planning",
      "Quiz & Assessment Creators",
      "AI-Driven Personalized Tutoring",
      "Interactive Slides & Media",
      "AI Ethics and Academic Integrity"
    ],
    outcomes: [
      "Save 10+ Hours Weekly",
      "Design Smart Lessons in Minutes",
      "Create Personalized Assignments",
      "Integrate AI Ethics in Classrooms",
      "Leverage Classroom Analytics",
      "Receive Certified AI Educator Badge"
    ],
    bannerImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop"
  }
];

export const PROJECTS_DATA: StudentProject[] = [
  {
    id: "crop-classifier",
    title: "Crop Health Classifier AI",
    developer: "Amit R. (Class 9)",
    grade: "AI Creator",
    category: "AI Foundations",
    tags: ["Python", "Machine Learning", "Agriculture"],
    description: "Amit coded a lightweight visual analyzer that identifies tomato leaf blight using mobile pictures.",
    detailedDescription: "Using a trained Convolutional Neural Network (CNN) in Python, Amit developed a model that classifies tomato leaves into 'Healthy' and 'Leaf Blight' categories, helping farmers in Karnataka diagnose diseases early with simple smartphone uploads."
  },
  {
    id: "homework-buddy",
    title: "Interactive Homework Buddy GPT",
    developer: "Priya K. (Class 7)",
    grade: "AI Explorer",
    category: "Prompt Eng",
    tags: ["NoCode", "Prompt Engineering", "Education"],
    description: "Priya calibrated a customized GPT bot designed specifically to teach geometric theorem proofs step-by-step.",
    detailedDescription: "Tired of direct answers, Priya designed an educational helper bot that guides students through Socratic questioning, prompting them to identify parallel lines, congruent angles, and logical steps instead of feeding them answers directly."
  },
  {
    id: "eco-story",
    title: "Eco-Story Generative Reel",
    developer: "Sahil S. (Class 10)",
    grade: "AI Creator",
    category: "Digital Creativity",
    tags: ["Generative AI", "Storyboarding", "Environment"],
    description: "Sahil formulated a 2-minute stylized animated movie with complete narration using AI-generated story sketches.",
    detailedDescription: "Sahil created a compelling environmental awareness narrative, using text-to-image prompts to generate highly consistent visual storyboard frames, which he then animated and voiced using advanced neural voice-overs."
  },
  {
    id: "art-gallery",
    title: "AI Art Gallery Curator",
    developer: "Riya M. (Class 8)",
    grade: "AI Explorer",
    category: "Canva AI",
    tags: ["Creativity", "Generative Art", "Interactive"],
    description: "Created an interactive digital art gallery using AI-generated images and descriptions.",
    detailedDescription: "Riya explored the combination of descriptive vocabulary and creative direction to generate stylized illustrations representing classic Indian architecture, then built an online portfolio to host her curated gallery."
  },
  {
    id: "study-scheduler",
    title: "Smart Study Scheduler",
    developer: "Kunal P. (Class 11)",
    grade: "AI Creator",
    category: "Automation",
    tags: ["Python", "Algorithm", "Optimization"],
    description: "Built an AI-powered study planner that optimizes revision schedules based on performance.",
    detailedDescription: "Kunal implemented a Spaced Repetition Algorithm in Python that takes test scores as input and dynamically recalibrates revision schedules, ensuring tougher subjects get scheduled right before peak memory decay times."
  }
];

export const IMPACT_IMAGERY = [
  {
    id: "future-school",
    title: "Future-Ready School Initiative",
    description: "Transforming education for the digital age in Karnataka.",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "leadership",
    title: "Happy Birthday Mr. Laxman S. Uppar",
    description: "Celebrating leadership and excellence in future-ready training initiatives.",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "thinking-machine",
    title: "Thinking Machine - AI Education",
    description: "Building critical thinking and computational logic skills through AI workshops.",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "digital-world",
    title: "The Rise of the Digital World",
    description: "Preparing elementary and secondary students for the fast-paced digital future.",
    url: "https://images.unsplash.com/photo-1542626991-cbc4e32724af?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "workshop",
    title: "AI Education Workshop",
    description: "Students getting hands-on with AI capabilities and Prompt Engineering.",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: "The AI for Teachers program transformed our faculty. They're now using AI tools to create highly engaging lesson plans and personalized test prep.",
    author: "Mr. Rajesh Kumar",
    role: "School Principal, Bengaluru",
    rating: 5
  },
  {
    quote: "Our son Sahil built an eco-story animated movie that we shared in our family group. It's amazing to see children transition from consumer to AI creator so fast!",
    author: "Mrs. Sunitha S.",
    role: "Parent of Sahil (Class 10)",
    rating: 5
  },
  {
    quote: "Learning Python through the lens of AI classification made coding so exciting. I never knew maths and coordinates could help classify plant diseases!",
    author: "Amit R.",
    role: "Student, Class 9, Hubli",
    rating: 5
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Is prior coding experience necessary for SkillX Junior?",
    answer: "Absolutely not! Our AI Explorer program starts from the very basics using visual builders and interactive play. Even for our AI Creator (Python) program, we build your child's programming foundation step-by-step with real-world context.",
    category: "Prerequisites"
  },
  {
    question: "Are courses aligned with CBSE/ICSE directives?",
    answer: "Yes, our modules are strategically aligned with the NEP 2020 guidelines which recommend mandatory integration of Artificial Intelligence and Coding curricula for students from Class 6 onwards.",
    category: "Curriculum"
  },
  {
    question: "Do students get recognized certificates?",
    answer: "Yes, on successful completion of the coursework, project submission, and presentation, every student is awarded a Certificate of Excellence from Natton SkillX, highly valuable for future portfolios.",
    category: "Certification"
  },
  {
    question: "What is the duration of each program?",
    answer: "The AI Explorer and AI Creator courses run for 12 weeks with weekly interactive live sessions and project-building labs. The AI for Teachers program is a fast-track 6-week professional transformation course.",
    category: "Schedule"
  },
  {
    question: "Are there any scholarships available?",
    answer: "We partner with leading corporate CSR initiatives to provide merit-based and financial-aid scholarships for high-potential students. Feel free to request information during your demo session or phone callback.",
    category: "Scholarships"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following is an everyday example of AI in action?",
    options: [
      "A classic wall clock ticking",
      "YouTube or Netflix recommending videos based on what you watched",
      "Writing a physical letter with a pencil",
      "A simple light bulb turning on via a switch"
    ],
    correctIndex: 1,
    explanation: "Recommendation engines use machine learning algorithms to understand patterns and preferences, a classic application of AI!"
  },
  {
    id: 2,
    question: "What is 'Prompt Engineering'?",
    options: [
      "Fixing a broken computer motherboard",
      "Writing computer code in assembly language",
      "Crafting precise, clear instructions to get the best responses from an AI chatbot",
      "Designing engines for high-speed supersonic rockets"
    ],
    correctIndex: 2,
    explanation: "Prompt Engineering is the art and science of formulating clear and specific inputs to instruct AI models to give precise, high-quality outputs."
  },
  {
    id: 3,
    question: "If Amit trains an AI model to detect leaf blight, what type of AI is he primarily using?",
    options: [
      "Generative Audio Synthesis",
      "Computer Vision / Image Classification",
      "Text Translation",
      "Robot Navigation"
    ],
    correctIndex: 1,
    explanation: "Since the AI is analyzing images of leaves to classify disease, it falls under Computer Vision (the branch of AI that understands visual inputs)."
  }
];
