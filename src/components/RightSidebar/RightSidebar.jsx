import { useContext, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { ThemeContext } from '../../App'
import { 
  FiSettings,
  FiUsers,
  FiMail,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi'
import { 
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
  FaFileExcel,
  FaChartBar,
  FaDatabase
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

const RightSidebar = () => {
  const { darkMode } = useContext(ThemeContext)
  const [expandedExpertise, setExpandedExpertise] = useState(null)

  const skills = [
    { icon: <FaFileExcel />, name: 'Excel', color: '#217346' },
    { icon: <SiMysql />, name: 'SQL', color: '#00758f' },
    { icon: <FaChartBar />, name: 'Power BI', color: '#f2c811' },
    { icon: <SiPython />, name: 'Python', color: '#3776ab' },
  ]

  const expertise = [
    { 
      id: 'data-analysis',
      title: 'Data Analysis', 
      icon: <FaChartBar />,
      color: '#3b82f6',
      skills: ['Python', 'SQL', 'Excel', 'Statistics']
    },
    { 
      id: 'visualization',
      title: 'Data Visualization', 
      icon: <FaChartBar />,
      color: '#8b5cf6',
      skills: ['Power BI', 'Tableau', 'Matplotlib', 'Seaborn']
    },
    { 
      id: 'database',
      title: 'Database Management', 
      icon: <FaDatabase />,
      color: '#f59e0b',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'ETL']
    },
    { 
      id: 'ml',
      title: 'Machine Learning', 
      icon: <FiSettings />,
      color: '#10b981',
      skills: ['Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy']
    },
  ]

  const socialLinks = [
    { icon: <FaFacebook />, url: '#', name: 'Facebook' },
    { icon: <FaEnvelope />, url: '#', name: 'Gmail' },
    { icon: <FaGithub />, url: '#', name: 'GitHub' },
    { icon: <FaLinkedin />, url: '#', name: 'LinkedIn' },
    { icon: <FaMedium />, url: '#', name: 'Medium' },
    { icon: <FaWhatsapp />, url: '#', name: 'WhatsApp' },
  ]

  const toggleExpertise = (id) => {
    setExpandedExpertise(expandedExpertise === id ? null : id)
  }

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
                <SkillIcon style={{ color: skill.color }}>
                  {skill.icon}
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
          <FiUsers />
          <h3>Expertise</h3>
        </div>
        <div className="expertise-list">
          {expertise.map((item) => (
            <div key={item.id} className="expertise-item">
              <button 
                className="expertise-header"
                onClick={() => toggleExpertise(item.id)}
              >
                <div className="expertise-title">
                  <span className="expertise-icon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </div>
                {expandedExpertise === item.id ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {expandedExpertise === item.id && (
                <div className="expertise-content">
                  <div className="expertise-skills">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="expertise-skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
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
          Let's build something great together — feel free to connect with me through any of the platforms above.
        </p>
      </section>
    </aside>
  )
}

export default RightSidebar
