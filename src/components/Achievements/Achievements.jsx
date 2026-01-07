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
    FiList
} from 'react-icons/fi'
import './Achievements.css'

// Import certificate images
import advancedExcelCert from '../../assets/Certificates/Advanced Excel.png'
import dataAnalyticsCert from '../../assets/Certificates/Data Analytics Certificate.png'
import dataExcelCert from '../../assets/Certificates/Data Science - Excel Certificate.png'
import dataPythonCert from '../../assets/Certificates/Data Science - Python Certificate.png'
import digitalLiteracyCert from '../../assets/Certificates/Digital Literacy and AI Tools Certificate.png'
import introExcelCert from '../../assets/Certificates/Intro to Excel Certificate.png'
import powerBICert from '../../assets/Certificates/Power BI Certificate.png'
import pythonFundCert from '../../assets/Certificates/Python Fundamentals Certificate.png'
import statisticsCert from '../../assets/Certificates/Statistics Certificate.png'
import topStudentCert from '../../assets/Certificates/Top Student of Digital Literacy and AI Tools.png'

const Achievements = () => {
    const { darkMode } = useContext(ThemeContext)
    const [selectedCert, setSelectedCert] = useState(null)
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [activeFilter, setActiveFilter] = useState('all')

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

    // Certificates data
    const certificates = [
        {
            id: 1,
            title: 'Data Analytics Learning Challenge',
            issuer: 'DataSense Analytics',
            date: 'May 05, 2025',
            category: 'Analytics',
            description: 'Completed a 45-hour structured training program called the Data Analytics Learning Challenge.',
            image: dataAnalyticsCert,
            credentialUrl: '#',
            skills: ['Data Analysis', 'Excel', 'Power BI', 'Statistics']
        },
        {
            id: 2,
            title: 'Power BI Certificate',
            issuer: 'DataSense Analytics',
            date: '2024',
            category: 'Visualization',
            description: 'Professional certification in creating interactive dashboards, reports, and data storytelling using Power BI.',
            image: powerBICert,
            credentialUrl: '#',
            skills: ['Power BI', 'DAX', 'Data Visualization']
        },
        {
            id: 3,
            title: 'Python Fundamentals Certificate',
            issuer: 'Training Provider',
            date: '2024',
            category: 'Programming',
            description: 'Foundational Python programming covering syntax, data structures, and basic programming concepts.',
            image: pythonFundCert,
            credentialUrl: '#',
            skills: ['Python', 'Programming', 'Problem Solving']
        },
        {
            id: 4,
            title: 'Data Science - Python Certificate',
            issuer: 'Training Provider',
            date: '2024',
            category: 'Data Science',
            description: 'Python for data science covering libraries like Pandas, Matplotlib, and Seaborn for data manipulation and visualization.',
            image: dataPythonCert,
            credentialUrl: '#',
            skills: ['Python', 'Pandas', 'Data Science']
        },
        {
            id: 5,
            title: 'Statistics Certificate',
            issuer: 'Training Provider',
            date: '2024',
            category: 'Data Science',
            description: 'Statistical concepts and methods essential for data analysis and decision making.',
            image: statisticsCert,
            credentialUrl: '#',
            skills: ['Statistics', 'Data Analysis', 'Probability']
        },
        {
            id: 6,
            title: 'Data Science - Excel Certificate',
            issuer: 'Training Provider',
            date: '2024',
            category: 'Analytics',
            description: 'Excel for data science covering advanced functions, data analysis, and visualization techniques.',
            image: dataExcelCert,
            credentialUrl: '#',
            skills: ['Excel', 'Data Analysis', 'Spreadsheets']
        },
        {
            id: 7,
            title: 'Advanced Excel',
            issuer: 'Training Provider',
            date: '2024',
            category: 'Analytics',
            description: 'Advanced Excel techniques including pivot tables, complex formulas, and data analysis tools.',
            image: advancedExcelCert,
            credentialUrl: '#',
            skills: ['Excel', 'Pivot Tables', 'Advanced Formulas']
        },
        {
            id: 8,
            title: 'Intro to Excel Certificate',
            issuer: 'Training Provider',
            date: '2024',
            category: 'Analytics',
            description: 'Introduction to Microsoft Excel covering basic spreadsheet operations and fundamental functions.',
            image: introExcelCert,
            credentialUrl: '#',
            skills: ['Excel', 'Spreadsheets', 'Data Entry']
        },
        {
            id: 9,
            title: 'Digital Literacy and AI Tools Certificate',
            issuer: 'Training Provider',
            date: '2024',
            category: 'Tools',
            description: 'Training on digital literacy skills and modern AI tools for productivity and efficiency.',
            image: digitalLiteracyCert,
            credentialUrl: '#',
            skills: ['Digital Literacy', 'AI Tools', 'Productivity']
        },
        {
            id: 10,
            title: 'Top Student - Digital Literacy and AI Tools',
            issuer: 'Training Provider',
            date: '2024',
            category: 'Achievement',
            description: 'Recognition as top performing student in the Digital Literacy and AI Tools program.',
            image: topStudentCert,
            credentialUrl: '#',
            skills: ['Excellence', 'AI Tools', 'Digital Skills']
        }
    ]

    // Get unique categories for filter
    const categories = ['all', ...new Set(certificates.map(cert => cert.category))]

    // Filter certificates based on active filter
    const filteredCertificates = activeFilter === 'all'
        ? certificates
        : certificates.filter(cert => cert.category === activeFilter)

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
        const currentIndex = filteredCertificates.findIndex(c => c.id === selectedCert.id)
        let newIndex
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredCertificates.length
        } else {
            newIndex = (currentIndex - 1 + filteredCertificates.length) % filteredCertificates.length
        }
        setSelectedCert(filteredCertificates[newIndex])
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

            {/* Controls Section */}
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

            {/* Certificates Grid/List */}
            <section className="certificates-section">
                <div className={`certificates-container ${viewMode}`}>
                    {filteredCertificates.map((cert, index) => (
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
                                            <span key={i} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCertificates.length === 0 && (
                    <div className="no-certificates">
                        <FiAward />
                        <p>No certificates found in this category.</p>
                    </div>
                )}
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
                                {selectedCert.description && (
                                    <p className="modal-description">{selectedCert.description}</p>
                                )}
                                <div className="modal-skills">
                                    <h4>Skills</h4>
                                    <div className="skills-list">
                                        {selectedCert.skills.map((skill, i) => (
                                            <span key={i} className="skill-tag">{skill}</span>
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
