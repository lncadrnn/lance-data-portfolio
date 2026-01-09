/**
 * Chatbot Service - Hybrid Intelligence Engine
 * Routes user queries through NLP → Portfolio JSON → LLM → Refusal
 */

import { classifyIntent } from './nlpProcessor'
import { getKnowledgeResponse, personalInfo, websiteInfo } from './knowledgeBase'

// Groq API configuration
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.1-8b-instant' // Fast and efficient for chat

// LLM System Prompt (MANDATORY - as specified)
const LLM_SYSTEM_PROMPT = `You are speaking as Lance Adrian Acal, a Data Analytics and Computer Science student.
Only answer data-related topics including:
- Data Analytics and Data Analysis
- Data Science concepts
- Machine Learning (high-level explanations only)
- SQL and database concepts
- Microsoft Excel for data work
- Power BI and business intelligence
- Statistics for data
- Data visualization and dashboards

IMPORTANT RULES:
1. Speak in first person as Lance ("I", "my")
2. Be friendly, educational, and student-professional in tone
3. Do NOT answer general computer science topics (networking, OS, compilers, etc.)
4. Do NOT answer trivia, general knowledge, or unrelated subjects
5. Do NOT invent personal experiences, projects, or credentials not provided
6. If the question is outside scope, politely refuse and redirect to data topics
7. Keep responses concise but informative
8. Use emojis sparingly for friendliness

Context about Lance:
- Computer Science student at Cavite State University – Imus
- Focused on Data Analytics, working toward Data Science
- Uses Excel, Power BI, Python (Pandas, Matplotlib, Seaborn), SQL
- Has certifications in Data Science, Data Analytics, Power BI, Python
- Built projects including RFM customer segmentation, Netflix analysis, dashboards`

/**
 * Call the Groq LLM API for data-related questions
 */
async function callLLM(userMessage) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    console.warn('Groq API key not configured')
    return {
      success: false,
      message: "I'd love to explain that, but the AI feature isn't fully set up yet. Check out my projects and skills sections in the meantime! 😊"
    }
  }
  
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: LLM_SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Groq API error:', errorData)
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content
    
    if (!assistantMessage) {
      throw new Error('No response from LLM')
    }
    
    return {
      success: true,
      message: assistantMessage
    }
  } catch (error) {
    console.error('LLM call failed:', error)
    return {
      success: false,
      message: "Hmm, I'm having trouble connecting right now. Try asking about my projects or skills instead! 🔧"
    }
  }
}

/**
 * Format math result with friendly response
 */
function formatMathResponse(result, originalInput) {
  if (result === null) {
    return "Hmm, I couldn't calculate that. Make sure it's a simple math expression! 🔢"
  }
  
  // Check for division by zero
  if (!isFinite(result)) {
    return "That's a tricky one! Division by zero isn't defined 😅"
  }
  
  const formattedResult = Number.isInteger(result) ? result : result.toFixed(2)
  
  const responses = [
    `That's ${formattedResult}! 🙂`,
    `The answer is ${formattedResult} 🔢`,
    `${formattedResult}! Quick math! 😄`,
    `Easy one – it's ${formattedResult}! ✨`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

/**
 * Get out of scope refusal message
 */
function getRefusalMessage() {
  const refusals = [
    "That's outside what I usually cover here 😊\n\nThis chatbot focuses on my portfolio and data-related topics. Feel free to ask about my projects, skills, or anything data analytics!",
    "I appreciate the curiosity, but that's not my area of expertise! 📚\n\nI'm here to help with questions about my portfolio or data analytics topics. What would you like to know?",
    "Hmm, that's a bit outside my scope! 🎯\n\nI specialize in data analytics and portfolio-related questions. Try asking about my projects, skills, or data concepts!",
    "That's an interesting question, but it's not something I cover here 😊\n\nI focus on data analytics, my portfolio, and related topics. How can I help you with those?"
  ]
  
  return refusals[Math.floor(Math.random() * refusals.length)]
}

/**
 * Get unknown intent response (gentle redirect)
 */
function getUnknownResponse() {
  const responses = [
    "I'm not quite sure what you're asking 🤔\n\nI can help with:\n• **Myself** – fun facts, contact info, skills, background\n• **My portfolio website** – navigation, projects list, features\n• **Data-related topics** – analytics, Power BI, Excel, SQL, Python",
    "Hmm, I didn't catch that! Could you rephrase? 😊\n\nI answer questions about:\n• **Myself** – who I am, my contacts, my story\n• **My portfolio** – how to navigate, view projects and certificates\n• **Data topics** – data analytics concepts and tools",
    "I'm not sure I understood. Let me know if you want to know about:\n• **Myself** – details about me, how to reach me\n• **My portfolio website** – navigation tips, projects, certificates\n• **Data-related topics** – analytics, visualization, tools I use"
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

/**
 * Main chatbot response function
 * This is the entry point for all user messages
 */
export async function getChatbotResponse(userMessage) {
  // Validate input
  if (!userMessage || typeof userMessage !== 'string') {
    return {
      text: "Could you say that again? I didn't catch your message 😊",
      type: 'error'
    }
  }
  
  const trimmedMessage = userMessage.trim()
  
  if (trimmedMessage.length === 0) {
    return {
      text: "I didn't receive a message. What would you like to know? 😊",
      type: 'error'
    }
  }
  
  // Classify intent using NLP processor
  const classification = classifyIntent(trimmedMessage)
  
  // Route based on classification type
  switch (classification.type) {
    // Level 1: Simple Math
    case 'math':
      return {
        text: formatMathResponse(classification.mathResult, trimmedMessage),
        type: 'math'
      }
    
    // Level 2: Portfolio/Personal (Rule-based from JSON)
    case 'portfolio':
    case 'greeting':
    case 'thanks':
    case 'help':
      return {
        text: getKnowledgeResponse(classification.intent),
        type: 'portfolio'
      }
    
    // Level 3: Data-related (LLM with strict prompt)
    case 'data':
      const llmResponse = await callLLM(trimmedMessage)
      return {
        text: llmResponse.message,
        type: llmResponse.success ? 'data' : 'error'
      }
    
    // Level 4: Out of Scope (Polite Refusal)
    case 'outofscope':
      return {
        text: getRefusalMessage(),
        type: 'refusal'
      }
    
    // Unknown - could be data-related, try LLM with caution
    case 'unknown':
    default:
      // For unknown queries, check if it looks like a question
      const isQuestion = /\?|what|how|why|when|where|who|explain|define|tell me/i.test(trimmedMessage)
      
      if (isQuestion && trimmedMessage.length > 15) {
        // Longer questions might be data-related, try LLM
        const llmAttempt = await callLLM(trimmedMessage)
        if (llmAttempt.success) {
          return {
            text: llmAttempt.message,
            type: 'data'
          }
        }
      }
      
      return {
        text: getUnknownResponse(),
        type: 'unknown'
      }
  }
}

/**
 * Get quick action suggestions based on conversation context
 */
export function getQuickActions() {
  return [
    { text: "Tell me about your projects", action: "projects" },
    { text: "What are your skills?", action: "skills" },
    { text: "How can I contact you?", action: "contact" },
    { text: "What is data analytics?", action: "data" },
    { text: "How to install this app?", action: "pwa" }
  ]
}

/**
 * Get initial greeting message
 */
export function getWelcomeMessage() {
  return {
    text: "Hi, I'm Lance.\n\nFeel free to ask about myself, my portfolio website, or data-related topics I'm familiar with.\nI'll answer as clearly and honestly as I can.",
    type: 'greeting'
  }
}

export default {
  getChatbotResponse,
  getQuickActions,
  getWelcomeMessage
}
