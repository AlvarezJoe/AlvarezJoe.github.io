/*
 * Contact Form Functionality
 * Lightweight script for contact.html
 */

(function() {
    'use strict';

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    ready(function() {
        initContactForm();
    });

    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                projectType: document.getElementById('project-type').value,
                message: document.getElementById('message').value
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
                        form.reset();
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
            document.getElementById('contact-form').reset();
            alert('Email client opened. Please send the message from your email application.');
        }, 500);
    }

})();
