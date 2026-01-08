import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../../App'
import {
    FiFolder,
    FiCalendar,
    FiExternalLink,
    FiGithub,
    FiX,
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight,
    FiGrid,
    FiList,
    FiArrowUp,
    FiArrowDown
} from 'react-icons/fi'
import './Projects.css'

import { projects } from '../../data/projects'

const Projects = () => {
    const { darkMode } = useContext(ThemeContext)
    const [selectedProject, setSelectedProject] = useState(null)
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [activeFilter, setActiveFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('newest') // 'oldest' or 'newest'
    const [currentPage, setCurrentPage] = useState(1)
    const projectsPerPage = 12

    // Reset to first page when filter or sort changes
    useEffect(() => {
        setCurrentPage(1)
    }, [activeFilter, sortOrder])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [selectedProject])

    // Define categories for filter
    const categories = [
        'all',
        'Data Science',
        'Analytics',
        'Visualization',
        'Programming',
        'Machine Learning'
    ]

    // Filter projects based on active filter
    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter)

    // Sort projects based on sortOrder
    const sortedProjects = [...filteredProjects].sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA
    })

    // Pagination logic
    const totalPages = Math.ceil(sortedProjects.length / projectsPerPage)
    const indexOfLastProject = currentPage * projectsPerPage
    const indexOfFirstProject = indexOfLastProject - projectsPerPage
    const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject)

    const goToPage = (page) => {
        setCurrentPage(page)
    }

    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
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

    // Navigate projects in modal
    const navigateProject = (direction) => {
        if (!selectedProject) return
        const currentIndex = sortedProjects.findIndex(p => p.id === selectedProject.id)
        let newIndex
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % sortedProjects.length
        } else {
            newIndex = (currentIndex - 1 + sortedProjects.length) % sortedProjects.length
        }
        setSelectedProject(sortedProjects[newIndex])
    }

    return (
        <div className={`projects-page ${darkMode ? 'dark' : 'light'}`}>
            {/* Header Section */}
            <section className="projects-header">
                <div className="projects-title-row">
                    <div className="section-header">
                        <FiFolder className="section-icon" />
                        <h1>Projects</h1>
                    </div>
                    <div className="projects-stats">
                        <div className="stat-badge">
                            <FiFolder />
                            <span>{projects.length} Projects</span>
                        </div>
                    </div>
                </div>
                <p className="projects-subtitle">
                    A showcase of data analytics, visualization, and programming projects demonstrating practical skills and problem-solving abilities.
                </p>
            </section>

            {/* Controls Section - Only show if there are projects */}
            {projects.length > 0 && (
                <section className="projects-controls">
                    <div className="filter-tabs">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category)}
                            >
                                {category === 'all' ? 'All' : category}
                            </button>
                        ))}
                    </div>
                    <div className="view-toggle">
                        <button
                            className="view-btn sort-btn"
                            onClick={() => setSortOrder(prev => prev === 'oldest' ? 'newest' : 'oldest')}
                            aria-label={`Sort by date: ${sortOrder === 'oldest' ? 'Oldest first' : 'Newest first'}`}
                            title={`Sort: ${sortOrder === 'oldest' ? 'Oldest to Newest' : 'Newest to Oldest'}`}
                        >
                            {sortOrder === 'oldest' ? <FiArrowUp /> : <FiArrowDown />}
                        </button>
                        <div className="divider"></div>
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            aria-label="Grid view"
                        >
                            <FiGrid />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            aria-label="List view"
                        >
                            <FiList />
                        </button>
                    </div>
                </section>
            )}

            {/* Projects Grid/List */}
            <section className="projects-section">
                <div className={`projects-container ${viewMode}`}>
                    {currentProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card"
                            onClick={() => setSelectedProject(project)}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="project-image-container">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="project-image" />
                                ) : (
                                    <div className="project-placeholder">
                                        <FiFolder />
                                        <span>Project</span>
                                    </div>
                                )}
                                <div className="project-overlay">
                                    <span className="view-text">View Project</span>
                                </div>
                            </div>
                            <div className="project-content">
                                <span
                                    className="project-category"
                                    style={{ backgroundColor: `${getCategoryColor(project.category)}20`, color: getCategoryColor(project.category) }}
                                >
                                    {project.category}
                                </span>
                                <h3 className="project-title">{project.title}</h3>
                                {viewMode === 'list' && project.description && (
                                    <p className="project-description">{project.description}</p>
                                )}
                                <div className="project-meta">
                                    <span className="project-date">
                                        <FiCalendar />
                                        {project.date}
                                    </span>
                                </div>
                                {viewMode === 'list' && (
                                    <div className="project-technologies">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="project-tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {sortedProjects.length > projectsPerPage && (
                    <div className="pagination-container">
                        <button
                            className="pagination-btn nav-btn"
                            onClick={() => goToPage(1)}
                            disabled={currentPage === 1}
                            aria-label="First page"
                            title="First page"
                        >
                            <FiChevronsLeft />
                        </button>
                        <button
                            className="pagination-btn nav-btn"
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            title="Previous page"
                        >
                            <FiChevronLeft />
                        </button>
                        <div className="pagination-pages">
                            {/* First page */}
                            <button
                                className={`pagination-btn page-btn ${currentPage === 1 ? 'active' : ''}`}
                                onClick={() => goToPage(1)}
                            >
                                1
                            </button>
                            
                            {/* Ellipsis after first page */}
                            {currentPage > 3 && totalPages > 4 && (
                                <span className="pagination-ellipsis">...</span>
                            )}
                            
                            {/* Middle pages */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page => {
                                    if (page === 1 || page === totalPages) return false
                                    if (totalPages <= 4) return true
                                    return page >= currentPage - 1 && page <= currentPage + 1
                                })
                                .map(page => (
                                    <button
                                        key={page}
                                        className={`pagination-btn page-btn ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => goToPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            
                            {/* Ellipsis before last page */}
                            {currentPage < totalPages - 2 && totalPages > 4 && (
                                <span className="pagination-ellipsis">...</span>
                            )}
                            
                            {/* Last page */}
                            {totalPages > 1 && (
                                <button
                                    className={`pagination-btn page-btn ${currentPage === totalPages ? 'active' : ''}`}
                                    onClick={() => goToPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            )}
                        </div>
                        <button
                            className="pagination-btn nav-btn"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                            title="Next page"
                        >
                            <FiChevronRight />
                        </button>
                        <button
                            className="pagination-btn nav-btn"
                            onClick={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
                            aria-label="Last page"
                            title="Last page"
                        >
                            <FiChevronsRight />
                        </button>
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="empty-projects">
                        <div className="empty-icon">
                            <FiFolder />
                        </div>
                        <h3>No Projects Yet</h3>
                        <p>Projects will be displayed here once added.</p>
                        <span className="coming-soon-badge">Coming Soon</span>
                    </div>
                ) : sortedProjects.length === 0 ? (
                    <div className="no-projects">
                        <FiFolder />
                        <p>No projects found in this category.</p>
                    </div>
                ) : null}
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProject(null)}>
                            <FiX />
                        </button>

                        <button className="modal-nav prev" onClick={() => navigateProject('prev')}>
                            <FiChevronLeft />
                        </button>
                        <button className="modal-nav next" onClick={() => navigateProject('next')}>
                            <FiChevronRight />
                        </button>

                        <div className="modal-content">
                            <div className="modal-image-container">
                                {selectedProject.image ? (
                                    <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
                                ) : (
                                    <div className="modal-placeholder">
                                        <FiFolder />
                                        <span>Project Preview</span>
                                    </div>
                                )}
                            </div>
                            <div className="modal-details">
                                <span
                                    className="modal-category"
                                    style={{ backgroundColor: getCategoryColor(selectedProject.category) }}
                                >
                                    {selectedProject.category}
                                </span>
                                <h2 className="modal-title">{selectedProject.title}</h2>
                                <p className="modal-date">
                                    <FiCalendar /> {selectedProject.date}
                                </p>
                                {selectedProject.description && (
                                    <p className="modal-description">{selectedProject.description}</p>
                                )}
                                <div className="modal-technologies">
                                    <h4>Technologies</h4>
                                    <div className="technologies-list">
                                        {selectedProject.technologies.map((tech, i) => (
                                            <span key={i} className="project-tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="modal-links">
                                    {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link github-link"
                                        >
                                            <FiGithub />
                                            View on GitHub
                                        </a>
                                    )}
                                    {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                                        <a
                                            href={selectedProject.liveUrl}
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
                </div>
            )}
        </div>
    )
}

export default Projects
