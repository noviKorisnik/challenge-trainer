# Topics and Constants

## Suggested Topics (V1)

Curated list of common JavaScript coding challenge topics with categories.

```typescript
// topics.const.ts

export interface TopicCategory {
  category: string;
  topics: string[];
}

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    category: 'Arrays',
    topics: [
      'Array manipulation',
      'Two pointers',
      'Sliding window',
      'Array rotation',
      'Subarray problems',
      'Array sorting',
      'Array searching'
    ]
  },
  {
    category: 'Strings',
    topics: [
      'String manipulation',
      'String parsing',
      'Pattern matching',
      'Palindrome problems',
      'Anagram problems',
      'String compression',
      'Substring problems'
    ]
  },
  {
    category: 'Objects & Maps',
    topics: [
      'Object manipulation',
      'Deep cloning',
      'Object merging',
      'Property access',
      'Hash maps',
      'Frequency counting',
      'Object transformation'
    ]
  },
  {
    category: 'Functions',
    topics: [
      'Higher-order functions',
      'Closures',
      'Currying',
      'Function composition',
      'Memoization',
      'Partial application',
      'Callback patterns'
    ]
  },
  {
    category: 'Algorithms',
    topics: [
      'Binary search',
      'Linear search',
      'Sorting algorithms',
      'Recursion',
      'Dynamic programming',
      'Greedy algorithms',
      'Backtracking'
    ]
  },
  {
    category: 'Data Structures',
    topics: [
      'Stack implementation',
      'Queue implementation',
      'Linked list',
      'Tree traversal',
      'Graph basics',
      'Set operations',
      'Priority queue'
    ]
  },
  {
    category: 'Logic & Math',
    topics: [
      'Conditional logic',
      'Boolean algebra',
      'Number manipulation',
      'Prime numbers',
      'Fibonacci sequence',
      'Mathematical operations',
      'Game logic'
    ]
  },
  {
    category: 'Async & Promises',
    topics: [
      'Promise basics',
      'Async/await',
      'Promise chaining',
      'Promise.all patterns',
      'Error handling',
      'Timeout handling',
      'Sequential vs parallel execution'
    ]
  },
  {
    category: 'DOM & Events',
    topics: [
      'Event handling',
      'DOM manipulation',
      'Event delegation',
      'Debouncing',
      'Throttling',
      'Custom events',
      'Form validation'
    ]
  },
  {
    category: 'Patterns',
    topics: [
      'Design patterns',
      'Factory pattern',
      'Observer pattern',
      'Module pattern',
      'Singleton pattern',
      'Iterator pattern',
      'State machines'
    ]
  }
];

// Flat list for autocomplete/suggestions
export const SUGGESTED_TOPICS: string[] = TOPIC_CATEGORIES.flatMap(
  cat => cat.topics
);

// For quick lookup
export const TOPIC_MAP = new Map<string, string>(
  TOPIC_CATEGORIES.flatMap(cat =>
    cat.topics.map(topic => [topic.toLowerCase(), cat.category])
  )
);
```

## Difficulty Levels

```typescript
// difficulties.const.ts

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
```

## Storage Keys

```typescript
// storage-keys.const.ts

export const STORAGE_KEYS = {
  API_KEY: 'gemini_api_key',
  THEME: 'app_theme',
  EDITOR_SETTINGS: 'editor_settings',
  CHALLENGE_HISTORY: 'challenge_history',
  USER_PREFERENCES: 'user_preferences',
  LAST_TOPIC: 'last_selected_topic',
  LAST_DIFFICULTY: 'last_selected_difficulty'
} as const;
```

## Editor Configuration

```typescript
// editor-config.const.ts

export interface EditorConfig {
  theme: 'vs-dark' | 'vs-light' | 'hc-black';
  fontSize: number;
  lineNumbers: 'on' | 'off' | 'relative';
  minimap: boolean;
  wordWrap: 'on' | 'off';
  tabSize: number;
  autoClosingBrackets: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  formatOnPaste: boolean;
  formatOnType: boolean;
}

export const DEFAULT_EDITOR_CONFIG: EditorConfig = {
  theme: 'vs-dark',
  fontSize: 14,
  lineNumbers: 'on',
  minimap: false,
  wordWrap: 'off',
  tabSize: 2,
  autoClosingBrackets: 'always',
  formatOnPaste: true,
  formatOnType: true
};

export const MONACO_OPTIONS = {
  language: 'javascript',
  automaticLayout: true,
  scrollBeyondLastLine: false,
  readOnly: false,
  contextmenu: true,
  quickSuggestions: true,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: 'on',
  snippetSuggestions: 'top'
};
```

## Test Case Configuration

```typescript
// test-config.const.ts

export const TEST_CONFIG = {
  MAX_EXECUTION_TIME: 5000, // 5 seconds timeout
  MAX_ITERATIONS: 10000, // Prevent infinite loops
  VISIBLE_TEST_CASES: 3, // Show first 3 to user
  HIDDEN_TEST_CASES: 2 // Keep 2 hidden for validation
};

export const ERROR_MESSAGES = {
  TIMEOUT: 'Code execution timed out. Possible infinite loop?',
  RUNTIME_ERROR: 'Runtime error occurred during execution',
  SYNTAX_ERROR: 'Syntax error in your code',
  UNEXPECTED_OUTPUT: 'Output does not match expected result',
  NO_FUNCTION: 'No valid function found in code'
};
```

## Default Code Templates

```typescript
// code-templates.const.ts

export const CODE_TEMPLATES = {
  javascript: {
    empty: `function solution() {
  // Your code here
}`,
    withParams: (params: string[]) => `function solution(${params.join(', ')}) {
  // Your code here
}`,
    array: `function solution(arr) {
  // Your code here
  return arr;
}`,
    twoParams: `function solution(arr, target) {
  // Your code here
  return null;
}`
  }
};
```

## UI Constants

```typescript
// ui.const.ts

export const UI_MESSAGES = {
  WELCOME: 'Welcome to JS Challenge Trainer! Generate a challenge to get started.',
  GENERATING: 'Generating your challenge...',
  VALIDATING: 'Analyzing your solution...',
  NO_API_KEY: 'Please configure your Gemini API key in Settings.',
  ALL_TESTS_PASSED: 'Great! All tests passed. Ready to submit?',
  SOME_TESTS_FAILED: 'Some tests failed. Review the results and try again.',
  SUBMISSION_SUCCESS: 'Solution submitted! Review the feedback below.'
};

export const BUTTON_LABELS = {
  GENERATE: 'Generate Challenge',
  RUN_TESTS: 'Run Tests',
  SUBMIT: 'Submit for Review',
  NEW_CHALLENGE: 'New Challenge',
  SAVE_API_KEY: 'Save API Key',
  CLEAR: 'Clear'
};

export const TOAST_DURATION = 3000; // 3 seconds
```

## Validation Rules

```typescript
// validation.const.ts

export const VALIDATION_RULES = {
  MIN_CODE_LENGTH: 10,
  MAX_CODE_LENGTH: 10000,
  API_KEY_MIN_LENGTH: 20,
  TOPIC_MIN_LENGTH: 2,
  TOPIC_MAX_LENGTH: 100
};

export const REGEX_PATTERNS = {
  FUNCTION_DECLARATION: /function\s+\w+\s*\([^)]*\)\s*\{/,
  ARROW_FUNCTION: /(?:const|let|var)\s+\w+\s*=\s*\([^)]*\)\s*=>/,
  GEMINI_API_KEY: /^[A-Za-z0-9_-]{20,}$/
};
```

## Example Challenges (Fallback)

```typescript
// example-challenges.const.ts

export const EXAMPLE_CHALLENGES: Challenge[] = [
  {
    id: 'example-1',
    title: 'Sum of Two Numbers',
    description: 'Write a function that takes two numbers and returns their sum.',
    difficulty: 'Easy',
    topic: 'Basic Math',
    examples: [
      {
        input: '(5, 3)',
        output: '8',
        explanation: '5 + 3 = 8'
      }
    ],
    constraints: [
      'Numbers can be positive or negative',
      'Numbers are integers'
    ],
    testCases: [
      { input: [5, 3], expectedOutput: 8 },
      { input: [0, 0], expectedOutput: 0 },
      { input: [-5, 10], expectedOutput: 5 },
      { input: [100, 200], expectedOutput: 300 },
      { input: [-10, -20], expectedOutput: -30 }
    ],
    functionSignature: 'function sum(a, b) { }'
  },
  {
    id: 'example-2',
    title: 'Find Maximum in Array',
    description: 'Write a function that takes an array of numbers and returns the maximum value.',
    difficulty: 'Easy',
    topic: 'Array manipulation',
    examples: [
      {
        input: '[1, 5, 3, 9, 2]',
        output: '9',
        explanation: '9 is the largest number'
      }
    ],
    constraints: [
      'Array has at least one element',
      'All elements are numbers',
      'Time complexity: O(n)'
    ],
    testCases: [
      { input: [[1, 5, 3, 9, 2]], expectedOutput: 9 },
      { input: [[10]], expectedOutput: 10 },
      { input: [[-5, -1, -10]], expectedOutput: -1 },
      { input: [[0, 0, 0]], expectedOutput: 0 },
      { input: [[100, 200, 50]], expectedOutput: 200 }
    ],
    functionSignature: 'function findMax(arr) { }'
  }
];
```

## Usage Examples

### In Components

```typescript
// Using topics in challenge generator
import { SUGGESTED_TOPICS, TOPIC_CATEGORIES } from '@core/constants/topics.const';

export class ChallengeGeneratorComponent {
  topics = SUGGESTED_TOPICS;
  categories = TOPIC_CATEGORIES;
}
```

```typescript
// Using difficulties
import { DIFFICULTIES, DIFFICULTY_CONFIGS } from '@core/constants/difficulties.const';

export class DifficultySelector {
  difficulties = DIFFICULTIES;
  configs = DIFFICULTY_CONFIGS;
}
```

```typescript
// Using storage keys
import { STORAGE_KEYS } from '@core/constants/storage-keys.const';

export class ConfigService {
  getApiKey() {
    return localStorage.getItem(STORAGE_KEYS.API_KEY);
  }
}
```

## Extending Topics

When adding new topics later:

1. Add to appropriate category in `TOPIC_CATEGORIES`
2. `SUGGESTED_TOPICS` will auto-update (it's derived)
3. Consider grouping related topics
4. Keep topic names clear and searchable
5. Test with AI to ensure good challenge generation

## Future Enhancements

- **Dynamic Topic Discovery:** Learn from user inputs
- **Topic Popularity:** Track most-used topics
- **Custom Categories:** Allow users to create categories
- **Topic Difficulty Mapping:** Some topics only for certain difficulties
- **Prerequisites:** "Binary Search Trees" requires "Binary Search"
