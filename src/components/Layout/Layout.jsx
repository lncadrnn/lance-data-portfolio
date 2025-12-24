import { useContext } from 'react'
import { ThemeContext } from '../../App'
import Sidebar from '../Sidebar/Sidebar'
import MainContent from '../MainContent/MainContent'
import RightSidebar from '../RightSidebar/RightSidebar'
import './Layout.css'

const Layout = () => {
  const { darkMode } = useContext(ThemeContext)
  
  console.log('Layout is rendering, darkMode:', darkMode)

  return (
    <div className={`layout ${darkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <MainContent />
      <RightSidebar />
    </div>
  )
}

export default Layout
