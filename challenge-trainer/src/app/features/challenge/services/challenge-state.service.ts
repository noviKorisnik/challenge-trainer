import { Injectable, signal } from '@angular/core';
import { Challenge, ExecutionResult, ValidationResult } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class ChallengeStateService {
  currentChallenge = signal<Challenge | null>(null);
  userCode = signal<string>('');
  testResults = signal<ExecutionResult[]>([]);
  validationFeedback = signal<ValidationResult | null>(null);
  isGenerating = signal<boolean>(false);
  isValidating = signal<boolean>(false);
  error = signal<string | null>(null);

  setChallenge(challenge: Challenge): void {
    this.currentChallenge.set(challenge);
    // Initialize code with function signature
    const initialCode = challenge.functionSignature.trim();
    // Check if it already has a closing brace
    const hasClosingBrace = initialCode.endsWith('}');
    if (hasClosingBrace) {
      // Replace the closing brace with body + closing brace
      this.userCode.set(initialCode.replace(/\s*\}\s*$/, '\n  // Your code here\n}'));
    } else {
      // Add opening brace, body, and closing brace
      this.userCode.set(initialCode + ' {\n  // Your code here\n}');
    }
    this.testResults.set([]);
    this.validationFeedback.set(null);
    this.error.set(null);
  }

  setUserCode(code: string): void {
    this.userCode.set(code);
  }

  setTestResults(results: ExecutionResult[]): void {
    this.testResults.set(results);
  }

  setValidationFeedback(feedback: ValidationResult): void {
    this.validationFeedback.set(feedback);
  }

  setGenerating(isGenerating: boolean): void {
    this.isGenerating.set(isGenerating);
  }

  setValidating(isValidating: boolean): void {
    this.isValidating.set(isValidating);
  }

  setError(error: string | null): void {
    this.error.set(error);
  }

  reset(): void {
    this.currentChallenge.set(null);
    this.userCode.set('');
    this.testResults.set([]);
    this.validationFeedback.set(null);
    this.error.set(null);
  }
}
