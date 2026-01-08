import { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import MainContent from './components/MainContent/MainContent'
import AboutMe from './components/AboutMe/AboutMe'
import Achievements from './components/Achievements/Achievements'
import Projects from './components/Projects/Projects'
import UnderConstruction from './components/UnderConstruction/UnderConstruction'
import Loading from './components/Loading/Loading'
import './App.css'

export const ThemeContext = createContext()

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [isAppLoading, setIsAppLoading] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
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
        <Loading fullScreen={true} size="large" text="Loading" />
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <div className={`app ${darkMode ? 'dark' : 'light'}`}>
          <Layout>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blogs" element={<UnderConstruction pageName="Blogs" />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ThemeContext.Provider>
  )
}

export default App
