import financialReport from '../assets/projects/financial-report.png'
import movieDataset from '../assets/projects/movie-dataset.png'
import ecommerceDashboard from '../assets/projects/ecommerce_dashboard.png'
import contentCalendar from '../assets/projects/Content Calendar.png'
import informationSheet from '../assets/projects/Input Information Sheet.png'

export const projects = [
    {
        id: 1,
        title: 'Financial Report Dashboard',
        description: 
        
            `**Executive Summary: Financial Performance Dashboard**

            **The Challenge**
            As part of the DataSense Analytics "Zero to Low Code" certification, I was tasked with building a professional executive summary using only native Power BI features. The goal was to demonstrate proficiency in data modeling and visualization without relying on custom DAX or complex coding, ensuring the report is easily maintainable for non-technical users.

            **The Solution**
            I developed a high-level financial dashboard that aggregates global sales and profit data into a single-page executive view. By focusing on clean UI and standard visual components, I created a report that allows leadership to quickly assess company health across different products, segments, and regions.

            - **Tech Stack:** Power BI Desktop (Native Visuals and Power Query).
            - **Dataset:** Financial sample data covering global sales, units sold, and profit across five countries.

            **Key Metrics and Features**
            - Financial KPIs: Clearly displayed top-line metrics including $118.73M in Total Revenue, 1.13M Units Sold, and $16.89M in Total Profit.
            - Segment Analysis: Identified the Government segment as the primary revenue driver ($53M), significantly outperforming mid-market and channel partner segments.
            - Product Performance: Tracked revenue by product line, identifying Paseo as the top-performing product.
            - Geographic Insights: Utilized a map-based visualization to show a balanced revenue distribution across North America and Europe, with the USA leading in total revenue ($25.03M).
            - Trend Monitoring: Included a "Revenue Trend by Date" line chart to visualize performance fluctuations throughout the 2014 fiscal year.

            **Value and Certification**
            This project successfully fulfilled the requirements for the Business Intelligence with Power BI Desktop Certificate. It demonstrates a strong foundation in BI fundamentals, including data loading, categorical organization, and the ability to design an "Executive Level" report that prioritizes clarity and rapid decision-making.
            `,

        category: 'Dashboard',
        date: 'March 30, 2025',
        image: financialReport,
        technologies: ['Power BI', 'Dashboard Design', 'Power Query'],
        githubUrl: 'https://github.com/lncadrnn/power-bi-projects/tree/main/Financial%20Report%20Dashboard',
        liveUrl: '#',
        featured: true,
        featuredOrder: 6
    },
    {
        id: 2,
        title: 'Netflix Global Content Analysis (2000 - 2020)',
        description: 
        
            `**Project: Netflix Global Content Analysis (2000:2020)**

            **The Challenge**
            As part of an Experimental Statistics course, I was tasked with identifying patterns in global cinema production. The goal was to move beyond static data and use storytelling to explain how geographic and temporal factors influence movie characteristics on Netflix.

            **The Solution**
            I developed a comprehensive analysis using Excel for data cleaning and Power BI for visualization. To ensure a cohesive narrative during my presentation, I designed the primary dashboard in a high-contrast black and yellow theme to match my slide deck. I also created a secondary version to apply color theory principles, focusing on accessibility and visual balance.

            - **Tech Stack:** Power BI (DAX, Power Query), Microsoft Excel.
            - **Dataset:** School-provided dataset covering 1,027 movies across 15 countries.

            **The Story: Key Insights & Delivery**
            - **The Production Surge:** I visualized the explosive growth of content starting in 2010, highlighting a peak in 2017 to show the impact of the streaming era on global production volume.
            - **The Cultural Runtime Gap:** I used the "Average Runtime by Country" visual to tell a story of cultural contrast, India leads with a 224-minute average (reflecting epic storytelling traditions) while Japan averages 22 minutes (indicating a high volume of short-form content).
            - **Geographic Focus:** I leveraged interactive maps to show the concentration of content in Asian and Middle Eastern markets, providing a focused view of regional trends.

            **Impact and Presentation**
            - Narrative Alignment: Successfully synchronized dashboard design with presentation aesthetics to maintain audience engagement.
            - Communication: Translated complex statistical distributions into a clear, spoken narrative for a student and faculty audience.
            - Interactivity: Used live slicers during the presentation to answer stakeholder questions on the fly, demonstrating the dashboard's utility for real-time data exploration.
            `,

        category: 'Analytics',
        date: 'April 23, 2025',
        image: movieDataset,
        technologies: ['Power BI', 'DAX', 'Power Query', 'Excel'],
        githubUrl: 'https://github.com/lncadrnn/power-bi-projects/tree/main/Netflix%20Global%20Content%20Analysis',
        liveUrl: '#',
        featured: true,
        featuredOrder: 3
    },
    {
        id: 3,
        title: 'Brazilian E-Commerce Customer Segmentation (Olist)',
        description: 
        
            `**Project: Brazilian E-Commerce Customer Segmentation (Olist)**

            **The Challenge**
            As a Junior Data Analyst, I was tasked with solving a marketing inefficiency for a major Brazilian marketplace. The company was wasting resources by sending identical promotions to its entire customer base. The objective was to build an RFM (Recency, Frequency, Monetary) model to categorize customers and identify high-priority segments for targeted campaigns.

            **The Solution**
            I conducted a deep-dive analysis using Jupyter Notebook, processing the Olist Public Dataset which includes 100,000 orders across 7 relational tables. I engineered a static dashboard using Matplotlib and Seaborn to visualize customer distributions and operational bottlenecks.

            - **Tech Stack:** Python, Pandas, Matplotlib, Seaborn, Jupyter Notebook.
            - **Methodology:** RFM Segmentation, Exploratory Data Analysis (EDA), and Geospatial Mapping.

            **The Data Story: From Marketing to Operations**
            During my presentation, I used data storytelling to show that the "Marketing Problem" was actually a "Service Quality" issue:

            - **The RFM Breakdown:** I identified that while the platform had a massive influx of 46,705 New Customers, the "Champion" and "Loyal" segments were critically small (less than 50 total).
            - **The Critical Insight:** By visualizing the Geographic Distribution of Unhappy Customers, I proved that customer churn wasn't caused by poor ads, but by delayed shipments and negative reviews.
            - **The Correlation:** I highlighted that the top 10 cities with the most unhappy customers (led by São Paulo and Rio de Janeiro) correlated directly with sellers who had the highest delay counts.
            - **Strategic Recommendation:** I advised the "Marketing Director" to shift focus from expensive broad-spectrum campaigns toward improving seller performance and logistics efficiency to protect the existing customer base.

            **Value and Certification**
            This project was a key requirement for my Data Science Certification. It demonstrates my ability to:

            - Wrangle Complex Data: Cleaning and merging 7 different relational tables into a unified analytical view.
            - Apply Domain Knowledge: Implementing the RFM framework to drive business strategy.
            - Speak to Stakeholders: Translating technical Python outputs into a clear business narrative that challenges initial assumptions.
            `,

        category: 'Data Science',
        date: 'November 29, 2025',
        image: ecommerceDashboard,
        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'RFM Analysis', 'Jupyter Notebook'],
        githubUrl: 'https://github.com/lncadrnn/brazilian-ecommerce-rfm-analysis',
        liveUrl: '#',
        featured: true,
        featuredOrder: 1
    },
    {
        id: 4,
        title: 'All-in-One Dynamic Content Calendar',
        description: 
        
            `**Project: All-in-One Dynamic Content Calendar**

            **The Challenge**
            Most content calendars require users to toggle between a list view and a calendar view, which can lead to data fragmentation. The goal was to build a streamlined, single-sheet tool where a user can input tasks on the left and see them visually mapped to a calendar on the right in real time.

            **The Solution**
            I designed a responsive workspace in Excel that uses coordinate-based logic to link a task list to a calendar grid. This "side-by-side" layout minimizes navigation time and provides an immediate visual representation of workload density.

            - **Tech Stack:** Microsoft Excel / Google Sheets (Conditional Formatting, Data Validation, Date Functions).
            - **Layout Strategy:** Dual-pane interface (Task Input on the left, Visual Calendar on the right).

            **Key Features**
            - **Live Task Syncing:** Built a system where tasks entered under the "Task" column are automatically pulled into the corresponding date block on the calendar using lookup formulas.
            - **Anchor-Date Automation:** Implemented a single-cell control system. By changing the start date (e.g., Dec 20), the entire calendar header and grid recalculate automatically to show the relevant week or month.
            - **Visual Organization:** Used distinct color coding and border styling to separate the input zone from the viewing zone, ensuring a clean and professional user experience.
            - **Scalable Task Entry:** Designed the left-hand list to allow for rapid-fire task entry, making it ideal for content creators or project managers with high-volume daily tasks.

            **Impact**
            This project demonstrates my skill in Productivity Tool Design. I transformed a static spreadsheet into a dynamic application that solves the problem of manual scheduling, proving that effective BI doesn't always require complex software—sometimes it just needs smart logic.
            `,

        category: 'Tools',
        date: 'December 2025',
        image: contentCalendar,
        technologies: ['Microsoft Excel', 'Google Sheets', 'Conditional Formatting', 'Data Validation', 'Date Functions'],
        githubUrl: 'https://github.com/lncadrnn/excel-projects/tree/main/Dynamic%20Calendars',
        liveUrl: '#',
        featured: true,
        featuredOrder: 4
    },
    {
        id: 5,
        title: 'Spotify Family Plan Administration Tool',
        description: 
        
            `**Project: Spotify Family Plan Administration Tool**

            **The Challenge**
            Managing shared subscription costs often leads to confusion regarding individual payment deadlines and amounts. I created this tracker to centralize member information and automate the "Paid/Unpaid" status tracking, removing the need for manual text updates or constant follow-ups.

            **The Solution**
            I engineered a three-sheet architecture that separates Data Input, User Interaction (Checkboxes), and Output Reporting. The system uses logical linking to ensure that once a member is "Checked" on the tracker, their status is instantly updated across the entire workbook.

            - **Tech Stack:** Google Sheets (Logical Formulas, Checkboxes, Conditional Formatting).
            - **Key Architecture:** Three-tier system (Input Information, Active Tracker, and Final Payment Status).

            **Key Features**
            - **Dynamic Cost Calculation:** Built an input table that automatically adjusts individual payment amounts based on the total plan price and the number of active members.
            - **Checkbox-Driven Automation:** Integrated interactive checkboxes that trigger backend status changes, moving away from manual "Yes/No" typing.
            - **Visual Status Indicators:** Applied conditional formatting to the "Status Sheet," using high-contrast colors (Red/Green) and iconography (✅/❌) to provide an immediate summary of current-month accounts receivable.
            - **Dynamic Date Management:** Centralized the "Start Date" control, allowing the entire 24-month tracking grid to shift automatically based on when the family plan cycle began.

            **Impact**
            This tool demonstrates my ability to design User-Centric Applications within a spreadsheet environment. It focuses on data integrity (via controlled inputs) and clear communication (via automated reporting)—skills that are directly transferable to professional project management and administrative roles.
            `,

        category: 'Tools',
        date: 'December 2025',
        image: informationSheet,
        technologies: ['Google Sheets', 'Logical Formulas', 'Checkboxes', 'Conditional Formatting'],
        githubUrl: 'https://github.com/lncadrnn/excel-projects/tree/main/Spotify%20Tracker%20Template',
        liveUrl: '#',
        featured: true,
        featuredOrder: 5
    }
]
