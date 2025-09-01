// Resource Loading Optimizer
// Implements advanced loading strategies for maximum performance

class ResourceOptimizer {
    constructor() {
        this.loadQueue = [];
        this.loaded = new Set();
        this.critical = new Set();
        this.observers = {};
        
        this.init();
    }
    
    init() {
        this.setupCriticalResources();
        this.setupLazyLoading();
        this.setupPrefetching();
        this.setupServiceWorker();
        this.optimizeWebFonts();
    }
    
    // Mark critical resources for immediate loading
    setupCriticalResources() {
        this.critical.add('/assets/css/critical.css');
        this.critical.add('/assets/js/main-vanilla.js');
        this.critical.add('/images/avatar.jpg');
        
        // Load critical resources with high priority
        this.critical.forEach(resource => {
            this.loadResource(resource, { priority: 'high' });
        });
    }
    
    // Setup intersection observer for lazy loading
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.observers.lazy = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadLazyResource(entry.target);
                        this.observers.lazy.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            // Observe all lazy-loadable elements
            document.querySelectorAll('[data-lazy]').forEach(el => {
                this.observers.lazy.observe(el);
            });
        }
    }
    
    // Setup intelligent prefetching
    setupPrefetching() {
        // Prefetch on visible links
        if ('IntersectionObserver' in window) {
            this.observers.prefetch = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.prefetchResource(entry.target.href);
                    }
                });
            }, {
                rootMargin: '200px 0px'
            });
            
            // Observe all navigation links
            document.querySelectorAll('a[href*=".html"]').forEach(link => {
                this.observers.prefetch.observe(link);
            });
        }
        
        // Prefetch on idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.prefetchSecondaryResources();
            });
        } else {
            setTimeout(() => this.prefetchSecondaryResources(), 2000);
        }
    }
    
    // Register and activate service worker
    async setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                });
                
                console.log('Service Worker registered:', registration.scope);
                
                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    console.log('Service Worker update available');
                });
                
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }
    
    // Optimize web font loading
    optimizeWebFonts() {
        // Use font-display: swap for better perceived performance
        const fontStyle = document.createElement('style');
        fontStyle.textContent = `
            @font-face {
                font-family: 'Inter';
                font-display: swap;
                src: url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            }
        `;
        document.head.appendChild(fontStyle);
        
        // Preload critical fonts
        const fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.as = 'font';
        fontPreload.type = 'font/woff2';
        fontPreload.crossOrigin = 'anonymous';
        fontPreload.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
        document.head.appendChild(fontPreload);
    }
    
    // Load resource with specified priority
    loadResource(url, options = {}) {
        if (this.loaded.has(url)) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            if (url.endsWith('.css')) {
                this.loadCSS(url, options).then(resolve).catch(reject);
            } else if (url.endsWith('.js')) {
                this.loadJS(url, options).then(resolve).catch(reject);
            } else if (this.isImage(url)) {
                this.loadImage(url, options).then(resolve).catch(reject);
            } else {
                this.prefetchResource(url).then(resolve).catch(reject);
            }
        });
    }
    
    // Load CSS with performance optimizations
    loadCSS(url, options = {}) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            
            if (options.priority === 'high') {
                link.setAttribute('importance', 'high');
            }
            
            link.onload = () => {
                this.loaded.add(url);
                resolve();
            };
            link.onerror = reject;
            
            document.head.appendChild(link);
        });
    }
    
    // Load JavaScript with performance optimizations
    loadJS(url, options = {}) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.defer = true;
            
            if (options.priority === 'high') {
                script.setAttribute('importance', 'high');
            }
            
            script.onload = () => {
                this.loaded.add(url);
                resolve();
            };
            script.onerror = reject;
            
            document.head.appendChild(script);
        });
    }
    
    // Load image with optimization
    loadImage(url, options = {}) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.loaded.add(url);
                resolve();
            };
            img.onerror = reject;
            
            // Use WebP if supported
            if (this.supportsWebP() && !url.includes('.webp')) {
                const webpUrl = url.replace(/\.(jpg|jpeg|png)$/, '.webp');
                img.src = webpUrl;
                
                img.onerror = () => {
                    // Fallback to original format
                    img.src = url;
                };
            } else {
                img.src = url;
            }
        });
    }
    
    // Prefetch resource without blocking
    prefetchResource(url) {
        if (this.loaded.has(url) || !url || url.startsWith('#')) return Promise.resolve();
        
        return new Promise((resolve) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            link.onload = () => {
                this.loaded.add(url);
                resolve();
            };
            link.onerror = resolve; // Don't fail on prefetch errors
            
            document.head.appendChild(link);
        });
    }
    
    // Load lazy resource when visible
    loadLazyResource(element) {
        const url = element.dataset.lazy;
        if (!url) return;
        
        if (element.tagName === 'IMG') {
            element.src = url;
            element.removeAttribute('data-lazy');
        } else if (element.tagName === 'LINK') {
            element.href = url;
            element.removeAttribute('data-lazy');
        }
    }
    
    // Prefetch secondary resources during idle time
    prefetchSecondaryResources() {
        const secondaryResources = [
            '/about.html',
            '/portfolio.html',
            '/skills.html',
            '/experience.html',
            '/contact.html',
            '/assets/css/main.css',
            '/images/bg.jpg'
        ];
        
        secondaryResources.forEach(resource => {
            this.prefetchResource(resource);
        });
    }
    
    // Utility functions
    isImage(url) {
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    }
    
    supportsWebP() {
        if (this._webpSupport !== undefined) return this._webpSupport;
        
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        this._webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        
        return this._webpSupport;
    }
    
    // Performance monitoring
    measurePerformance() {
        if ('performance' in window && 'measure' in performance) {
            // Measure key metrics
            performance.mark('resource-optimizer-complete');
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    const resources = performance.getEntriesByType('resource');
                    
                    console.log('Performance Metrics:', {
                        'Page Load Time': `${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`,
                        'DOM Content Loaded': `${Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart)}ms`,
                        'First Paint': this.getFirstPaint(),
                        'Resources Loaded': resources.length,
                        'Cached Resources': this.loaded.size
                    });
                }, 1000);
            });
        }
    }
    
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? `${Math.round(firstPaint.startTime)}ms` : 'N/A';
    }
}

// Initialize resource optimizer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.resourceOptimizer = new ResourceOptimizer();
        window.resourceOptimizer.measurePerformance();
    });
} else {
    window.resourceOptimizer = new ResourceOptimizer();
    window.resourceOptimizer.measurePerformance();
}
