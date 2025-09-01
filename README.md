# Joemichael Alvarez

> Senior Data Scientist & MLOps Engineer Portfolio

[![Live Site](https://img.shields.io/badge/live-alvarezjoe.github.io-blue)](https://alvarezjoe.github.io)
[![Deploy Status](https://github.com/AlvarezJoe/AlvarezJoe.github.io/workflows/Code%20Quality%20%26%20Deploy/badge.svg)](https://github.com/AlvarezJoe/AlvarezJoe.github.io/actions)

## About

Professional portfolio showcasing data science projects, machine learning solutions, and MLOps expertise. Features automated code quality, testing, and deployment pipeline.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: SCSS with responsive design  
- **Quality**: Prettier, ESLint, Stylelint, HTMLHint
- **Testing**: HTML validation, accessibility, performance
- **CI/CD**: GitHub Actions with quality gates
- **Hosting**: GitHub Pages

## Quick Start

```bash
git clone https://github.com/AlvarezJoe/AlvarezJoe.github.io.git
cd AlvarezJoe.github.io
make help
```

## Development Commands

```bash
# Development
make help        # Show all commands
make serve       # Start local server (requires Python)
make dev         # Development info and setup

# Code Quality (requires Node.js)
make install     # Install dependencies  
make lint        # Run all linters
make format      # Auto-format code
make check       # Check formatting
make pre-commit  # Run pre-commit checks

# Testing
make test        # Run all tests
make test-html   # HTML validation

# Utilities
make clean       # Clean temporary files
```

## Project Structure

```
├── .config/              # Configuration files
├── .github/workflows/    # CI/CD automation
├── assets/              # Stylesheets and scripts
├── images/              # Media assets
├── pages/               # Portfolio pages
├── Makefile            # Development commands
├── package.json        # Dependencies
└── index.html          # Main entry point
```

## Deployment Pipeline

**Quality Gates**: All changes must pass before deployment:
- ✅ Code linting (HTML, CSS, JavaScript)
- ✅ HTML validation and accessibility checks  
- ✅ Code formatting verification
- ✅ Automated testing suite
- ✅ Performance validation

**Workflow**: `Push → Lint → Test → Format → Deploy → Live`

**Custom GitHub Pages Deployment**: Uses GitHub Actions instead of default Pages build for quality control.

## Contact

**Website**: [alvarezjoe.github.io](https://alvarezjoe.github.io)  
**Email**: [Contact Form](https://alvarezjoe.github.io/pages/contact.html)  
**LinkedIn**: [joemichael-alvarez](https://linkedin.com/in/joemichael-alvarez)
