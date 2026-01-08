import { useContext } from 'react'
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

    // Find previous and next projects
    const currentIndex = projects.findIndex(p => p.id === parseInt(id))
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

    // Get other projects (excluding current one)
    const otherProjects = projects
        .filter(p => p.id !== parseInt(id))
        .slice(0, 6) // Show max 6 other projects

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

                    {/* Navigation */}
                    <div className="detail-navigation">
                        {prevProject ? (
                            <Link to={`/projects/${prevProject.id}`} className="nav-link prev">
                                <FiChevronLeft />
                                <div className="nav-info">
                                    <span className="nav-label">Previous</span>
                                    <span className="nav-title">{prevProject.title}</span>
                                </div>
                            </Link>
                        ) : (
                            <div className="nav-link disabled"></div>
                        )}
                        
                        {nextProject ? (
                            <Link to={`/projects/${nextProject.id}`} className="nav-link next">
                                <div className="nav-info">
                                    <span className="nav-label">Next</span>
                                    <span className="nav-title">{nextProject.title}</span>
                                </div>
                                <FiChevronRight />
                            </Link>
                        ) : (
                            <div className="nav-link disabled"></div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Other Projects */}
                <aside className="detail-sidebar">
                    <div className="sidebar-section">
                        <div className="sidebar-header">
                            <FiClock />
                            <h3>Other Projects</h3>
                        </div>
                        <div className="sidebar-list">
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
                </aside>
            </div>
        </div>
    )
}

export default ProjectDetail
