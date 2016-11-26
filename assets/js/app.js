$(document).ready(function(){
	$(window).scrollTop(0);
	var main_content = $('.main')
	main_content.css({
		"width" : $(window).outerWidth() - $('#main_menu').outerWidth(),
		"min-height" : $(window).outerHeight()
	})
	$('.slide').not(':first').addClass('not_ready bezier')
	setTimeout(function(){
		$('#hero_slide').addClass('animate')
		$(window).scrollTop(0);
	}, 1000)
	
})

$(window).load(function(){

	var checkAnimate1 = setInterval(function(){
		if ( $('#hero_slide.animate').length > 0 ) {
			
		 	addAnimate2();
			clearInterval(checkAnimate1)
		}
		
	}, 200);

	function addAnimate2() {
		
		setTimeout(function(){
			$('#hero_slide h1').removeClass('bezier')
			$('#hero_slide h1 span').removeClass('delay1 delay2 delay3 bezier')
			$('#hero_slide').addClass('animate2')
			$('#main_menu').addClass('animate')
			$('.slide').removeClass('not_ready')
		}, 500);
	}

})