import { useContext, useState, useEffect, useRef } from 'react'
import { ThemeContext } from '../../App'
import { 
  FiCalendar, 
  FiClock, 
  FiAward, 
  FiFolder,
  FiBriefcase,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import './MainContent.css'
import bannerImage from '../../assets/images/banner.jpg'

const MainContent = () => {
  const { darkMode } = useContext(ThemeContext)
  const [greeting, setGreeting] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const fullTextRef = useRef('')

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    let greetingText = ''
    if (hour < 12) greetingText = 'Good morning!'
    else if (hour < 18) greetingText = 'Good afternoon!'
    else greetingText = 'Good evening!'
    
    setGreeting(greetingText)
    fullTextRef.current = `Hey there, ${greetingText}`

    // Set formatted date
    const date = new Date()
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    setCurrentDate(date.toLocaleDateString('en-US', options))
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!fullTextRef.current) return
    
    let currentIndex = 0
    setDisplayedText('')
    setIsTyping(true)
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullTextRef.current.length) {
        setDisplayedText(fullTextRef.current.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 80)
    
    return () => clearInterval(typingInterval)
  }, [greeting])

  const careerStats = [
    { icon: <FiClock />, value: '0', label: 'Experience', unit: '', color: '#3b82f6' },
    { icon: <FiAward />, value: '0', label: 'Certificates', unit: '', color: '#f59e0b' },
    { icon: <FiFolder />, value: '0', label: 'Projects', unit: '', color: '#10b981' },
    { icon: <FiBriefcase />, value: '0', label: 'Case Studies', unit: '', color: '#06b6d4' },
  ]

  const featuredProjects = []

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  return (
    <main className={`main-content ${darkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="date-badge">
          <FiCalendar />
          <span>{currentDate}</span>
        </div>
        <div className="hero-banner">
          <div className="hero-overlay"></div>
          <img 
            src={bannerImage} 
            alt="Data Analytics Banner" 
            className="hero-image"
          />
          <div className="hero-content">
            <h1>
              {displayedText}
              <span className={`typing-cursor ${!isTyping ? 'blink' : ''}`}>|</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Career Stats */}
      <section className="stats-section">
        <div className="section-header">
          <FiBarChart2 />
          <h2>Career Stats</h2>
        </div>
        <div className="stats-grid">
          {careerStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <span className="stat-value">
                  {stat.value}
                  {stat.unit && <small> {stat.unit}</small>}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-section">
        <div className="section-header">
          <FiAward />
          <h2>Featured</h2>
        </div>
        <div className="featured-carousel">
          <div className="carousel-container">
            {featuredProjects.length === 0 ? (
              <div className="featured-empty"></div>
            ) : (
              featuredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                  style={{ transform: `translateX(${(index - currentSlide) * 105}%)` }}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="carousel-overlay">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {featuredProjects.length > 0 && (
            <>
              <button className="carousel-btn prev" onClick={prevSlide}>
                <FiChevronLeft />
              </button>
              <button className="carousel-btn next" onClick={nextSlide}>
                <FiChevronRight />
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default MainContent
