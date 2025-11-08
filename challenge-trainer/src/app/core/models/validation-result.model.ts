export interface ValidationResult {
  isCorrect: boolean;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  alternativeApproaches?: string[];
  complexity?: {
    time: string;
    space: string;
  };
}
