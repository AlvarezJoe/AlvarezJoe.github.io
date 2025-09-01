/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

	// ===========================
	// HOME PAGE FUNCTIONALITY
	// ===========================
	
	// Mobile menu toggle for home page
	$(document).ready(function() {
		$('.nav-toggle').click(function() {
			$('.nav-menu').toggleClass('active');
		});

		// Close menu when clicking on a link
		$('.nav-link').click(function() {
			$('.nav-menu').removeClass('active');
		});
	});

	// ===========================
	// PORTFOLIO PAGE FUNCTIONALITY
	// ===========================
	
	$(document).ready(function() {
		// Filter functionality
		$('.tab-btn').click(function() {
			var filter = $(this).data('filter');
			
			// Update active tab
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

		// Carousel functionality
		let currentSlide = 0;
		const totalSlides = $('.carousel-slide').length;
		
		function showSlide(index) {
			$('.carousel-slide').removeClass('active');
			$('.indicator').removeClass('active');
			
			$('.carousel-slide').eq(index).addClass('active');
			$('.indicator').eq(index).addClass('active');
		}
		
		function nextSlide() {
			currentSlide = (currentSlide + 1) % totalSlides;
			showSlide(currentSlide);
		}
		
		// Auto-rotate carousel every 4 seconds
		if (totalSlides > 0) {
			setInterval(nextSlide, 4000);
		}
		
		// Manual indicator clicks
		$('.indicator').click(function() {
			currentSlide = $(this).data('slide');
			showSlide(currentSlide);
		});
	});

	// Schema Modal Functions
	let savedScrollPosition = 0;
	
	function openSchemaModal() {
		savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
		document.getElementById('schemaModal').style.display = 'block';
		document.body.style.overflow = 'hidden';
		document.body.style.position = 'fixed';
		document.body.style.top = `-${savedScrollPosition}px`;
		document.body.style.width = '100%';
	}

	function closeSchemaModal() {
		document.getElementById('schemaModal').style.display = 'none';
		document.body.style.overflow = 'auto';
		document.body.style.position = 'static';
		document.body.style.top = 'auto';
		document.body.style.width = 'auto';
		window.scrollTo(0, savedScrollPosition);
	}

	// Close modal when clicking outside the image
	window.onclick = function(event) {
		const modal = document.getElementById('schemaModal');
		if (event.target === modal) {
			closeSchemaModal();
		}
	}

	// Experience page expandable cards
	$(document).ready(function() {
		// Detect if device is mobile
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
		
		// Expand card on click
		$('.career-card').on('click', function(e) {
			if ($(e.target).hasClass('close-btn')) return;
			
			const $card = $(this);
			$card.addClass('expanded');
			
			// Prevent body scroll on mobile when card is expanded
			if (isMobile) {
				$('body').addClass('modal-open');
			}
		});
		
		// Close expanded card
		$('.close-btn').on('click', function() {
			$('.career-card.expanded').removeClass('expanded');
			$('body').removeClass('modal-open');
		});
		
		// Close on escape key
		$(document).on('keydown', function(e) {
			if (e.key === 'Escape') {
				$('.career-card.expanded').removeClass('expanded');
				$('body').removeClass('modal-open');
			}
		});
		
		// Close expanded card when clicking outside (with mobile considerations)
		$(document).on('click', function(e) {
			const $expandedCard = $('.career-card.expanded');
			
			// If there's an expanded card and the click is outside of it
			if ($expandedCard.length > 0 && !$expandedCard.is(e.target) && $expandedCard.has(e.target).length === 0) {
				$expandedCard.removeClass('expanded');
				$('body').removeClass('modal-open');
			}
		});
		
		// Enhanced mobile experience: swipe down to close on mobile
		if (isMobile) {
			let startY = 0;
			let currentY = 0;
			
			$(document).on('touchstart', '.career-card.expanded', function(e) {
				startY = e.originalEvent.touches[0].clientY;
			});
			
			$(document).on('touchmove', '.career-card.expanded', function(e) {
				currentY = e.originalEvent.touches[0].clientY;
				const deltaY = currentY - startY;
				
				// If swiping down more than 50px, add visual feedback
				if (deltaY > 50) {
					$(this).css('transform', `translateY(${deltaY * 0.3}px) scale(${1.02 - deltaY * 0.0005})`);
				}
			});
			
			$(document).on('touchend', '.career-card.expanded', function(e) {
				const deltaY = currentY - startY;
				
				// If swiped down more than 100px, close the card
				if (deltaY > 100) {
					$(this).removeClass('expanded');
					$('body').removeClass('modal-open');
				}
				
				// Reset transform
				$(this).css('transform', '');
				startY = 0;
				currentY = 0;
			});
		}
	});

	// Experience achievements collapsible functionality
	$(document).on('click', '.achievements-toggle', function() {
		const $toggle = $(this);
		const $content = $toggle.siblings('.achievements-content');
		const $icon = $toggle.find('.toggle-icon');
		
		// Toggle the expanded class
		$content.toggleClass('expanded');
		
		// Update the icon with smooth rotation
		if ($content.hasClass('expanded')) {
			$icon.text('−');
			$icon.css('transform', 'rotate(180deg) scale(1.1)');
		} else {
			$icon.text('+');
			$icon.css('transform', 'rotate(0deg) scale(1)');
		}
	});

	// ===========================
	// CONTACT PAGE FUNCTIONALITY
	// ===========================
	
	$(document).ready(function() {
		// Initialize EmailJS (you'll need to sign up at emailjs.com and get your keys)
		// emailjs.init("YOUR_PUBLIC_KEY"); // Uncomment and add your EmailJS public key
		
		// Contact form submission with EmailJS integration
		$('#contact-form').submit(function(e) {
			e.preventDefault();
			
			// Get form data
			var formData = {
				name: $('#name').val(),
				email: $('#email').val(),
				company: $('#company').val(),
				projectType: $('#project-type').val(),
				message: $('#message').val()
			};
			
			// Validate required fields
			if (!formData.name || !formData.email || !formData.message) {
				alert('Please fill in all required fields.');
				return;
			}
			
			// Show loading state
			var submitBtn = $('.button.primary');
			var originalText = submitBtn.text();
			submitBtn.text('Sending...').prop('disabled', true);
			
			// Option 1: EmailJS (recommended for production)
			/*
			emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
				from_name: formData.name,
				from_email: formData.email,
				company: formData.company,
				project_type: formData.projectType,
				message: formData.message,
				to_email: "alvarez.joemichael@gmail.com"
			}).then(function(response) {
				alert('Thank you for your message! I\'ll get back to you soon.');
				document.querySelector('#contact-form').reset();
			}, function(error) {
				alert('Failed to send message. Please try again or email me directly.');
				console.error('EmailJS error:', error);
			}).finally(function() {
				submitBtn.text(originalText).prop('disabled', false);
			});
			*/
			
			// Option 2: Mailto fallback (current implementation)
			var subject = encodeURIComponent(`Contact Form: ${formData.projectType || 'General Inquiry'}`);
			var body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not specified'}
Project Type: ${formData.projectType || 'Not specified'}

Message:
${formData.message}
			`.trim());
			
			var mailtoLink = `mailto:alvarez.joemichael@gmail.com?subject=${subject}&body=${body}`;
			window.location.href = mailtoLink;
			
			// Reset form and button
			setTimeout(function() {
				document.querySelector('#contact-form').reset();
				submitBtn.text(originalText).prop('disabled', false);
				alert('Your email client should have opened. If not, please email me directly at alvarez.joemichael@gmail.com');
			}, 1000);
		});
	});

})(jQuery);