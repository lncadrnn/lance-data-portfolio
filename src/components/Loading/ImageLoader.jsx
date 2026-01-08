import { useState, useContext } from 'react'
import { ThemeContext } from '../../App'
import './ImageLoader.css'

const ImageLoader = ({ 
    src, 
    alt, 
    className = '', 
    style = {},
    placeholder = null 
}) => {
    const { darkMode } = useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    return (
        <div className={`image-loader-wrapper ${darkMode ? 'dark' : 'light'}`}>
            {/* Loading skeleton */}
            {isLoading && (
                <div className="image-skeleton">
                    <div className="skeleton-shimmer"></div>
                    <div className="skeleton-spinner">
                        <div className="mini-spinner"></div>
                    </div>
                </div>
            )}
            
            {/* Error placeholder */}
            {hasError && !isLoading && (
                <div className="image-error">
                    {placeholder || (
                        <>
                            <svg 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5"
                                className="error-icon"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                            </svg>
                            <span>Failed to load</span>
                        </>
                    )}
                </div>
            )}
            
            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                className={`loaded-image ${className} ${isLoading ? 'loading' : 'loaded'} ${hasError ? 'hidden' : ''}`}
                style={style}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    )
}

export default ImageLoader
