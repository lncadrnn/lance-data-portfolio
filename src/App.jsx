import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import MainContent from './components/MainContent/MainContent'
import AboutMe from './components/AboutMe/AboutMe'
import Achievements from './components/Achievements/Achievements'
import CertificateDetail from './components/CertificateDetail/CertificateDetail'
import Projects from './components/Projects/Projects'
import ProjectDetail from './components/ProjectDetail/ProjectDetail'
import Blogs from './components/Blogs/Blogs'
import BlogDetail from './components/BlogDetail/BlogDetail'
import UnderConstruction from './components/UnderConstruction/UnderConstruction'
import Loading from './components/Loading/Loading'
import './App.css'

export const ThemeContext = createContext()
export const NavigationContext = createContext()

// Get initial theme from localStorage or default to dark
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('darkMode')
  if (savedTheme !== null) {
    return savedTheme === 'true'
  }
  return true // Default to dark mode
}

// Inner component to handle route changes with loading
const AppRoutes = ({ darkMode }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showLoading, setShowLoading] = useState(false)

  const handleNavigate = (path) => {
    // Scroll to top
    const contentWrapper = document.querySelector('.content-wrapper')
    if (contentWrapper) {
      contentWrapper.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Show loading first
    setShowLoading(true)

    // Navigate after showing loading
    setTimeout(() => {
      navigate(path)
      setTimeout(() => {
        setShowLoading(false)
      }, 500)
    }, 100)
  }

  return (
    <NavigationContext.Provider value={{ handleNavigate }}>
      {showLoading && <Loading fullScreen={true} size="small" />}
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <Layout>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/achievements/:id" element={<CertificateDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </Layout>
      </div>
    </NavigationContext.Provider>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme)
  const [isAppLoading, setIsAppLoading] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('darkMode', newValue.toString())
      return newValue
    })
  }

  // Initial app loading - wait for critical resources
  useEffect(() => {
    const handleLoad = () => {
      // Add a small delay for smoother transition
      setTimeout(() => {
        setIsAppLoading(false)
      }, 800)
    }

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  console.log('App is rendering')

  // Show loading screen while app initializes
  if (isAppLoading) {
    return (
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <Loading fullScreen={true} size="small" text="Loading" />
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <AppRoutes darkMode={darkMode} />
      </Router>
    </ThemeContext.Provider>
  )
}

export default App
