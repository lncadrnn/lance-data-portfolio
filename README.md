# Lance Data Portfolio

A modern, responsive personal portfolio website built with React and Vite, showcasing data analytics and data scientist skills, projects, and professional achievements.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.10-646CFF?style=flat-square&logo=vite)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6.1.2-0170FE?style=flat-square&logo=antdesign)

## ✨ Features

- **Dark/Light Theme Toggle** - Seamless theme switching with persistent preference
- **Responsive Layout** - Three-column layout with sidebar navigation
- **Dynamic Greeting** - Time-based greeting messages
- **Career Stats Dashboard** - Visual display of experience, certificates, projects, and technologies
- **Project Showcase** - Featured projects carousel
- **Under Construction Pages** - Placeholder pages for upcoming sections

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **UI Components:** Ant Design
- **Styling:** CSS with Styled Components
- **Icons:** React Icons

## 📁 Project Structure

```
src/
├── assets/
│   ├── icons/
│   ├── images/
│   ├── profile/
│   └── resume/
├── components/
│   ├── Layout/          # Main layout wrapper with sidebar management
│   ├── MainContent/     # Home page content with stats and projects
│   ├── RightSidebar/    # Right sidebar component
│   ├── Sidebar/         # Navigation sidebar
│   └── UnderConstruction/ # Placeholder for pages in development
├── App.jsx              # Main app with routing and theme context
├── App.css
├── main.jsx
└── index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lance-data-portfolio.git
   cd lance-data-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📄 Pages

| Route | Description | Status |
|-------|-------------|--------|
| `/` | Home - Main portfolio page with stats and featured projects | ✅ Active |
| `/about` | About Me - Personal information and background | 🚧 Coming Soon |
| `/achievements` | Achievements - Certifications and accomplishments | 🚧 Coming Soon |
| `/projects` | Projects - Detailed project showcase | 🚧 Coming Soon |
| `/blogs` | Blogs - Technical articles and insights | 🚧 Coming Soon |

## 🎨 Customization

### Theme Colors
The portfolio supports both dark and light themes. Theme preference is managed through React Context and can be toggled via the UI.

### Adding Projects
Update the `featuredProjects` array in `src/components/MainContent/MainContent.jsx` to add your projects.

### Career Stats
Modify the `careerStats` array in `MainContent.jsx` to update your statistics.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

Feel free to reach out for collaborations or questions!

---

⭐ If you found this portfolio template helpful, consider giving it a star!
