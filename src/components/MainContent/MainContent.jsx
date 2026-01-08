import { useContext, useState, useEffect, useRef } from 'react'
import { ThemeContext } from '../../App'
import { certificates } from '../../data/certificates'
import { projects } from '../../data/projects'
import { blogs } from '../../data/blogs'
import {
  FiCalendar,
  FiClock,
  FiAward,
  FiFolder,
  FiFileText,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import './MainContent.css'
import ImageLoader from '../Loading/ImageLoader'
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
    { icon: <FiAward />, value: certificates.length, label: 'Certificates', unit: '', color: '#f59e0b' },
    { icon: <FiFolder />, value: projects.length, label: 'Projects', unit: '', color: '#10b981' },
    { icon: <FiFileText />, value: blogs.length, label: 'Blogs', unit: '', color: '#06b6d4' },
  ]

  // Sample featured projects - replace with your actual projects
  const featuredProjects = [
    {
      id: 1,
      title: 'Coming Soon',
      description: 'Exciting data project in development',
      category: 'Data Analytics',
      image: banner1,
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'Coming Soon',
      description: 'Machine learning project coming up',
      category: 'Machine Learning',
      image: banner2,
      color: '#8b5cf6'
    },
    {
      id: 3,
      title: 'Coming Soon',
      description: 'Dashboard visualization project',
      category: 'Visualization',
      image: banner3,
      color: '#10b981'
    },
    {
      id: 4,
      title: 'Coming Soon',
      description: 'Data engineering pipeline project',
      category: 'Data Engineering',
      image: banner4,
      color: '#f59e0b'
    },
    {
      id: 5,
      title: 'Coming Soon',
      description: 'Business intelligence case study',
      category: 'Business Intelligence',
      image: banner5,
      color: '#ec4899'
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    if (featuredProjects.length <= 1) return

    const autoPlayInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)

    return () => clearInterval(autoPlayInterval)
  }, [featuredProjects.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
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
          <ImageLoader
            src={banners[currentBanner]}
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
          {featuredProjects.length === 0 ? (
            <div className="featured-empty">
              <span>No featured projects yet</span>
            </div>
          ) : (
            <>
              <div className="carousel-track">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''} ${index === (currentSlide - 1 + featuredProjects.length) % featuredProjects.length ? 'prev' : ''
                      } ${index === (currentSlide + 1) % featuredProjects.length ? 'next' : ''
                      }`}
                  >
                    <div className="slide-image">
                      <ImageLoader src={project.image} alt={project.title} />
                      <div className="slide-overlay"></div>
                    </div>
                    <span className="slide-category" style={{ backgroundColor: project.color }}>
                      {project.category}
                    </span>
                    <div className="slide-content">
                      <h3 className="slide-title">{project.title}</h3>
                      <p className="slide-description">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous slide">
                <FiChevronLeft />
              </button>
              <button className="carousel-btn next" onClick={nextSlide} aria-label="Next slide">
                <FiChevronRight />
              </button>

              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default MainContent
