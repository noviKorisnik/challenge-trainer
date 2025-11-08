# JS Challenge Trainer - Project Design

## Project Overview

An AI-powered JavaScript coding practice platform that:
- Generates coding challenges based on user-specified topics
- Provides an interactive Monaco editor for writing solutions
- Allows testing solutions before submission
- Uses AI to validate solutions and provide feedback

## Key Decisions

### Deployment & Security
- **Local/Self-hosted only** - Users run locally, not a hosted service
- **Public GitHub repo** with instructions for local setup
- **User-provided API keys** - Stored in localStorage
- **Client-side execution** - Using `eval()`/`new Function()` for JS code
- **No backend required** - Entirely browser-based for MVP

### Technology Stack
- **Framework:** Angular (TypeScript)
- **Editor:** Monaco Editor (VS Code's editor)
- **AI Provider:** Google Gemini (generous free tier)
- **Language Support:** JavaScript only (V1)
- **Storage:** localStorage for API keys and settings

### Architecture Principles
- **Single Responsibility** - Each service/component has one job
- **Interface Abstractions** - Easy to add providers/languages later
- **Single Page Application** - All features on one page
- **Feature-based Structure** - Organized by domain, not type

## Core Features (V1)

### 1. Challenge Generation
- User inputs: Topic (combobox with suggestions) + Difficulty (dropdown)
- AI generates: Problem description, examples, constraints, test cases
- Response format: JSON with structured challenge data

### 2. Code Editor
- Monaco editor integration
- Syntax highlighting and IntelliSense for JavaScript
- User writes solution function

### 3. Interactive Testing
- "Run Tests" button executes code against test cases
- Show pass/fail for each test case
- Display expected vs actual output for failures
- Iterate until all tests pass

### 4. AI Validation & Feedback
- "Submit for Review" button sends code + challenge to AI
- AI provides:
  - Correctness assessment
  - Code quality feedback
  - Suggestions for improvement
  - Alternative approaches/optimizations

## Features Deferred to V2

- **Challenge History** - Save/browse past challenges (localStorage)
- **Multiple Languages** - Python, TypeScript, etc.
- **Multiple AI Providers** - Cohere, Claude, etc.
- **Advanced Test Options** - Performance testing, edge case generation
- **User Accounts** - Progress tracking, achievements
- **Export/Share** - Share challenges with others

## UI Layout (Single Page)

```
┌─────────────────────────────────────────────────────────┐
│ Header: JS Challenge Trainer         [Settings ⚙️]      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Challenge Generator                                 │  │
│ │ Topic: [________] Difficulty: [Easy ▼] [Generate] │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Challenge Description (Markdown)                    │  │
│ │ - Problem statement                                 │  │
│ │ - Examples                                          │  │
│ │ - Constraints                                       │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Monaco Code Editor                                  │  │
│ │ function solution(params) {                         │  │
│ │   // Your code here                                 │  │
│ │ }                                                    │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ [🧪 Run Tests]  [✓ Submit for Review]                   │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Test Results                                        │  │
│ │ ✓ Test 1: Passed                                    │  │
│ │ ✗ Test 2: Failed (Expected: 5, Got: 3)             │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ AI Feedback                                         │  │
│ │ - Correctness, quality, suggestions                 │  │
│ └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## User Flow

1. **Setup** (First time)
   - Navigate to Settings
   - Enter Gemini API key
   - Save to localStorage

2. **Generate Challenge**
   - Select/enter topic
   - Choose difficulty
   - Click "Generate"
   - AI creates challenge (loading state)
   - Challenge description appears

3. **Solve Challenge**
   - Read problem description
   - Write solution in Monaco editor
   - Click "Run Tests" to validate
   - See test results (pass/fail)
   - Iterate until tests pass

4. **Get Feedback**
   - Click "Submit for Review"
   - AI analyzes solution
   - Receive detailed feedback
   - Learn improvements

5. **New Challenge**
   - Click "New Challenge" or change topic
   - Repeat process

## Extension Points (Future)

### Multi-Language Support
- Implement `CodeExecutor` interface
- Add language-specific executors (Pyodide for Python, etc.)
- Update Monaco language mode
- Adjust AI prompts for language

### Additional AI Providers
- Implement `AIProvider` interface
- Add provider-specific services (CohereProvider, etc.)
- Provider selector in settings
- Fallback/retry logic

### Challenge History
- Save challenges to localStorage with metadata
- History panel/modal
- Filter by topic, difficulty, date
- Delete individual or all challenges
- Re-attempt past challenges

## Technical Considerations

### Security
- Client-side code execution has inherent risks
- Document in README: "Run at your own risk, code executes locally"
- Consider sandboxing with Web Workers (future enhancement)
- API keys stored in localStorage (user responsibility)

### Performance
- Monaco can be large (~5MB) - lazy load if needed
- AI response times vary - show loading states
- Consider caching common challenges (future)

### Error Handling
- Network failures for AI requests
- Invalid API keys
- Malformed AI responses
- Code execution errors/infinite loops

### Browser Compatibility
- Target modern browsers (Chrome, Firefox, Edge, Safari)
- Monaco requires ES6+ support
- localStorage availability check
