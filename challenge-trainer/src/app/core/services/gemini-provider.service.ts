import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ConfigService } from './config.service';
import { Challenge, ValidationResult, ExecutionResult } from '../models';
import { AiProviderService } from './ai-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GeminiProviderService extends AiProviderService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;

  constructor(private configService: ConfigService) {
    super();
    this.initialize();
  }

  private initialize(): void {
    const apiKey = this.configService.getApiKey();
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      });
    }
  }

  async generateChallenge(topic: string, difficulty: string): Promise<Challenge> {
    if (!this.model) {
      this.initialize();
      if (!this.model) {
        throw new Error('Gemini API not initialized. Please configure your API key.');
      }
    }

    try {
      const prompt = this.generateChallengePrompt(topic, difficulty);
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      const challengeData = this.parseJSON(text);

      return {
        ...challengeData,
        id: this.generateId(),
        topic,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard'
      };
    } catch (error: any) {
      console.error('Error generating challenge:', error);
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      throw new Error(`Failed to generate challenge: ${errorMessage}`);
    }
  }

  async validateSolution(
    challenge: Challenge,
    code: string,
    testResults: ExecutionResult[]
  ): Promise<ValidationResult> {
    if (!this.model) {
      this.initialize();
      if (!this.model) {
        throw new Error('Gemini API not initialized. Please configure your API key.');
      }
    }

    try {
      const prompt = this.validateSolutionPrompt(challenge, code, testResults);
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return this.parseJSON(text);
    } catch (error: any) {
      console.error('Error validating solution:', error);
      throw new Error('Failed to validate solution. Please try again.');
    }
  }

  private parseJSON(text: string): any {
    const cleaned = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Failed to parse JSON:', cleaned);
      throw new Error('Invalid response format from AI');
    }
  }

  private generateChallengePrompt(topic: string, difficulty: string): string {
    return `
You are a coding challenge generator for JavaScript developers.

Generate a ${difficulty} difficulty JavaScript coding challenge about: "${topic}"

Requirements:
- Create a realistic programming problem
- Include a clear, concise problem statement
- Provide 2-3 example inputs and outputs
- List any constraints (time/space complexity, edge cases)
- Generate exactly 5 test cases with inputs and expected outputs
- Provide a function signature for the solution
- Make sure the challenge is solvable in a single function

Format your response EXACTLY as this JSON structure (no markdown, just raw JSON):
{
  "title": "Challenge title (short, descriptive)",
  "description": "Detailed problem statement explaining what needs to be solved",
  "examples": [
    {
      "input": "Example input as string",
      "output": "Expected output as string",
      "explanation": "Why this is the output"
    }
  ],
  "constraints": [
    "Constraint 1",
    "Constraint 2"
  ],
  "testCases": [
    {
      "input": [arg1, arg2, arg3],
      "expectedOutput": expectedResult
    }
  ],
  "functionSignature": "function solution(param1, param2) { }"
}

IMPORTANT for testCases.input:
- The "input" array contains the function arguments in order
- If the function takes ONE array parameter like function(numbers), use: "input": [[1,2,3,4,5]]
- If the function takes TWO parameters like function(arr, target), use: "input": [[1,2,3], 5]
- If the function takes primitive parameters like function(a, b), use: "input": [10, 20]
- Each element in the "input" array is ONE function argument

Ensure test cases cover:
- Basic/happy path cases
- Edge cases (empty inputs, single elements, etc.)
- Boundary conditions

Generate the challenge now:
`.trim();
  }

  private validateSolutionPrompt(
    challenge: Challenge,
    userCode: string,
    testResults: ExecutionResult[]
  ): string {
    const passedTests = testResults.filter(r => r.passed).length;
    const totalTests = testResults.length;

    return `
You are a code review expert for JavaScript.

Challenge: ${challenge.title}
${challenge.description}

User's Solution:
\`\`\`javascript
${userCode}
\`\`\`

Test Results: ${passedTests}/${totalTests} tests passed

Analyze this solution and provide detailed feedback.

Format your response EXACTLY as this JSON structure (no markdown, just raw JSON):
{
  "isCorrect": true/false,
  "score": 0-100,
  "feedback": "Overall assessment of the solution quality, correctness, and approach",
  "strengths": [
    "What the user did well",
    "Good practices observed"
  ],
  "improvements": [
    "Specific suggestions for improvement",
    "Code quality issues",
    "Edge cases not handled"
  ],
  "alternativeApproaches": [
    "Different ways to solve this problem",
    "More efficient algorithms or patterns"
  ],
  "complexity": {
    "time": "O(n) or relevant complexity",
    "space": "O(1) or relevant complexity"
  }
}

Criteria:
- Correctness: Does it solve the problem?
- Code quality: Readability, naming, structure
- Efficiency: Time/space complexity
- Edge cases: Handles all scenarios?
- Best practices: Modern JavaScript patterns

Provide the assessment now:
`.trim();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
