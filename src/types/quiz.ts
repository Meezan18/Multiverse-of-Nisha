export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  trait?: string;
  explanation?: string;
};

export type QuizResult = {
  type: string;
  title: string;
  description: string;
  score: number;
  color: string;
  character: string;
};

export type Character = {
  name: string;
  avatar: string;
  personality: string;
  bgColor: string;
  glowColor: string;
};
