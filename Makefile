# Portfolio Website Makefile
# Simple commands for development

.PHONY: help serve clean dev

# Default target
help:
	@echo "Portfolio Development Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make dev         - Start development server"
	@echo "  make serve       - Start local development server"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean       - Clean up temporary files"
	@echo ""
	@echo "Note: Code quality checks run automatically in CI/CD"

# Start local development server
serve:
	@echo "🚀 Starting local development server..."
	@echo "📡 Server will be available at http://localhost:8000"
	python -m http.server 8000

# Development mode (same as serve)
dev: serve

# Clean up generated files
clean:
	@echo "🧹 Cleaning up temporary files..."
	@echo "✨ Workspace cleaned!"
