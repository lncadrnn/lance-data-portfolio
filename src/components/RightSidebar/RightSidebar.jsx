import { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { ThemeContext } from '../../App'
import { 
  FiSettings,
  FiUsers,
  FiMail,
  FiBook
} from 'react-icons/fi'
import { 
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaChartBar,
  FaCogs,
  FaSearch,
  FaRegLightbulb
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
  background: var(--bg-tertiary) !important;
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
  background: var(--bg-secondary);
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

const RightSidebar = () => {
  const { darkMode } = useContext(ThemeContext)

  const skills = [
    { icon: excelIcon, name: 'Excel' },
    { icon: mysqlIcon, name: 'SQL' },
    { icon: powerbiIcon, name: 'Power BI' },
    { icon: pythonIcon, name: 'Python' },
    { icon: pandasIcon, name: 'Pandas' },
    { icon: matplotlibIcon, name: 'Matplotlib' },
    { icon: seabornIcon, name: 'Seaborn' },
  ]

  const expertise = [
    { 
      id: 'analytical-thinking',
      title: 'Improve Analytical Thinking', 
      icon: <FaCogs />,
      color: '#3b82f6'
    },
    { 
      id: 'sql-py',
      title: 'Strengthen SQL / Python', 
      icon: <FaSearch />,
      color: '#8b5cf6'
    },
    { 
      id: 'better-dashboards',
      title: 'Build Better Dashboards', 
      icon: <FaChartBar />,
      color: '#10b981'
    },
    { 
      id: 'storytelling',
      title: 'Improve Data Storytelling', 
      icon: <FaRegLightbulb />,
      color: '#f59e0b'
    },
  ]

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/lanceadrian.acal', name: 'Facebook' },
    { icon: <FaEnvelope />, url: 'mailto:lanceadrn.acal@gmail.com', name: 'Gmail' },
    { icon: <FaGithub />, url: 'https://github.com/lncadrnn', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/lncadrnn', name: 'LinkedIn' },
  ]


  return (
    <aside className={`right-sidebar ${darkMode ? 'dark' : 'light'}`}>
      {/* Skill Set */}
      <SkillSection>
        <div className="section-header">
          <FiSettings />
          <h3>Skill Set</h3>
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

      {/* Get in Touch */}
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
    </aside>
  )
}

export default RightSidebar
