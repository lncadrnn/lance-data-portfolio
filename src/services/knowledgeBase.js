/**
 * Lance Adrian Acal - Personal Knowledge Base
 * This is the SINGLE SOURCE OF TRUTH for all portfolio-related responses.
 * The chatbot MUST answer strictly from this data for portfolio questions.
 */

export const knowledgeBase = {
  // Personal Information
  about_me: {
    name: "Lance Adrian D. Acal",
    nickname: "Lance",
    title: "Data Analytics Student & Aspiring Data Scientist",
    tagline: "Turning data into insights, one dashboard at a time.",
    bio: `I am a Computer Science student at Cavite State University – Imus, currently focused on building a strong foundation in Data Analytics as I work my way toward Data Science and eventually Machine Learning Engineering. I enjoy working with data, exploring patterns, uncovering meaningful insights, and transforming information into clear, impactful stories that help people and organizations make smarter decisions.

Most of my experience is rooted in Microsoft Excel, which I confidently use for data cleaning, analysis, and basic automation. I am also continuously improving my skills in SQL for data querying and Python for analytics, especially using libraries such as Pandas, Matplotlib, and Seaborn. In addition, I work with Power BI to create data visualizations and dashboards, and while I am still learning DAX, I enjoy designing dashboards that are both insightful and visually engaging.

Throughout my learning journey, I have worked on various mini projects, training program activities, self-made projects, dashboards, case studies, and even a capstone project to complete a data science training program and earn certification. These experiences allowed me to apply different tech skills, analyze real-world datasets, solve problems, and strengthen both my technical and analytical thinking abilities.

Beyond technical skills, I value communication, clarity, and meaningful storytelling with data. I actively participate in webinars, online programs, and professional training to continuously expand my knowledge and build a strong learning portfolio. I also plan to share my journey through blogs to inspire others who are also exploring the world of data.

I am continuously learning, building projects, and improving my craft to grow as a data professional. If anyone needs help analyzing datasets, creating dashboards, or understanding data for business or academic purposes, I'm always open to collaborate and help.`,
    short_bio: "I'm a Computer Science student at Cavite State University – Imus, focused on Data Analytics and working towards Data Science. I love turning raw data into meaningful insights and creating dashboards that tell compelling stories.",
    current_focus: "Building a strong foundation in Data Analytics while working toward Data Science and Machine Learning Engineering.",
    values: ["Communication", "Clarity", "Meaningful data storytelling", "Continuous learning"]
  },

  // Contact Information
  contact: {
    email: "lanceadrn.acal@gmail.com",
    github: "https://github.com/lncadrnn",
    github_username: "lncadrnn",
    linkedin: "https://linkedin.com/in/lanceacal",
    linkedin_username: "lanceacal",
    availability: "Open to collaboration and data-related projects!"
  },

  // Location/Demographics
  location: {
    city: "Cavite",
    country: "Philippines",
    university: "Cavite State University – Imus",
    course: "Bachelor of Science in Computer Science",
    year: "Currently studying"
  },

  // Skills
  skills: {
    primary: [
      { name: "Microsoft Excel", level: "Confident", description: "Data cleaning, analysis, pivot tables, formulas, basic automation" },
      { name: "Power BI", level: "Intermediate", description: "Dashboard design, data visualization, learning DAX" },
      { name: "Python", level: "Learning", description: "Data analytics using Pandas, Matplotlib, Seaborn" },
      { name: "SQL", level: "Learning", description: "Data querying and database management" }
    ],
    tools: ["Excel", "Power BI", "Python", "SQL", "Jupyter Notebook", "Git", "VS Code"],
    libraries: ["Pandas", "Matplotlib", "Seaborn", "NumPy"],
    concepts: [
      "Data Cleaning & Wrangling",
      "Exploratory Data Analysis (EDA)",
      "Data Visualization",
      "Dashboard Design",
      "RFM Segmentation",
      "Statistics (Descriptive & Inferential)",
      "Data Storytelling"
    ],
    learning: ["DAX", "Machine Learning fundamentals", "Advanced Python"]
  },

  // Projects Summary (detailed projects are in projects.js)
  projects: {
    summary: "I have worked on various projects including Power BI dashboards, data analysis projects, Excel tools, and a data science capstone project.",
    featured: [
      {
        title: "Brazilian E-Commerce Customer Segmentation (Olist)",
        type: "Data Science Capstone",
        tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "RFM Analysis"],
        description: "Customer segmentation using RFM analysis on 100,000+ orders to identify high-value customers and improve marketing strategies."
      },
      {
        title: "Netflix Global Content Analysis",
        type: "Analytics Dashboard",
        tech: ["Power BI", "DAX", "Power Query", "Excel"],
        description: "Comprehensive analysis of Netflix content across 15 countries, revealing cultural patterns in movie production and runtime."
      },
      {
        title: "Financial Report Dashboard",
        type: "BI Dashboard",
        tech: ["Power BI", "Dashboard Design", "Power Query"],
        description: "Executive summary dashboard showing $118M+ in revenue, segment analysis, and geographic insights."
      },
      {
        title: "All-in-One Dynamic Content Calendar",
        type: "Excel Tool",
        tech: ["Excel", "Formulas", "Conditional Formatting"],
        description: "A responsive calendar tool with side-by-side task list and visual calendar grid."
      }
    ],
    github_link: "https://github.com/lncadrnn"
  },

  // Certificates Summary (detailed in certificates.js)
  certificates: {
    summary: "I have earned certifications in Data Science, Data Analytics, Python, Excel, Power BI, Statistics, and Digital Literacy from recognized programs.",
    list: [
      {
        title: "Data Science Certificate",
        issuer: "Direcho Trabaho / The Coding School",
        date: "November 2025",
        skills: ["Python", "Pandas", "Matplotlib", "Seaborn"]
      },
      {
        title: "Data Analytics Learning Challenge",
        issuer: "DataSense Analytics",
        date: "May 2025",
        skills: ["Data Analysis", "Excel", "Power BI", "Statistics"]
      },
      {
        title: "Digital Literacy and AI Tools",
        issuer: "Direcho Trabaho",
        date: "June 2025",
        skills: ["AI Tools", "Prompt Engineering", "Digital Literacy"]
      },
      {
        title: "Business Intelligence with Power BI Desktop",
        issuer: "DataSense Analytics",
        date: "March 2025",
        skills: ["Power BI", "Dashboard Design"]
      },
      {
        title: "Python Fundamentals",
        issuer: "Data Analytics Philippines",
        date: "April 2025",
        skills: ["Python", "Jupyter"]
      },
      {
        title: "Statistics with Microsoft Excel",
        issuer: "Data Analytics Philippines",
        date: "April 2025",
        skills: ["Statistics", "Excel"]
      }
    ],
    achievement: "Top Student - Digital Literacy and AI Tools (Direcho Trabaho, June 2025)"
  },

  // Portfolio Website Info
  portfolio: {
    name: "Lance Data Portfolio",
    description: "My personal portfolio website showcasing my data analytics projects, certifications, and skills.",
    purpose: "To present my work, share my learning journey, and connect with others in the data field.",
    features: [
      "Project showcase with detailed descriptions",
      "Certificates gallery",
      "Skills overview",
      "Dark/Light theme toggle",
      "Responsive design",
      "PWA support (installable app)",
      "AI-powered chatbot assistant"
    ]
  },

  // Components Used (for website tech stack questions)
  components: {
    frontend: {
      framework: "React 18",
      bundler: "Vite",
      styling: "CSS (custom styling with CSS variables)",
      icons: "React Icons (Feather Icons)",
      routing: "React Router v6"
    },
    features: {
      theme: "Dark/Light mode toggle with CSS variables",
      responsive: "Mobile-first responsive design",
      pwa: "Progressive Web App with service worker",
      performance: "Optimized images, lazy loading"
    },
    deployment: "Vercel",
    hosting: "Vercel (vercel.json configured)",
    ai_features: {
      chatbot: "Hybrid AI chatbot with NLP intent matching",
      llm: "Groq API (for data-related questions only)"
    }
  },

  // PWA Installation Steps
  pwa_installation: {
    description: "This website is a Progressive Web App (PWA) that you can install on your device for offline access!",
    steps: {
      chrome_desktop: [
        "Open the website in Google Chrome",
        "Look for the install icon (➕) in the address bar",
        "Click 'Install' in the popup",
        "The app will be added to your desktop/start menu"
      ],
      chrome_mobile: [
        "Open the website in Chrome on your phone",
        "Tap the three-dot menu (⋮)",
        "Select 'Add to Home Screen' or 'Install App'",
        "Tap 'Install' to confirm",
        "The app icon will appear on your home screen"
      ],
      safari_ios: [
        "Open the website in Safari on iPhone/iPad",
        "Tap the Share button (□↑)",
        "Scroll down and tap 'Add to Home Screen'",
        "Tap 'Add' in the top right corner",
        "The app will appear on your home screen"
      ],
      edge: [
        "Open the website in Microsoft Edge",
        "Click the three-dot menu (⋯)",
        "Select 'Apps' → 'Install this site as an app'",
        "Click 'Install' to confirm"
      ]
    },
    benefits: [
      "Access the portfolio offline",
      "Faster loading times",
      "App-like experience",
      "Direct access from home screen"
    ]
  },

  // Fun Facts
  fun_facts: [
    "I love designing dashboards that are both insightful AND visually appealing! 🎨",
    "I earned Top Student recognition for my AI Tools course! 🏆",
    "I believe data storytelling is just as important as technical skills 📊",
    "I'm always participating in webinars and training programs to learn more 📚",
    "I built this portfolio website myself using React and Vite! 💻"
  ],

  // Hobbies/Interests
  hobbies: [
    "Creating data visualizations and dashboards",
    "Learning new data tools and technologies",
    "Participating in online training programs and webinars",
    "Building personal projects to apply what I learn"
  ],

  // Chatbot Meta
  chatbot: {
    name: "Lance's Portfolio Assistant",
    capabilities: [
      "Answer questions about me (Lance)",
      "Share information about my projects and skills",
      "Explain data analytics concepts",
      "Help you navigate this portfolio",
      "Provide contact information"
    ],
    limitations: [
      "I only answer questions about this portfolio and data-related topics",
      "I cannot help with general knowledge or unrelated tech topics",
      "I speak as Lance, in first person"
    ]
  }
}

/**
 * Get a response from the knowledge base for a specific intent
 */
export function getKnowledgeResponse(intent) {
  const kb = knowledgeBase
  
  const responses = {
    // Greetings
    greeting: () => {
      const greetings = [
        `Hey there! 👋 I'm Lance. How can I help you today?`,
        `Hi! Welcome to my portfolio! What would you like to know about me or my work?`,
        `Hello! 👋 Feel free to ask me about my projects, skills, or anything data-related!`,
        `Hey! Great to have you here. I'm happy to answer questions about my portfolio or data topics!`
      ]
      return greetings[Math.floor(Math.random() * greetings.length)]
    },
    
    // Thanks
    thanks: () => {
      const replies = [
        `You're welcome! Let me know if you have more questions 😊`,
        `No problem! Happy to help! 🙌`,
        `Anytime! Feel free to explore more or ask anything else!`,
        `Glad I could help! 😊`
      ]
      return replies[Math.floor(Math.random() * replies.length)]
    },
    
    // Help
    help: () => {
      return `Here's what you can ask me about:

📌 **About Me** – Who I am, my background, education
🛠️ **Skills** – My technical skills and tools I use
📂 **Projects** – My data projects and portfolio work
📜 **Certificates** – My certifications and achievements
📧 **Contact** – How to reach me
📊 **Data Topics** – I can explain data analytics concepts!
📲 **PWA Install** – How to install this website as an app

Just type your question naturally, and I'll do my best to help! 😊`
    },
    
    // About
    about: () => kb.about_me.short_bio + `\n\nCurrently, I'm ${kb.about_me.current_focus}`,
    
    // Name
    name: () => `I'm ${kb.about_me.name}, but you can call me ${kb.about_me.nickname}! 😊`,
    
    // Location
    location: () => `I'm based in ${kb.location.city}, ${kb.location.country}. I'm currently studying ${kb.location.course} at ${kb.location.university}.`,
    
    // Age/Education
    age: () => `I'm a college student studying ${kb.location.course} at ${kb.location.university}. Still on my learning journey! 📚`,
    education: () => `I'm currently studying ${kb.location.course} at ${kb.location.university} in ${kb.location.city}, ${kb.location.country}. I'm focused on building skills in Data Analytics and working toward Data Science.`,
    
    // Email
    email: () => `You can reach me at **${kb.contact.email}** 📧\n\nFeel free to send me a message anytime!`,
    
    // Contact
    contact: () => `Here's how you can reach me:\n\n📧 **Email:** ${kb.contact.email}\n🐙 **GitHub:** github.com/${kb.contact.github_username}\n💼 **LinkedIn:** linkedin.com/in/${kb.contact.linkedin_username}\n\n${kb.contact.availability}`,
    
    // GitHub
    github: () => `You can find my projects and code on GitHub!\n\n🔗 **GitHub:** ${kb.contact.github}\n👤 **Username:** ${kb.contact.github_username}\n\nFeel free to check out my repositories and star any projects you find useful! ⭐`,
    
    // LinkedIn
    linkedin: () => `Connect with me on LinkedIn!\n\n🔗 **LinkedIn:** ${kb.contact.linkedin}\n\nI'd love to connect and expand our professional networks! 🤝`,
    
    // Skills
    skills: () => {
      const primarySkills = kb.skills.primary.map(s => `• **${s.name}** (${s.level}): ${s.description}`).join('\n')
      const tools = kb.skills.tools.join(', ')
      
      return `Here are my main skills:\n\n${primarySkills}\n\n🛠️ **Tools I use:** ${tools}\n\n📚 **Currently learning:** ${kb.skills.learning.join(', ')}`
    },
    
    // Projects
    projects: () => {
      const projectList = kb.projects.featured.map(p => 
        `📂 **${p.title}**\n   ${p.type} | ${p.tech.join(', ')}\n   ${p.description}`
      ).join('\n\n')
      
      return `Here are some of my featured projects:\n\n${projectList}\n\n🔗 See more on my GitHub: ${kb.projects.github_link}`
    },
    
    // Certificates
    certificates: () => {
      const certList = kb.certificates.list.slice(0, 4).map(c => 
        `📜 **${c.title}**\n   ${c.issuer} | ${c.date}`
      ).join('\n\n')
      
      return `Here are some of my certifications:\n\n${certList}\n\n🏆 **Achievement:** ${kb.certificates.achievement}\n\nCheck out the Achievements section for the full list!`
    },
    
    // Experience
    experience: () => `While I'm still a student, I've gained hands-on experience through:\n\n• Training programs and bootcamps\n• Personal data projects and case studies\n• A capstone project for my Data Science certification\n• Building dashboards and analysis reports\n\nI'm actively looking for opportunities to apply my skills in real-world settings! 🚀`,
    
    // PWA Installation
    pwa: () => {
      return `${kb.pwa_installation.description}\n\n**For Chrome (Desktop):**\n${kb.pwa_installation.steps.chrome_desktop.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n**For iPhone (Safari):**\n${kb.pwa_installation.steps.safari_ios.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n**Benefits:** ${kb.pwa_installation.benefits.join(', ')}`
    },
    
    // Portfolio
    portfolio: () => `${kb.portfolio.description}\n\n**Features:**\n${kb.portfolio.features.map(f => `• ${f}`).join('\n')}\n\nFeel free to explore and let me know what you think! 😊`,
    
    // Components/Tech Stack
    components: () => {
      const c = kb.components
      return `Here's the tech stack I used to build this portfolio:\n\n**Frontend:**\n• Framework: ${c.frontend.framework}\n• Bundler: ${c.frontend.bundler}\n• Styling: ${c.frontend.styling}\n• Icons: ${c.frontend.icons}\n• Routing: ${c.frontend.routing}\n\n**Features:**\n• Theme: ${c.features.theme}\n• PWA: ${c.features.pwa}\n• Deployment: ${c.deployment}\n\n**AI Features:**\n• ${c.ai_features.chatbot}\n• LLM: ${c.ai_features.llm}`
    },
    
    // Hobbies
    hobbies: () => `Here's what I enjoy doing:\n\n${kb.hobbies.map(h => `• ${h}`).join('\n')}\n\n${kb.fun_facts[Math.floor(Math.random() * kb.fun_facts.length)]}`,
    
    // Default fallback
    default: () => `I'm not sure I understood that. Try asking about my projects, skills, certificates, or how to contact me! 😊`
  }
  
  return responses[intent] ? responses[intent]() : responses.default()
}

export default knowledgeBase
