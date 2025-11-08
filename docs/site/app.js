// Small app to render merged docs and provide topic/category selectors + API key modal
(function(){
  const STORAGE_KEYS = {
    API_KEY: 'challenge_trainer_api_key',
    LAST_CATEGORY: 'challenge_trainer_last_category',
    LAST_TOPIC: 'challenge_trainer_last_topic',
    LAST_DIFFICULTY: 'challenge_trainer_last_difficulty'
  };

  // Topic categories (extracted from TOPICS_AND_CONSTANTS.md)
  const TOPIC_CATEGORIES = [
    { category: 'Arrays', topics: ['Array manipulation','Two pointers','Sliding window','Array rotation','Subarray problems','Array sorting','Array searching'] },
    { category: 'Strings', topics: ['String manipulation','String parsing','Pattern matching','Palindrome problems','Anagram problems','String compression','Substring problems'] },
    { category: 'Objects & Maps', topics: ['Object manipulation','Deep cloning','Object merging','Property access','Hash maps','Frequency counting','Object transformation'] },
    { category: 'Functions', topics: ['Higher-order functions','Closures','Currying','Function composition','Memoization','Partial application','Callback patterns'] },
    { category: 'Algorithms', topics: ['Binary search','Linear search','Sorting algorithms','Recursion','Dynamic programming','Greedy algorithms','Backtracking'] },
    { category: 'Data Structures', topics: ['Stack implementation','Queue implementation','Linked list','Tree traversal','Graph basics','Set operations','Priority queue'] },
    { category: 'Logic & Math', topics: ['Conditional logic','Boolean algebra','Number manipulation','Prime numbers','Fibonacci sequence','Mathematical operations','Game logic'] },
    { category: 'Async & Promises', topics: ['Promise basics','Async/await','Promise chaining','Promise.all patterns','Error handling','Timeout handling','Sequential vs parallel execution'] },
    { category: 'DOM & Events', topics: ['Event handling','DOM manipulation','Event delegation','Debouncing','Throttling','Custom events','Form validation'] },
    { category: 'Patterns', topics: ['Design patterns','Factory pattern','Observer pattern','Module pattern','Singleton pattern','Iterator pattern','State machines'] }
  ];

  // DOM refs
  const docEl = document.getElementById('doc');
  const categorySelect = document.getElementById('category');
  const topicSelect = document.getElementById('topic');
  const difficultySelect = document.getElementById('difficulty');
  const generateBtn = document.getElementById('generate');

  const modalKey = document.getElementById('modal-key');
  const modalHelp = document.getElementById('modal-help');
  const openKeyBtn = document.getElementById('open-key');
  const openHelpBtn = document.getElementById('open-help');
  const saveKeyBtn = document.getElementById('save-key');
  const closeKeyBtn = document.getElementById('close-key');
  const clearKeyBtn = document.getElementById('clear-key');
  const apiKeyInput = document.getElementById('api-key-input');
  const closeHelpBtn = document.getElementById('close-help');

  function fetchAndRenderDocs(){
    fetch('../ALL_DOCS.md')
      .then(r => r.text())
      .then(md => {
        docEl.innerHTML = marked.parse(md);
      })
      .catch(err => {
        docEl.innerHTML = '<p class="loading">Failed to load docs: '+(err.message||err)+'</p>';
      });
  }

  function populateCategories(){
    // clear
    categorySelect.innerHTML = '<option value="">— Select category —</option>';
    TOPIC_CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.category;
      opt.textContent = cat.category;
      categorySelect.appendChild(opt);
    });

    // restore last
    const lastCat = localStorage.getItem(STORAGE_KEYS.LAST_CATEGORY);
    if(lastCat) categorySelect.value = lastCat;
    onCategoryChange();
  }

  function onCategoryChange(){
    const cat = categorySelect.value;
    topicSelect.innerHTML = '<option value="">— Topic (optional) —</option>';
    const found = TOPIC_CATEGORIES.find(c => c.category === cat);
    if(found){
      found.topics.forEach(t => {
        const opt = document.createElement('option'); opt.value = t; opt.textContent = t; topicSelect.appendChild(opt);
      });
    }
    // restore topic
    const lastTopic = localStorage.getItem(STORAGE_KEYS.LAST_TOPIC);
    if(lastTopic) topicSelect.value = lastTopic;

    // enable generate only if category chosen
    generateBtn.disabled = !cat;
    localStorage.setItem(STORAGE_KEYS.LAST_CATEGORY, cat || '');
  }

  function onTopicChange(){
    localStorage.setItem(STORAGE_KEYS.LAST_TOPIC, topicSelect.value || '');
  }

  function onDifficultyChange(){
    localStorage.setItem(STORAGE_KEYS.LAST_DIFFICULTY, difficultySelect.value || 'Easy');
  }

  function openModal(modal){ modal.setAttribute('aria-hidden','false'); }
  function closeModal(modal){ modal.setAttribute('aria-hidden','true'); }

  function saveKey(){
    const v = apiKeyInput.value.trim();
    if(!v){ alert('Please enter a non-empty API key'); return; }
    localStorage.setItem(STORAGE_KEYS.API_KEY, v);
    alert('API key saved locally.');
    closeModal(modalKey);
  }

  function clearKey(){
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
    apiKeyInput.value = '';
    alert('API key cleared');
  }

  function ensureApiKeyModalIfMissing(){
    const key = localStorage.getItem(STORAGE_KEYS.API_KEY);
    if(!key){
      // prefill if present in input from previous
      apiKeyInput.value = '';
      openModal(modalKey);
    }
  }

  // demo generate action
  function onGenerate(){
    const cat = categorySelect.value;
    const topic = topicSelect.value || null;
    const diff = difficultySelect.value;
    if(!cat){ alert('Please select a category (required)'); return; }
    // Save selections
    localStorage.setItem(STORAGE_KEYS.LAST_CATEGORY, cat);
    if(topic) localStorage.setItem(STORAGE_KEYS.LAST_TOPIC, topic);
    localStorage.setItem(STORAGE_KEYS.LAST_DIFFICULTY, diff);

    // For the docs viewer we only demo the selection; in the app this would call the provider
    alert('Generate demo — Category: '+cat + (topic ? ('; Topic: '+topic) : '') + '; Difficulty: '+diff);
  }

  function wire(){
    populateCategories();
    fetchAndRenderDocs();

    categorySelect.addEventListener('change', onCategoryChange);
    topicSelect.addEventListener('change', onTopicChange);
    difficultySelect.addEventListener('change', onDifficultyChange);
    generateBtn.addEventListener('click', onGenerate);

    openKeyBtn.addEventListener('click', () => { apiKeyInput.value = localStorage.getItem(STORAGE_KEYS.API_KEY) || ''; openModal(modalKey); });
    openHelpBtn.addEventListener('click', () => openModal(modalHelp));
    saveKeyBtn.addEventListener('click', saveKey);
    clearKeyBtn.addEventListener('click', clearKey);
    closeKeyBtn.addEventListener('click', () => closeModal(modalKey));
    closeHelpBtn.addEventListener('click', () => closeModal(modalHelp));

    // auto-open help if user hasn't seen docs? (kept simple)
    ensureApiKeyModalIfMissing();
  }

  // run
  document.addEventListener('DOMContentLoaded', wire);

})();
