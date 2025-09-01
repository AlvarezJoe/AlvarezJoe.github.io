# 🚀 Joemichael Alvarez - Portfolio Website

> **Senior Data Scientist & MLOps Engineer Portfolio**  
> Built with modern web technologies and optimized for performance

[![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-brightgreen)](https://alvarezjoe.github.io)
[![Performance](https://img.shields.io/badge/performance-optimized-blue)](#performance-features)
[![Responsive](https://img.shields.io/badge/design-responsive-orange)](#features)

## 🌟 Overview

A modern, responsive portfolio website showcasing expertise in data science, machine learning, and MLOps. Features cutting-edge performance optimizations and a clean, professional design.

## 🏗️ Project Structure

```
AlvarezJoe.github.io/
├── 📄 index.html              # Homepage (GitHub Pages root)
├── 📄 README.md               # This file
├── 
├── 📁 pages/                  # All HTML pages
│   ├── about.html             # About & background
│   ├── contact.html           # Contact form
│   ├── experience.html        # Professional experience
│   ├── portfolio.html         # Project showcase
│   └── skills.html            # Technical skills
│
├── 📁 assets/                 # Static assets
│   ├── css/                   # Stylesheets
│   │   ├── main.css           # Main styles (70.74KB)
│   │   ├── critical.css       # Above-fold CSS (1.54KB)
│   │   └── fontawesome-minimal.css # Icons (1.27KB)
│   ├── js/                    # JavaScript
│   │   ├── main-vanilla.js    # Core functionality (10.52KB)
│   │   ├── preloader.js       # Page preloading (4.5KB)
│   │   ├── contact.js         # Contact form (2.75KB)
│   │   ├── resource-optimizer.js # Performance (10.93KB)
│   │   └── image-optimizer.js # Image optimization (5.87KB)
│   ├── sass/                  # SCSS source files
│   └── webfonts/              # Font files
│
├── 📁 images/                 # Media assets
│   ├── avatar.jpg             # Profile image
│   ├── bg.jpg                 # Background
│   ├── thumbs/                # Project thumbnails
│   └── icons/                 # Icon files
│
├── 📁 build/                  # Build output (future)
└── 📁 archive/                # Backup files
```

## ⚡ Performance Features

### 🎯 **Critical Rendering Path Optimization**
- **Critical CSS**: 1.54KB loads immediately for instant rendering
- **Deferred Loading**: Non-critical assets (72KB+) load asynchronously
- **Resource Hints**: DNS prefetch, preconnect for external resources

### 📦 **Bundle Optimization**
- **jQuery Eliminated**: Removed 87.4KB dependency
- **Vanilla JavaScript**: Custom lightweight implementation
- **Total Reduction**: 68% smaller JavaScript bundle

### 🔄 **Advanced Caching**
- **Service Worker**: Aggressive caching with offline support
- **Cache Strategies**: Network-first, cache-first, stale-while-revalidate
- **Intelligent Preloading**: Hover-based prefetching with smart delays

### 🖼️ **Image Optimization**
- **WebP Support**: Automatic detection with fallbacks
- **Lazy Loading**: Intersection Observer with 50px margin
- **Responsive Images**: Multiple formats and sizes

## 🎨 Design Features

### 🎨 **Color Scheme**
- **Primary**: `#0c1446` (Deep Navy)
- **Secondary**: `#1a237e` (Royal Blue)
- **Accent**: `#2b7c85` (Teal)
- **Gradient**: Linear gradient using core brand colors

### 📱 **Responsive Design**
- Mobile-first approach
- Breakpoints for all device sizes
- Touch-optimized interactions
- Flexible grid system

### 🔧 **Modern Features**
- Progressive Web App (PWA) ready
- Service worker caching
- Offline functionality
- App-like experience

## 🚀 Performance Metrics

| Metric | Value | Improvement |
|--------|--------|-------------|
| **JavaScript Bundle** | 34.57KB | -68% (from 109.5KB) |
| **First Contentful Paint** | ~50% faster | Critical CSS |
| **Cache Hit Rate** | ~90%+ | Service Worker |
| **jQuery Dependency** | ❌ Removed | -87.4KB |

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: No framework dependencies
- **SCSS**: Organized stylesheets

### Performance
- **Service Workers**: Caching and offline support
- **Resource Optimization**: Preloading and prefetching
- **Image Optimization**: WebP with fallbacks
- **Critical CSS**: Above-the-fold optimization

### Tools & Workflow
- **Git**: Version control
- **GitHub Pages**: Hosting and deployment
- **VS Code**: Development environment

## 📋 Development

### Prerequisites
- Modern web browser
- Git for version control
- Code editor (VS Code recommended)

### Local Development
```bash
# Clone the repository
git clone https://github.com/AlvarezJoe/AlvarezJoe.github.io.git

# Navigate to project
cd AlvarezJoe.github.io

# Serve locally (Python example)
python -m http.server 8000

# Or use Node.js serve
npx serve .
```

### Branch Structure
- `main`: Production code (auto-deploys to GitHub Pages)
- `refactor`: Current development branch with optimizations
- Feature branches for specific improvements

## 🌐 Deployment

**Automatic Deployment**: GitHub Pages automatically deploys from the `main` branch.

**Live Site**: [https://alvarezjoe.github.io](https://alvarezjoe.github.io)

## 🎯 Core Sections

### 🏠 **Homepage** (`index.html`)
- Hero section with call-to-action
- Skills overview
- Featured projects preview
- Professional summary

### 👤 **About** (`pages/about.html`)
- Professional background
- Personal story
- Values and approach
- Career timeline

### 🛠️ **Skills** (`pages/skills.html`)
- Technical skills matrix
- Programming languages
- Tools and frameworks
- Certifications

### 💼 **Portfolio** (`pages/portfolio.html`)
- Project showcase
- Case studies
- Live demos and source code
- Technical details

### 📈 **Experience** (`pages/experience.html`)
- Professional timeline
- Role responsibilities
- Key achievements
- Company information

### 📧 **Contact** (`pages/contact.html`)
- Contact form with validation
- Professional links
- Location information
- Availability status

## 🔧 Browser Support

- **Modern Browsers**: Full support for Chrome, Firefox, Safari, Edge
- **Service Workers**: Graceful degradation for older browsers
- **Progressive Enhancement**: Core functionality works everywhere
- **Responsive**: Optimized for all screen sizes

## 📈 Future Enhancements

- [ ] **Build Pipeline**: Automated build and optimization
- [ ] **Testing Suite**: Cross-browser and performance testing
- [ ] **Analytics**: User behavior tracking
- [ ] **A/B Testing**: Conversion optimization
- [ ] **Blog Section**: Technical articles and insights
- [ ] **Dark Mode**: Theme switching capability

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contact

**Joemichael Alvarez**  
Senior Data Scientist & MLOps Engineer

- 🌐 **Website**: [alvarezjoe.github.io](https://alvarezjoe.github.io)
- 📧 **Email**: [Contact via website](https://alvarezjoe.github.io/pages/contact.html)
- 💼 **LinkedIn**: [Professional Profile](https://linkedin.com/in/joemichael-alvarez)

---

*Built with ❤️ and optimized for performance*

A modern, responsive portfolio website showcasing data science expertise, machine learning projects, and professional experience.

## 🚀 Overview

This portfolio website highlights my work as a Senior Data Scientist & MLOps Engineer, featuring interactive project showcases, professional experience, and technical skills. Built with performance and accessibility in mind.

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **Icons**: Font Awesome 5
- **Fonts**: Source Sans Pro (Google Fonts)
- **Interactions**: jQuery for enhanced UX
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
├── assets/
│   ├── css/
│   │   ├── main.css           # Main stylesheet
│   │   └── fontawesome-all.min.css
│   ├── js/
│   │   ├── main.js            # Optimized JavaScript
│   │   └── jquery.min.js
│   └── webfonts/              # Font Awesome icons
├── images/
│   ├── thumbs/                # Project thumbnails
│   └── fulls/                 # Full-size project images
├── index.html                 # Homepage
├── about.html                 # About page
├── skills.html               # Technical skills
├── portfolio.html            # Project showcase
├── experience.html           # Professional experience
└── contact.html              # Contact form
```

## ✨ Features

### 🎯 Interactive Portfolio
- **Project Filtering**: Dynamic filter system for project categories
- **Modal Gallery**: Click-through project details and schema viewing
- **Responsive Grid**: Adaptive layout for all screen sizes

### 💼 Professional Experience
- **Collapsible Achievements**: Expandable sections for detailed accomplishments
- **Timeline Layout**: Clear progression of career milestones
- **Role Descriptions**: Comprehensive overview of responsibilities

### 📱 Modern UI/UX
- **Smooth Animations**: CSS transitions and hover effects
- **Mobile Responsive**: Optimized for all devices
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized assets and minimal dependencies

### 🎨 Design System
- **Color Variables**: Consistent theming with CSS custom properties
- **Typography**: Professional font hierarchy
- **Button Styles**: Unified button components
- **Card Layouts**: Consistent project and experience cards

## 🔧 Optimization Features

### Performance Enhancements
- **Reduced JavaScript**: Streamlined from 5 files to 2 files
- **Optimized CSS**: Removed unused template code (355+ lines)
- **Image Optimization**: Compressed images for faster loading
- **Minimal Dependencies**: Only essential libraries included

### Code Quality
- **Modern JavaScript**: ES6+ features with jQuery integration
- **CSS Organization**: Logical structure with CSS custom properties
- **Clean HTML**: Semantic markup with proper accessibility
- **Version Control**: Git workflow with feature branches

## 🌐 Live Features

- **Contact Integration**: EmailJS integration with mailto fallback (Planned)
- **External Links**: Portfolio projects link to live demos and repositories
- **Schema Visualization**: Interactive database schema viewing
- **Scroll Preservation**: Modal interactions preserve page position

## 📈 Projects Highlighted

1. **Deep Learning Hyperparameter Tuning** - Published technical article
2. **Airbnb Market Intelligence** - Tableau dashboard with analytics
3. **Healthcare Sentiment Analysis** - NLP and LLM implementation
4. **Big Data Analytics** - Apache Spark processing pipeline
5. **Enterprise Database Design** - Scalable data architecture

## 🎓 Professional Background

- **Lennar Corporation** - Senior Data Scientist & Data Scientist II
- **Boeing Distribution Services** - Financial Analyst II
- **MLOps Infrastructure** - Production model deployment and monitoring
- **AI/ML Applications** - RAG systems, computer vision, NLP

## 📞 Contact

- **Email**: alvarez.joemichael@gmail.com
- **LinkedIn**: [Professional Profile]
- **GitHub**: [Project Repositories]
- **Portfolio**: [Live Website]

## 🔄 Recent Updates

- Refactored JavaScript architecture for better performance
- Implemented responsive design improvements
- Added interactive project filtering
- Enhanced accessibility features
- Optimized asset loading and file structure

---

*Built with attention to detail and optimized for performance. Showcasing the intersection of data science expertise and modern web development.*
