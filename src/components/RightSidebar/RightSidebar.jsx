import { useContext, useState } from 'react'
import { ThemeContext } from '../../App'
import { 
  FiSettings,
  FiUsers,
  FiMail,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi'
import { 
  FaJs, 
  FaPython, 
  FaReact, 
  FaDatabase,
  FaChartBar,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaWhatsapp,
  FaFacebook,
  FaEnvelope
} from 'react-icons/fa'
import { 
  SiTypescript
} from 'react-icons/si'
import './RightSidebar.css'

const RightSidebar = () => {
  const { darkMode } = useContext(ThemeContext)
  const [expandedExpertise, setExpandedExpertise] = useState(null)

  const skills = [
    { icon: <FaJs />, name: 'JavaScript', color: '#f7df1e' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178c6' },
    { icon: <FaPython />, name: 'Python', color: '#3776ab' },
    { icon: <FaReact />, name: 'React', color: '#61dafb' },
    { icon: <FaChartBar />, name: 'Power BI', color: '#f2c811' },
    { icon: <FaDatabase />, name: 'Tableau', color: '#e97627' },
    { icon: <FaDatabase />, name: 'MySQL', color: '#4479a1' },
    { icon: <FaDatabase />, name: 'PostgreSQL', color: '#336791' },
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
      <section className="skill-section">
        <div className="section-header">
          <FiSettings />
          <h3>Skill Set</h3>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-icon" 
              title={skill.name}
              style={{ color: skill.color }}
            >
              {skill.icon}
            </div>
          ))}
        </div>
      </section>

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
