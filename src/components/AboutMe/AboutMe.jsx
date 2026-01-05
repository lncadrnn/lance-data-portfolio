import { useContext, useState } from 'react'
import { ThemeContext } from '../../App'
import { 
  FiUser, 
  FiMail, 
  FiMapPin, 
  FiCalendar,
  FiCode,
  FiDatabase,
  FiTrendingUp,
  FiChevronDown,
  FiChevronUp,
  FiSend
} from 'react-icons/fi'
import './AboutMe.css'

// Import assets
import profilePic from '../../assets/profile/profile.png'
import banner1 from '../../assets/images/banner1.jpg'

const AboutMe = () => {
  const { darkMode } = useContext(ThemeContext)
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)

  const aboutText = `I am a Data Analyst and aspiring Data Scientist with a strong passion for turning raw data into meaningful insights. With a solid foundation in statistical analysis, data visualization, and machine learning, I thrive on solving complex problems and uncovering patterns that drive informed decision-making.

My journey in data began during my academic years, where I developed a deep appreciation for how data can transform businesses and industries. I specialize in Python, SQL, and various data visualization tools like Tableau and Power BI. I'm constantly learning and exploring new technologies to stay at the forefront of the data science field.

Beyond technical skills, I believe in the power of storytelling with data. I'm dedicated to presenting findings in a clear, compelling manner that resonates with both technical and non-technical stakeholders. Whether it's building predictive models, creating interactive dashboards, or conducting exploratory data analysis, I approach every project with curiosity and precision.

When I'm not crunching numbers, you can find me exploring new datasets, contributing to open-source projects, or sharing my knowledge through blogs and tutorials. I'm excited about the endless possibilities that data brings and look forward to making a meaningful impact through analytics.`

  const skills = [
    { name: 'Python', icon: <FiCode /> },
    { name: 'SQL', icon: <FiDatabase /> },
    { name: 'Data Analysis', icon: <FiTrendingUp /> },
    { name: 'Machine Learning', icon: <FiCode /> },
    { name: 'Data Visualization', icon: <FiTrendingUp /> },
    { name: 'Statistics', icon: <FiDatabase /> },
  ]

  const truncatedText = aboutText.slice(0, 280) + '...'

  return (
    <div className={`about-me ${darkMode ? 'dark' : 'light'}`}>
      {/* Profile Header Section */}
      <div className="profile-header-section">
        {/* Cover Photo */}
        <div className="cover-photo-container">
          <img 
            src={banner1} 
            alt="Cover" 
            className="cover-photo"
          />
          <div className="cover-overlay"></div>
        </div>

        {/* Profile Info Card */}
        <div className="profile-info-card">
          {/* Profile Picture */}
          <div className="profile-picture-wrapper">
            <div className="profile-picture-container">
              <img 
                src={profilePic} 
                alt="Lance Adrian D. Acal" 
                className="profile-picture"
              />
              <div className="profile-status-indicator"></div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="profile-details">
            <h1 className="profile-name">Lance Adrian D. Acal</h1>
            <p className="profile-title">Data Analyst / Scientist</p>
            
            <div className="profile-meta">
              <span className="meta-item">
                <FiMapPin />
                <span>Philippines</span>
              </span>
              <span className="meta-item">
                <FiCalendar />
                <span>Available for opportunities</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions">
              <a href="mailto:lanceadrian.acal@example.com" className="action-btn primary">
                <FiSend />
                <span>Message</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="section-header">
          <FiUser className="section-icon" />
          <h2>About</h2>
        </div>
        
        <div className="about-content">
          <p className="about-text">
            {isAboutExpanded ? aboutText : truncatedText}
          </p>
          <button 
            className="see-more-btn"
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
          >
            {isAboutExpanded ? (
              <>
                <span>See less</span>
                <FiChevronUp />
              </>
            ) : (
              <>
                <span>See more</span>
                <FiChevronDown />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <div className="section-header">
          <FiCode className="section-icon" />
          <h2>Skills & Expertise</h2>
        </div>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-tag">
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div className="section-header">
          <FiMail className="section-icon" />
          <h2>Get in Touch</h2>
        </div>
        
        <div className="contact-content">
          <p>I'm always open to discussing new opportunities, collaborations, or just having a chat about data and technology. Feel free to reach out!</p>
          <a href="mailto:lanceadrian.acal@example.com" className="contact-btn">
            <FiMail />
            <span>Send me an email</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
