import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '../../App'
import Sidebar from '../Sidebar/Sidebar'
import RightSidebar from '../RightSidebar/RightSidebar'
import './Layout.css'

const Layout = ({ children }) => {
  const { darkMode } = useContext(ThemeContext)
  const location = useLocation()
  
  // Check if we're on the home page (show full layout) or under construction pages
  const isHomePage = location.pathname === '/'
  
  console.log('Layout is rendering, darkMode:', darkMode)

  return (
    <div className={`layout ${darkMode ? 'dark' : 'light'} ${!isHomePage ? 'construction-mode' : ''}`}>
      <Sidebar />
      <div className={`main-area ${!isHomePage ? 'full-width' : ''}`}>
        {children}
      </div>
      {isHomePage && <RightSidebar />}
    </div>
  )
}

export default Layout
