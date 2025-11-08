# Project Structure

Complete folder and file structure following Single Responsibility Principle.

```
challenge-trainer/
├── src/
│   ├── app/
│   │   ├── core/                                    # Singleton services, app-wide
│   │   │   ├── services/
│   │   │   │   ├── ai-provider.service.ts          # Abstract AI interface
│   │   │   │   ├── gemini-provider.service.ts      # Gemini implementation
│   │   │   │   ├── code-execution.service.ts       # Execute user code, run tests
│   │   │   │   ├── config.service.ts               # API keys, user settings
│   │   │   │   └── storage.service.ts              # LocalStorage wrapper
│   │   │   │
│   │   │   ├── models/
│   │   │   │   ├── challenge.model.ts              # Challenge interface
│   │   │   │   ├── test-case.model.ts              # Test case interface
│   │   │   │   ├── validation-result.model.ts      # AI validation response
│   │   │   │   └── execution-result.model.ts       # Code execution result
│   │   │   │
│   │   │   └── constants/
│   │   │       ├── topics.const.ts                 # Suggested topics list
│   │   │       └── difficulties.const.ts           # Difficulty levels
│   │   │
│   │   ├── features/                                # Feature modules
│   │   │   ├── challenge/
│   │   │   │   ├── challenge.module.ts
│   │   │   │   ├── challenge-routing.module.ts
│   │   │   │   │
│   │   │   │   ├── components/
│   │   │   │   │   ├── challenge-generator/
│   │   │   │   │   │   ├── challenge-generator.component.ts    # Topic input, generate button
│   │   │   │   │   │   ├── challenge-generator.component.html
│   │   │   │   │   │   └── challenge-generator.component.scss
│   │   │   │   │   │
│   │   │   │   │   ├── challenge-display/
│   │   │   │   │   │   ├── challenge-display.component.ts      # Render challenge description
│   │   │   │   │   │   ├── challenge-display.component.html
│   │   │   │   │   │   └── challenge-display.component.scss
│   │   │   │   │   │
│   │   │   │   │   ├── code-editor/
│   │   │   │   │   │   ├── code-editor.component.ts            # Monaco wrapper
│   │   │   │   │   │   ├── code-editor.component.html
│   │   │   │   │   │   └── code-editor.component.scss
│   │   │   │   │   │
│   │   │   │   │   ├── test-runner/
│   │   │   │   │   │   ├── test-runner.component.ts            # Run tests, display results
│   │   │   │   │   │   ├── test-runner.component.html
│   │   │   │   │   │   └── test-runner.component.scss
│   │   │   │   │   │
│   │   │   │   │   ├── validation-feedback/
│   │   │   │   │   │   ├── validation-feedback.component.ts    # AI feedback display
│   │   │   │   │   │   ├── validation-feedback.component.html
│   │   │   │   │   │   └── validation-feedback.component.scss
│   │   │   │   │   │
│   │   │   │   │   └── challenge-container/
│   │   │   │   │       ├── challenge-container.component.ts    # Main orchestrator
│   │   │   │   │       ├── challenge-container.component.html
│   │   │   │   │       └── challenge-container.component.scss
│   │   │   │   │
│   │   │   │   └── services/
│   │   │   │       └── challenge-state.service.ts              # Manage current challenge state
│   │   │   │
│   │   │   └── settings/
│   │   │       ├── settings.module.ts
│   │   │       ├── settings-routing.module.ts
│   │   │       │
│   │   │       └── components/
│   │   │           └── api-config/
│   │   │               ├── api-config.component.ts             # Configure API key
│   │   │               ├── api-config.component.html
│   │   │               └── api-config.component.scss
│   │   │
│   │   ├── shared/                                  # Reusable components
│   │   │   ├── components/
│   │   │   │   ├── loading-spinner/
│   │   │   │   │   ├── loading-spinner.component.ts
│   │   │   │   │   ├── loading-spinner.component.html
│   │   │   │   │   └── loading-spinner.component.scss
│   │   │   │   │
│   │   │   │   └── error-display/
│   │   │   │       ├── error-display.component.ts
│   │   │   │       ├── error-display.component.html
│   │   │   │       └── error-display.component.scss
│   │   │   │
│   │   │   └── pipes/
│   │   │       └── safe-html.pipe.ts                           # For rendering markdown safely
│   │   │
│   │   ├── app.component.ts                         # Root component
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts                            # App configuration
│   │   └── app.routes.ts                            # Route definitions
│   │
│   ├── assets/
│   │   └── images/
│   │       └── logo.svg
│   │
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── .gitignore
├── .env.example                                     # Example API key config
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── README.md                                        # Setup instructions
└── docs/                                            # Additional documentation
    ├── PROJECT_DESIGN.md
    ├── AI_INTEGRATION.md
    └── IMPLEMENTATION_PLAN.md
```

## Component Responsibilities

### Core Services

#### `ai-provider.service.ts`
- **Purpose:** Abstract interface for AI providers
- **Methods:**
  - `generateChallenge(topic: string, difficulty: string): Promise<Challenge>`
  - `validateSolution(challenge: Challenge, code: string): Promise<ValidationResult>`

#### `gemini-provider.service.ts`
- **Purpose:** Concrete implementation for Google Gemini
- **Responsibilities:**
  - Construct API requests to Gemini
  - Handle authentication (API key)
  - Parse responses into app models
  - Error handling for API failures

#### `code-execution.service.ts`
- **Purpose:** Execute user code and validate against test cases
- **Methods:**
  - `executeCode(code: string, testCases: TestCase[]): ExecutionResult[]`
  - Handle errors, timeouts, infinite loops
- **Implementation:** Uses `new Function()` or `eval()`

#### `config.service.ts`
- **Purpose:** Manage application configuration
- **Responsibilities:**
  - Get/set API key
  - Get/set user preferences (theme, editor settings)
  - Validate configuration
- **Uses:** StorageService for persistence

#### `storage.service.ts`
- **Purpose:** Wrapper around localStorage
- **Methods:**
  - `get<T>(key: string): T | null`
  - `set<T>(key: string, value: T): void`
  - `remove(key: string): void`
  - `clear(): void`

### Feature Services

#### `challenge-state.service.ts`
- **Purpose:** Manage current challenge state across components
- **State:**
  - Current challenge
  - User's code
  - Test results
  - Validation feedback
- **Implementation:** RxJS BehaviorSubject or Angular Signals

### Components

#### `challenge-generator`
- **Purpose:** Input form for generating challenges
- **Inputs:** None
- **Outputs:** `challengeGenerated: EventEmitter<Challenge>`
- **UI:** Topic combobox, difficulty dropdown, generate button
- **State:** Loading while generating

#### `challenge-display`
- **Purpose:** Render challenge description
- **Inputs:** `challenge: Challenge`
- **Outputs:** None
- **UI:** Formatted markdown with examples and constraints

#### `code-editor`
- **Purpose:** Monaco editor wrapper
- **Inputs:** `initialCode: string`, `language: string`
- **Outputs:** `codeChanged: EventEmitter<string>`
- **Responsibilities:** Initialize Monaco, handle code changes, syntax highlighting

#### `test-runner`
- **Purpose:** Execute tests and display results
- **Inputs:** `code: string`, `testCases: TestCase[]`
- **Outputs:** `testsCompleted: EventEmitter<ExecutionResult[]>`
- **UI:** Test button, results list (pass/fail)

#### `validation-feedback`
- **Purpose:** Display AI feedback
- **Inputs:** `feedback: ValidationResult`
- **Outputs:** None
- **UI:** Formatted feedback with suggestions

#### `challenge-container`
- **Purpose:** Main orchestrator component
- **Responsibilities:**
  - Compose all child components
  - Coordinate data flow between components
  - Manage overall page state

#### `api-config`
- **Purpose:** Settings page for API configuration
- **Responsibilities:**
  - Input for API key
  - Save/validate API key
  - Test API connection

## Shared Components

#### `loading-spinner`
- Generic loading indicator
- Used across app during async operations

#### `error-display`
- Generic error message display
- Consistent error styling

## Models (Interfaces)

### `Challenge`
```typescript
interface Challenge {
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
```

### `TestCase`
```typescript
interface TestCase {
  input: any[];
  expectedOutput: any;
  isHidden?: boolean; // For validation, not shown to user
}
```

### `ExecutionResult`
```typescript
interface ExecutionResult {
  testCase: TestCase;
  actualOutput: any;
  passed: boolean;
  error?: string;
  executionTime?: number;
}
```

### `ValidationResult`
```typescript
interface ValidationResult {
  isCorrect: boolean;
  score: number; // 0-100
  feedback: string;
  suggestions: string[];
  alternativeApproaches?: string[];
}
```

## Constants

### `topics.const.ts`
```typescript
export const SUGGESTED_TOPICS = [
  'Array manipulation',
  'String parsing',
  // ... full list in separate doc
];
```

### `difficulties.const.ts`
```typescript
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;
export type Difficulty = typeof DIFFICULTIES[number];
```
