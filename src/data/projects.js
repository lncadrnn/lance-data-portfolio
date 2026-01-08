import financialReport from '../assets/projects/financial-report.png'
import movieDataset from '../assets/projects/movie-dataset.png'

export const projects = [
    {
        id: 1,
        title: 'Financial Report Dashboard',
        description: 'An interactive Power BI dashboard analyzing financial data, featuring key performance indicators, revenue trends, expense breakdowns, and profitability metrics. This dashboard provides actionable insights for financial decision-making through dynamic visualizations and drill-down capabilities.',
        category: 'Visualization',
        date: 'January 2026',
        image: financialReport,
        technologies: ['Power BI', 'DAX', 'Data Modeling', 'Financial Analysis'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: true
    },
    {
        id: 2,
        title: 'Movie Dataset Analysis',
        description: 'A comprehensive Power BI dashboard exploring movie industry trends, including box office performance, genre distribution, rating analysis, and temporal patterns. The visualization uncovers insights about what makes movies successful using various analytical techniques.',
        category: 'Analytics',
        date: 'January 2026',
        image: movieDataset,
        technologies: ['Power BI', 'Data Cleaning', 'Exploratory Analysis', 'Dashboard Design'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: true
    },
    {
        id: 3,
        title: 'Sales Performance Tracker',
        description: 'A dynamic sales analytics dashboard built with Python and Plotly, tracking sales metrics across regions, products, and time periods. Features include trend analysis, forecasting models, and interactive filtering for deep-dive analysis.',
        category: 'Data Science',
        date: 'December 2025',
        image: null,
        technologies: ['Python', 'Plotly', 'Pandas', 'Forecasting'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: false
    },
    {
        id: 4,
        title: 'Customer Segmentation Analysis',
        description: 'Machine learning project using K-means clustering to segment customers based on purchasing behavior, demographics, and engagement metrics. Includes RFM analysis and actionable recommendations for targeted marketing strategies.',
        category: 'Machine Learning',
        date: 'November 2025',
        image: null,
        technologies: ['Python', 'Scikit-learn', 'K-Means', 'RFM Analysis'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: false
    },
    {
        id: 5,
        title: 'E-commerce Data Pipeline',
        description: 'An end-to-end ETL pipeline for processing e-commerce transaction data. Extracts data from multiple sources, transforms and cleans it, and loads into a data warehouse for reporting and analytics purposes.',
        category: 'Data Science',
        date: 'October 2025',
        image: null,
        technologies: ['Python', 'SQL', 'ETL', 'Data Warehousing'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: false
    },
    {
        id: 6,
        title: 'Sentiment Analysis Tool',
        description: 'Natural language processing project analyzing customer reviews and social media mentions. Uses VADER and transformer models to classify sentiment and extract key themes from text data.',
        category: 'Machine Learning',
        date: 'September 2025',
        image: null,
        technologies: ['Python', 'NLTK', 'Transformers', 'NLP'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: false
    },
    {
        id: 7,
        title: 'HR Analytics Dashboard',
        description: 'Interactive Excel dashboard analyzing employee data including attrition rates, performance metrics, salary distributions, and departmental insights. Features pivot tables, charts, and conditional formatting for data exploration.',
        category: 'Analytics',
        date: 'August 2025',
        image: null,
        technologies: ['Excel', 'Pivot Tables', 'VBA', 'Data Visualization'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: false
    },
    {
        id: 8,
        title: 'COVID-19 Data Tracker',
        description: 'Real-time dashboard tracking COVID-19 statistics globally and locally. Features include case trends, vaccination progress, and comparative analysis between regions using public health data APIs.',
        category: 'Visualization',
        date: 'July 2025',
        image: null,
        technologies: ['Python', 'Dash', 'Plotly', 'API Integration'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: false
    },
    {
        id: 9,
        title: 'Stock Market Predictor',
        description: 'Time series analysis project using LSTM neural networks to predict stock price movements. Includes technical indicator calculations, backtesting framework, and performance evaluation metrics.',
        category: 'Machine Learning',
        date: 'June 2025',
        image: null,
        technologies: ['Python', 'TensorFlow', 'LSTM', 'Time Series'],
        githubUrl: 'https://github.com/lncadrnn',
        liveUrl: '#',
        featured: false
    }
]
