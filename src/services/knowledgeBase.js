/**
 * Lance Adrian Acal - Portfolio Knowledge Base
 * 
 * This file contains ONLY:
 * 1. Portfolio website navigation & features
 * 2. Functions to pull data from existing data files (projects.js, certificates.js)
 * 3. Placeholders for personal info (to be filled in by Lance)
 * 
 * NO made-up personal info, fun facts, or assumptions.
 */

import { projects } from '../data/projects'
import { certificates } from '../data/certificates'

// ============================================
// PERSONAL INFO - TO BE FILLED IN BY LANCE
// ============================================
export const personalInfo = {
  // Basic Info - FILL THESE IN
  name: "Lance Adrian D. Acal",
  nickname: "Lance",
  
  // Contact - FILL THESE IN
  email: "", // e.g., "lanceadrn.acal@gmail.com"
  github: "", // e.g., "https://github.com/lncadrnn"
  github_username: "", // e.g., "lncadrnn"
  linkedin: "", // e.g., "https://linkedin.com/in/lanceacal"
  
  // Location/Education - FILL THESE IN
  location: "", // e.g., "Cavite, Philippines"
  university: "", // e.g., "Cavite State University – Imus"
  course: "", // e.g., "Bachelor of Science in Computer Science"
  
  // Short bio - FILL THIS IN (1-2 sentences about yourself)
  short_bio: "",
  
  // Skills - FILL THESE IN
  primary_skills: [], // e.g., ["Excel", "Power BI", "Python", "SQL"]
  tools: [], // e.g., ["Jupyter Notebook", "VS Code", "Git"]
  currently_learning: [] // e.g., ["DAX", "Machine Learning"]
}

// ============================================
// PORTFOLIO WEBSITE INFO (FIXED - Don't change)
// ============================================
export const websiteInfo = {
  name: "Lance Data Portfolio",
  description: "A personal portfolio website showcasing data analytics projects, certifications, and skills.",
  
  // Main sections/pages
  sections: {
    home: {
      name: "Home / About Me",
      description: "The main landing page with profile info, skills overview, and introduction.",
      howToNavigate: "This is the default page when you visit the website. Click 'About' in the sidebar."
    },
    projects: {
      name: "Projects",
      description: "Gallery of data analytics projects including dashboards, analyses, and tools.",
      howToNavigate: "Click 'Projects' in the left sidebar to view all projects. Click any project card to see full details."
    },
    achievements: {
      name: "Achievements / Certificates",
      description: "Collection of certifications and achievements in data analytics, Python, Excel, Power BI, etc.",
      howToNavigate: "Click 'Achievements' in the left sidebar to view all certificates."
    },
    blogs: {
      name: "Blogs",
      description: "Articles and posts about data analytics topics (coming soon).",
      howToNavigate: "Click 'Blogs' in the left sidebar."
    }
  },
  
  // Features
  features: {
    darkMode: {
      name: "Dark/Light Mode",
      description: "Toggle between dark and light themes for comfortable viewing.",
      howToUse: "Click the moon/sun icon in the top-right corner of the sidebar to switch themes."
    },
    pwa: {
      name: "Install as App (PWA)",
      description: "This website can be installed as an app on your device for offline access.",
      howToInstall: {
        chrome_desktop: [
          "Open the website in Google Chrome",
          "Look for the install icon (➕) in the address bar on the right",
          "Click 'Install' in the popup",
          "The app will be added to your desktop/start menu"
        ],
        chrome_mobile: [
          "Open the website in Chrome on your phone",
          "Tap the three-dot menu (⋮) at the top right",
          "Select 'Add to Home Screen' or 'Install App'",
          "Tap 'Install' to confirm"
        ],
        safari_ios: [
          "Open the website in Safari on iPhone/iPad",
          "Tap the Share button (□↑) at the bottom",
          "Scroll down and tap 'Add to Home Screen'",
          "Tap 'Add' in the top right corner"
        ],
        edge: [
          "Open the website in Microsoft Edge",
          "Click the three-dot menu (⋯)",
          "Select 'Apps' → 'Install this site as an app'",
          "Click 'Install'"
        ]
      }
    },
    chatbot: {
      name: "AI Chatbot Assistant",
      description: "Ask questions about the portfolio, projects, or data analytics topics.",
      howToUse: "Click the chat bubble icon in the bottom-right corner to open the chatbot."
    },
    responsiveDesign: {
      name: "Responsive Design",
      description: "The website adapts to all screen sizes - desktop, tablet, and mobile."
    }
  },
  
  // Tech stack used to build this website
  techStack: {
    frontend: "React 18",
    bundler: "Vite",
    styling: "CSS with CSS Variables",
    icons: "React Icons (Feather Icons)",
    routing: "React Router v6",
    deployment: "Vercel",
    pwa: "Service Worker for offline support",
    chatbot: "Hybrid AI with NLP intent matching + Groq LLM"
  }
}

// ============================================
// HELPER FUNCTIONS TO GET DATA
// ============================================

/**
 * Get all projects with basic info
 */
export function getProjectsList() {
  return projects.map(p => ({
    title: p.title,
    category: p.category,
    technologies: p.technologies,
    date: p.date,
    githubUrl: p.githubUrl
  }))
}

/**
 * Get projects by category (e.g., "Data Science", "Dashboard", "Analytics", "Tools")
 */
export function getProjectsByCategory(category) {
  const categoryLower = category.toLowerCase()
  return projects.filter(p => 
    p.category.toLowerCase().includes(categoryLower) ||
    p.technologies.some(t => t.toLowerCase().includes(categoryLower))
  )
}

/**
 * Get featured projects
 */
export function getFeaturedProjects() {
  return projects
    .filter(p => p.featured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
}

/**
 * Get all certificates with basic info
 */
export function getCertificatesList() {
  return certificates.map(c => ({
    title: c.title,
    issuer: c.issuer,
    date: c.date,
    category: c.category,
    skills: c.skills
  }))
}

/**
 * Get certificates by category (e.g., "Data Science", "Analytics", "Programming")
 */
export function getCertificatesByCategory(category) {
  const categoryLower = category.toLowerCase()
  return certificates.filter(c => 
    c.category.toLowerCase().includes(categoryLower) ||
    c.title.toLowerCase().includes(categoryLower) ||
    c.skills.some(s => s.toLowerCase().includes(categoryLower))
  )
}

/**
 * Get certificates related to a specific skill/topic
 */
export function getCertificatesBySkill(skill) {
  const skillLower = skill.toLowerCase()
  return certificates.filter(c => 
    c.skills.some(s => s.toLowerCase().includes(skillLower)) ||
    c.title.toLowerCase().includes(skillLower) ||
    c.description.toLowerCase().includes(skillLower)
  )
}

// ============================================
// RESPONSE GENERATOR
// ============================================

/**
 * Get a response from the knowledge base for a specific intent
 */
export function getKnowledgeResponse(intent) {
  const responses = {
    // === GREETINGS & CONVERSATION ===
    greeting: () => {
      const greetings = [
        `Hey there! 👋 Welcome to my portfolio! What would you like to know?`,
        `Hi! Feel free to ask about my projects, certificates, or how to navigate this website!`,
        `Hello! 👋 How can I help you today?`
      ]
      return greetings[Math.floor(Math.random() * greetings.length)]
    },
    
    thanks: () => {
      const replies = [
        `You're welcome! Let me know if you have more questions 😊`,
        `No problem! Happy to help!`,
        `Anytime! Feel free to ask anything else!`
      ]
      return replies[Math.floor(Math.random() * replies.length)]
    },
    
    help: () => {
      return `Here's what you can ask me about:

📂 **Projects** – "Show me your projects" or "Do you have data science projects?"
📜 **Certificates** – "What certificates do you have?" or "Do you have Python certifications?"
🧭 **Navigation** – "How do I view projects?" or "How do I install this app?"
🌓 **Features** – "How to switch to dark mode?" or "What features does this website have?"
📊 **Data Topics** – I can explain data analytics concepts too!

Just ask naturally and I'll do my best to help! 😊`
    },
    
    // === PROJECTS ===
    projects: () => {
      const projectList = getProjectsList()
      const formatted = projectList.map(p => 
        `• **${p.title}** (${p.category})\n  Tech: ${p.technologies.slice(0, 3).join(', ')}`
      ).join('\n\n')
      
      return `Here are my projects:\n\n${formatted}\n\n💡 Click on "Projects" in the sidebar to see full details and descriptions!`
    },
    
    // === CERTIFICATES ===
    certificates: () => {
      const certList = getCertificatesList()
      const formatted = certList.slice(0, 6).map(c => 
        `• **${c.title}**\n  Issuer: ${c.issuer} | ${c.date}`
      ).join('\n\n')
      
      return `Here are some of my certificates:\n\n${formatted}\n\n📜 Check out the "Achievements" section in the sidebar for the complete list!`
    },
    
    // === WEBSITE NAVIGATION ===
    portfolio: () => {
      const w = websiteInfo
      return `${w.description}\n\n**Main Sections:**\n• **Home/About** – Profile and introduction\n• **Projects** – Data analytics projects gallery\n• **Achievements** – Certificates and recognitions\n• **Blogs** – Articles (coming soon)\n\nUse the sidebar on the left to navigate between sections!`
    },
    
    components: () => {
      const tech = websiteInfo.techStack
      return `This portfolio was built with:\n\n• **Framework:** ${tech.frontend}\n• **Bundler:** ${tech.bundler}\n• **Styling:** ${tech.styling}\n• **Icons:** ${tech.icons}\n• **Routing:** ${tech.routing}\n• **Deployment:** ${tech.deployment}\n• **Chatbot:** ${tech.chatbot}`
    },
    
    pwa: () => {
      const pwa = websiteInfo.features.pwa
      const chromeSteps = pwa.howToInstall.chrome_desktop.map((s, i) => `${i + 1}. ${s}`).join('\n')
      const mobileSteps = pwa.howToInstall.chrome_mobile.map((s, i) => `${i + 1}. ${s}`).join('\n')
      
      return `${pwa.description}\n\n**On Desktop (Chrome):**\n${chromeSteps}\n\n**On Mobile (Chrome):**\n${mobileSteps}\n\n💡 Once installed, you can access the portfolio even offline!`
    },
    
    // === PERSONAL INFO (uses placeholders if not filled) ===
    about: () => {
      if (personalInfo.short_bio) {
        return personalInfo.short_bio
      }
      return `I'm ${personalInfo.name}. Check out my projects and certificates in the sidebar to learn more about what I do! 😊`
    },
    
    name: () => `I'm ${personalInfo.name}! You can call me ${personalInfo.nickname}. 😊`,
    
    email: () => {
      if (personalInfo.email) {
        return `You can reach me at **${personalInfo.email}** 📧`
      }
      return `My contact info isn't set up in the chatbot yet, but you can find it on my profile page!`
    },
    
    contact: () => {
      const parts = []
      if (personalInfo.email) parts.push(`📧 **Email:** ${personalInfo.email}`)
      if (personalInfo.github) parts.push(`🐙 **GitHub:** ${personalInfo.github}`)
      if (personalInfo.linkedin) parts.push(`💼 **LinkedIn:** ${personalInfo.linkedin}`)
      
      if (parts.length > 0) {
        return `Here's how you can reach me:\n\n${parts.join('\n')}`
      }
      return `My contact details are on the profile page. Check the "About" section in the sidebar!`
    },
    
    github: () => {
      if (personalInfo.github) {
        return `Check out my GitHub: ${personalInfo.github} 🐙`
      }
      return `My GitHub link is on my profile page. Click "About" in the sidebar to find it!`
    },
    
    linkedin: () => {
      if (personalInfo.linkedin) {
        return `Connect with me on LinkedIn: ${personalInfo.linkedin} 💼`
      }
      return `My LinkedIn is on my profile page. Check the "About" section!`
    },
    
    location: () => {
      if (personalInfo.location && personalInfo.university) {
        return `I'm based in ${personalInfo.location}, studying at ${personalInfo.university}.`
      }
      return `You can find my location info on my profile page in the "About" section.`
    },
    
    education: () => {
      if (personalInfo.university && personalInfo.course) {
        return `I'm studying ${personalInfo.course} at ${personalInfo.university}.`
      }
      return `Check out my profile page for education details!`
    },
    
    skills: () => {
      if (personalInfo.primary_skills.length > 0) {
        return `My main skills include: **${personalInfo.primary_skills.join(', ')}**\n\nCheck the "About" section for the full skills overview!`
      }
      return `You can see my skills on the profile page. Click "About" in the sidebar to view them with icons!`
    },
    
    experience: () => {
      return `Check out my "Projects" and "Achievements" sections to see what I've worked on! The projects showcase my hands-on experience with data analytics.`
    },
    
    hobbies: () => {
      return `I'm focused on data analytics and building projects. Check out my work in the Projects section! 📊`
    },
    
    age: () => {
      return `I don't share my age here, but feel free to check out my projects and certificates! 😊`
    },
    
    // === DEFAULT ===
    default: () => {
      return `I'm not sure about that. Try asking about my projects, certificates, or how to navigate this website! 😊`
    }
  }
  
  return responses[intent] ? responses[intent]() : responses.default()
}

export default {
  personalInfo,
  websiteInfo,
  getProjectsList,
  getProjectsByCategory,
  getFeaturedProjects,
  getCertificatesList,
  getCertificatesByCategory,
  getCertificatesBySkill,
  getKnowledgeResponse
}
