import { useState, useRef, useEffect, useContext } from 'react'
import { ThemeContext } from '../../App'
import { getChatbotResponse, getWelcomeMessage } from '../../services/chatbotService'
import chatbotIcon from '../../assets/icons/chatbot-icon.png'
import './Chatbot.css'

/**
 * Parse markdown-style formatting to JSX
 * Supports: **bold**, line breaks, bullet points
 */
const parseFormattedText = (text) => {
  if (!text) return null
  
  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\n+/)
  
  return paragraphs.map((paragraph, pIndex) => {
    // Split by single newlines for lines within paragraph
    const lines = paragraph.split('\n')
    
    return (
      <span key={pIndex}>
        {pIndex > 0 && <><br /><br /></>}
        {lines.map((line, lIndex) => {
          // Check if it's a bullet point
          const isBullet = /^[•\-\*]\s/.test(line.trim())
          const cleanLine = isBullet ? line.trim().replace(/^[•\-\*]\s/, '') : line
          
          // Parse bold text (**text**)
          const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g)
          const formattedParts = parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i}>{part.slice(2, -2)}</strong>
            }
            return part
          })
          
          return (
            <span key={lIndex}>
              {lIndex > 0 && <br />}
              {isBullet && <span style={{ marginRight: '8px' }}>•</span>}
              {formattedParts}
            </span>
          )
        })}
      </span>
    )
  })
}

const Chatbot = () => {
  const { darkMode } = useContext(ThemeContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState(() => {
    const welcome = getWelcomeMessage()
    return [
      {
        id: 1,
        text: welcome.text,
        sender: 'bot',
        type: welcome.type,
        timestamp: new Date()
      }
    ]
  })
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isTyping) return

    const userText = inputValue.trim()
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Get response from chatbot service (handles NLP + routing + LLM)
      const response = await getChatbotResponse(userText)
      
      setIsTyping(false)
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        type: response.type,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chatbot error:', error)
      setIsTyping(false)
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "Oops! Something went wrong. Try again in a moment! 😅",
        sender: 'bot',
        type: 'error',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = (text) => {
    setInputValue(text)
    // Optional: auto-send the quick action
    // setTimeout(() => handleSendMessage(), 100)
  }

  return (
    <div className={`chatbot-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Chat Bubble Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <img src={chatbotIcon} alt="Chatbot" className="chatbot-toggle-icon" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <img src={chatbotIcon} alt="Bot" className="chatbot-avatar-icon" />
              </div>
              <div className="chatbot-header-info">
                <h3>Lance's Assistant</h3>
                <p className="status">
                  <span className="status-dot"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  <div className="message-text">
                    {message.sender === 'bot' 
                      ? parseFormattedText(message.text)
                      : <p>{message.text}</p>
                    }
                  </div>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => handleQuickAction("Tell me about your projects")}>
              📂 Projects
            </button>
            <button className="quick-action-btn" onClick={() => handleQuickAction("What are your skills?")}>
              🛠️ Skills
            </button>
            <button className="quick-action-btn" onClick={() => handleQuickAction("How can I contact you?")}>
              📧 Contact
            </button>
            <button className="quick-action-btn" onClick={() => handleQuickAction("What is data analytics?")}>
              📊 Data
            </button>
          </div>

          {/* Input Area */}
          <div className="chatbot-input-area">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows="1"
              className="chatbot-input"
            />
            <button
              onClick={handleSendMessage}
              className="chatbot-send-btn"
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
