// Import certificate images based on how they would be imported in this file context
// Note: We need to adjust imports if this file is imported elsewhere
// For now, we'll keep the image references consistent with where they are used.

import advancedExcelCert from '../assets/Certificates/Advanced Excel.png'
import dataAnalyticsCert from '../assets/Certificates/Data Analytics Certificate.png'
import dataExcelCert from '../assets/Certificates/Data Science - Excel Certificate.png'
import dataPythonCert from '../assets/Certificates/Data Science - Python Certificate.png'
import digitalLiteracyCert from '../assets/Certificates/Digital Literacy and AI Tools Certificate.png'
import introExcelCert from '../assets/Certificates/Intro to Excel Certificate.png'
import powerBICert from '../assets/Certificates/Power BI Certificate.png'
import pythonFundCert from '../assets/Certificates/Python Fundamentals Certificate.png'
import statisticsCert from '../assets/Certificates/Statistics Certificate.png'
import topStudentCert from '../assets/Certificates/Top Student of Digital Literacy and AI Tools.png'

export const certificates = [
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
