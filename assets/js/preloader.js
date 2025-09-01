/*
 * Page Preloader
 * Preloads pages and their associated images when user hovers over navigation links
 */

(function () {
  'use strict';

  // Track what we've already preloaded to avoid duplicates
  const preloadedPages = new Set();
  const preloadedImages = new Set();

  // Configuration
  const HOVER_DELAY = 150; // Wait 150ms before preloading (avoid accidental hovers)
  const MAX_PRELOADS = 8; // Increased to allow for images
  let currentPreloads = 0;

  // Define images associated with each page
  const pageImageMap = {
    'pages/about.html': ['images/avatar.jpg'],
    'pages/portfolio.html': [
      'images/thumbs/NN_Thumbnail.jpg',
      'images/fulls/NN_Tuner.png',
      'images/thumbs/tuning_deep_learning.png',
      'images/thumbs/airbnb.jpeg',
      'images/thumbs/sentiment_analysis.png',
      'images/thumbs/google_play.png',
      'images/thumbs/movie_theater.jpg',
      'images/fulls/movie_theater_diagram.png',
    ],
    'pages/experience.html': [],
    'pages/skills.html': [
      'images/icons/Tableau.png', // If this icon is used
    ],
    'pages/contact.html': [],
  };

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    initPagePreloader();
  });

  function initPagePreloader() {
    // Get all navigation links and main content links
    const navLinks = document.querySelectorAll(
      '.nav-link, .btn-primary, .tab-btn'
    );

    navLinks.forEach(function (link) {
      let hoverTimeout;

      link.addEventListener('mouseenter', function () {
        const href = this.getAttribute('href');

        // Only preload internal HTML pages
        if (
          href &&
          href.endsWith('.html') &&
          !href.startsWith('http') &&
          !href.startsWith('mailto:') &&
          !preloadedPages.has(href) &&
          currentPreloads < MAX_PRELOADS
        ) {
          // Delay preloading to avoid accidental hovers
          hoverTimeout = setTimeout(function () {
            preloadPage(href);
          }, HOVER_DELAY);
        }
      });

      // Cancel preload if user moves mouse away quickly
      link.addEventListener('mouseleave', function () {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }
      });
    });
  }

  function preloadPage(url) {
    if (preloadedPages.has(url) || currentPreloads >= MAX_PRELOADS) {
      return;
    }

    preloadedPages.add(url);
    currentPreloads++;

    // Method 1: Link prefetch (modern browsers)
    if (document.head.querySelector) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'prefetch';
      linkElement.href = url;
      linkElement.as = 'document';

      linkElement.onload = function () {
        currentPreloads--;
        // console.log('✅ Preloaded page:', url);

        // After page is preloaded, preload its images
        preloadPageImages(url);
      };

      linkElement.onerror = function () {
        currentPreloads--;
        preloadedPages.delete(url); // Allow retry
        console.warn('Failed to preload:', url);
      };

      document.head.appendChild(linkElement);
    }
    // Method 2: Fetch fallback for older browsers
    else {
      fetch(url, {
        method: 'GET',
        cache: 'force-cache',
      })
        .then(function (response) {
          currentPreloads--;
          if (response.ok) {
            // console.log('Preloaded via fetch:', url);
            preloadPageImages(url);
          } else {
            preloadedPages.delete(url); // Allow retry
          }
        })
        .catch(function (error) {
          currentPreloads--;
          preloadedPages.delete(url); // Allow retry
          console.warn('Fetch preload failed:', url, error);
        });
    }
  }

  function preloadPageImages(pageUrl) {
    const images = pageImageMap[pageUrl];
    if (!images || images.length === 0) {
      return;
    }

    // Prioritize thumbnail images first (visible immediately), then full images
    const thumbnails = images.filter((img) => img.includes('/thumbs/'));
    const fullImages = images.filter((img) => !img.includes('/thumbs/'));

    // Preload thumbnails immediately
    thumbnails.forEach(function (imagePath) {
      preloadImage(imagePath);
    });

    // Preload full images with a slight delay
    setTimeout(function () {
      fullImages.forEach(function (imagePath) {
        preloadImage(imagePath);
      });
    }, 200);
  }

  function preloadImage(imagePath) {
    if (preloadedImages.has(imagePath)) {
      return;
    }

    preloadedImages.add(imagePath);

    // Use Image object for image preloading
    const img = new Image();
    img.onload = function () {
      // console.log('🖼️ Preloaded image:', imagePath);
    };
    img.onerror = function () {
      preloadedImages.delete(imagePath); // Allow retry
      console.warn('Failed to preload image:', imagePath);
    };
    img.src = imagePath;
  }

  // Preload critical resources immediately
  function preloadCriticalResources() {
    const criticalPages = [
      'pages/portfolio.html', // Most likely next page from home
      'pages/about.html', // Common second page
    ];

    // Only preload if we're on the homepage
    if (
      window.location.pathname.includes('index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname.endsWith('/')
    ) {
      criticalPages.forEach(function (page) {
        // Small delay to not interfere with initial page load
        setTimeout(function () {
          preloadPage(page);
        }, 1000);
      });

      // Also preload the avatar image immediately since it's commonly accessed
      setTimeout(function () {
        preloadImage('images/avatar.jpg');
      }, 500);
    }
  }

  // Start preloading critical resources after page loads
  ready(function () {
    setTimeout(preloadCriticalResources, 2000);
  });
})();
