import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '../../App'
import Sidebar from '../Sidebar/Sidebar'
import RightSidebar from '../RightSidebar/RightSidebar'
import { FiMenu, FiX } from 'react-icons/fi'
import './Layout.css'

const Layout = ({ children }) => {
  const { darkMode } = useContext(ThemeContext)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check if we're on pages with fixed app layout (sticky sidebar, no body scroll)
  // Include all main pages and their detail routes
  const useAppLayout = 
    location.pathname === '/' || 
    location.pathname === '/about' || 
    location.pathname === '/achievements' ||
    location.pathname.startsWith('/achievements/') ||
    location.pathname === '/projects' ||
    location.pathname.startsWith('/projects/') ||
    location.pathname === '/blogs' ||
    location.pathname.startsWith('/blogs/')

  // Check if we should show the right sidebar (only on Home and About, not on Blogs/Achievements)
  const showRightSidebar = location.pathname === '/' || location.pathname === '/about'

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  // Determine page-specific layout class
  const getLayoutClass = () => {
    if (location.pathname === '/about') return 'about-layout'
    if (location.pathname === '/blogs') return 'blogs-layout'
    if (location.pathname === '/achievements') return 'achievements-layout'
    return ''
  }

  return (
    <div className={`layout ${darkMode ? 'dark' : 'light'} ${!useAppLayout ? 'construction-mode' : ''} ${getLayoutClass()}`}>
      {/* Hamburger Menu Button - Mobile Only */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Overlay for mobile sidebar */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      ></div>

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Scrollable content wrapper for main + right sidebar */}
      <div className={`content-wrapper ${!showRightSidebar ? 'no-sidebar' : ''}`}>
        <div className={`main-area ${!showRightSidebar ? 'full-width' : ''}`}>
          {children}
          {/* Right sidebar content on mobile - shown after main content */}
          {showRightSidebar && (
            <div className="mobile-right-sidebar">
              <RightSidebar />
            </div>
          )}
        </div>

        {/* Desktop right sidebar */}
        {showRightSidebar && (
          <div className="desktop-right-sidebar">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  )
}

export default Layout
