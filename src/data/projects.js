import financialReport from '../assets/projects/financial-report.png'
import movieDataset from '../assets/projects/movie-dataset.png'

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
        featured: true
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
        featured: true
    }
]
