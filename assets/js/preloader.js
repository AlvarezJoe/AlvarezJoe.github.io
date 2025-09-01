/*
 * Page Preloader
 * Preloads pages when user hovers over navigation links
 */

(function() {
    'use strict';

    // Track what we've already preloaded to avoid duplicates
    const preloadedPages = new Set();
    
    // Configuration
    const HOVER_DELAY = 150; // Wait 150ms before preloading (avoid accidental hovers)
    const MAX_PRELOADS = 5;  // Limit concurrent preloads
    let currentPreloads = 0;

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    ready(function() {
        initPagePreloader();
    });

    function initPagePreloader() {
        // Get all navigation links and main content links
        const navLinks = document.querySelectorAll('.nav-link, .btn-primary, .tab-btn');
        
        navLinks.forEach(function(link) {
            let hoverTimeout;
            
            link.addEventListener('mouseenter', function() {
                const href = this.getAttribute('href');
                
                // Only preload internal HTML pages
                if (href && 
                    href.endsWith('.html') && 
                    !href.startsWith('http') && 
                    !href.startsWith('mailto:') &&
                    !preloadedPages.has(href) &&
                    currentPreloads < MAX_PRELOADS) {
                    
                    // Delay preloading to avoid accidental hovers
                    hoverTimeout = setTimeout(function() {
                        preloadPage(href);
                    }, HOVER_DELAY);
                }
            });
            
            // Cancel preload if user moves mouse away quickly
            link.addEventListener('mouseleave', function() {
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
            
            linkElement.onload = function() {
                currentPreloads--;
                // console.log('Preloaded:', url);
            };
            
            linkElement.onerror = function() {
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
                cache: 'force-cache'
            })
            .then(function(response) {
                currentPreloads--;
                if (response.ok) {
                    // console.log('Preloaded via fetch:', url);
                } else {
                    preloadedPages.delete(url); // Allow retry
                }
            })
            .catch(function(error) {
                currentPreloads--;
                preloadedPages.delete(url); // Allow retry
                console.warn('Fetch preload failed:', url, error);
            });
        }
    }

    // Preload critical resources immediately
    function preloadCriticalResources() {
        const criticalPages = [
            'portfolio.html',  // Most likely next page from home
            'about.html'       // Common second page
        ];

        // Only preload if we're on the homepage
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname === '/' ||
            window.location.pathname.endsWith('/')) {
            
            criticalPages.forEach(function(page) {
                // Small delay to not interfere with initial page load
                setTimeout(function() {
                    preloadPage(page);
                }, 1000);
            });
        }
    }

    // Start preloading critical resources after page loads
    ready(function() {
        setTimeout(preloadCriticalResources, 2000);
    });

})();
