# Google Gemini AI Integration

## Setup & Authentication

### Getting API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Create new API key
4. Copy key for use in app

### Free Tier Limits (as of 2025)
- **Gemini 1.5 Flash:** 1,500 requests per day (RPD)
- **Gemini 1.5 Pro:** 50 RPD
- Rate limits reset daily
- Generous token limits

**Recommendation:** Use Gemini 1.5 Flash for this project (fast, sufficient for code generation)

## API Integration

### Installation
```bash
npm install @google/generative-ai
```

### Basic Configuration

```typescript
// gemini-provider.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

private genAI: GoogleGenerativeAI;
private model: GenerativeModel;

constructor(private configService: ConfigService) {
  const apiKey = this.configService.getApiKey();
  this.genAI = new GoogleGenerativeAI(apiKey);
  this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}
```

## Prompt Templates

### 1. Challenge Generation Prompt

```typescript
generateChallengePrompt(topic: string, difficulty: string): string {
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
      "input": ["actual", "input", "values"],
      "expectedOutput": "expected result"
    }
  ],
  "functionSignature": "function solution(param1, param2) { }"
}

Ensure test cases cover:
- Basic/happy path cases
- Edge cases (empty inputs, single elements, etc.)
- Boundary conditions

Generate the challenge now:
`.trim();
}
```

### 2. Solution Validation Prompt

```typescript
validateSolutionPrompt(challenge: Challenge, userCode: string, testResults: ExecutionResult[]): string {
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
```

## Service Implementation

### GeminiProviderService

```typescript
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ConfigService } from './config.service';
import { Challenge, ValidationResult, ExecutionResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GeminiProviderService implements AIProvider {
  private genAI: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;

  constructor(private configService: ConfigService) {
    this.initialize();
  }

  private initialize(): void {
    const apiKey = this.configService.getApiKey();
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      });
    }
  }

  async generateChallenge(topic: string, difficulty: string): Promise<Challenge> {
    if (!this.model) {
      throw new Error('Gemini API not initialized. Please configure your API key.');
    }

    try {
      const prompt = this.generateChallengePrompt(topic, difficulty);
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Parse JSON response
      const challengeData = this.parseJSON(text);

      // Add metadata
      return {
        ...challengeData,
        id: this.generateId(),
        topic,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard'
      };
    } catch (error) {
      console.error('Error generating challenge:', error);
      throw new Error('Failed to generate challenge. Please try again.');
    }
  }

  async validateSolution(
    challenge: Challenge, 
    code: string, 
    testResults: ExecutionResult[]
  ): Promise<ValidationResult> {
    if (!this.model) {
      throw new Error('Gemini API not initialized. Please configure your API key.');
    }

    try {
      const prompt = this.validateSolutionPrompt(challenge, code, testResults);
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Parse JSON response
      return this.parseJSON(text);
    } catch (error) {
      console.error('Error validating solution:', error);
      throw new Error('Failed to validate solution. Please try again.');
    }
  }

  private parseJSON(text: string): any {
    // Remove markdown code blocks if present
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
    // ... (prompt from above)
  }

  private validateSolutionPrompt(
    challenge: Challenge, 
    code: string, 
    testResults: ExecutionResult[]
  ): string {
    // ... (prompt from above)
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

## Error Handling

### Common Errors

```typescript
// API Key Issues
if (!apiKey || apiKey === '') {
  throw new Error('API key not configured');
}

// Rate Limiting
catch (error) {
  if (error.message.includes('429') || error.message.includes('quota')) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
}

// Invalid Response
if (!response || !response.text) {
  throw new Error('Empty response from AI');
}

// JSON Parsing
try {
  JSON.parse(text);
} catch {
  // Fallback: try to extract JSON from text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error('Could not parse AI response');
}
```

## Testing the Integration

### Manual Test in Component

```typescript
async testGeminiConnection(): Promise<void> {
  try {
    const challenge = await this.geminiProvider.generateChallenge(
      'Array manipulation', 
      'Easy'
    );
    console.log('✅ Connection successful!', challenge);
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}
```

### Example Response

```json
{
  "title": "Find Maximum in Array",
  "description": "Write a function that takes an array of numbers and returns the maximum value.",
  "examples": [
    {
      "input": "[1, 5, 3, 9, 2]",
      "output": "9",
      "explanation": "9 is the largest number in the array"
    }
  ],
  "constraints": [
    "Array will have at least 1 element",
    "All elements are integers",
    "Time complexity should be O(n)"
  ],
  "testCases": [
    { "input": [[1, 5, 3, 9, 2]], "expectedOutput": 9 },
    { "input": [[10]], "expectedOutput": 10 },
    { "input": [[-5, -1, -10]], "expectedOutput": -1 },
    { "input": [[0, 0, 0]], "expectedOutput": 0 },
    { "input": [[100, 200, 50, 75]], "expectedOutput": 200 }
  ],
  "functionSignature": "function findMax(arr) { }"
}
```

## Configuration in Settings

### API Key Storage

```typescript
// config.service.ts
export class ConfigService {
  private readonly API_KEY_STORAGE_KEY = 'gemini_api_key';

  constructor(private storage: StorageService) {}

  getApiKey(): string | null {
    return this.storage.get<string>(this.API_KEY_STORAGE_KEY);
  }

  setApiKey(apiKey: string): void {
    this.storage.set(this.API_KEY_STORAGE_KEY, apiKey);
  }

  clearApiKey(): void {
    this.storage.remove(this.API_KEY_STORAGE_KEY);
  }

  hasApiKey(): boolean {
    return !!this.getApiKey();
  }
}
```

### Settings Component

```typescript
// api-config.component.ts
export class ApiConfigComponent {
  apiKey: string = '';
  isSaved: boolean = false;

  constructor(
    private configService: ConfigService,
    private geminiProvider: GeminiProviderService
  ) {
    this.apiKey = this.configService.getApiKey() || '';
  }

  async saveApiKey(): Promise<void> {
    if (!this.apiKey.trim()) {
      alert('Please enter a valid API key');
      return;
    }

    try {
      this.configService.setApiKey(this.apiKey);
      // Test the connection
      await this.testConnection();
      this.isSaved = true;
    } catch (error) {
      alert('Invalid API key or connection failed');
      this.configService.clearApiKey();
    }
  }

  private async testConnection(): Promise<void> {
    // Simple test request
    await this.geminiProvider.generateChallenge('Arrays', 'Easy');
  }
}
```

## Best Practices

1. **Retry Logic:** Implement exponential backoff for transient failures
2. **Caching:** Cache common challenges to reduce API calls
3. **Prompt Engineering:** Iterate on prompts for better responses
4. **Response Validation:** Always validate JSON structure before using
5. **User Feedback:** Show clear loading/error states during API calls
6. **Rate Limiting:** Track usage, warn users near limits
7. **Fallback:** Provide static example challenges if API fails

## Future Enhancements

- **Streaming Responses:** Use streaming for real-time feedback
- **Prompt Optimization:** A/B test different prompt variations
- **Context Memory:** Remember user's skill level for better challenges
- **Multi-turn Conversations:** Follow-up questions about solutions
