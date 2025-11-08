# JS Challenge Trainer

AI-powered JavaScript coding practice platform built with Angular and Google Gemini AI.

## Features

- **AI-Generated Challenges**: Generate coding challenges on any topic at Easy, Medium, or Hard difficulty
- **Category & Topic Selection**: Browse challenges by category or specific topic
- **Interactive Code Editor**: Write solutions with syntax highlighting
- **Live Test Execution**: Run test cases and see results instantly
- **AI-Powered Feedback**: Get detailed code reviews and improvement suggestions
- **Local Storage**: All settings and API keys stored locally in your browser

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download this repository**

2. **Navigate to the Angular app directory:**
   ```bash
   cd challenge-trainer/challenge-trainer
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Get a Gemini API Key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key (you'll need it in the next step)

5. **Start the development server:**
   ```bash
   ng serve
   ```
   or
   ```bash
   npm start
   ```

6. **Open your browser:**
   - Navigate to `http://localhost:4200`
   - You'll be directed to the Settings page
   - Enter your Gemini API key
   - Click "Save"

## Usage

1. **Configure API Key** (first time only):
   - Go to Settings (top navigation)
   - Enter your Gemini API key
   - Click "Save"

2. **Generate a Challenge**:
   - Select a category (required)
   - Optionally select a specific topic
   - Choose difficulty level
   - Click "Generate Challenge"

3. **Solve the Challenge**:
   - Read the problem description, examples, and constraints
   - Write your solution in the code editor
   - Click "🧪 Run Tests" to test your code

4. **Get AI Feedback**:
   - Once all tests pass, click "✓ Submit for Review"
   - The AI will analyze your solution
   - Review feedback on strengths, improvements, and alternatives

## Project Structure

```
challenge-trainer/
├── docs/                          # Documentation
│   ├── site/                      # Static docs viewer
│   └── *.md                       # Project documentation
└── challenge-trainer/             # Angular application
    ├── src/
    │   ├── app/
    │   │   ├── core/              # Core services & models
    │   │   │   ├── constants/     # App constants (topics, difficulties, storage keys)
    │   │   │   ├── models/        # TypeScript interfaces
    │   │   │   └── services/      # Core services (AI, storage, config)
    │   │   ├── features/          # Feature modules
    │   │   │   ├── challenge/     # Challenge generation & solving
    │   │   │   └── settings/      # API configuration
    │   │   └── shared/            # Shared components
    │   └── styles.scss            # Global styles
    └── angular.json               # Angular configuration
```

## Technology Stack

- **Framework**: Angular 18 (standalone components)
- **AI Provider**: Google Gemini 1.5 Flash
- **Code Execution**: Browser-based JavaScript execution
- **Storage**: localStorage (all keys prefixed with `challenge_trainer_`)
- **Styling**: SCSS with dark theme

## Features in Detail

### Topic Categories

- Arrays
- Strings
- Objects & Maps
- Functions
- Algorithms
- Data Structures
- Logic & Math
- Async & Promises
- DOM & Events
- Patterns

### Difficulty Levels

- **Easy**: Basic problems (5-10 minutes)
- **Medium**: Intermediate challenges (15-30 minutes)
- **Hard**: Advanced problems (30-60 minutes)

### AI Capabilities

- Generate realistic coding challenges
- Create test cases (basic, edge cases, boundaries)
- Validate solutions
- Provide detailed feedback
- Suggest alternative approaches
- Analyze time/space complexity

## Privacy & Security

- **Local-only**: All code runs in your browser
- **No backend**: No data sent to our servers
- **Your API key**: Stored only in your browser's localStorage
- **User responsibility**: You control your own API key and data

## Troubleshooting

### "API key not configured"
- Go to Settings and enter a valid Gemini API key

### "Rate limit exceeded"
- Gemini 1.5 Flash has 1,500 requests per day on the free tier
- Wait until the next day or upgrade your API plan

### Code execution errors
- Check your JavaScript syntax
- Review the error message in test results
- Ensure your function returns the correct type

### Port 4200 already in use
- Stop other Angular/development servers
- Or run with a different port: `ng serve --port 4201`

## Development

### Run tests
```bash
ng test
```

### Build for production
```bash
ng build --configuration production
```

### Code formatting
The project uses Angular's default ESLint and Prettier configuration.

## Future Enhancements

- Monaco Editor integration (vs. textarea)
- Challenge history
- Multi-language support (Python, TypeScript)
- Performance metrics
- Solution showcase
- Custom challenges
- Offline mode with cached challenges

## Contributing

This is a local/self-hosted project. Feel free to fork and customize for your own use!

## License

MIT License - feel free to use and modify as needed.

## Credits

- Built with [Angular](https://angular.io/)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- Inspired by coding practice platforms like LeetCode and HackerRank

---

**Happy Coding!** 🚀
