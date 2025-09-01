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
		$('.career-card').click(function() {
			const card = $(this);
			const details = card.siblings('.career-details');
			const isExpanded = card.attr('data-expanded') === 'true';
			
			// Close all other cards
			$('.career-card').attr('data-expanded', 'false');
			$('.career-details').removeClass('expanded').slideUp(300);
			
			// Toggle current card
			if (!isExpanded) {
				card.attr('data-expanded', 'true');
				details.addClass('expanded').slideDown(300);
			}
		});
	});

})(jQuery);