import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
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
import ImageLoader from '../Loading/ImageLoader'

// Import assets
import profilePic from '../../assets/profile/profile.png'
import resumePdf from '../../assets/resume/Lance Adrian Acal - Data.pdf'

const Sidebar = ({ isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  const [isAnimating, setIsAnimating] = useState(false)
  const [switchingToLight, setSwitchingToLight] = useState(false)

  const handleThemeToggle = () => {
    setSwitchingToLight(darkMode) // If currently dark, we're switching to light
    setIsAnimating(true)
    setTimeout(() => {
      toggleDarkMode()
      setTimeout(() => {
        setIsAnimating(false)
      }, 400)
    }, 300)
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome />, path: '/' },
    { id: 'about', label: 'About', icon: <FiUser />, path: '/about' },
    { id: 'achievements', label: 'Achievements', icon: <FiAward />, path: '/achievements' },
    { id: 'projects', label: 'Projects', icon: <FiFolder />, path: '/projects' },
    { id: 'blogs', label: 'Blogs', icon: <FiFileText />, path: '/blogs' },
  ]

  const handleNavClick = () => {
    // Close sidebar on mobile when a nav item is clicked
    if (onClose) {
      onClose()
    }
  }



  return (
    <>
      <aside className={`sidebar ${darkMode ? 'dark' : 'light'} ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-image">
              <ImageLoader
                src={profilePic}
                alt="Lance Adrian D. Acal"
              />
            </div>
            <h2 className="profile-name">Lance Adrian D. Acal</h2>
            <p className="profile-title">Data Analyst / Scientist</p>

            <a href={resumePdf} download className="resume-btn">
              <FiDownload />
              <span>Resume</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
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
              onClick={handleThemeToggle}
              disabled={isAnimating}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>

          {/* Footer */}
          <div className="sidebar-footer">
            <p>© 2025 Lance Adrian Acal. All Rights Reserved.</p>
          </div>
        </div>
      </aside>

      {/* Theme Switch Animation Overlay - Outside aside to cover everything */}
      {
        isAnimating && (
          <div className={`theme-animation-overlay ${switchingToLight ? 'to-light' : 'to-dark'}`}>
            <div className="theme-spinner">
              <FiSun className="spinner-sun" />
              <FiMoon className="spinner-moon" />
            </div>
          </div>
        )
      }


    </>
  )
}

export default Sidebar
