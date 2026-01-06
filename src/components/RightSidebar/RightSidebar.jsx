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
  FiBriefcase
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
      year: '2024'
    },
    {
      id: 2,
      degree: 'TVL - Computer System Servicing',
      school: 'San Antonio National High School',
      year: '2020'
    }
  ]

  // Experience data for About page
  const experience = [
    {
      id: 1,
      title: 'Data Analyst Intern',
      company: 'Tech Solutions Corp.',
      year: '2024',
      current: true
    },
    {
      id: 2,
      title: 'Freelance Data Analyst',
      company: 'Self-Employed',
      year: '2023',
      current: false
    }
  ]


  return (
    <aside className={`right-sidebar ${darkMode ? 'dark' : 'light'} ${isAboutPage ? 'about-page' : ''}`}>
      {isAboutPage ? (
        <>
          {/* Education Section */}
          <section className="education-section">
            <div className="section-header">
              <FiBookOpen />
              <h3>Education</h3>
            </div>
            <div className="timeline-list">
              {education.map((edu) => (
                <div key={edu.id} className="timeline-entry">
                  <div className="timeline-dot"></div>
                  <div className="timeline-entry-content">
                    <div className="timeline-entry-info">
                      <h4 className="timeline-entry-title">{edu.degree}</h4>
                      <p className="timeline-entry-subtitle">{edu.school}</p>
                    </div>
                    <span className="timeline-year">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="experience-section">
            <div className="section-header">
              <FiBriefcase />
              <h3>Experience</h3>
            </div>
            <div className="timeline-list">
              {experience.map((exp) => (
                <div key={exp.id} className="timeline-entry">
                  <div className="timeline-dot"></div>
                  <div className="timeline-entry-content">
                    <div className="timeline-entry-info">
                      <h4 className="timeline-entry-title">{exp.title}</h4>
                      <p className="timeline-entry-subtitle">{exp.company}</p>
                    </div>
                    {exp.current ? (
                      <span className="current-badge">Present</span>
                    ) : (
                      <span className="timeline-year">{exp.year}</span>
                    )}
                  </div>
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
