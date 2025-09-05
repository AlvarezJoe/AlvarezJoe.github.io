/*
 * Contact Form Functionality with EmailJS Integration
 * Handles form submission and email sending
 */

(function () {
  'use strict';

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    publicKey: 'Z6BOz6gaOClEPhabJ',
    serviceId: 'service_spsje28',
    templateId: 'template_hoyf9e1',
  };

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    initEmailJS();
    initContactForm();
  });

  function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      console.log('EmailJS initialized successfully');
    } else {
      console.error('EmailJS library not loaded');
    }
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Clear any existing messages
    clearMessages();

    // Get form data
    const formData = getFormData();

    // Validate form
    if (!validateForm(formData)) {
      return;
    }

    // Show loading state
    setLoadingState(submitButton, true);

    // Send email via EmailJS
    sendEmail(formData)
      .then(() => {
        showSuccessMessage();
        resetForm();
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        showErrorMessage();
      })
      .finally(() => {
        setLoadingState(submitButton, false, originalButtonText);
      });
  }

  function getFormData() {
    return {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      company: document.getElementById('company').value.trim(),
      project_type: document.getElementById('project-type').value,
      message: document.getElementById('message').value.trim(),
    };
  }

  function validateForm(data) {
    // Check required fields
    if (!data.name) {
      showFieldError('name', 'Name is required');
      return false;
    }

    if (!data.email) {
      showFieldError('email', 'Email is required');
      return false;
    }

    if (!isValidEmail(data.email)) {
      showFieldError('email', 'Please enter a valid email address');
      return false;
    }

    if (!data.message) {
      showFieldError('message', 'Message is required');
      return false;
    }

    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function sendEmail(formData) {
    return emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      formData
    );
  }

  function setLoadingState(
    button,
    isLoading,
    originalText = "Let's Collaborate"
  ) {
    if (isLoading) {
      button.disabled = true;
      button.textContent = 'Sending...';
      button.classList.add('loading');
    } else {
      button.disabled = false;
      button.textContent = originalText;
      button.classList.remove('loading');
    }
  }

  function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const message = document.createElement('div');
    message.className = 'form-message form-success';
    message.innerHTML = `
      <p><strong>✅ Message sent successfully!</strong></p>
      <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
    `;
    form.parentNode.insertBefore(message, form);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 8000);
  }

  function showErrorMessage() {
    const form = document.getElementById('contact-form');
    const message = document.createElement('div');
    message.className = 'form-message form-error';
    message.innerHTML = `
      <p><strong>❌ Something went wrong</strong></p>
      <p>Please try again or contact me directly at <a href="mailto:alvarez.joemichael@gmail.com">alvarez.joemichael@gmail.com</a></p>
    `;
    form.parentNode.insertBefore(message, form);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 10000);
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentNode.querySelector('.form-error');

    // Remove existing error
    if (existingError) {
      existingError.remove();
    }

    // Add new error
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);

    // Focus the field
    field.focus();

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.parentNode.removeChild(errorElement);
      }
    }, 5000);
  }

  function clearMessages() {
    // Remove any existing messages
    const messages = document.querySelectorAll('.form-message, .form-error');
    messages.forEach((msg) => {
      if (msg.parentNode) {
        msg.parentNode.removeChild(msg);
      }
    });
  }

  function resetForm() {
    const form = document.getElementById('contact-form');
    form.reset();
  }
})();
