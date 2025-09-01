// Image Optimization Utility
// Provides WebP support detection and lazy loading

class ImageOptimizer {
    constructor() {
        this.webpSupported = false;
        this.init();
    }
    
    async init() {
        this.webpSupported = await this.checkWebPSupport();
        this.optimizeImages();
        this.setupLazyLoading();
    }
    
    // Check WebP support
    checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    // Optimize all images on the page
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            this.optimizeImage(img);
        });
    }
    
    // Optimize individual image
    optimizeImage(img) {
        const originalSrc = img.src || img.getAttribute('data-src');
        if (!originalSrc) return;
        
        // Create responsive image with multiple sources
        if (this.webpSupported && !originalSrc.includes('.webp')) {
            this.createResponsiveImage(img, originalSrc);
        }
        
        // Add lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        } else {
            this.addLazyLoading(img);
        }
        
        // Add compression attributes
        img.style.imageRendering = 'auto';
        img.style.imageRendering = '-webkit-optimize-contrast';
    }
    
    // Create responsive image with WebP support
    createResponsiveImage(img, originalSrc) {
        // Don't modify if already processed
        if (img.parentElement.tagName === 'PICTURE') return;
        
        const picture = document.createElement('picture');
        
        // WebP source
        const webpSource = document.createElement('source');
        webpSource.type = 'image/webp';
        webpSource.srcset = this.getWebPUrl(originalSrc);
        picture.appendChild(webpSource);
        
        // Fallback source
        const fallbackSource = document.createElement('source');
        fallbackSource.srcset = originalSrc;
        picture.appendChild(fallbackSource);
        
        // Move img into picture element
        img.parentNode.insertBefore(picture, img);
        picture.appendChild(img);
        
        // Update img src to WebP if supported
        if (this.webpSupported) {
            img.src = this.getWebPUrl(originalSrc);
        }
    }
    
    // Generate WebP URL
    getWebPUrl(originalUrl) {
        return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    // Setup intersection observer for lazy loading
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            // Observe images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Add lazy loading to image
    addLazyLoading(img) {
        if (img.src) {
            img.setAttribute('data-src', img.src);
            img.src = this.createPlaceholder(img.width || 300, img.height || 200);
        }
    }
    
    // Load lazy image
    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    }
    
    // Create placeholder for lazy images
    createPlaceholder(width = 300, height = 200) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);
        
        // Add loading indicator
        ctx.fillStyle = '#ccc';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Loading...', width / 2, height / 2);
        
        return canvas.toDataURL();
    }
    
    // Progressive enhancement for better image loading
    enhanceImageLoading() {
        const style = document.createElement('style');
        style.textContent = `
            img {
                transition: opacity 0.3s ease;
            }
            
            img[data-src] {
                opacity: 0.5;
                filter: blur(2px);
            }
            
            img.loaded {
                opacity: 1;
                filter: none;
            }
            
            /* Responsive images */
            img {
                max-width: 100%;
                height: auto;
            }
            
            /* Reduce image quality on slow connections */
            @media (max-resolution: 1dppx) {
                img {
                    image-rendering: optimizeQuality;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ImageOptimizer();
    });
} else {
    new ImageOptimizer();
}
