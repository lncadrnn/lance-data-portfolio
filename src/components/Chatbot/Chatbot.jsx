import { useState, useRef, useEffect, useContext } from 'react'
import { ThemeContext } from '../../App'
import chatbotIcon from '../../assets/icons/chatbot-icon.png'
import './Chatbot.css'

const Chatbot = () => {
  const { darkMode } = useContext(ThemeContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 I'm Lance's assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response (replace with actual API call later)
    setTimeout(() => {
      setIsTyping(false)
      const botMessage = {
        id: Date.now() + 1,
        text: "Thanks for reaching out! This chatbot is currently under development. Feel free to explore my portfolio in the meantime! 🚀",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1200)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = (text) => {
    setInputValue(text)
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
                  <p>{message.text}</p>
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
              Projects
            </button>
            <button className="quick-action-btn" onClick={() => handleQuickAction("What are your skills?")}>
              Skills
            </button>
            <button className="quick-action-btn" onClick={() => handleQuickAction("How can I contact you?")}>
              Contact
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
