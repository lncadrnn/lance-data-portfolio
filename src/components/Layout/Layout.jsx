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
  
  // Check if we're on pages with full layout (home and about) or under construction pages
  const isFullLayoutPage = location.pathname === '/' || location.pathname === '/about'
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className={`layout ${darkMode ? 'dark' : 'light'} ${!isFullLayoutPage ? 'construction-mode' : ''}`}>
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
      <div className="content-wrapper">
        <div className={`main-area ${!isFullLayoutPage ? 'full-width' : ''}`}>
          {children}
          {/* Right sidebar content on mobile - shown after main content */}
          {isFullLayoutPage && (
            <div className="mobile-right-sidebar">
              <RightSidebar />
            </div>
          )}
        </div>
        
        {/* Desktop right sidebar */}
        {isFullLayoutPage && (
          <div className="desktop-right-sidebar">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  )
}

export default Layout
