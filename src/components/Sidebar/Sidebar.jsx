import { useContext, useState } from 'react'
import { ThemeContext } from '../../App'
import { 
  FiHome, 
  FiUser, 
  FiAward, 
  FiFolder, 
  FiFileText,
  FiDownload,
  FiMoon,
  FiSun
} from 'react-icons/fi'
import './Sidebar.css'

const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  const [activeNav, setActiveNav] = useState('home')

  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome /> },
    { id: 'about', label: 'About', icon: <FiUser /> },
    { id: 'achievements', label: 'Achievements', icon: <FiAward /> },
    { id: 'projects', label: 'Projects', icon: <FiFolder /> },
    { id: 'blogs', label: 'Blogs', icon: <FiFileText /> },
  ]

  return (
    <aside className={`sidebar ${darkMode ? 'dark' : 'light'}`}>
      <div className="sidebar-content">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-image">
            <img 
              src="/profile-placeholder.jpg" 
              alt="Profile" 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100x100/1a1a2e/ffffff?text=Photo'
              }}
            />
          </div>
          <h2 className="profile-name">Your Name Here</h2>
          <p className="profile-title">Data Analyst / Scientist</p>
          
          <button className="resume-btn">
            <FiDownload />
            <span>Resume</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="theme-toggle">
          <div className="toggle-label">
            {darkMode ? <FiMoon /> : <FiSun />}
            <span>Dark Mode</span>
          </div>
          <button 
            className={`toggle-switch ${darkMode ? 'active' : ''}`}
            onClick={toggleDarkMode}
          >
            <span className="toggle-slider"></span>
          </button>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <p>Designed & Built by Your Name</p>
          <p>© 2025, All rights reserved.</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
