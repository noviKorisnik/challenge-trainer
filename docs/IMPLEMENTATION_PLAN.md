# Implementation Plan

Step-by-step guide to build the JS Challenge Trainer application.

## Phase 1: Project Setup & Core Infrastructure

### Step 1.1: Create Angular Project
```bash
cd C:\Code\challenge-trainer
ng new challenge-trainer --routing --style=scss --standalone
cd challenge-trainer
```

**Configuration choices:**
- Routing: Yes
- Stylesheet: SCSS
- Standalone: Yes (modern Angular approach)

### Step 1.2: Install Dependencies
```bash
# Monaco Editor
npm install ngx-monaco-editor-v2 monaco-editor

# Google Gemini AI
npm install @google/generative-ai

# Markdown rendering (optional, for challenge descriptions)
npm install marked
npm install @types/marked --save-dev

# Utility libraries (optional)
npm install lodash-es
npm install @types/lodash-es --save-dev
```

### Step 1.3: Project Structure Setup
Create the folder structure:
```bash
# Core
mkdir -p src/app/core/services
mkdir -p src/app/core/models
mkdir -p src/app/core/constants

# Features
mkdir -p src/app/features/challenge/components/challenge-generator
mkdir -p src/app/features/challenge/components/challenge-display
mkdir -p src/app/features/challenge/components/code-editor
mkdir -p src/app/features/challenge/components/test-runner
mkdir -p src/app/features/challenge/components/validation-feedback
mkdir -p src/app/features/challenge/components/challenge-container
mkdir -p src/app/features/challenge/services

mkdir -p src/app/features/settings/components/api-config

# Shared
mkdir -p src/app/shared/components/loading-spinner
mkdir -p src/app/shared/components/error-display
mkdir -p src/app/shared/pipes

# Documentation
mkdir -p docs
```

### Step 1.4: Copy Documentation
Copy all markdown files from `C:\Code\Job\docs\` to `challenge-trainer/docs/`

---

## Phase 2: Core Services & Models

### Step 2.1: Create Models
```bash
cd src/app/core/models
```

**Create files:**
1. `challenge.model.ts`
2. `test-case.model.ts`
3. `execution-result.model.ts`
4. `validation-result.model.ts`

**Implementation:** See PROJECT_STRUCTURE.md for interfaces

### Step 2.2: Create Constants
```bash
cd src/app/core/constants
```

**Create files:**
1. `topics.const.ts`
2. `difficulties.const.ts`
3. `storage-keys.const.ts`
4. `editor-config.const.ts`
5. `ui.const.ts`

**Implementation:** Copy from TOPICS_AND_CONSTANTS.md

### Step 2.3: Storage Service
```bash
ng generate service core/services/storage
```

**Responsibilities:**
- Wrapper around localStorage
- Type-safe get/set methods
- Error handling

**Implementation:**
```typescript
export class StorageService {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
```

### Step 2.4: Config Service
```bash
ng generate service core/services/config
```

**Responsibilities:**
- Manage API key
- User preferences
- Editor settings

**Uses:** StorageService

### Step 2.5: Code Execution Service
```bash
ng generate service core/services/code-execution
```

**Responsibilities:**
- Execute user code with `new Function()`
- Run test cases
- Handle timeouts and errors
- Return execution results

**Key methods:**
```typescript
executeCode(code: string, testCases: TestCase[]): ExecutionResult[]
```

### Step 2.6: AI Provider Service (Abstract)
```bash
ng generate service core/services/ai-provider
```

**Purpose:** Interface for AI providers
**Methods:** 
- `generateChallenge(topic, difficulty): Promise<Challenge>`
- `validateSolution(challenge, code): Promise<ValidationResult>`

### Step 2.7: Gemini Provider Service
```bash
ng generate service core/services/gemini-provider
```

**Implementation:** See AI_INTEGRATION.md
**Uses:** ConfigService, AIProviderService interface

---

## Phase 3: Settings Feature

### Step 3.1: API Config Component
```bash
ng generate component features/settings/components/api-config --standalone
```

**UI:**
- Input field for API key (type="password")
- Save button
- Test connection button
- Success/error messages

**Features:**
- Load existing key from ConfigService
- Validate key format
- Test connection with simple request
- Save to localStorage

---

## Phase 4: Challenge Feature Components

### Step 4.1: Challenge State Service
```bash
ng generate service features/challenge/services/challenge-state
```

**State management:**
- Current challenge (Signal or BehaviorSubject)
- User code
- Test results
- Validation feedback
- Loading states

### Step 4.2: Challenge Generator Component
```bash
ng generate component features/challenge/components/challenge-generator --standalone
```

**UI:**
- Topic input (combobox with autocomplete)
- Difficulty dropdown
- Generate button
- Loading spinner

**Logic:**
- Call GeminiProviderService
- Update ChallengeStateService
- Error handling

### Step 4.3: Challenge Display Component
```bash
ng generate component features/challenge/components/challenge-display --standalone
```

**UI:**
- Render challenge title
- Markdown-formatted description
- Examples section
- Constraints list

**Input:** `challenge: Challenge`
**Uses:** Marked library for markdown rendering

### Step 4.4: Code Editor Component
```bash
ng generate component features/challenge/components/code-editor --standalone
```

**Setup Monaco:**
```typescript
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

// In component
editorOptions = {
  theme: 'vs-dark',
  language: 'javascript',
  // ... other options from editor-config.const.ts
};

onCodeChange(code: string): void {
  this.codeChanged.emit(code);
}
```

**Outputs:** `codeChanged: EventEmitter<string>`

### Step 4.5: Test Runner Component
```bash
ng generate component features/challenge/components/test-runner --standalone
```

**UI:**
- "Run Tests" button
- Test results list (expandable)
- Pass/fail indicators
- Expected vs actual output

**Logic:**
- Call CodeExecutionService
- Display results with clear formatting
- Emit results to parent

### Step 4.6: Validation Feedback Component
```bash
ng generate component features/challenge/components/validation-feedback --standalone
```

**UI:**
- Score display
- Feedback sections (strengths, improvements)
- Alternative approaches
- Complexity analysis

**Input:** `feedback: ValidationResult`

### Step 4.7: Challenge Container Component
```bash
ng generate component features/challenge/components/challenge-container --standalone
```

**Purpose:** Orchestrate all child components
**Layout:** Compose all components in single page
**State:** Subscribe to ChallengeStateService
**Logic:** Coordinate data flow between components

---

## Phase 5: Shared Components

### Step 5.1: Loading Spinner
```bash
ng generate component shared/components/loading-spinner --standalone
```

Simple spinner with optional message

### Step 5.2: Error Display
```bash
ng generate component shared/components/error-display --standalone
```

Consistent error message styling

### Step 5.3: Safe HTML Pipe
```bash
ng generate pipe shared/pipes/safe-html --standalone
```

For rendering markdown safely

---

## Phase 6: Routing & App Structure

### Step 6.1: Configure Routes
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: ChallengeContainerComponent
  },
  {
    path: 'settings',
    component: ApiConfigComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

### Step 6.2: App Component
Update `app.component.html`:
```html
<header>
  <h1>JS Challenge Trainer</h1>
  <nav>
    <a routerLink="/">Home</a>
    <a routerLink="/settings">Settings</a>
  </nav>
</header>

<main>
  <router-outlet></router-outlet>
</main>
```

---

## Phase 7: Styling & UX

### Step 7.1: Global Styles
```scss
// styles.scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #1e1e1e;
  color: #d4d4d4;
}

// ... more global styles
```

### Step 7.2: Component Styles
Style each component for clean, modern look
- Dark theme (VS Code inspired)
- Clear visual hierarchy
- Responsive layout
- Accessible (ARIA labels, keyboard nav)

---

## Phase 8: Testing & Validation

### Step 8.1: Unit Tests
Test critical services:
- CodeExecutionService (various code inputs)
- StorageService (localStorage mocking)
- ConfigService (API key validation)

### Step 8.2: Integration Testing
- Full flow: Generate → Code → Test → Submit
- Error scenarios (no API key, network failure)
- Edge cases (empty code, invalid challenges)

### Step 8.3: Manual Testing Checklist
- [ ] Generate challenge for different topics
- [ ] Generate challenges at different difficulties
- [ ] Write and test solutions
- [ ] Submit solutions for feedback
- [ ] Save and load API key
- [ ] Error handling (invalid API key, network issues)
- [ ] Responsive layout on different screen sizes
- [ ] Monaco editor functionality (syntax highlighting, autocomplete)

---

## Phase 9: Documentation & Polish

### Step 9.1: README.md
```markdown
# JS Challenge Trainer

AI-powered JavaScript coding practice platform.

## Setup
1. Clone repository
2. `npm install`
3. Get Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. `ng serve`
5. Navigate to Settings and enter API key

## Usage
- Select topic and difficulty
- Generate challenge
- Write solution in editor
- Run tests
- Submit for AI feedback

## Tech Stack
- Angular
- Monaco Editor
- Google Gemini AI
```

### Step 9.2: .env.example
```
# Get your API key from https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here
```

### Step 9.3: .gitignore
Ensure sensitive data not committed:
```
node_modules/
dist/
.env
.vscode/
```

### Step 9.4: License
Add MIT or appropriate license

---

## Phase 10: Deployment & Distribution

### Step 10.1: Build for Production
```bash
ng build --configuration production
```

### Step 10.2: GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: JS Challenge Trainer"
git remote add origin https://github.com/yourusername/js-challenge-trainer.git
git push -u origin main
```

### Step 10.3: Optional: GitHub Pages
```bash
ng add angular-cli-ghpages
ng deploy --base-href=/js-challenge-trainer/
```

**Note:** Users still need to configure API key locally

---

## Development Timeline Estimate

| Phase | Estimated Time | Priority |
|-------|---------------|----------|
| Phase 1: Setup | 1 hour | Critical |
| Phase 2: Core Services | 3-4 hours | Critical |
| Phase 3: Settings | 1 hour | Critical |
| Phase 4: Challenge Components | 4-6 hours | Critical |
| Phase 5: Shared Components | 1 hour | High |
| Phase 6: Routing | 1 hour | High |
| Phase 7: Styling | 2-3 hours | Medium |
| Phase 8: Testing | 2-3 hours | High |
| Phase 9: Documentation | 1 hour | High |
| Phase 10: Deployment | 1 hour | Medium |

**Total: 17-24 hours** for complete MVP

---

## Tips for Development

1. **Start Small:** Get one feature working end-to-end before building everything
2. **Test Early:** Test Gemini integration immediately (Phase 2.7)
3. **Incremental:** Build and test each component individually
4. **Mock Data:** Use example challenges while developing UI
5. **Version Control:** Commit frequently with clear messages
6. **Ask for Help:** Use GitHub Copilot for boilerplate code

---

## Next Steps After MVP

1. **Challenge History** - Save and browse past challenges
2. **Multi-language Support** - Add Python, TypeScript
3. **User Profiles** - Track progress and achievements
4. **Social Features** - Share challenges with others
5. **Performance Metrics** - Track code execution time
6. **Hint System** - Progressive hints for stuck users
7. **Solution Showcase** - Compare with optimal solutions
8. **Leaderboards** - Community competition
9. **Custom Challenges** - Users create and share
10. **Offline Mode** - Work without AI (cached challenges)

---

## Common Issues & Solutions

### Monaco Editor Not Loading
- Check angular.json assets configuration
- Verify ngx-monaco-editor-v2 installation
- Check browser console for errors

### Gemini API Errors
- Verify API key validity
- Check quota limits
- Inspect network requests
- Validate prompt format

### Code Execution Issues
- Test with simple functions first
- Handle infinite loops with timeouts
- Sanitize user input
- Clear error messages

### LocalStorage Issues
- Check browser privacy settings
- Handle quota exceeded errors
- Provide fallback for disabled localStorage

---

## Success Metrics

- [ ] User can generate challenges successfully
- [ ] Code editor provides good developer experience
- [ ] Tests execute correctly and show clear results
- [ ] AI feedback is helpful and actionable
- [ ] No console errors in normal usage
- [ ] Works across modern browsers
- [ ] Setup process takes < 5 minutes
- [ ] UI is intuitive without instructions
