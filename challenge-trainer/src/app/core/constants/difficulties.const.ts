export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;

export type Difficulty = typeof DIFFICULTIES[number];

export interface DifficultyConfig {
  level: Difficulty;
  description: string;
  expectedComplexity: string;
  timeEstimate: string;
}

export const DIFFICULTY_CONFIGS: DifficultyConfig[] = [
  {
    level: 'Easy',
    description: 'Basic problems suitable for beginners',
    expectedComplexity: 'O(n) or better',
    timeEstimate: '5-10 minutes'
  },
  {
    level: 'Medium',
    description: 'Intermediate problems requiring logical thinking',
    expectedComplexity: 'O(n log n) or better',
    timeEstimate: '15-30 minutes'
  },
  {
    level: 'Hard',
    description: 'Advanced problems with complex algorithms',
    expectedComplexity: 'May require O(n²) or advanced techniques',
    timeEstimate: '30-60 minutes'
  }
];
