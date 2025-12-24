import { useContext } from 'react'
import { ThemeContext } from '../../App'
import { FiTool, FiClock } from 'react-icons/fi'
import './UnderConstruction.css'

const UnderConstruction = ({ pageName }) => {
  const { darkMode } = useContext(ThemeContext)

  return (
    <div className={`under-construction ${darkMode ? 'dark' : 'light'}`}>
      <div className="construction-content">
        <div className="construction-icon">
          <FiTool />
        </div>
        <h1>🚧 Under Construction 🚧</h1>
        <h2>{pageName}</h2>
        <p>This page is currently being built.</p>
        <p>Please check back soon!</p>
        <div className="coming-soon">
          <FiClock />
          <span>Coming Soon</span>
        </div>
      </div>
    </div>
  )
}

export default UnderConstruction
