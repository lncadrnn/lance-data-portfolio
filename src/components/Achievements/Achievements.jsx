import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../App'
import {
    FiAward,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight,
    FiGrid,
    FiList,
    FiArrowUp,
    FiArrowDown
} from 'react-icons/fi'
import './Achievements.css'
import ImageLoader from '../Loading/ImageLoader'
import Loading from '../Loading/Loading'

import { certificates } from '../../data/certificates'

const Achievements = () => {
    const { darkMode } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [activeFilter, setActiveFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('newest') // 'oldest' or 'newest'
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const certificatesPerPage = 12

    // Reset to first page when filter or sort changes
    useEffect(() => {
        setCurrentPage(1)
    }, [activeFilter, sortOrder])



    // Define categories for filter
    const categories = [
        'all',
        'Data Science',
        'Analytics',
        'Programming',
        'Visualization',
        'Tools',
        'Achievement'
    ]

    // Filter certificates based on active filter
    const filteredCertificates = activeFilter === 'all'
        ? certificates
        : certificates.filter(cert => cert.category === activeFilter)

    // Sort certificates based on sortOrder
    const sortedCertificates = [...filteredCertificates].sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA
    })

    // Pagination logic
    const totalPages = Math.ceil(sortedCertificates.length / certificatesPerPage)
    const indexOfLastCert = currentPage * certificatesPerPage
    const indexOfFirstCert = indexOfLastCert - certificatesPerPage
    const currentCertificates = sortedCertificates.slice(indexOfFirstCert, indexOfLastCert)

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
            'Database': '#8b5cf6',
            'Visualization': '#10b981',
            'Programming': '#f59e0b',
            'Analytics': '#ec4899',
            'Tools': '#06b6d4',
            'Achievement': '#fbbf24'
        }
        return colors[category] || '#6b7280'
    }

    // Navigate to certificate detail page
    const handleCertClick = (certId) => {
        setIsLoading(true)
        const contentWrapper = document.querySelector('.content-wrapper')
        if (contentWrapper) {
            contentWrapper.scrollTo({ top: 0, behavior: 'smooth' })
        }
        setTimeout(() => {
            navigate(`/achievements/${certId}`)
        }, 500)
    }

    return (
        <div className={`achievements ${darkMode ? 'dark' : 'light'}`}>
            {isLoading && <Loading size="medium" />}
            {/* Header Section */}
            <section className="achievements-header">
                <div className="achievements-title-row">
                    <div className="section-header">
                        <FiAward className="section-icon" />
                        <h1>Achievements & Certifications</h1>
                    </div>
                    <div className="achievements-stats">
                        <div className="stat-badge">
                            <FiAward />
                            <span>{certificates.length} Certificates</span>
                        </div>
                    </div>
                </div>
                <p className="achievements-subtitle">
                    A collection of Certifications and Achievements earned throughout my Data Analytics and Data Science Journey.
                </p>
            </section>

            {/* Controls Section - Only show if there are certificates */}
            {certificates.length > 0 && (
                <section className="achievements-controls">
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

            {/* Certificates Grid/List */}
            <section className="certificates-section">
                <div className={`certificates-container ${viewMode}`}>
                    {currentCertificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="certificate-card"
                            onClick={() => handleCertClick(cert.id)}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="cert-image-container">
                                {cert.image ? (
                                    <ImageLoader 
                                        src={cert.image} 
                                        alt={cert.title} 
                                        className="cert-image"
                                    />
                                ) : (
                                    <div className="cert-placeholder">
                                        <FiAward />
                                        <span>Certificate</span>
                                    </div>
                                )}
                                <div className="cert-overlay">
                                    <span className="view-text">View Certificate</span>
                                </div>
                            </div>
                            <div className="cert-content">
                                <span
                                    className="cert-category"
                                    style={{ backgroundColor: `${getCategoryColor(cert.category)}20`, color: getCategoryColor(cert.category) }}
                                >
                                    {cert.category}
                                </span>
                                <h3 className="cert-title">{cert.title}</h3>
                                <p className="cert-issuer">{cert.issuer}</p>
                                {viewMode === 'list' && cert.description && (
                                    <p className="cert-description">{cert.description}</p>
                                )}
                                <div className="cert-meta">
                                    <span className="cert-date">
                                        <FiCalendar />
                                        {cert.date}
                                    </span>
                                </div>
                                {viewMode === 'list' && (
                                    <div className="cert-skills">
                                        {cert.skills.map((skill, i) => (
                                            <span key={i} className="achievement-skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {sortedCertificates.length > certificatesPerPage && (
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

                {certificates.length === 0 ? (
                    <div className="empty-certificates">
                        <div className="empty-icon">
                            <FiAward />
                        </div>
                        <h3>No Certificates Yet</h3>
                        <p>Certificates and achievements will be displayed here once earned.</p>
                        <span className="coming-soon-badge">Coming Soon</span>
                    </div>
                ) : sortedCertificates.length === 0 ? (
                    <div className="no-certificates">
                        <FiAward />
                        <p>No certificates found in this category.</p>
                    </div>
                ) : null}
            </section>
        </div>
    )
}

export default Achievements
