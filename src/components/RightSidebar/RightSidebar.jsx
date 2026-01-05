import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { ThemeContext } from '../../App'
import { 
  FiSettings,
  FiUsers,
  FiMail,
  FiBook,
  FiGitPullRequest,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi'
import { 
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaChartBar,
  FaCogs,
  FaSearch,
  FaRegLightbulb,
  FaGraduationCap,
  FaBuilding
} from 'react-icons/fa'
import { 
  SiMysql,
  SiPython
} from 'react-icons/si'
import './RightSidebar.css'

// Styled Components
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`

const SkillSection = styled.section`
  background: var(--bg-secondary) !important;
  border-radius: 20px;
  padding: 24px;
  overflow: hidden;
`

const SkillsCarousel = styled.div`
  overflow: hidden;
  position: relative;
  padding: 8px 0;
  margin: 0 -24px;
`

const SkillsScroll = styled.div`
  display: flex;
  gap: 24px;
  animation: ${scroll} 20s linear infinite;
  padding: 0 24px;
  width: fit-content;
  
  &:hover {
    animation-play-state: paused;
  }
`

const SkillIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`

const SkillIcon = styled.div`
  width: 64px;
  height: 64px;
  background: var(--bg-tertiary);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1) translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`

const SkillName = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: center;
  width: 64px;
  font-weight: 500;
  word-break: break-word;
`

const SkillImg = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`

// Import icons from assets
import excelIcon from '../../assets/icons/microsoft-excel.svg'
import mysqlIcon from '../../assets/icons/mysql.svg'
import powerbiIcon from '../../assets/icons/powerbi.svg'
import pythonIcon from '../../assets/icons/python.svg'
import pandasIcon from '../../assets/icons/pandas.svg'
import matplotlibIcon from '../../assets/icons/matplotlib.svg'
import seabornIcon from '../../assets/icons/seaborn.svg'
import gitIcon from '../../assets/icons/git.svg'

const RightSidebar = () => {
  const { darkMode } = useContext(ThemeContext)
  const location = useLocation()
  const isAboutPage = location.pathname === '/about'

  const skills = [
    { icon: excelIcon, name: 'Excel' },
    { icon: mysqlIcon, name: 'SQL' },
    { icon: powerbiIcon, name: 'Power BI' },
    { icon: pythonIcon, name: 'Python' },
    { icon: pandasIcon, name: 'Pandas' },
    { icon: matplotlibIcon, name: 'Matplotlib' },
    { icon: seabornIcon, name: 'Seaborn' },
    { icon: gitIcon, name: 'Git' },
  ]

  const expertise = [
    { 
      id: 'analytical-thinking',
      title: 'Improve Analytical Thinking', 
      icon: <FaCogs />,
      color: '#3b82f6'
    },
    { 
      id: 'storytelling',
      title: 'Enhance Data Storytelling', 
      icon: <FaRegLightbulb />,
      color: '#f59e0b'
    },
    { 
      id: 'better-dashboards',
      title: 'Create Better Dashboards', 
      icon: <FaChartBar />,
      color: '#10b981'
    },
    { 
      id: 'sql-py',
      title: 'Strengthen SQL / Python', 
      icon: <FaSearch />,
      color: '#06b6d4'
    },
  ]

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/lanceadrian.acal', name: 'Facebook' },
    { icon: <FaEnvelope />, url: 'mailto:lanceadrn.acal@gmail.com', name: 'Gmail' },
    { icon: <FaGithub />, url: 'https://github.com/lncadrnn', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/lncadrnn', name: 'LinkedIn' },
  ]

  // Education data for About page
  const education = [
    {
      id: 1,
      degree: 'BSc in Information Technology',
      school: 'Asian Institute of Technology & Education',
      gwa: '1.28 / 1.00',
      period: 'Jun 2020 - Jun 2024',
      description: 'Graduated with Academic Distinction, Former AITEans Forum – Graphic Editor (2022-2024), Outstanding in Information...',
      icon: '🎓',
      color: '#3b82f6'
    },
    {
      id: 2,
      degree: 'TVL - Computer System Servicing',
      school: 'San Antonio National High School',
      gwa: '92 / 100',
      period: 'Jun 2018 - Mar 2020',
      description: 'Consistent Honor Student, Former News Editor – School Paper Organization, TVL – CSS National Certificate II Passer...',
      icon: '📚',
      color: '#10b981'
    }
  ]

  // Experience data for About page
  const experience = [
    {
      id: 1,
      title: 'Data Analyst Intern',
      company: 'Tech Solutions Corp.',
      location: 'Remote, Philippines',
      period: 'Jan 2024 - Present',
      description: 'Build and analyze datasets, create data visualizations and dashboards, turning raw data into actionable insights...',
      icon: '💼',
      color: '#f59e0b',
      current: true
    },
    {
      id: 2,
      title: 'Freelance Data Analyst',
      company: 'Self-Employed',
      location: 'Philippines',
      period: 'Jun 2023 - Dec 2023',
      description: 'Provided data analysis services to various clients, created reports and visualizations using Python and Power BI...',
      icon: '📊',
      color: '#8b5cf6',
      current: false
    }
  ]


  return (
    <aside className={`right-sidebar ${darkMode ? 'dark' : 'light'} ${isAboutPage ? 'about-page' : ''}`}>
      {isAboutPage ? (
        <>
          {/* Education Section - Timeline Style */}
          <section className="education-section">
            <div className="section-header">
              <FiBookOpen />
              <h3>Education</h3>
            </div>
            <div className="timeline">
              {education.map((edu, index) => (
                <div key={edu.id} className="timeline-item">
                  <div className="timeline-marker" style={{ background: edu.color }}>
                    <span>{edu.icon}</span>
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">{edu.degree}</h4>
                    <p className="timeline-subtitle">{edu.school}</p>
                    <div className="timeline-meta">
                      <span className="timeline-gwa">GWA: {edu.gwa}</span>
                    </div>
                    <div className="timeline-period">
                      <FiCalendar />
                      <span>{edu.period}</span>
                    </div>
                    <p className="timeline-description">{edu.description}</p>
                    <button className="see-more-timeline">See more</button>
                  </div>
                  {index < education.length - 1 && <div className="timeline-connector"></div>}
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section - Timeline Style */}
          <section className="experience-section">
            <div className="section-header">
              <FiBriefcase />
              <h3>Experience</h3>
            </div>
            <div className="timeline">
              {experience.map((exp, index) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker" style={{ background: exp.color }}>
                    <span>{exp.icon}</span>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <h4 className="timeline-title">{exp.title}</h4>
                      {exp.current && <span className="current-badge">Current</span>}
                    </div>
                    <p className="timeline-subtitle">{exp.company}</p>
                    <div className="timeline-meta">
                      <span className="timeline-location">
                        <FiMapPin />
                        {exp.location}
                      </span>
                    </div>
                    <div className="timeline-period">
                      <FiCalendar />
                      <span>{exp.period}</span>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                    <button className="see-more-timeline">See more</button>
                  </div>
                  {index < experience.length - 1 && <div className="timeline-connector"></div>}
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Skill Set */}
          <SkillSection>
            <div className="section-header">
              <FiGitPullRequest />
              <h3>Tech Stack</h3>
            </div>
            <SkillsCarousel>
              <SkillsScroll>
                {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
                  <SkillIconWrapper key={index}>
                    <SkillIcon>
                      <SkillImg src={skill.icon} alt={skill.name} />
                    </SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                  </SkillIconWrapper>
                ))}
              </SkillsScroll>
            </SkillsCarousel>
          </SkillSection>

          {/* Expertise */}
          <section className="expertise-section">
            <div className="section-header">
              <FiBook />
              <h3>What I'm Learning</h3>
            </div>
            <div className="expertise-list">
              {expertise.map((item) => (
                <div key={item.id} className="expertise-item">
                  <div className="expertise-header-static">
                    <div className="expertise-title">
                      <span className="expertise-icon" style={{ color: item.color }}>
                        {item.icon}
                      </span>
                      <span>{item.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Get in Touch - Only on home page */}
      {!isAboutPage && (
        <section className="contact-section">
          <div className="section-header">
            <FiMail />
            <h3>Get in touch</h3>
          </div>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                className="social-link"
                title={link.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="contact-text">
            Let's build something great together! feel free to connect with me
          </p>
        </section>
      )}
    </aside>
  )
}

export default RightSidebar
