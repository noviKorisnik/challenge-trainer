export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  examples: Example[];
  constraints: string[];
  testCases: TestCase[];
  functionSignature: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

export interface TestCase {
  input: any[];
  expectedOutput: any;
  isHidden?: boolean;
}
