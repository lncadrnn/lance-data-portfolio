import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import MainContent from './components/MainContent/MainContent'
import AboutMe from './components/AboutMe/AboutMe'
import UnderConstruction from './components/UnderConstruction/UnderConstruction'
import './App.css'

export const ThemeContext = createContext()

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  console.log('App is rendering')

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <div className={`app ${darkMode ? 'dark' : 'light'}`}>
          <Layout>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/achievements" element={<UnderConstruction pageName="Achievements" />} />
              <Route path="/projects" element={<UnderConstruction pageName="Projects" />} />
              <Route path="/blogs" element={<UnderConstruction pageName="Blogs" />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ThemeContext.Provider>
  )
}

export default App
