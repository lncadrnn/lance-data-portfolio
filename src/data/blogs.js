// Import blog images when available
// import blogImage1 from '../assets/blogs/blog1.jpg'

export const blogs = [
    
    /*
    {
        id: 1,
        title: 'Getting Started with Data Analysis in Python',
        excerpt: 'Learn the fundamentals of data analysis using Python, pandas, and numpy. This comprehensive guide covers everything from data loading to visualization.',
        content: ... ,
        category: 'Self-Study',
        author: 'Lance Adrian D. Acal',
        date: 'January 2026',
        image: null
    },
    */
    
    {
        id: 1,
        title: 'Getting Started with Data Analysis in Python',
        excerpt: 'Learn the fundamentals of data analysis using Python, pandas, and numpy. This comprehensive guide covers everything from data loading to visualization.',
        content: `
## Introduction

Data analysis is one of the most valuable skills in today's data-driven world. Python has become the go-to language for data professionals due to its simplicity and powerful libraries.

## Setting Up Your Environment

Before we begin, make sure you have Python installed along with the following libraries:
- pandas
- numpy
- matplotlib
- seaborn

## Loading Data

The first step in any data analysis project is loading your data. Pandas makes this incredibly easy:

\`\`\`python
import pandas as pd

# Load a CSV file
df = pd.read_csv('your_data.csv')

# Display the first few rows
print(df.head())
\`\`\`

## Data Exploration

Understanding your data is crucial before diving into analysis...
        `,
        category: 'Self-Study',
        author: 'Lance Adrian D. Acal',
        date: 'January 2026',
        image: null
    },
    {
        id: 2,
        title: 'Power BI Dashboard Design Best Practices',
        excerpt: 'Discover the key principles of effective dashboard design in Power BI. From color theory to layout optimization.',
        content: `
## Introduction

Creating effective dashboards in Power BI requires more than just dragging and dropping visuals. It requires thoughtful design and understanding of your audience.

## Key Principles

### 1. Know Your Audience
Before creating any dashboard, understand who will be using it and what decisions they need to make.

### 2. Less is More
Avoid cluttering your dashboard with too many visuals. Focus on the key metrics that matter.

### 3. Consistent Color Scheme
Use a consistent color palette throughout your dashboard for a professional look.
        `,
        category: 'Work',
        author: 'Lance Adrian D. Acal',
        date: 'December 2025',
        image: null
    },
    {
        id: 3,
        title: 'SQL Queries Every Data Analyst Should Know',
        excerpt: 'Master the essential SQL queries that form the foundation of data analysis. From basic SELECT statements to complex JOINs.',
        content: `
## Introduction

SQL is the language of data. Every data analyst needs to be proficient in SQL to extract and manipulate data effectively.

## Essential Queries

### SELECT Statement
The most basic and frequently used SQL command.

\`\`\`sql
SELECT column1, column2
FROM table_name
WHERE condition;
\`\`\`

### JOIN Operations
Combining data from multiple tables is essential for comprehensive analysis.

\`\`\`sql
SELECT a.column1, b.column2
FROM table_a a
INNER JOIN table_b b ON a.id = b.id;
\`\`\`
        `,
        category: 'School',
        author: 'Lance Adrian D. Acal',
        date: 'November 2025',
        image: null
    },
    {
        id: 4,
        title: 'Machine Learning for Beginners: A Practical Guide',
        excerpt: 'An introduction to machine learning concepts with hands-on examples using scikit-learn.',
        content: `
## What is Machine Learning?

Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

## Types of Machine Learning

### Supervised Learning
The algorithm learns from labeled training data.

### Unsupervised Learning
The algorithm finds patterns in unlabeled data.

### Reinforcement Learning
The algorithm learns through trial and error.
        `,
        category: 'Self-Study',
        author: 'Lance Adrian D. Acal',
        date: 'October 2025',
        image: null
    }
]
