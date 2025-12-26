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
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import banner3 from '../../assets/images/banner3.jpg'
import banner4 from '../../assets/images/banner4.jpg'
import banner5 from '../../assets/images/banner5.jpg'
import banner6 from '../../assets/images/banner6.jpg'

const banners = [banner1, banner2, banner3, banner4, banner5, banner6]

const MainContent = () => {
  const { darkMode } = useContext(ThemeContext)
  const [currentDate, setCurrentDate] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const fullTextRef = useRef('')
  
  // Ref to track sequential text index
  const textIndexRef = useRef(0)

  // All hero texts - some are dynamic based on time of day
  const getHeroTexts = () => {
    const hour = new Date().getHours()
    let timeGreeting = ''
    if (hour < 12) timeGreeting = 'Good morning!'
    else if (hour < 18) timeGreeting = 'Good afternoon!'
    else timeGreeting = 'Good evening!'

    return [
      `Hey there, ${timeGreeting}`,
      'Welcome to my Data Space!',
      'Great to have you here!',
      'Explore my journey with data below!',
      'Turning Data into Insights.',
      'Exploring Data with Purpose.',
      'Analytics | Insights | Impact',
      'Predict. Analyze. Understand.',
      'Powered by curiosity and data.'
    ]
  }

  // Get next text sequentially (loops back to first after last)
  const getNextText = () => {
    const heroTexts = getHeroTexts()
    textIndexRef.current = (textIndexRef.current + 1) % heroTexts.length
    return heroTexts[textIndexRef.current]
  }

  // Initialize with first text
  useEffect(() => {
    textIndexRef.current = 0
    
    const heroTexts = getHeroTexts()
    fullTextRef.current = heroTexts[0]

    // Set formatted date
    const date = new Date()
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    setCurrentDate(date.toLocaleDateString('en-US', options))
  }, [])

  // Banner rotation effect
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000) // Change banner every 5 seconds

    return () => clearInterval(bannerInterval)
  }, [])

  // Typewriter effect with backspace
  useEffect(() => {
    if (!fullTextRef.current) return
    
    let currentIndex = 0
    let isDeleting = false
    let pauseTimeout = null
    setDisplayedText('')
    setIsTyping(true)
    
    const typewriterInterval = setInterval(() => {
      const currentText = fullTextRef.current
      
      if (!isDeleting) {
        // Typing forward
        if (currentIndex < currentText.length) {
          setDisplayedText(currentText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          // Finished typing, pause then start deleting
          setIsTyping(false)
          clearInterval(typewriterInterval)
          
          pauseTimeout = setTimeout(() => {
            // Start the delete and next text cycle
            let deleteIndex = currentText.length
            setIsTyping(true)
            
            const deleteInterval = setInterval(() => {
              if (deleteIndex > 0) {
                deleteIndex--
                setDisplayedText(currentText.slice(0, deleteIndex))
              } else {
                clearInterval(deleteInterval)
                // Get next text sequentially
                const nextText = getNextText()
                
                setCurrentTextIndex(prev => prev + 1)
                fullTextRef.current = nextText
              }
            }, 40) // Faster backspace
          }, 2000) // Pause before deleting
        }
      }
    }, 80)
    
    return () => {
      clearInterval(typewriterInterval)
      if (pauseTimeout) clearTimeout(pauseTimeout)
    }
  }, [currentTextIndex])

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
            src={banners[currentBanner]} 
            alt="Data Analytics Banner" 
            className="hero-image"
            key={currentBanner}
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
