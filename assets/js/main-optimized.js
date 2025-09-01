/*
 * Streamlined JavaScript for Joemichael Alvarez Portfolio
 * Optimized and refactored for better performance
 */

(function($) {
    'use strict';

    // Initialize when DOM is ready
    $(document).ready(function() {
        
        // Remove preload class when page loads
        setTimeout(function() {
            $('body').removeClass('is-preload');
        }, 100);

        // Portfolio filter functionality
        initPortfolioFilters();
        
        // Experience page collapsible achievements
        initCollapsibleAchievements();
        
        // Contact form handling
        initContactForm();
        
        // Initialize carousel if present
        initCarousel();
    });

    // Portfolio Filter System
    function initPortfolioFilters() {
        $('.tab-btn').on('click', function() {
            const filter = $(this).data('filter');
            
            // Update active state
            $('.tab-btn').removeClass('active');
            $(this).addClass('active');
            
            // Filter projects
            if (filter === 'all') {
                $('.project-card').show();
            } else {
                $('.project-card').hide();
                $('.project-card[data-category="' + filter + '"]').show();
            }
        });
    }

    // Collapsible Achievements Functionality
    function initCollapsibleAchievements() {
        $('.achievements-toggle').on('click', function() {
            const $this = $(this);
            const $content = $this.next('.achievements-content');
            const $icon = $this.find('.toggle-icon');
            
            $content.slideToggle(300);
            $icon.text($icon.text() === '+' ? '−' : '+');
        });
    }

    // Contact Form Handler
    function initContactForm() {
        $('#contact-form').on('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                company: $('#company').val(),
                projectType: $('#project-type').val(),
                message: $('#message').val()
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Option 1: EmailJS Integration (when configured)
            if (typeof emailjs !== 'undefined' && window.emailjsConfig) {
                emailjs.send(window.emailjsConfig.serviceId, window.emailjsConfig.templateId, formData)
                    .then(function(response) {
                        alert('Message sent successfully!');
                        $('#contact-form')[0].reset();
                    })
                    .catch(function(error) {
                        console.error('EmailJS error:', error);
                        fallbackToMailto(formData);
                    });
            } else {
                // Option 2: Fallback to mailto
                fallbackToMailto(formData);
            }
        });
    }

    // Fallback mailto function
    function fallbackToMailto(formData) {
        const subject = encodeURIComponent(`New Contact from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Company: ${formData.company}\n` +
            `Project Type: ${formData.projectType}\n\n` +
            `Message:\n${formData.message}`
        );
        
        window.location.href = `mailto:alvarez.joemichael@gmail.com?subject=${subject}&body=${body}`;
        
        // Reset form and show success message
        setTimeout(function() {
            $('#contact-form')[0].reset();
            alert('Email client opened. Please send the message from your email application.');
        }, 500);
    }

    // Simple Carousel Implementation
    function initCarousel() {
        let currentSlide = 0;
        const $carousel = $('.carousel-container');
        const $slides = $('.carousel-slide');
        const $indicators = $('.indicator');
        
        if ($slides.length === 0) return;

        // Show initial slide
        $slides.eq(0).addClass('active');
        $indicators.eq(0).addClass('active');

        // Auto-advance carousel
        setInterval(function() {
            currentSlide = (currentSlide + 1) % $slides.length;
            updateCarousel();
        }, 4000);

        // Indicator click handlers
        $indicators.on('click', function() {
            currentSlide = $(this).index();
            updateCarousel();
        });

        function updateCarousel() {
            $slides.removeClass('active').eq(currentSlide).addClass('active');
            $indicators.removeClass('active').eq(currentSlide).addClass('active');
        }
    }

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 600);
        }
    });

    // Add scroll effects for navbar
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        const $navbar = $('.navbar');
        
        if (scrolled > 50) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });

})(jQuery);
