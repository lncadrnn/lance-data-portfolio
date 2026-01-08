import { useContext, useState } from 'react'
import { ThemeContext } from '../../App'
import {
  FiUser,
  FiMapPin,
  FiCalendar,
  FiCode,
  FiDatabase,
  FiTrendingUp,
  FiChevronDown,
  FiChevronUp,
  FiSend,
  FiPhone,
  FiMail
} from 'react-icons/fi'
import './AboutMe.css'
import ImageLoader from '../Loading/ImageLoader'

// Import assets
import profilePic from '../../assets/profile/profile.png'
import banner1 from '../../assets/images/cover-photo.jpg'

// Import skill icons
import pythonIcon from '../../assets/icons/python.svg'
import mysqlIcon from '../../assets/icons/mysql.svg'
import excelIcon from '../../assets/icons/microsoft-excel.svg'
import powerbiIcon from '../../assets/icons/powerbi.svg'
import gitIcon from '../../assets/icons/git.svg'
import pandasIcon from '../../assets/icons/pandas.svg'
import matplotlibIcon from '../../assets/icons/matplotlib.svg'
import seabornIcon from '../../assets/icons/seaborn.svg'

const AboutMe = () => {
  const { darkMode } = useContext(ThemeContext)
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)

  const aboutText = `I am a Computer Science student at Cavite State University – Imus, currently focused on building a strong foundation in Data Analytics as I work my way toward Data Science and eventually Machine Learning Engineering. I enjoy working with data, exploring patterns, uncovering meaningful insights, and transforming information into clear, impactful stories that help people and organizations make smarter decisions.

Most of my experience is rooted in Microsoft Excel, which I confidently use for data cleaning, analysis, and basic automation. I am also continuously improving my skills in SQL for data querying and Python for analytics, especially using libraries such as Pandas, Matplotlib, and Seaborn. In addition, I work with Power BI to create data visualizations and dashboards, and while I am still learning DAX, I enjoy designing dashboards that are both insightful and visually engaging.

Throughout my learning journey, I have worked on various mini projects, training program activities, self-made projects, dashboards, case studies, and even a capstone project to complete a data science training program and earn certification. These experiences allowed me to apply different tech skills, analyze real-world datasets, solve problems, and strengthen both my technical and analytical thinking abilities.

Beyond technical skills, I value communication, clarity, and meaningful storytelling with data. I actively participate in webinars, online programs, and professional training to continuously expand my knowledge and build a strong learning portfolio. I also plan to share my journey through blogs to inspire others who are also exploring the world of data.

I am continuously learning, building projects, and improving my craft to grow as a data professional. If anyone needs help analyzing datasets, creating dashboards, or understanding data for business or academic purposes, I'm always open to collaborate and help.`

  const skills = [
    { name: 'Python', icon: pythonIcon },
    { name: 'SQL', icon: mysqlIcon },
    { name: 'Excel', icon: excelIcon },
    { name: 'Power BI', icon: powerbiIcon },
    { name: 'Git', icon: gitIcon },
    { name: 'Pandas', icon: pandasIcon },
    { name: 'Matplotlib', icon: matplotlibIcon },
    { name: 'Seaborn', icon: seabornIcon },
  ]

  const truncatedText = aboutText.slice(0, 280) + '...'

  return (
    <div className={`about-me ${darkMode ? 'dark' : 'light'}`}>
      {/* Profile Header Section */}
      <div className="profile-header-section">
        {/* Cover Photo */}
        <div className="cover-photo-container">
          <ImageLoader
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
              <ImageLoader
                src={profilePic}
                alt="Lance Adrian D. Acal"
                className="profile-picture"
              />
              <div className="profile-status-indicator"></div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="profile-details">
            <div className="profile-header-row">
              <h1 className="about-profile-name">Lance Adrian D. Acal</h1>

              {/* Action Buttons - Moved to top right */}
              <div className="profile-actions">
                <a href="mailto:lanceadrn.acal@gmail.com" className="action-btn primary">
                  <FiSend />
                  <span>Message</span>
                </a>
              </div>
            </div>

            <p className="about-profile-title">Aspiring Data Analyst / Scientist</p>

            <div className="profile-meta">
              <div className="profile-meta-left">
                <span className="meta-item">
                  <FiMapPin />
                  <span>Imus, Cavite, Philippines</span>
                </span>
                <span className="meta-item">
                  <FiPhone />
                  <span>0976 1855 8774</span>
                </span>
                <span className="meta-item">
                  <FiMail />
                  <span>lanceadrn.acal@gmail.com</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="section-header">
          <FiUser className="section-icon" />
          <h2>About Me</h2>
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
          <h2>Skills / What I know</h2>
        </div>

        <p className="skills-note">
          Currently studying and upskilling. These reflect my ongoing learning journey.
        </p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-icon-card">
              <div className="skill-icon-wrapper">
                <img src={skill.icon} alt={skill.name} />
              </div>
              <span className="skill-icon-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutMe
