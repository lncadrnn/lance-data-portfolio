import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
  FiBarChart2
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
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState('')
  const [currentBanner, setCurrentBanner] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const fullTextRef = useRef('')

  // Featured carousel state
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

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

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= 600) {
        setItemsPerView(1)
      } else if (width < 1350) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  // Use featured projects from data (featured: true)
  const categoryColors = {
    'Dashboard': '#3b82f6',
    'Analytics': '#10b981',
    'Data Science': '#8b5cf6',
    'Programming': '#f59e0b',
    'Machine Learning': '#f97316',
    'Visualization': '#06b6d4',
    'Database': '#8b5cf6',
    'Tools': '#06b6d4',
    'Achievement': '#fbbf24'
  }

  // Badge colors by type
  const typeColors = {
    'Project': '#3b82f6',
    'Blog': '#06b6d4',
    'Certificate': '#f59e0b'
  }

  const formatDescription = (desc) => {
    if (!desc) return ''
    const text = desc
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    return text.length > 160 ? `${text.slice(0, 157)}...` : text
  }

  const combinedFeatured = [
    ...projects
      .filter(p => p.featured)
      .map((p) => ({
        id: p.id,
        title: p.title,
        description: formatDescription(p.description),
        category: p.category,
        image: p.image || banners[0],
        color: categoryColors[p.category] || '#3b82f6',
        type: 'Project',
        typeColor: typeColors['Project'],
        featuredOrder: p.featuredOrder
      })),
    ...blogs
      .filter(b => b.featured)
      .map((b) => ({
        id: b.id,
        title: b.title,
        description: formatDescription(b.excerpt || b.content),
        category: b.category,
        image: b.image || banners[1],
        color: categoryColors[b.category] || '#06b6d4',
        type: 'Blog',
        typeColor: typeColors['Blog'],
        featuredOrder: b.featuredOrder
      })),
    ...certificates
      .filter(c => c.featured)
      .map((c) => ({
        id: c.id,
        title: c.title,
        description: formatDescription(c.description),
        category: c.category,
        image: c.image || banners[2],
        color: categoryColors[c.category] || '#f59e0b',
        type: 'Certificate',
        typeColor: typeColors['Certificate'],
        featuredOrder: c.featuredOrder
      }))
  ]

  const featuredItems = combinedFeatured
    .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999))
    .slice(0, 6)

  // Handle click to navigate to detail page
  const handleItemClick = (item) => {
    if (item.type === 'Project') {
      navigate(`/projects/${item.id}`)
    } else if (item.type === 'Blog') {
      navigate(`/blogs/${item.id}`)
    } else if (item.type === 'Certificate') {
      navigate(`/achievements/${item.id}`)
    }
  }

  // Carousel pagination
  const totalPages = Math.ceil(featuredItems.length / itemsPerView)
  const visibleItems = featuredItems.slice(
    currentPage * itemsPerView,
    (currentPage + 1) * itemsPerView
  )

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
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

      {/* Featured (Projects + Blogs, max 6) */}
      <section className="featured-section">
        <div className="section-header">
          <FiAward />
          <h2>Featured</h2>
        </div>
        {featuredItems.length === 0 ? (
          <div className="featured-empty">
            <span>No featured items yet</span>
          </div>
        ) : (
          <>
            <div className="featured-carousel">
              <div className="featured-carousel-track">
                {visibleItems.map((item) => (
                  <div 
                    key={`${item.type}-${item.id}`} 
                    className="featured-card"
                    onClick={() => handleItemClick(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item)}
                  >
                    <div className="featured-card-image">
                      <ImageLoader src={item.image} alt={item.title} />
                      <div className="featured-card-overlay"></div>
                      <span className="featured-badge" style={{ backgroundColor: item.typeColor || item.color }}>
                        {item.type}
                      </span>
                    </div>
                    <div className="featured-card-content">
                      <span className="featured-category" style={{ color: item.color }}>
                        {item.category}
                      </span>
                      <h3 className="featured-card-title">{item.title}</h3>
                      <p className="featured-card-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {totalPages > 1 && (
              <div className="featured-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`pagination-dot ${currentPage === i ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default MainContent
