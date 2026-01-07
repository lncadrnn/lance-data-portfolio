import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../../App'
import {
    FiAward,
    FiCalendar,
    FiExternalLink,
    FiX,
    FiChevronLeft,
    FiChevronRight,
    FiGrid,
    FiList,
    FiArrowUp,
    FiArrowDown
} from 'react-icons/fi'
import './Achievements.css'

import { certificates } from '../../data/certificates'

const Achievements = () => {
    const { darkMode } = useContext(ThemeContext)
    const [selectedCert, setSelectedCert] = useState(null)
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [activeFilter, setActiveFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('oldest') // 'oldest' or 'newest'

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedCert) {
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
    }, [selectedCert])



    // Get unique categories for filter
    const categories = ['all', ...new Set(certificates.map(cert => cert.category))]

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

    // Navigate certificates in modal
    const navigateCert = (direction) => {
        if (!selectedCert) return
        const currentIndex = sortedCertificates.findIndex(c => c.id === selectedCert.id)
        let newIndex
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % sortedCertificates.length
        } else {
            newIndex = (currentIndex - 1 + sortedCertificates.length) % sortedCertificates.length
        }
        setSelectedCert(sortedCertificates[newIndex])
    }

    return (
        <div className={`achievements ${darkMode ? 'dark' : 'light'}`}>
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
                    A collection of certifications and achievements earned throughout my data analytics journey.
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
                    {sortedCertificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="certificate-card"
                            onClick={() => setSelectedCert(cert)}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="cert-image-container">
                                {cert.image ? (
                                    <img src={cert.image} alt={cert.title} className="cert-image" />
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

            {/* Certificate Modal */}
            {selectedCert && (
                <div className="cert-modal-overlay" onClick={() => setSelectedCert(null)}>
                    <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedCert(null)}>
                            <FiX />
                        </button>

                        <button className="modal-nav prev" onClick={() => navigateCert('prev')}>
                            <FiChevronLeft />
                        </button>
                        <button className="modal-nav next" onClick={() => navigateCert('next')}>
                            <FiChevronRight />
                        </button>

                        <div className="modal-content">
                            <div className="modal-image-container">
                                {selectedCert.image ? (
                                    <img src={selectedCert.image} alt={selectedCert.title} className="modal-image" />
                                ) : (
                                    <div className="modal-placeholder">
                                        <FiAward />
                                        <span>Certificate Preview</span>
                                    </div>
                                )}
                            </div>
                            <div className="modal-details">
                                <span
                                    className="modal-category"
                                    style={{ backgroundColor: getCategoryColor(selectedCert.category) }}
                                >
                                    {selectedCert.category}
                                </span>
                                <h2 className="modal-title">{selectedCert.title}</h2>
                                <p className="modal-issuer">Issued by {selectedCert.issuer}</p>
                                <p className="modal-date">
                                    <FiCalendar /> {selectedCert.date}
                                </p>
                                {selectedCert.credentialId && (
                                    <p className="modal-credential-id">
                                        <strong>Credential ID:</strong> {selectedCert.credentialId}
                                    </p>
                                )}
                                {selectedCert.description && (
                                    <p className="modal-description">{selectedCert.description}</p>
                                )}
                                <div className="modal-skills">
                                    <h4>Skills</h4>
                                    <div className="skills-list">
                                        {selectedCert.skills.map((skill, i) => (
                                            <span key={i} className="achievement-skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                {selectedCert.credentialUrl && selectedCert.credentialUrl !== '#' && (
                                    <a
                                        href={selectedCert.credentialUrl}
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
                </div>
            )}
        </div>
    )
}

export default Achievements
