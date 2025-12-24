import { useState, createContext } from 'react'
import Layout from './components/Layout/Layout'
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
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <Layout />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
