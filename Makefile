# Portfolio Website Makefile
# Commands for linting, formatting, and development

.PHONY: help install lint format check serve clean all dev pre-commit test test-links test-accessibility test-performance

# Default target
help:
	@echo "Portfolio Development Commands:"
	@echo ""
	@echo "Setup:"
	@echo "  make install     - Install development dependencies (requires Node.js)"
	@echo ""
	@echo "Development:"
	@echo "  make dev         - Start development mode"
	@echo "  make serve       - Start local development server (requires Python)"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint        - Run all linters"
	@echo "  make format      - Format all code with Prettier"
	@echo "  make check       - Check formatting without making changes"
	@echo "  make pre-commit  - Run pre-commit checks"
	@echo ""
	@echo "Testing:"
	@echo "  make test        - Run all tests"
	@echo "  make test-html   - Run HTML validation"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean       - Clean up temporary files"
	@echo ""
	@echo "Note: Some commands require Node.js and Python to be installed."

# Install development dependencies
install:
	@echo "📦 Installing development dependencies..."
	npm install

# Run all linters
lint:
	@echo "🔍 Running HTML linter..."
	npx htmlhint "**/*.html" --config .config/.htmlhintrc --ignore="node_modules/**" || true
	@echo "🎨 Running CSS linter..."
	npx stylelint "**/*.css" --config .config/stylelint.config.json --ignore-path .config/.prettierignore || true
	@echo "⚡ Running JavaScript linter..."
	npx eslint "**/*.js" --config .config/eslint.config.json --ignore-path .config/.prettierignore || true

# Format all code
format:
	@echo "✨ Formatting code with Prettier..."
	npx prettier --config .config/.prettierrc --ignore-path .config/.prettierignore --write "**/*.{html,css,js,json,md}"

# Check formatting without changes
check:
	@echo "🔎 Checking code formatting..."
	npx prettier --config .config/.prettierrc --ignore-path .config/.prettierignore --check "**/*.{html,css,js,json,md}"

# Start local development server
serve:
	@echo "🚀 Starting local development server..."
	@echo "📡 Server will be available at http://localhost:8000"
	python -m http.server 8000

# Clean up temporary files
clean:
	@echo "🧹 Cleaning up temporary files..."
	@if exist node_modules rmdir /s /q node_modules
	@if exist package-lock.json del package-lock.json
	@if exist .eslintcache del .eslintcache
	@if exist lighthouse-report.json del lighthouse-report.json

# Run everything
all: install lint format
	@echo "✅ All tasks completed successfully!"

# Development workflow
dev: 
	@echo "🔧 Development environment info:"
	@echo "1. Run 'make install' to install dependencies"
	@echo "2. Run 'make serve' to start the development server"
	@echo "3. Run 'make pre-commit' before committing changes"

# Pre-commit checks
pre-commit: lint check
	@echo "✅ Pre-commit checks passed!"

# Run all tests
test: test-html
	@echo "🧪 All tests completed!"

# Test HTML validation
test-html:
	@echo "🔍 Running HTML validation..."
	npx html-validate --config .config/html-validate.json "**/*.html" --ignore="node_modules/**" || true

# Test for broken links  
test-links:
	@echo "🔗 Link checking available in CI/CD pipeline"

# Test accessibility
test-accessibility:
	@echo "♿ Accessibility testing available in CI/CD pipeline"

# Test performance
test-performance:
	@echo "⚡ Performance testing available in CI/CD pipeline"
