import { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ThemeContext } from '../../App'
import {
    FiAward,
    FiCalendar,
    FiExternalLink,
    FiArrowLeft,
    FiClock
} from 'react-icons/fi'
import './CertificateDetail.css'
import ImageLoader from '../Loading/ImageLoader'
import { certificates } from '../../data/certificates'

const CertificateDetail = () => {
    const { darkMode } = useContext(ThemeContext)
    const { id } = useParams()
    const navigate = useNavigate()

    // Find the certificate by id
    const certificate = certificates.find(cert => cert.id === parseInt(id))

    // Get other certificates (excluding current one)
    const otherCertificates = certificates.filter(cert => cert.id !== parseInt(id))

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

    // Reset page index when certificate changes
    useEffect(() => {
        setCurrentPage(0)
    }, [id])

    // Calculate pagination
    const totalPagesCarousel = Math.ceil(otherCertificates.length / itemsPerView)
    const totalPagesSidebar = Math.ceil(otherCertificates.length / ITEMS_PER_PAGE_SIDEBAR)
    
    // Get visible items based on mode and current page
    const visibleCertificates = isCarouselMode 
        ? otherCertificates.slice(currentPage * itemsPerView, (currentPage + 1) * itemsPerView)
        : otherCertificates.slice(currentPage * ITEMS_PER_PAGE_SIDEBAR, (currentPage + 1) * ITEMS_PER_PAGE_SIDEBAR)

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    // Category colors
    const getCategoryColor = (category) => {
        const colors = {
            'Data Science': '#3b82f6',
            'Database': '#8b5cf6',
            'Visualization': '#10b981',
            'Programming': '#f59e0b',
            'Analytics': '#ec4899',
            'Tools': '#06b6d4',
            'Achievement': '#fbbf24'
        }
        return colors[category] || '#6b7280'
    }

    // If certificate not found
    if (!certificate) {
        return (
            <div className={`certificate-detail ${darkMode ? 'dark' : 'light'}`}>
                <div className="detail-not-found">
                    <FiAward />
                    <h2>Certificate Not Found</h2>
                    <p>The certificate you're looking for doesn't exist.</p>
                    <Link to="/achievements" className="back-btn">
                        <FiArrowLeft />
                        Back to Achievements
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={`certificate-detail ${darkMode ? 'dark' : 'light'}`}>
            {/* Back Button */}
            <div className="detail-header">
                <button className="back-btn" onClick={() => navigate('/achievements')}>
                    <FiArrowLeft />
                    <span>Back to Achievements</span>
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
                                {certificate.image ? (
                                    <ImageLoader 
                                        src={certificate.image} 
                                        alt={certificate.title} 
                                        className="detail-image"
                                    />
                                ) : (
                                    <div className="detail-placeholder">
                                        <FiAward />
                                        <span>Certificate Preview</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="detail-info-section">
                            <span
                                className="detail-category"
                                style={{ backgroundColor: getCategoryColor(certificate.category) }}
                            >
                                {certificate.category}
                            </span>
                            
                            <h1 className="detail-title">{certificate.title}</h1>
                            
                            <p className="detail-issuer">Issued by {certificate.issuer}</p>
                            
                            <p className="detail-date">
                                <FiCalendar /> {certificate.date}
                            </p>

                            {certificate.credentialId && (
                                <p className="detail-credential-id">
                                    <strong>Credential ID:</strong> {certificate.credentialId}
                                </p>
                            )}

                            {certificate.description && (
                                <div className="detail-description">
                                    <h3>Description</h3>
                                    <p>{certificate.description}</p>
                                </div>
                            )}

                            <div className="detail-skills">
                                <h3>Skills</h3>
                                <div className="skills-list">
                                    {certificate.skills.map((skill, i) => (
                                        <span key={i} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {certificate.credentialUrl && certificate.credentialUrl !== '#' && (
                                <a
                                    href={certificate.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="credential-link"
                                >
                                    <FiExternalLink />
                                    View Credential
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Other Certificates */}
                <aside className={`detail-sidebar ${isCarouselMode ? 'carousel-mode' : ''}`}>
                    <div className="sidebar-section">
                        <div className="sidebar-header">
                            <FiClock />
                            <h3>Other Certificates</h3>
                        </div>
                        <div className="sidebar-list-wrapper" ref={carouselRef}>
                            <div className="sidebar-list">
                                {visibleCertificates.map(cert => (
                                    <Link 
                                        key={cert.id} 
                                        to={`/achievements/${cert.id}`} 
                                        className="sidebar-item"
                                    >
                                        <div className="sidebar-item-image">
                                            {cert.image ? (
                                                <ImageLoader 
                                                    src={cert.image} 
                                                    alt={cert.title}
                                                />
                                            ) : (
                                                <div className="sidebar-item-placeholder">
                                                    <FiAward />
                                                </div>
                                            )}
                                        </div>
                                        <div className="sidebar-item-info">
                                            {isCarouselMode && cert.category && (
                                                <span 
                                                    className="sidebar-item-category"
                                                    style={{ backgroundColor: getCategoryColor(cert.category) }}
                                                >
                                                    {cert.category}
                                                </span>
                                            )}
                                            <span className="sidebar-item-date">
                                                <FiCalendar /> {cert.date}
                                            </span>
                                            <span className="sidebar-item-title">{cert.title}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
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

export default CertificateDetail
