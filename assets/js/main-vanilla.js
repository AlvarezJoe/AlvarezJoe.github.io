/*
 * Vanilla JavaScript for Joemichael Alvarez Portfolio
 * Lightweight replacement for jQuery-based functionality
 */

(function () {
  'use strict';

  // Helper functions
  function $(selector) {
    if (selector.startsWith('#')) {
      return document.getElementById(selector.slice(1));
    }
    return document.querySelectorAll(selector);
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function addClass(element, className) {
    if (element && element.classList) {
      element.classList.add(className);
    }
  }

  function removeClass(element, className) {
    if (element && element.classList) {
      element.classList.remove(className);
    }
  }

  function toggleClass(element, className) {
    if (element && element.classList) {
      element.classList.toggle(className);
    }
  }

  function hasClass(element, className) {
    return (
      element && element.classList && element.classList.contains(className)
    );
  }

  // Initialize when DOM is ready
  ready(function () {
    // Remove preload class when page loads
    setTimeout(function () {
      removeClass(document.body, 'is-preload');
    }, 100);

    // Initialize functionality
    initPortfolioFilters();
    initCollapsibleAchievements();
    initSmoothScrolling();
    initNavbarScroll();
    initSchemaModal();
    initPagePreloader();
  });

  // Portfolio Filter System
  function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active state
        filterButtons.forEach(function (btn) {
          removeClass(btn, 'active');
        });
        addClass(this, 'active');

        // Filter projects
        projectCards.forEach(function (card) {
          if (
            filter === 'all' ||
            card.getAttribute('data-category') === filter
          ) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Collapsible Achievements Functionality
  function initCollapsibleAchievements() {
    const toggleButtons = document.querySelectorAll('.achievements-toggle');

    toggleButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.toggle-icon');

        if (content && content.classList.contains('achievements-content')) {
          toggleClass(content, 'expanded');

          if (hasClass(content, 'expanded')) {
            icon.textContent = '−'; // Minus when expanded
          } else {
            icon.textContent = '+'; // Plus when collapsed
          }
        }
      });
    });
  }

  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // Add scroll effects for navbar
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
          addClass(navbar, 'scrolled');
        } else {
          removeClass(navbar, 'scrolled');
        }
      });
    }
  }

  // Schema Modal Functions (Portfolio page)
  let scrollPosition = 0;

  function initSchemaModal() {
    const modal = $('#schemaModal');
    if (!modal) return;

    // Make functions global for onclick handlers
    window.openSchemaModal = function () {
      scrollPosition = window.scrollY;

      // Prevent background scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = -scrollPosition + 'px';
      document.body.style.width = '100%';

      modal.style.display = 'block';
      // Fade in effect
      setTimeout(function () {
        modal.style.opacity = '1';
      }, 10);
    };

    window.closeSchemaModal = function () {
      // Fade out effect
      modal.style.opacity = '0';

      setTimeout(function () {
        modal.style.display = 'none';

        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
      }, 300);
    };

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        window.closeSchemaModal();
      }
    });
  }

  // Simple Carousel Implementation (if needed)
  function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    // Show initial slide
    addClass(slides[0], 'active');
    if (indicators[0]) addClass(indicators[0], 'active');

    function updateCarousel() {
      slides.forEach(function (slide) {
        removeClass(slide, 'active');
      });
      indicators.forEach(function (indicator) {
        removeClass(indicator, 'active');
      });

      addClass(slides[currentSlide], 'active');
      if (indicators[currentSlide]) {
        addClass(indicators[currentSlide], 'active');
      }
    }

    // Auto-advance carousel
    setInterval(function () {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }, 4000);

    // Indicator click handlers
    indicators.forEach(function (indicator, index) {
      indicator.addEventListener('click', function () {
        currentSlide = index;
        updateCarousel();
      });
    });
  }

  // Page Preloader - Preload pages on hover for faster navigation
  function initPagePreloader() {
    const preloadedPages = new Set();
    const HOVER_DELAY = 150;
    const MAX_PRELOADS = 3;
    let currentPreloads = 0;

    // Get navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn-primary');

    navLinks.forEach(function (link) {
      let hoverTimeout;

      link.addEventListener('mouseenter', function () {
        const href = this.getAttribute('href');

        if (
          href &&
          href.endsWith('.html') &&
          !href.startsWith('http') &&
          !href.startsWith('mailto:') &&
          !preloadedPages.has(href) &&
          currentPreloads < MAX_PRELOADS
        ) {
          hoverTimeout = setTimeout(function () {
            preloadPage(href);
          }, HOVER_DELAY);
        }
      });

      link.addEventListener('mouseleave', function () {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }
      });
    });

    function preloadPage(url) {
      if (preloadedPages.has(url) || currentPreloads >= MAX_PRELOADS) {
        return;
      }

      preloadedPages.add(url);
      currentPreloads++;

      const linkElement = document.createElement('link');
      linkElement.rel = 'prefetch';
      linkElement.href = url;
      linkElement.as = 'document';

      linkElement.onload = function () {
        currentPreloads--;
      };

      linkElement.onerror = function () {
        currentPreloads--;
        preloadedPages.delete(url);
      };

      document.head.appendChild(linkElement);
    }

    // Preload most likely next pages after initial load
    setTimeout(function () {
      const currentPage = window.location.pathname;
      let preloadTargets = [];

      if (
        currentPage.includes('index.html') ||
        currentPage === '/' ||
        currentPage.endsWith('/')
      ) {
        preloadTargets = ['portfolio.html', 'about.html'];
      } else if (currentPage.includes('portfolio.html')) {
        preloadTargets = ['experience.html', 'contact.html'];
      } else if (currentPage.includes('about.html')) {
        preloadTargets = ['skills.html', 'portfolio.html'];
      }

      preloadTargets.forEach(function (target) {
        setTimeout(function () {
          preloadPage(target);
        }, 500);
      });
    }, 2000);
  }
})();
