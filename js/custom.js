/**********************************
 Author: Symbiotic-Themes
 Theme: Chappi (App Landingpage)
 Version: 1.0
 **********************************/

var mySwiper;

	// Preloader Website
$(window).load(function ()
{
	$('#loader-wrapper').delay(450).fadeOut();
	$('#loader').delay(750).fadeOut('slow');
});

$(document).ready(function ()
{


	// Sticky Navabr
	$("header").before($(".top-bar").clone().addClass("slidedown"));
	$(window).on("scroll", function ()
	{
		$("body").toggleClass("slide-menu", ($(window).scrollTop() > 100));
	});

	//--------------------------------------------

	// One Page Navigation
	$.scrollIt({
		scrollTime: 1400,
		easing: 'easeInOutExpo',
		topOffset: -20,
	});

	//--------------------------------------------

	var initialSlide = ( $(window).width() < 601 ) ? 1 : 0;

	// Phone Carousel
	mySwiper = $('.swiper-container').swiper({

		mode: 'horizontal',
		loop: true,
		speed: 950,
		effect: 'coverflow',
		slidesPerView: getSlide(),
		grabCursor: true,
		nextButton: '.arrow-right',
		prevButton: '.arrow-left',
		initialSlide: initialSlide,
		coverflow: {
			rotate: -30,
			stretch: 10,
			depth: 120,
			modifier: 1,
			slideShadows: false
		}
	});

	window.onresize = function(){
		var width = $(window).width();
		var max = ( width < 601 ) ? 1 : 3;

		if(mySwiper)
		{
			mySwiper.params.slidesPerView = max;
			mySwiper.update(true);
		}
	};

	//-----------------------------------------------

	// Intro Carousel
	$("#carousel").owlCarousel({
		items: 3,
		itemsDesktop: [1199, 3],
		itemsDesktopSmall: [991, 2],
		slideSpeed: 800,
		navigation: true,
		navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		pagination: true,
	});

	//-----------------------------------------------

	// Tooltip
	$('[data-toggle="tooltip"]').tooltip()

	//----------------------------------------------

	// Animation on Scroll
	var wow = new WOW(
		{
			boxClass: 'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0,          // distance to the element when triggering the animation (default is 0)
			mobile: false,       // trigger animations on mobile devices (default is true)
			live: false        // act on asynchronously loaded content (default is true)
		}
	);
	wow.init();

	//----------------------------------------------

	// Parallax
	$.stellar({
		horizontalOffset: 0,
		verticalOffset: 0,
		responsive: false,
		horizontalScrolling: false,
	});

	//----------------------------------------------

	// Mailchimp
	$('#newsletter-form').ajaxChimp({
		callback: callbackNewsletterFunction,
		url: 'http://press.us10.list-manage.com/subscribe/post?u=89aed7b7f6c6ac80b2f92931f&amp;id=009cc95e86'
	});

	function callbackNewsletterFunction(resp)
	{
		$("#mc-email").removeClass("error");
		if (resp.result === 'success')
		{
			$(".subscribe-message").html('<i class="fa fa-check"></i> We have sent you a confirmation email.').fadeIn().css("color", "#fff");
		}
		else
		{
			$(".subscribe-message").html('<i class="fa fa-warning"></i> You must enter a valid e-mail address.').fadeIn().css("color", "#fff");
			$("#mc-email").addClass("error");
		}
	}

	$('#contactform').ajaxChimp({
		callback: callbackBetaTester,
		url: 'http://press.us10.list-manage.com/subscribe/post?u=89aed7b7f6c6ac80b2f92931f&amp;id=a55c6cb0a9'
	});

	function callbackBetaTester(resp)
	{
		$("#contactform").find(".input-field").removeClass("error");

		if (resp.result === 'success')
		{
			$(".contact-message").html('<i class="fa fa-check"></i> Thanks! We\'ll be in touch. Please look for a confirmation email.').css("color", "#29b94f");
			$('input#mce-EMAIL').val('');
			$('input#mce-NAME').val('');
			$("select#mce-DEVICES").val('');
		}
		else
		{
			var whichField = resp.msg.charAt(0);

			// Invalid Email
			if(whichField == 0)
			{
				$(".contact-message").stop(true).html('<i class="fa fa-warning"></i> Invalid E-Mail Address.').css("color", "#E74C3C");
				$("input#mce-EMAIL").focus().addClass("error");
			}
			// Invalid Name
			else if(whichField == 1)
			{
				$(".contact-message").stop(true).html('<i class="fa fa-warning"></i> Invalid Full Name.').css("color", "#E74C3C");
				$("input#mce-NAME").focus().addClass("error");
			}
			// Invalid Device
			else if(whichField == 3)
			{
				$(".contact-message").stop(true).html('<i class="fa fa-warning"></i> Invalid Device Selection.').css("color", "#E74C3C");
				$("select#mce-DEVICES").focus().addClass("error");
			}
		}
	}

	//----------------------------------------------

	// Mobile Navi Click
	$('nav a').on('click', function ()
	{
		if ($('.navbar-toggle').css('display') != 'none')
		{
			$(".navbar-toggle").trigger("click");
		}
	});

	//----------------------------------------------

	// Scroll Up
	$('.scrollup, .logo a:not(".no-scroll")').click(function ()
	{
		$("html, body").animate({scrollTop: 0}, 1200, 'easeInOutExpo');
		return false;
	});

});

// Phone Slider Function
function getSlide()
{
	var wW = $(window).width();
	if (wW < 601)
	{
		return 1;
	}
	return 3;
}
