import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../../App'
import { 
  FiCalendar, 
  FiClock, 
  FiAward, 
  FiGitPullRequest,
  FiCode,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import './MainContent.css'

const MainContent = () => {
  const { darkMode } = useContext(ThemeContext)
  const [greeting, setGreeting] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning!')
    else if (hour < 18) setGreeting('Good afternoon!')
    else setGreeting('Good evening!')

    // Set formatted date
    const date = new Date()
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    setCurrentDate(date.toLocaleDateString('en-US', options))
  }, [])

  const careerStats = [
    { icon: <FiClock />, value: '2', label: 'Experience', unit: 'years', color: '#3b82f6' },
    { icon: <FiAward />, value: '20', label: 'Certificates', unit: '', color: '#f59e0b' },
    { icon: <FiGitPullRequest />, value: '16', label: 'Projects', unit: '', color: '#10b981' },
    { icon: <FiCode />, value: '20', label: 'Technologies', unit: '', color: '#06b6d4' },
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
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" 
            alt="Data Analytics Banner" 
            className="hero-image"
          />
          <div className="hero-content">
            <h1>Hey there, {greeting}</h1>
          </div>
        </div>
      </section>

      {/* Career Stats */}
      <section className="stats-section">
        <div className="section-header">
          <FiGitPullRequest />
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
