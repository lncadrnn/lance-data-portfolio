import { useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ThemeContext } from '../../App'
import {
    FiAward,
    FiCalendar,
    FiExternalLink,
    FiArrowLeft,
    FiChevronLeft,
    FiChevronRight,
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

    // Find previous and next certificates
    const currentIndex = certificates.findIndex(cert => cert.id === parseInt(id))
    const prevCert = currentIndex > 0 ? certificates[currentIndex - 1] : null
    const nextCert = currentIndex < certificates.length - 1 ? certificates[currentIndex + 1] : null

    // Get other certificates (excluding current one)
    const otherCertificates = certificates
        .filter(cert => cert.id !== parseInt(id))
        .slice(0, 6) // Show max 6 other certificates

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

                    {/* Navigation */}
                    <div className="detail-navigation">
                        {prevCert ? (
                            <Link to={`/achievements/${prevCert.id}`} className="nav-link prev">
                                <FiChevronLeft />
                                <div className="nav-info">
                                    <span className="nav-label">Previous</span>
                                    <span className="nav-title">{prevCert.title}</span>
                                </div>
                            </Link>
                        ) : (
                            <div className="nav-link disabled"></div>
                        )}
                        
                        {nextCert ? (
                            <Link to={`/achievements/${nextCert.id}`} className="nav-link next">
                                <div className="nav-info">
                                    <span className="nav-label">Next</span>
                                    <span className="nav-title">{nextCert.title}</span>
                                </div>
                                <FiChevronRight />
                            </Link>
                        ) : (
                            <div className="nav-link disabled"></div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Other Certificates */}
                <aside className="detail-sidebar">
                    <div className="sidebar-section">
                        <div className="sidebar-header">
                            <FiClock />
                            <h3>Other Certificates</h3>
                        </div>
                        <div className="sidebar-list">
                            {otherCertificates.map(cert => (
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
                                        <span className="sidebar-item-date">
                                            <FiCalendar /> {cert.date}
                                        </span>
                                        <span className="sidebar-item-title">{cert.title}</span>
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

export default CertificateDetail
