import { useContext } from 'react'
import { ThemeContext } from '../../App'
import './Loading.css'

const Loading = ({ fullScreen = true, size = 'small', text = 'Loading...' }) => {
    const { darkMode } = useContext(ThemeContext)

    return (
        <div className={`loading-container ${fullScreen ? 'fullscreen' : ''} ${darkMode ? 'dark' : 'light'}`}>
            <div className={`loading-content ${size}`}>
                {/* Modern spinner with multiple rings */}
                <div className="spinner-wrapper">
                    <div className="spinner-ring outer"></div>
                    <div className="spinner-ring middle"></div>
                    <div className="spinner-ring inner"></div>
                    <div className="spinner-core">
                        <div className="pulse-dot"></div>
                    </div>
                </div>
                
                {/* Loading text with animated dots */}
                {text && (
                    <div className="loading-text">
                        <span>{text}</span>
                        <span className="loading-dots">
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Loading
