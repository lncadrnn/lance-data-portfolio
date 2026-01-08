import { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ThemeContext } from '../../App'
import {
    FiFolder,
    FiCalendar,
    FiExternalLink,
    FiGithub,
    FiArrowLeft,
    FiClock,
    FiChevronLeft,
    FiChevronRight
} from 'react-icons/fi'
import './ProjectDetail.css'
import ImageLoader from '../Loading/ImageLoader'
import Loading from '../Loading/Loading'
import { projects } from '../../data/projects'

const ProjectDetail = () => {
    const { darkMode } = useContext(ThemeContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    // Find the project by id
    const project = projects.find(p => p.id === parseInt(id))

    // Get other projects (excluding current one) - limit to 6
    const otherProjects = projects.filter(p => p.id !== parseInt(id)).slice(0, 6)

    // Pagination/Carousel state
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerView, setItemsPerView] = useState(3)
    const [isCarouselMode, setIsCarouselMode] = useState(false)
    const carouselRef = useRef(null)
    const ITEMS_PER_PAGE_SIDEBAR = 6

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

    // Reset page index when project changes
    useEffect(() => {
        setCurrentPage(0)
        // Show loading briefly when switching projects
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [id, isLoading])

    // Handle click on other project
    const handleProjectClick = (projectId) => {
        // Show loading first (user stays where they are)
        setIsLoading(true)
        // After loading is visible, scroll to top and navigate
        setTimeout(() => {
            const contentWrapper = document.querySelector('.content-wrapper')
            if (contentWrapper) {
                contentWrapper.scrollTo({ top: 0, behavior: 'instant' })
            }
            // Navigate after scrolling
            navigate(`/projects/${projectId}`)
        }, 500)
    }

    // Calculate pagination
    const totalPagesCarousel = Math.ceil(otherProjects.length / itemsPerView)
    const totalPagesSidebar = Math.ceil(otherProjects.length / ITEMS_PER_PAGE_SIDEBAR)
    
    // Get visible items based on mode and current page
    const visibleProjects = isCarouselMode 
        ? otherProjects.slice(currentPage * itemsPerView, (currentPage + 1) * itemsPerView)
        : otherProjects.slice(currentPage * ITEMS_PER_PAGE_SIDEBAR, (currentPage + 1) * ITEMS_PER_PAGE_SIDEBAR)

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handlePrevPage = () => {
        const totalPages = isCarouselMode ? totalPagesCarousel : totalPagesSidebar
        setCurrentPage((prev) => Math.max(prev - 1, 0))
    }

    const handleNextPage = () => {
        const totalPages = isCarouselMode ? totalPagesCarousel : totalPagesSidebar
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
    }

    // Category colors
    const getCategoryColor = (category) => {
        const colors = {
            'Data Science': '#3b82f6',
            'Analytics': '#ec4899',
            'Dashboard': '#10b981',
            'Tools': '#f59e0b',
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
            {/* Loading Overlay */}
            {isLoading && <Loading fullScreen={false} size="medium" text="Loading project" />}
            
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
                            
                            {/* Additional Images */}
                            {project.additionalImages && project.additionalImages.length > 0 && (
                                <div className="additional-images">
                                    {project.additionalImages.map((imgSrc, idx) => (
                                        <div key={idx} className="detail-image-container">
                                            <ImageLoader 
                                                src={imgSrc} 
                                                alt={`${project.title} - Version ${idx + 2}`} 
                                                className="detail-image"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                    <div className="description-content">
                                        {project.description.split('\n').map((line, idx) => {
                                            const trimmedLine = line.trim();
                                            
                                            // Skip empty lines
                                            if (!trimmedLine) {
                                                return <br key={idx} />
                                            }
                                            
                                            // Handle bold titles (lines that are only bold)
                                            if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && !trimmedLine.includes(':')) {
                                                return <strong key={idx}>{trimmedLine.replace(/\*\*/g, '')}</strong>
                                            }
                                            
                                            // Handle bullet points
                                            if (trimmedLine.startsWith('- ')) {
                                                const bulletContent = trimmedLine.replace(/^- /, '');
                                                // Parse bold text within bullet point
                                                const parts = bulletContent.split(/(\*\*[^*]+\*\*)/);
                                                return (
                                                    <li key={idx}>
                                                        {parts.map((part, i) => 
                                                            part.startsWith('**') 
                                                                ? <strong key={i}>{part.replace(/\*\*/g, '')}</strong>
                                                                : part
                                                        )}
                                                    </li>
                                                );
                                            }
                                            
                                            // Regular text with possible bold formatting
                                            const parts = trimmedLine.split(/(\*\*[^*]+\*\*)/);
                                            return (
                                                <p key={idx}>
                                                    {parts.map((part, i) => 
                                                        part.startsWith('**') 
                                                            ? <strong key={i}>{part.replace(/\*\*/g, '')}</strong>
                                                            : part
                                                    )}
                                                </p>
                                            );
                                        })}
                                    </div>
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
                            <Link to="/projects" className="view-all-link">
                                View All
                            </Link>
                        </div>
                        <div className="sidebar-list-wrapper" ref={carouselRef}>
                            {isCarouselMode && totalPagesCarousel > 1 && (
                                <button
                                    className={`carousel-arrow prev ${currentPage === 0 ? 'hidden' : ''}`}
                                    onClick={handlePrevPage}
                                    aria-label="Previous page"
                                >
                                    <FiChevronLeft />
                                </button>
                            )}
                            <div className="sidebar-list">
                                {visibleProjects.map(proj => (
                                    <div 
                                        key={proj.id} 
                                        className="sidebar-item"
                                        onClick={() => handleProjectClick(proj.id)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(proj.id)}
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
                                            {isCarouselMode && proj.category && (
                                                <span 
                                                    className="sidebar-item-category"
                                                    style={{ backgroundColor: getCategoryColor(proj.category) }}
                                                >
                                                    {proj.category}
                                                </span>
                                            )}
                                            <span className="sidebar-item-date">
                                                <FiCalendar /> {proj.date}
                                            </span>
                                            <span className="sidebar-item-title">{proj.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {isCarouselMode && totalPagesCarousel > 1 && (
                                <button
                                    className={`carousel-arrow next ${currentPage === totalPagesCarousel - 1 ? 'hidden' : ''}`}
                                    onClick={handleNextPage}
                                    aria-label="Next page"
                                >
                                    <FiChevronRight />
                                </button>
                            )}
                        </div>
                        {/* Pagination Dots */}
                        {isCarouselMode && totalPagesCarousel > 1 && (
                            <div className="carousel-pagination">
                                {Array.from({ length: totalPagesCarousel }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`pagination-dot ${currentPage === i ? 'active' : ''}`}
                                        onClick={() => handlePageChange(i)}
                                        aria-label={`Go to page ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                        {/* Sidebar Pagination */}
                        {!isCarouselMode && totalPagesSidebar > 1 && (
                            <div className="sidebar-pagination">
                                {Array.from({ length: totalPagesSidebar }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`pagination-dot ${currentPage === i ? 'active' : ''}`}
                                        onClick={() => handlePageChange(i)}
                                        aria-label={`Go to page ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default ProjectDetail
