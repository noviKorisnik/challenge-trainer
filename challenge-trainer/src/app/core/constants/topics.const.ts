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

export const SUGGESTED_TOPICS: string[] = TOPIC_CATEGORIES.flatMap(
  cat => cat.topics
);
