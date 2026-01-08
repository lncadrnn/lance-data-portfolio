import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../App'
import {
    FiFileText,
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
import './Blogs.css'
import ImageLoader from '../Loading/ImageLoader'
import { blogs } from '../../data/blogs'

const Blogs = () => {
    const { darkMode } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [activeFilter, setActiveFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('newest') // 'oldest' or 'newest'
    const [currentPage, setCurrentPage] = useState(1)
    const blogsPerPage = 9

    // Reset to first page when filter or sort changes
    useEffect(() => {
        setCurrentPage(1)
    }, [activeFilter, sortOrder])

    // Define categories for filter
    const categories = [
        'all',
        'School',
        'Self-Study',
        'Work'
    ]

    // Filter blogs based on active filter
    const filteredBlogs = activeFilter === 'all'
        ? blogs
        : blogs.filter(blog => blog.category === activeFilter)

    // Sort blogs based on sortOrder
    const sortedBlogs = [...filteredBlogs].sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA
    })

    // Pagination logic
    const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage)
    const indexOfLastBlog = currentPage * blogsPerPage
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
    const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

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
            'School': '#3b82f6',
            'Self-Study': '#10b981',
            'Work': '#f59e0b'
        }
        return colors[category] || '#6b7280'
    }

    // Navigate to blog detail page
    const handleBlogClick = (blogId) => {
        navigate(`/blogs/${blogId}`)
    }

    return (
        <div className={`blogs-page ${darkMode ? 'dark' : 'light'}`}>
            {/* Header Section */}
            <section className="blogs-header">
                <div className="blogs-title-row">
                    <div className="section-header">
                        <FiFileText className="section-icon" />
                        <h1>Blogs</h1>
                    </div>
                    <div className="blogs-stats">
                        <div className="stat-badge">
                            <FiFileText />
                            <span>{blogs.length} Blogs</span>
                        </div>
                    </div>
                </div>
                <p className="blogs-subtitle">
                    Capturing the evolving journey of learning and applying data, from college to career and everything in between.
                </p>
            </section>

            {/* Controls Section - Only show if there are blogs */}
            {blogs.length > 0 && (
                <section className="blogs-controls">
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

            {/* Blogs Grid/List */}
            <section className="blogs-section">
                <div className={`blogs-container ${viewMode}`}>
                    {currentBlogs.map((blog, index) => (
                        <div
                            key={blog.id}
                            className="blog-card"
                            onClick={() => handleBlogClick(blog.id)}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="blog-image-container">
                                {blog.image ? (
                                    <ImageLoader 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        className="blog-image"
                                    />
                                ) : (
                                    <div className="blog-placeholder">
                                        <FiFileText />
                                        <span>Blog</span>
                                    </div>
                                )}
                                <div className="blog-overlay">
                                    <span className="view-text">Read Article</span>
                                </div>
                            </div>
                            <div className="blog-content">
                                <span
                                    className="blog-category"
                                    style={{ backgroundColor: `${getCategoryColor(blog.category)}20`, color: getCategoryColor(blog.category) }}
                                >
                                    {blog.category}
                                </span>
                                <h3 className="blog-title">{blog.title}</h3>
                                {viewMode === 'list' && blog.excerpt && (
                                    <p className="blog-excerpt">{blog.excerpt}</p>
                                )}
                                <div className="blog-meta">
                                    <span className="blog-date">
                                        <FiCalendar />
                                        {blog.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {sortedBlogs.length > blogsPerPage && (
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

                {blogs.length === 0 ? (
                    <div className="empty-blogs">
                        <div className="empty-icon">
                            <FiFileText />
                        </div>
                        <h3>No Blog Posts Yet</h3>
                        <p>Blog posts will be displayed here once added.</p>
                        <span className="coming-soon-badge">Coming Soon</span>
                    </div>
                ) : sortedBlogs.length === 0 ? (
                    <div className="no-blogs">
                        <FiFileText />
                        <p>No blog posts found in this category.</p>
                    </div>
                ) : null}
            </section>
        </div>
    )
}

export default Blogs
