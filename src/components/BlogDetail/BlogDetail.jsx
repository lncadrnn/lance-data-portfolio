import { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ThemeContext } from '../../App'
import {
    FiFileText,
    FiCalendar,
    FiArrowLeft,
    FiUser,
    FiShare2,
    FiTwitter,
    FiLinkedin,
    FiFacebook,
    FiChevronLeft,
    FiChevronRight
} from 'react-icons/fi'
import './BlogDetail.css'
import ImageLoader from '../Loading/ImageLoader'
import Loading from '../Loading/Loading'
import { blogs } from '../../data/blogs'

const BlogDetail = () => {
    const { darkMode } = useContext(ThemeContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    // Find the blog by id
    const blog = blogs.find(b => b.id === parseInt(id))

    // Get other blogs (excluding current one) - limit to 6
    const otherBlogs = blogs.filter(b => b.id !== parseInt(id)).slice(0, 6)

    // Pagination/Carousel state
    const [currentPage, setCurrentPage] = useState(0)
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

    // Reset page index when blog changes
    useEffect(() => {
        setCurrentPage(0)
        // Show loading briefly when switching blogs
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [id, isLoading])

    // Handle click on other blog
    const handleBlogClick = (blogId) => {
        // Show loading first (user stays where they are)
        setIsLoading(true)
        // After loading is visible, scroll to top and navigate
        setTimeout(() => {
            const contentWrapper = document.querySelector('.content-wrapper')
            if (contentWrapper) {
                contentWrapper.scrollTo({ top: 0, behavior: 'instant' })
            }
            // Navigate after scrolling
            navigate(`/blogs/${blogId}`)
        }, 500)
    }

    // Calculate pagination
    const totalPagesCarousel = Math.ceil(otherBlogs.length / itemsPerView)
    
    // Get visible items based on mode and current page
    const visibleBlogs = isCarouselMode 
        ? otherBlogs.slice(currentPage * itemsPerView, (currentPage + 1) * itemsPerView)
        : otherBlogs.slice(0, 6)

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
            'Visualization': '#10b981',
            'Database': '#8b5cf6',
            'Machine Learning': '#f59e0b',
            'Analytics': '#ec4899',
            'Programming': '#06b6d4'
        }
        return colors[category] || '#6b7280'
    }

    // If blog not found
    if (!blog) {
        return (
            <div className={`blog-detail ${darkMode ? 'dark' : 'light'}`}>
                <div className="detail-not-found">
                    <FiFileText />
                    <h2>Blog Post Not Found</h2>
                    <p>The blog post you're looking for doesn't exist.</p>
                    <Link to="/blogs" className="back-btn">
                        <FiArrowLeft />
                        Back to Blogs
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={`blog-detail ${darkMode ? 'dark' : 'light'}`}>
            {/* Loading Overlay */}
            {isLoading && <Loading fullScreen={false} size="medium" text="Loading article" />}
            
            {/* Back Button */}
            <div className="detail-header">
                <button className="back-btn" onClick={() => navigate('/blogs')}>
                    <FiArrowLeft />
                    <span>Back to Blogs</span>
                </button>
            </div>

            {/* Main Layout with Sidebar */}
            <div className="detail-layout">
                {/* Main Content */}
                <div className="detail-main">
                    <article className="detail-content">
                        {/* Image Section */}
                        <div className="detail-image-section">
                            <div className="detail-image-container">
                                {blog.image ? (
                                    <ImageLoader 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        className="detail-image"
                                    />
                                ) : (
                                    <div className="detail-placeholder">
                                        <FiFileText />
                                        <span>Blog Article</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Article Header */}
                        <div className="detail-info-section">
                            <span
                                className="detail-category"
                                style={{ backgroundColor: getCategoryColor(blog.category) }}
                            >
                                {blog.category}
                            </span>
                            
                            <h1 className="detail-title">{blog.title}</h1>
                            
                            <div className="detail-meta">
                                <span className="detail-author">
                                    <FiUser /> {blog.author}
                                </span>
                                <span className="detail-date">
                                    <FiCalendar /> {blog.date}
                                </span>
                            </div>

                            {/* Article Content */}
                            <div className="article-content">
                                {blog.content.split('\n').map((paragraph, index) => {
                                    if (paragraph.startsWith('## ')) {
                                        return <h2 key={index}>{paragraph.replace('## ', '')}</h2>
                                    } else if (paragraph.startsWith('### ')) {
                                        return <h3 key={index}>{paragraph.replace('### ', '')}</h3>
                                    } else if (paragraph.startsWith('```')) {
                                        return null // Skip code fence markers
                                    } else if (paragraph.trim()) {
                                        return <p key={index}>{paragraph}</p>
                                    }
                                    return null
                                })}
                            </div>

                            {/* Share Section */}
                            <div className="share-section">
                                <span className="share-label">
                                    <FiShare2 /> Share this article
                                </span>
                                <div className="share-buttons">
                                    <button className="share-btn twitter" aria-label="Share on Twitter">
                                        <FiTwitter />
                                    </button>
                                    <button className="share-btn linkedin" aria-label="Share on LinkedIn">
                                        <FiLinkedin />
                                    </button>
                                    <button className="share-btn facebook" aria-label="Share on Facebook">
                                        <FiFacebook />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Right Sidebar - Other Blogs */}
                <aside className={`detail-sidebar ${isCarouselMode ? 'carousel-mode' : ''}`}>
                    <div className="sidebar-section">
                        <div className="sidebar-header">
                            <FiFileText />
                            <h3>Other Articles</h3>
                            <Link to="/blogs" className="view-all-link">
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
                                {visibleBlogs.map(b => (
                                    <div 
                                        key={b.id} 
                                        className="sidebar-item"
                                        onClick={() => handleBlogClick(b.id)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleBlogClick(b.id)}
                                    >
                                        <div className="sidebar-item-image">
                                            {b.image ? (
                                                <ImageLoader 
                                                    src={b.image} 
                                                    alt={b.title}
                                                />
                                            ) : (
                                                <div className="sidebar-item-placeholder">
                                                    <FiFileText />
                                                </div>
                                            )}
                                        </div>
                                        <div className="sidebar-item-info">
                                            {isCarouselMode && b.category && (
                                                <span 
                                                    className="sidebar-item-category"
                                                    style={{ backgroundColor: getCategoryColor(b.category) }}
                                                >
                                                    {b.category}
                                                </span>
                                            )}
                                            <span className="sidebar-item-date">
                                                <FiCalendar /> {b.date}
                                            </span>
                                            <span className="sidebar-item-title">{b.title}</span>
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
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default BlogDetail
