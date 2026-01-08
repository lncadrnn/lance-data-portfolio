import { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ThemeContext } from '../../App'
import {
    FiFolder,
    FiCalendar,
    FiExternalLink,
    FiGithub,
    FiArrowLeft,
    FiChevronLeft,
    FiChevronRight,
    FiClock
} from 'react-icons/fi'
import './ProjectDetail.css'
import ImageLoader from '../Loading/ImageLoader'
import { projects } from '../../data/projects'

const ProjectDetail = () => {
    const { darkMode } = useContext(ThemeContext)
    const { id } = useParams()
    const navigate = useNavigate()

    // Find the project by id
    const project = projects.find(p => p.id === parseInt(id))

    // Get other projects (excluding current one)
    const otherProjects = projects.filter(p => p.id !== parseInt(id))

    // Carousel state
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [itemsPerView, setItemsPerView] = useState(3)
    const [isCarouselMode, setIsCarouselMode] = useState(false)
    const carouselRef = useRef(null)

    // Update items per view and carousel mode based on screen size
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width >= 1550) {
                setIsCarouselMode(true)
                setItemsPerView(3)
            } else if (width <= 1100 && width > 600) {
                setIsCarouselMode(true)
                setItemsPerView(2)
            } else if (width <= 600) {
                setIsCarouselMode(true)
                setItemsPerView(1)
            } else {
                setIsCarouselMode(false)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Reset carousel index when project changes
    useEffect(() => {
        setCarouselIndex(0)
    }, [id])

    const maxCarouselIndex = Math.max(0, otherProjects.length - itemsPerView)

    const handlePrevCarousel = () => {
        setCarouselIndex(prev => Math.max(0, prev - 1))
    }

    const handleNextCarousel = () => {
        setCarouselIndex(prev => Math.min(maxCarouselIndex, prev + 1))
    }

    // Category colors
    const getCategoryColor = (category) => {
        const colors = {
            'Data Science': '#3b82f6',
            'Analytics': '#ec4899',
            'Visualization': '#10b981',
            'Programming': '#f59e0b',
            'Machine Learning': '#8b5cf6'
        }
        return colors[category] || '#6b7280'
    }

    // If project not found
    if (!project) {
        return (
            <div className={`project-detail ${darkMode ? 'dark' : 'light'}`}>
                <div className="detail-not-found">
                    <FiFolder />
                    <h2>Project Not Found</h2>
                    <p>The project you're looking for doesn't exist.</p>
                    <Link to="/projects" className="back-btn">
                        <FiArrowLeft />
                        Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={`project-detail ${darkMode ? 'dark' : 'light'}`}>
            {/* Back Button */}
            <div className="detail-header">
                <button className="back-btn" onClick={() => navigate('/projects')}>
                    <FiArrowLeft />
                    <span>Back to Projects</span>
                </button>
            </div>

            {/* Main Layout with Sidebar */}
            <div className="detail-layout">
                {/* Main Content */}
                <div className="detail-main">
                    <div className="detail-content">
                        {/* Image Section */}
                        <div className="detail-image-section">
                            <div className="detail-image-container">
                                {project.image ? (
                                    <ImageLoader 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="detail-image"
                                    />
                                ) : (
                                    <div className="detail-placeholder">
                                        <FiFolder />
                                        <span>Project Preview</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="detail-info-section">
                            <span
                                className="detail-category"
                                style={{ backgroundColor: getCategoryColor(project.category) }}
                            >
                                {project.category}
                            </span>
                            
                            <h1 className="detail-title">{project.title}</h1>
                            
                            <p className="detail-date">
                                <FiCalendar /> {project.date}
                            </p>

                            {project.description && (
                                <div className="detail-description">
                                    <h3>Description</h3>
                                    <p>{project.description}</p>
                                </div>
                            )}

                            <div className="detail-technologies">
                                <h3>Technologies</h3>
                                <div className="technologies-list">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-links">
                                {project.githubUrl && project.githubUrl !== '#' && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link github-link"
                                    >
                                        <FiGithub />
                                        View on GitHub
                                    </a>
                                )}
                                {project.liveUrl && project.liveUrl !== '#' && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link live-link"
                                    >
                                        <FiExternalLink />
                                        View Live
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Other Projects */}
                <aside className={`detail-sidebar ${isCarouselMode ? 'carousel-mode' : ''}`}>
                    <div className="sidebar-section">
                        <div className="sidebar-header">
                            <FiClock />
                            <h3>Other Projects</h3>
                            {isCarouselMode && otherProjects.length > itemsPerView && (
                                <div className="carousel-controls">
                                    <button 
                                        className="carousel-btn" 
                                        onClick={handlePrevCarousel}
                                        disabled={carouselIndex === 0}
                                    >
                                        <FiChevronLeft />
                                    </button>
                                    <button 
                                        className="carousel-btn" 
                                        onClick={handleNextCarousel}
                                        disabled={carouselIndex >= maxCarouselIndex}
                                    >
                                        <FiChevronRight />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="sidebar-list-wrapper" ref={carouselRef}>
                            <div 
                                className="sidebar-list"
                                style={isCarouselMode ? {
                                    transform: `translateX(-${carouselIndex * (100 / itemsPerView)}%)`,
                                    transition: 'transform 0.3s ease'
                                } : {}}
                            >
                                {otherProjects.map(proj => (
                                    <Link 
                                        key={proj.id} 
                                        to={`/projects/${proj.id}`} 
                                        className="sidebar-item"
                                    >
                                        <div className="sidebar-item-image">
                                            {proj.image ? (
                                                <ImageLoader 
                                                    src={proj.image} 
                                                    alt={proj.title}
                                                />
                                            ) : (
                                                <div className="sidebar-item-placeholder">
                                                    <FiFolder />
                                                </div>
                                            )}
                                        </div>
                                        <div className="sidebar-item-info">
                                            <span className="sidebar-item-date">
                                                <FiCalendar /> {proj.date}
                                            </span>
                                            <span className="sidebar-item-title">{proj.title}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default ProjectDetail
