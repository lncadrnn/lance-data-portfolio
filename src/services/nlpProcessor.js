/**
 * NLP Intent Normalization Layer v2
 * Robust keyword-based intent detection with scoring system.
 * No loose fuzzy matching - uses exact keywords and explicit misspellings.
 */

// Intent patterns with keywords and their weights
// Higher weight = stronger signal for that intent
const INTENT_PATTERNS = {
  // === PORTFOLIO INTENTS (Rule-based responses) ===
  
  projects_nav: {
    keywords: ['where', 'find', 'navigate', 'open', 'visit', 'see', 'view', 'access', 'go', 'projects', 'project', 'tab', 'page'],
    phrases: ['where are your projects', 'where to see projects', 'projects tab', 'projects page', 'open projects', 'go to projects', 'navigate to projects', 'view projects'],
    weight: 14
  },
  
  projects: {
    keywords: ['project', 'projects', 'portfolio', 'work', 'works', 'made', 'built', 'created', 'gawa', 'ginawa'],
    phrases: ['show me', 'tell me about', 'what are your', 'ano projects', 'mga projects', 'your projects', 'show projects'],
    weight: 10
  },
  
  skills: {
    keywords: ['skill', 'skills', 'abilities', 'expertise', 'stack', 'tools', 'technologies', 'proficient', 'capable'],
    phrases: ['tech stack', 'what can you do', 'ano alam mo', 'ano skills mo', 'mga skills', 'good at', 'what tools'],
    weight: 10
  },
  
  contact: {
    keywords: ['contact', 'reach', 'connect', 'message', 'socials'],
    phrases: ['contact info', 'contact you', 'reach you', 'get in touch', 'how to contact', 'contact details', 'pano kontakin'],
    weight: 10
  },
  
  email: {
    keywords: ['email', 'e-mail', 'gmail', 'mail'],
    phrases: ['email address', 'your email', 'email mo', 'send email'],
    weight: 12  // Higher weight to prioritize over contact
  },
  
  github: {
    keywords: ['github', 'repo', 'repository', 'repositories'],
    phrases: ['github link', 'github account', 'source code', 'github mo', 'your github'],
    weight: 12
  },
  
  linkedin: {
    keywords: ['linkedin'],
    phrases: ['linkedin profile', 'linkedin link', 'linkedin mo', 'your linkedin'],
    weight: 12
  },
  
  about: {
    keywords: ['about', 'who', 'introduce', 'introduction', 'background', 'bio', 'biography', 'yourself'],
    phrases: ['about you', 'who are you', 'tell me about yourself', 'about lance', 'sino ka', 'sino si lance', 'tungkol sayo'],
    weight: 8
  },
  
  name: {
    keywords: ['name', 'pangalan', 'called'],
    phrases: ['your name', 'what is your name', 'pangalan mo', 'ano pangalan'],
    weight: 10
  },
  
  location: {
    keywords: ['location', 'where', 'saan', 'city', 'country', 'based', 'lugar', 'from'],
    phrases: ['where are you', 'saan ka', 'where do you live', 'taga saan', 'where from', 'based in'],
    weight: 10
  },
  
  age: {
    keywords: ['age', 'old', 'birthday', 'birthdate', 'born', 'edad'],
    phrases: ['how old', 'ilang taon', 'when were you born', 'kailan birthday'],
    weight: 10
  },
  
  education: {
    keywords: ['education', 'school', 'university', 'college', 'course', 'degree', 'study', 'studying', 'student'],
    phrases: ['where do you study', 'what course', 'ano course mo', 'saan ka nag aaral', 'what school'],
    weight: 10
  },
  
  certificates: {
    keywords: ['certificate', 'certificates', 'certification', 'certifications', 'credentials', 'badges', 'certs'],
    phrases: ['your certificates', 'ano certificates mo', 'mga certificate', 'certifications you have'],
    weight: 10
  },
  
  certificates_nav: {
    keywords: ['where', 'find', 'navigate', 'open', 'visit', 'see', 'view', 'access', 'go', 'certificate', 'certificates', 'certification', 'certifications', 'achievements', 'achievement', 'tab', 'page'],
    phrases: ['where are your certificates', 'where to see certificates', 'certificates tab', 'achievements tab', 'go to certificates', 'navigate to achievements', 'open certificates'],
    weight: 14
  },
  
  experience: {
    keywords: ['experience', 'job', 'career', 'employment', 'internship', 'trabaho'],
    phrases: ['work experience', 'professional experience', 'have you worked', 'nag work ka ba'],
    weight: 10
  },
  
  pwa: {
    keywords: ['install', 'pwa', 'download', 'homescreen', 'offline'],
    phrases: ['install this', 'install app', 'how to install', 'add to home', 'download app', 'pano iinstall'],
    weight: 10
  },
  
  portfolio: {
    keywords: ['website', 'site', 'portfolio'],
    phrases: ['this website', 'your website', 'portfolio site', 'about this site', 'ano to'],
    weight: 8
  },
  
  blogs_nav: {
    keywords: ['where', 'find', 'navigate', 'open', 'visit', 'see', 'view', 'access', 'go', 'blog', 'blogs', 'articles', 'tab', 'page'],
    phrases: ['where are your blogs', 'where to see blogs', 'blogs tab', 'blog page', 'go to blogs', 'navigate to blogs', 'open blogs'],
    weight: 14
  },
  
  components: {
    keywords: ['components', 'framework', 'library', 'react', 'vite'],
    phrases: ['tech used', 'built with', 'made with', 'what did you use', 'how did you build', 'ano ginamit'],
    weight: 10
  },
  
  hobbies: {
    keywords: ['hobbies', 'hobby', 'interests', 'fun', 'pastime', 'libangan', 'games', 'anime', 'chess'],
    phrases: ['free time', 'for fun', 'ano libangan mo', 'what do you do for fun', 'what games', 'favorite anime', 'play games'],
    weight: 10
  },
  
  fun_facts: {
    keywords: ['fun', 'fact', 'facts', 'interesting', 'trivia', 'tell me something', 'cool'],
    phrases: ['fun facts', 'fun fact', 'something interesting', 'tell me something about', 'interesting facts', 'cool facts'],
    weight: 10
  },
  
  // === CONVERSATIONAL INTENTS ===
  
  greeting: {
    keywords: ['hello', 'hi', 'hey', 'hola', 'yo', 'sup', 'uy'],
    phrases: ['good morning', 'good afternoon', 'good evening', 'kumusta', 'musta', 'kamusta', 'magandang umaga', 'magandang hapon', 'magandang gabi'],
    weight: 5,  // Lower weight - only match if nothing else matches
    exactMatch: true  // Require exact word match, no substring
  },
  
  thanks: {
    keywords: ['thanks', 'thank', 'salamat', 'ty', 'thx', 'tnx', 'appreciate'],
    phrases: ['thank you', 'maraming salamat', 'thank u'],
    weight: 8,
    exactMatch: true
  },
  
  help: {
    keywords: ['help', 'tulong', 'assist', 'commands', 'options'],
    phrases: ['how to use', 'what can you do', 'ano pwede mo gawin', 'pano to gamitin', 'how does this work'],
    weight: 8
  }
}

// Data-related topics for LLM routing
const DATA_TOPICS = {
  keywords: [
    'analytics', 'analysis', 'analyst', 'data', 'dataset', 'datasets',
    'science', 'scientist', 'engineering',
    'machine learning', 'ml', 'ai', 'predictive',
    'powerbi', 'excel', 'spreadsheet', 'sql', 'mysql', 'postgresql', 'database', 'query',
    'pandas', 'numpy', 'matplotlib', 'seaborn', 'jupyter', 'tableau', 'looker',
    'cleaning', 'wrangling', 'etl', 'elt',
    'visualization', 'dashboard', 'dashboards', 'chart', 'charts', 'graph', 'graphs',
    'statistics', 'statistical', 'descriptive', 'inferential',
    'correlation', 'regression', 'hypothesis', 'probability',
    'kpi', 'metrics', 'measures', 'dimensions',
    'bi', 'reporting', 'reports',
    'modeling', 'model', 'schema',
    'dax', 'pivot', 'vlookup', 'xlookup', 'formulas',
    'eda', 'exploration', 'rfm', 'segmentation', 'clustering', 'classification',
    'storytelling', 'insight', 'insights'
  ],
  phrases: [
    'data analytics', 'data analysis', 'data analyst', 'data science', 'data scientist',
    'data engineering', 'machine learning', 'power bi', 'microsoft excel',
    'data cleaning', 'data wrangling', 'data visualization', 'business intelligence',
    'data modeling', 'data model', 'star schema', 'snowflake schema',
    'pivot table', 'exploratory data analysis', 'data storytelling',
    'what is data', 'explain data', 'define data', 'difference between',
    'how to analyze', 'how does'
  ]
}

// Out of scope keywords (triggers refusal)
const OUT_OF_SCOPE = {
  keywords: [
    'automata', 'compiler', 'compilers', 'kernel',
    'tcp', 'udp', 'protocols', 'networking',
    'blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'nft',
    'unity', 'unreal', 'godot', 'gamedev',
    'flutter', 'swift', 'kotlin',
    'arduino', 'raspberry', 'iot', 'embedded',
    'kubernetes', 'microservices',
    'cryptography', 'encryption', 'hacking', 'cybersecurity',
    'hack', 'crack', 'pirate', 'illegal', 'cheat'
  ],
  phrases: [
    'operating system', 'big o', 'turing machine', 'memory management',
    'distributed systems', 'game development', 'mobile development',
    'capital of', 'president of', 'history of', 'how many kilometers',
    'solar system', 'recipe for', 'how to cook'
  ]
}

/**
 * Normalize text for matching
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Check if input is a simple math expression
 */
function isSimpleMath(input) {
  const normalized = normalizeText(input)
  const mathPatterns = [
    /^\d+\s*[\+\-\*\/x×÷]\s*\d+$/,
    /^what\s+is\s+\d+\s*[\+\-\*\/x×÷]\s*\d+/,
    /^calculate\s+\d+\s*[\+\-\*\/x×÷]\s*\d+/,
    /^\d+\s+(plus|minus|times|divided\s*by|multiplied\s*by)\s+\d+$/
  ]
  return mathPatterns.some(p => p.test(normalized))
}

/**
 * Evaluate simple math expression
 */
function evaluateMath(input) {
  const normalized = normalizeText(input)
  const numbers = normalized.match(/\d+/g)
  
  if (!numbers || numbers.length < 2) return null
  
  const a = parseInt(numbers[0])
  const b = parseInt(numbers[1])
  
  if (normalized.includes('+') || normalized.includes('plus')) return a + b
  if (normalized.includes('-') || normalized.includes('minus')) return a - b
  if (normalized.includes('*') || normalized.includes('×') || /\bx\b/.test(normalized) || normalized.includes('times') || normalized.includes('multiplied')) return a * b
  if (normalized.includes('/') || normalized.includes('÷') || normalized.includes('divided')) return b !== 0 ? a / b : null
  
  return null
}

/**
 * Calculate intent score for a given input
 */
function scoreIntent(normalizedInput, intentConfig) {
  const { keywords = [], phrases = [], weight = 10, exactMatch = false } = intentConfig
  let score = 0
  const inputWords = normalizedInput.split(' ')
  
  // Check phrase matches (higher priority)
  for (const phrase of phrases) {
    if (normalizedInput.includes(phrase)) {
      score += weight * 2  // Phrases are worth more
    }
  }
  
  // Check keyword matches
  for (const keyword of keywords) {
    if (exactMatch) {
      // Exact word match only
      if (inputWords.includes(keyword)) {
        score += weight
      }
    } else {
      // Word boundary match (keyword must be a complete word)
      const regex = new RegExp(`\\b${keyword}\\b`, 'i')
      if (regex.test(normalizedInput)) {
        score += weight
      }
    }
  }
  
  return score
}

/**
 * Check if input matches data topics
 */
function isDataRelated(normalizedInput) {
  // Check phrases first
  for (const phrase of DATA_TOPICS.phrases) {
    if (normalizedInput.includes(phrase)) {
      return true
    }
  }
  
  // Check keywords with word boundary
  for (const keyword of DATA_TOPICS.keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i')
    if (regex.test(normalizedInput)) {
      return true
    }
  }
  
  return false
}

/**
 * Check if input is out of scope
 */
function isOutOfScope(normalizedInput) {
  // Check phrases
  for (const phrase of OUT_OF_SCOPE.phrases) {
    if (normalizedInput.includes(phrase)) {
      return true
    }
  }
  
  // Check keywords with word boundary
  for (const keyword of OUT_OF_SCOPE.keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i')
    if (regex.test(normalizedInput)) {
      return true
    }
  }
  
  return false
}

/**
 * Main intent classification function
 */
export function classifyIntent(userInput) {
  const normalizedInput = normalizeText(userInput)
  
  // Level 1: Check for simple math
  if (isSimpleMath(userInput)) {
    return {
      type: 'math',
      intent: 'math',
      mathResult: evaluateMath(userInput)
    }
  }
  
  // Level 4: Check if explicitly out of scope FIRST
  if (isOutOfScope(normalizedInput)) {
    return {
      type: 'outofscope',
      intent: null,
      mathResult: null
    }
  }
  
  // Level 2 & Conversational: Score all portfolio intents
  const intentScores = {}
  for (const [intentName, config] of Object.entries(INTENT_PATTERNS)) {
    const score = scoreIntent(normalizedInput, config)
    if (score > 0) {
      intentScores[intentName] = score
    }
  }
  
  // Find best matching intent
  const sortedIntents = Object.entries(intentScores)
    .sort((a, b) => b[1] - a[1])  // Sort by score descending
  
  if (sortedIntents.length > 0) {
    const [bestIntent, bestScore] = sortedIntents[0]
    
    // Only accept if score is meaningful
    if (bestScore >= 5) {
      // Determine type based on intent
      const conversationalIntents = ['greeting', 'thanks', 'help']
      const type = conversationalIntents.includes(bestIntent) ? bestIntent : 'portfolio'
      
      return {
        type,
        intent: bestIntent,
        mathResult: null
      }
    }
  }
  
  // Level 3: Check for data-related topics (route to LLM)
  if (isDataRelated(normalizedInput)) {
    return {
      type: 'data',
      intent: 'data_question',
      mathResult: null
    }
  }
  
  // Check if it looks like a question that might be data-related
  const questionWords = ['what', 'how', 'why', 'explain', 'define', 'difference', 'compare', 'ano', 'paano', 'bakit']
  const hasQuestionWord = questionWords.some(w => normalizedInput.startsWith(w) || normalizedInput.includes(` ${w} `))
  
  if (hasQuestionWord && normalizedInput.length > 20) {
    // Longer questions might be data-related, let LLM try
    return {
      type: 'data',
      intent: 'data_question',
      mathResult: null
    }
  }
  
  // Unknown
  return {
    type: 'unknown',
    intent: null,
    mathResult: null
  }
}

export { normalizeText, isSimpleMath, evaluateMath }
