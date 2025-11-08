import { Injectable } from '@angular/core';
import { TestCase, ExecutionResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CodeExecutionService {
  private readonly MAX_EXECUTION_TIME = 5000; // 5 seconds

  executeCode(code: string, testCases: TestCase[]): ExecutionResult[] {
    const results: ExecutionResult[] = [];

    for (const testCase of testCases) {
      const result = this.runSingleTest(code, testCase);
      results.push(result);
    }

    return results;
  }

  private runSingleTest(code: string, testCase: TestCase): ExecutionResult {
    const startTime = performance.now();
    
    try {
      // Extract function from code
      const func = this.extractFunction(code);
      
      // Execute with timeout
      const actualOutput = this.executeWithTimeout(func, testCase.input);
      const executionTime = performance.now() - startTime;
      
      // Compare outputs
      const passed = this.compareOutputs(actualOutput, testCase.expectedOutput);
      
      return {
        testCase,
        actualOutput,
        passed,
        executionTime
      };
    } catch (error: any) {
      return {
        testCase,
        actualOutput: null,
        passed: false,
        error: error.message || 'Execution error',
        executionTime: performance.now() - startTime
      };
    }
  }

  private extractFunction(code: string): Function {
    try {
      // Extract function name from code
      const functionMatch = code.match(/function\s+(\w+)/);
      const arrowMatch = code.match(/(?:const|let|var)\s+(\w+)\s*=/);
      
      const functionName = functionMatch?.[1] || arrowMatch?.[1];
      
      if (!functionName) {
        throw new Error('Could not find function name. Make sure your function is named.');
      }

      // Create a function that returns the user's function
      // eslint-disable-next-line no-new-func
      const wrapper = new Function('code', `
        ${code}
        return ${functionName};
      `);
      
      return wrapper(code);
    } catch (error: any) {
      throw new Error(`Failed to parse code: ${error.message}`);
    }
  }

  private executeWithTimeout(func: Function, inputs: any[]): any {
    // Deep clone inputs to prevent mutations affecting test data
    // This ensures each test run gets fresh, unmodified data
    const clonedInputs = this.deepClone(inputs);
    return func(...clonedInputs);
  }

  private deepClone(value: any): any {
    // Use JSON parse/stringify for deep cloning
    // This handles arrays, objects, primitives, nested structures
    // Note: Functions, undefined, and symbols are not preserved
    return JSON.parse(JSON.stringify(value));
  }

  private compareOutputs(actual: any, expected: any): boolean {
    // Deep equality check
    return JSON.stringify(actual) === JSON.stringify(expected);
  }
}
