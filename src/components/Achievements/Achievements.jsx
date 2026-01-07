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

    // Certificates data
    const certificates = [
        {
            id: 1,
            title: 'Data Science',
            issuer: 'Direcho Trabaho',
            date: 'November 29, 2025',
            category: 'Data Science',
            description: 'Completed a 38-hour Data Science course under the Direcho Trabaho Program. Training covered Python for data science covering libraries like Pandas, Matplotlib, and Seaborn for data manipulation and visualization. Also covered few topics regarding Excel and SQL',
            image: dataPythonCert,
            credentialUrl: '#',
            skills: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Science']
        },
        {
            id: 2,
            title: 'Digital Literacy and AI Tools Certificate',
            issuer: 'Direcho Trabaho',
            date: 'June 28, 2025',
            category: 'Tools',
            description: 'Completed a 38-hour Digital Literacy with AI Tools course under the Direcho Trabaho Program. Training covered AI ethics, fundamentals, productivity tools, prompt engineering (including the CRIC framework), and practical applications in writing, research, design, and digital marketing.',
            image: digitalLiteracyCert,
            credentialUrl: '#',
            skills: ['Digital Literacy', 'AI Tools', 'Graphic Design', 'Prompting']
        },
        {
            id: 3,
            title: 'Top Student - Digital Literacy and AI Tools',
            issuer: 'Direcho Trabaho',
            date: 'June 28, 2025',
            category: 'Achievement',
            description: 'Recognized as a Top Student in the Direcho Trabaho Program for outstanding performance in applying AI tools and prompt engineering techniques. Demonstrated excellence in leveraging AI for productivity, communication, and content creation.',
            image: topStudentCert,
            credentialUrl: '#',
            skills: ['Digital Literacy', 'AI Tools', 'Graphic Design', 'Prompting']
        },
        {
            id: 4,
            title: 'Data Analytics Learning Challenge',
            issuer: 'DataSense Analytics',
            date: 'May 05, 2025',
            category: 'Analytics',
            description: 'Completed a 45-hour structured training program called the Data Analytics Learning Challenge.',
            image: dataAnalyticsCert,
            credentialId: 'STF-25-3702360',
            credentialUrl: '#',
            skills: ['Data Analysis', 'Excel', 'Power BI', 'Statistics']
        },
        {
            id: 5,
            title: 'Fundamentals of Python Programming',
            issuer: 'Data Analytics Philippines',
            date: 'April 05, 2025',
            category: 'Programming',
            description: 'Completed a 3‑hour training on Fundamentals of Python Programming offered by Data Analytics Philippines in partnership with DataSense Analytics and GSO Flex Solutions. This course provided a strong foundation in Python and helped me build confidence in writing and executing code for data analysis.',
            image: pythonFundCert,
            credentialId: 'DAPh-25-640712',
            credentialUrl: '#',
            skills: ['Python', 'Jupyter', 'Syntax']
        },
        {
            id: 6,
            title: 'Fundamentals of Statistics with Microsoft Excel',
            issuer: 'Data Analytics Philippines',
            date: 'April 05, 2025',
            category: 'Analytics',
            description: 'Completed a 6-hour course on Fundamental of Statistics Using Microsoft Excel with Data Analytics Philippines. Learned key statistical concepts including descriptive and inferential statistics, levels of measurement, and measures of central tendency, location, and dispersion, all applied through Excel',
            image: statisticsCert,
            credentialId: 'DAPh-25-818575',
            credentialUrl: '#',
            skills: ['Statistics', 'Data Analysis']
        },
        {
            id: 7,
            title: 'Business Intelligence with Power BI Desktop (Zero to Low Code Dashboard)',
            issuer: 'DataSense Analytics',
            date: 'March 30, 2025',
            category: 'Visualization',
            description: 'Completed a 6-hour training on Power BI Desktop focused on zero to low-code dashboard creation. Covered connecting to data sources, data preparation, data modeling, and dashboard design without DAX.',
            image: powerBICert,
            credentialId: 'STF-25-6623312',
            credentialUrl: '#',
            skills: ['Power BI', 'Dashboard Design', 'Data Visualization']
        },
        {
            id: 8,
            title: 'Advanced Excel: Unlocking Powerful Features and Functions',
            issuer: 'Virtual Mentors',
            date: 'March 22, 2025',
            category: 'Analytics',
            description: `Completed a 3‑hour national webinar on Advanced Excel: Unlocking Powerful Features and Functions (Virtual Mentors, March 2025). Key topics covered:

                        - Advanced formulas and functions
                        - Conditional logic and lookup formulas
                        - Data validation and clean workflows
                        - Pivot tables, charts, and filtering tools

                        Strengthened my ability to use Excel for data analysis and reporting.`,
            image: advancedExcelCert,
            credentialId: 'AEXCL-WB-01-00799',
            credentialUrl: '#',
            skills: ['Excel', 'Pivot Tables', 'Advanced Formulas']
        },
        {
            id: 9,
            title: 'Introduction to Excel: Basics and Fundamentals for Beginners',
            issuer: 'Virtual Mentors',
            date: 'March 22, 2025',
            category: 'Analytics',
            description: `Completed a national-level webinar titled “Introduction to Excel: Basics and Fundamentals for Beginners” hosted by Virtual Mentors on March 22, 2025. This 3-hour training covered:

                        - Spreadsheet navigation and layout
                        - Basic formulas and functions
                        - Data entry and formatting techniques
                        - Foundational tools for organizing and analyzing data`,
            image: introExcelCert,
            credentialId: 'FEXCEL-WB-01-0078',
            credentialUrl: '#',
            skills: ['Excel', 'Data Entry']
        },
        {
            id: 10,
            title: 'Data Science in the Modern World',
            issuer: 'Direcho Trabaho',
            date: 'May 04, 2024',
            category: 'Data Science',
            description: 'Completed a 38-hour Data Science in the Modern World course under the Direcho Trabaho Program (The Coding School x The Alvarez Foundation). Training covered data entry and cleaning, Excel, SQL, and Python fundamentals. For the capstone, I analyzed a Kaggle dataset in Excel, created charts, and presented insights with recommended actions.',
            image: dataExcelCert,
            credentialUrl: '#',
            skills: ['Excel', 'SQL', 'Python', 'Data Analysis']
        }
    ]

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
