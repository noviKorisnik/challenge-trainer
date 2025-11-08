import { TestCase } from './challenge.model';

export interface ExecutionResult {
  testCase: TestCase;
  actualOutput: any;
  passed: boolean;
  error?: string;
  executionTime?: number;
}
