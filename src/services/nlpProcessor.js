/**
 * NLP Intent Normalization Layer
 * Maps user input to canonical intents using synonyms, Tagalog/Taglish phrases,
 * and fuzzy matching for misspellings.
 */

// Synonym dictionaries for intent mapping
const INTENT_SYNONYMS = {
  // Contact-related
  email: [
    'email', 'e-mail', 'emali', 'emal', 'mail', 'gmail', 'koreo', 'address',
    'send message', 'message you', 'email address', 'email mo', 'email niya',
    'pano kita macon', 'paano kita macocontact', 'pano ka macocontact',
    'how to reach', 'reach you', 'reach out', 'contact email'
  ],
  contact: [
    'contact', 'kontact', 'kontak', 'macontact', 'makontak', 'reach',
    'get in touch', 'touch base', 'connect', 'communication', 'message',
    'pano ka kontakin', 'paano kita mareach', 'how to contact',
    'contact info', 'contact information', 'contact details',
    'socials', 'social media', 'linkedin', 'github account'
  ],
  github: [
    'github', 'git hub', 'git', 'repository', 'repo', 'repos', 'repositories',
    'source code', 'code repo', 'github link', 'github mo', 'github niya'
  ],
  linkedin: [
    'linkedin', 'linked in', 'linkdin', 'professional profile',
    'linkedin mo', 'linkedin niya', 'linkedin link'
  ],
  
  // About/Personal
  about: [
    'about', 'about you', 'about lance', 'who are you', 'who is lance',
    'sino ka', 'sino si lance', 'introduce', 'introduction', 'tell me about',
    'background', 'bio', 'biography', 'profile', 'yourself',
    'kwento mo', 'tungkol sayo', 'about mo', 'ikaw ba', 'sino ba ikaw'
  ],
  name: [
    'name', 'pangalan', 'full name', 'your name', 'pangalan mo',
    'ano pangalan mo', 'what is your name', 'ano name mo'
  ],
  location: [
    'location', 'where', 'saan', 'address', 'city', 'country', 'lugar',
    'nasaan ka', 'saan ka', 'where are you', 'where do you live',
    'taga saan', 'tagasaan ka', 'based', 'from where'
  ],
  age: [
    'age', 'old', 'birthday', 'birthdate', 'born', 'ilang taon',
    'edad', 'how old', 'when were you born', 'kailan birthday mo'
  ],
  education: [
    'education', 'school', 'university', 'college', 'course', 'degree',
    'study', 'studying', 'student', 'eskwela', 'paaralan', 'kurso',
    'ano course mo', 'saan ka nag aaral', 'where do you study',
    'what course', 'academic', 'academics'
  ],
  
  // Skills
  skills: [
    'skills', 'skill', 'abilities', 'expertise', 'proficiency',
    'tech stack', 'technologies', 'tools', 'what can you do',
    'ano alam mo', 'ano skills mo', 'mga skills', 'kakayahan',
    'capable', 'proficient', 'good at', 'stack', 'skils', 'skilz'
  ],
  
  // Projects
  projects: [
    'projects', 'project', 'works', 'work', 'portfolio projects',
    'made', 'created', 'built', 'gawa', 'ginawa', 'mga projects',
    'ano projects mo', 'saan projects mo', 'show projects',
    'what have you made', 'what did you build', 'mga gawa'
  ],
  
  // Certificates
  certificates: [
    'certificates', 'certificate', 'certifications', 'certification',
    'credentials', 'badges', 'awards', 'sertipiko', 'mga certificate',
    'ano certificates mo', 'certified', 'accredited', 'certs'
  ],
  
  // Experience
  experience: [
    'experience', 'work experience', 'job', 'career', 'employment',
    'work history', 'professional experience', 'trabaho', 'karanasan',
    'nag work ka ba', 'may experience ka ba', 'internship'
  ],
  
  // PWA Installation
  pwa: [
    'pwa', 'install', 'app', 'download', 'progressive web app',
    'install app', 'add to home', 'homescreen', 'offline',
    'pano iinstall', 'paano mag install', 'how to install',
    'install this', 'download app', 'install website'
  ],
  
  // Portfolio/Website
  portfolio: [
    'portfolio', 'website', 'site', 'web', 'this website',
    'your website', 'portfolio site', 'ano to', 'what is this',
    'about this site', 'about website'
  ],
  components: [
    'components', 'component', 'tech used', 'technologies used',
    'built with', 'made with', 'what did you use', 'stack used',
    'framework', 'library', 'react', 'vite', 'ano ginamit mo',
    'paano mo ginawa', 'how did you build', 'tools used'
  ],
  
  // Fun/Personal
  hobbies: [
    'hobbies', 'hobby', 'interests', 'free time', 'fun', 'libangan',
    'ano libangan mo', 'what do you do for fun', 'pastime'
  ],
  
  // Greetings
  greeting: [
    'hello', 'hi', 'hey', 'hola', 'kumusta', 'musta', 'kamusta',
    'good morning', 'good afternoon', 'good evening', 'yo', 'sup',
    'magandang umaga', 'magandang hapon', 'magandang gabi', 'uy'
  ],
  
  // Thanks
  thanks: [
    'thanks', 'thank you', 'salamat', 'ty', 'thx', 'appreciate',
    'maraming salamat', 'thank u', 'tnx'
  ],
  
  // Help
  help: [
    'help', 'tulong', 'assist', 'how to use', 'what can you do',
    'commands', 'options', 'ano pwede mo gawin', 'pano to gamitin'
  ]
}

// Data-related topics for LLM routing
const DATA_TOPICS = [
  // Core Data Topics
  'data analytics', 'data analysis', 'data analyst', 'analytics',
  'data science', 'data scientist', 'data engineering',
  'machine learning', 'ml', 'ai for data', 'predictive',
  
  // Tools
  'power bi', 'powerbi', 'excel', 'microsoft excel', 'spreadsheet',
  'sql', 'mysql', 'postgresql', 'database', 'query', 'queries',
  'python for data', 'pandas', 'numpy', 'matplotlib', 'seaborn',
  'jupyter', 'notebook', 'tableau', 'looker',
  
  // Concepts
  'data cleaning', 'data wrangling', 'etl', 'elt',
  'data visualization', 'dashboard', 'dashboards', 'charts', 'graphs',
  'statistics', 'statistical', 'descriptive', 'inferential',
  'correlation', 'regression', 'hypothesis', 'probability',
  'kpi', 'metrics', 'measures', 'dimensions',
  'bi', 'business intelligence', 'reporting', 'reports',
  'data modeling', 'data model', 'star schema', 'snowflake schema',
  'dax', 'measures', 'calculated columns',
  'pivot table', 'pivot', 'vlookup', 'xlookup', 'formulas',
  'eda', 'exploratory data analysis', 'data exploration',
  'rfm', 'segmentation', 'clustering', 'classification',
  'data storytelling', 'insight', 'insights',
  
  // Tagalog variants
  'ano ang data', 'tungkol sa data', 'paano mag analyze',
  'explain data', 'what is data', 'define data'
]

// Out of scope keywords (triggers refusal)
const OUT_OF_SCOPE_KEYWORDS = [
  // CS topics not covered
  'automata', 'operating system', 'os', 'compiler', 'compilers',
  'networking', 'network', 'tcp', 'ip', 'http', 'protocols',
  'algorithm complexity', 'big o', 'turing machine',
  'assembly', 'low level', 'kernel', 'memory management',
  'distributed systems', 'microservices', 'kubernetes', 'docker',
  'cybersecurity', 'cryptography', 'encryption', 'hacking',
  'blockchain', 'cryptocurrency', 'bitcoin', 'ethereum',
  'game development', 'unity', 'unreal', 'game engine',
  'mobile development', 'ios', 'android', 'flutter', 'swift',
  'embedded systems', 'arduino', 'raspberry pi', 'iot',
  
  // General knowledge/trivia
  'capital of', 'president of', 'history of', 'when did',
  'how many kilometers', 'distance', 'population', 'country',
  'planet', 'solar system', 'space', 'universe', 'physics',
  'chemistry', 'biology', 'medicine', 'health', 'disease',
  'recipe', 'cook', 'food', 'restaurant', 'movie', 'music',
  'sports', 'basketball', 'football', 'celebrity', 'actor',
  'news', 'politics', 'election', 'government',
  'weather', 'climate', 'temperature',
  
  // Inappropriate
  'hack', 'crack', 'pirate', 'illegal', 'cheat',
  'adult', 'explicit', 'violence'
]

/**
 * Normalize text for matching
 * - Lowercase
 * - Remove punctuation
 * - Trim whitespace
 * - Normalize multiple spaces
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Calculate Levenshtein distance for fuzzy matching
 */
function levenshteinDistance(str1, str2) {
  const m = str1.length
  const n = str2.length
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))
  
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }
  
  return dp[m][n]
}

/**
 * Check if a word matches a target with fuzzy tolerance
 */
function fuzzyMatch(word, target, threshold = 2) {
  if (word === target) return true
  if (Math.abs(word.length - target.length) > threshold) return false
  return levenshteinDistance(word, target) <= threshold
}

/**
 * Check if input contains any phrase from a list (with fuzzy matching)
 */
function containsPhrase(normalizedInput, phrases) {
  for (const phrase of phrases) {
    const normalizedPhrase = normalizeText(phrase)
    
    // Exact substring match
    if (normalizedInput.includes(normalizedPhrase)) {
      return true
    }
    
    // Word-level fuzzy match for single words
    const inputWords = normalizedInput.split(' ')
    const phraseWords = normalizedPhrase.split(' ')
    
    if (phraseWords.length === 1 && phraseWords[0].length > 3) {
      for (const word of inputWords) {
        if (fuzzyMatch(word, phraseWords[0])) {
          return true
        }
      }
    }
  }
  return false
}

/**
 * Detect simple math expressions
 */
function isSimpleMath(input) {
  const normalizedInput = normalizeText(input)
  
  // Pattern for basic arithmetic: "1 + 1", "10 * 5", "what is 5 + 3", etc.
  const mathPatterns = [
    /^\d+\s*[\+\-\*\/x×÷]\s*\d+$/,
    /^what\s+is\s+\d+\s*[\+\-\*\/x×÷]\s*\d+$/,
    /^calculate\s+\d+\s*[\+\-\*\/x×÷]\s*\d+$/,
    /^compute\s+\d+\s*[\+\-\*\/x×÷]\s*\d+$/,
    /^\d+\s+(plus|minus|times|divided by|multiplied by)\s+\d+$/,
    /^ano\s+(ang|yung)?\s*\d+\s*[\+\-\*\/x×÷]\s*\d+$/
  ]
  
  return mathPatterns.some(pattern => pattern.test(normalizedInput))
}

/**
 * Evaluate simple math expression
 */
function evaluateMath(input) {
  const normalizedInput = normalizeText(input)
  
  // Extract numbers and operator
  const match = normalizedInput.match(/(\d+)\s*[\+\-\*\/x×÷]|plus|minus|times|divided|multiplied)\s*(\d+)/)
  
  if (!match) {
    // Try direct extraction
    const numbers = normalizedInput.match(/\d+/g)
    const operators = normalizedInput.match(/[\+\-\*\/x×÷]|plus|minus|times|divided|multiplied/g)
    
    if (numbers && numbers.length >= 2 && operators) {
      const a = parseInt(numbers[0])
      const b = parseInt(numbers[1])
      const op = operators[0]
      
      switch(op) {
        case '+':
        case 'plus':
          return a + b
        case '-':
        case 'minus':
          return a - b
        case '*':
        case 'x':
        case '×':
        case 'times':
        case 'multiplied':
          return a * b
        case '/':
        case '÷':
        case 'divided':
          return b !== 0 ? a / b : null
        default:
          return null
      }
    }
  }
  
  return null
}

/**
 * Check if input is about data-related topics (for LLM routing)
 */
function isDataRelated(normalizedInput) {
  return DATA_TOPICS.some(topic => normalizedInput.includes(topic))
}

/**
 * Check if input is out of scope
 */
function isOutOfScope(normalizedInput) {
  return OUT_OF_SCOPE_KEYWORDS.some(keyword => normalizedInput.includes(keyword))
}

/**
 * Main NLP intent classification function
 * Returns: { type: 'math'|'portfolio'|'data'|'greeting'|'thanks'|'help'|'outofscope'|'unknown', intent: string|null, mathResult: number|null }
 */
export function classifyIntent(userInput) {
  const normalizedInput = normalizeText(userInput)
  
  // Level 1: Check for simple math
  if (isSimpleMath(userInput)) {
    const result = evaluateMath(userInput)
    return {
      type: 'math',
      intent: 'math',
      mathResult: result
    }
  }
  
  // Check for greetings first (quick response)
  if (containsPhrase(normalizedInput, INTENT_SYNONYMS.greeting)) {
    return {
      type: 'greeting',
      intent: 'greeting',
      mathResult: null
    }
  }
  
  // Check for thanks
  if (containsPhrase(normalizedInput, INTENT_SYNONYMS.thanks)) {
    return {
      type: 'thanks',
      intent: 'thanks',
      mathResult: null
    }
  }
  
  // Check for help
  if (containsPhrase(normalizedInput, INTENT_SYNONYMS.help)) {
    return {
      type: 'help',
      intent: 'help',
      mathResult: null
    }
  }
  
  // Level 4: Check if explicitly out of scope BEFORE data topics
  if (isOutOfScope(normalizedInput)) {
    return {
      type: 'outofscope',
      intent: null,
      mathResult: null
    }
  }
  
  // Level 2: Check for portfolio intents
  for (const [intent, synonyms] of Object.entries(INTENT_SYNONYMS)) {
    if (['greeting', 'thanks', 'help'].includes(intent)) continue
    
    if (containsPhrase(normalizedInput, synonyms)) {
      return {
        type: 'portfolio',
        intent: intent,
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
  
  // Check for question patterns that might indicate data topic
  const questionPatterns = [
    /what is|what are|define|explain|difference|differentiate|compare|how does|how do/,
    /ano ang|ano ba|paano|ipaliwanag|explain/
  ]
  
  const hasQuestionPattern = questionPatterns.some(p => p.test(normalizedInput))
  
  // If it's a question but not matched, check if it could be data-related
  if (hasQuestionPattern) {
    // Check for data-adjacent keywords
    const dataAdjacentKeywords = [
      'analyst', 'scientist', 'data', 'analysis', 'analytics',
      'visualization', 'chart', 'graph', 'report', 'bi',
      'statistic', 'model', 'predict', 'trend'
    ]
    
    if (dataAdjacentKeywords.some(kw => normalizedInput.includes(kw))) {
      return {
        type: 'data',
        intent: 'data_question',
        mathResult: null
      }
    }
  }
  
  // Unknown - could be out of scope or needs clarification
  return {
    type: 'unknown',
    intent: null,
    mathResult: null
  }
}

export { normalizeText, isSimpleMath, evaluateMath }
