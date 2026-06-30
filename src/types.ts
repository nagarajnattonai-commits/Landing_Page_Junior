export interface Program {
  id: string;
  title: string;
  grade: string;
  description: string;
  price: number;
  duration: string;
  audience: string;
  modules: string[];
  outcomes: string[];
  bannerImage: string;
}

export interface StudentProject {
  id: string;
  title: string;
  developer: string;
  grade: string;
  category: string;
  tags: string[];
  description: string;
  detailedDescription: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  schoolName?: string;
  grade: string;
  interestedProgram: string;
  quizScore?: number;
  quizMax?: number;
  recommendedPath?: string;
  submittedAt: string;
  notes?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
