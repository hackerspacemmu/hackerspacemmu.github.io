var Prometheus = Prometheus || {};
Prometheus.Slides = {
	init: function(){

		console.log('slides')
		setTimeout(function(){
			Prometheus.Slides.resizeSlide()
		}, 300)
		Prometheus.Slides.buildPagination()

		$('body').on("click", '#find_button', function(){
			$('#main_header').removeClass('bezier').addClass('hidden')
			var link = $(this).attr('data-href')
			$('#find_button').addClass('animate')

			var slide = $('#what_slide')
			slide.addClass('fixed')
			$('html, body').animate({
				"scrollTop" : 0
			}, 100)
			setTimeout(function(){
				
				setTimeout(function(){
					History.pushState( { state: '__async' }, '', link);

				}, 400)
			}, 200)

		})

		$('body').on('click', '#case_studies_list li a', function(e){
			e.preventDefault()
			var link = $(this).attr('data-href')
			case_id = $(this).attr('data-id')
			$('#work_slide').addClass('fixed').css("width", $('.container').width())
			$('#main_header').addClass('hidden')
			$('html, body').animate({ 
				"scrollTop": 0 
			}, 200)

			setTimeout(function(){
				History.pushState( { state: '__async' }, '', link);
			}, 200);
			
			return false;

		})

		$('.slides_nav a').on("click", function(){
			$('.slides_nav a').removeClass('current')
			var element = $(this)
			element.addClass('current')
			$('body, html').animate({
				scrollTop: $('.slide[data-id="'+ element.attr('data-id') +'"]').offset().top
			})
		})

		var slide_count = 0
		$('.slide').each(function(){
			slide_count += 1
			$(this).attr('data-id', slide_count)
		})

		showcase_animate();
		
	},
	bg_extender: function(bg) {
		bg.parent('.slide').addClass('bazier').css("height", $(window).height() + ($(window).scrollTop() - bg.offset().top))
	},
	resizeSlide:function(){
		$('.slide').css('width', $('.container').width())
		//if ( $(window).width() > 1000 ) { 
		$('.slide').each(function(){
			var height = $(this).outerHeight()
			if ( $(this).hasClass('normal') == false ) { 
				if ( height > $(window).height() ) {
					$(this).addClass('own')
				} else {
					height = $(window).outerHeight()
				}
			} else {
				height = height;
			}
			$(this).css('height', height)
		}); 
		//}
		$('.center_vertical').each(function(){
			console.log(65)
			$(this).parentsUntil('.center_vertical_parent').addClass('center_vertical_child')
		})
	},
	scrollToSlide: function(slide){
		$('.slide').removeClass('current')
		var id = slide.attr('data-id')
		var color = slide.attr('data-pagination')
		slide.addClass('current')
		Prometheus.Slides.paginationChange(id)
	},
	buildPagination: function(){
		var html = '';
		var pagi_count = 0
		$('.slide').each(function(){
			current = ""
			pagi_count += 1
			if ( pagi_count == 1 ) {
				current = "current "
			}
			var placeholder = $(this).attr('data-placeholder')
			html += '<li><a data-id="'+ pagi_count +'" class = "'+ current +'bezier">'+ placeholder +'</a></li>';
		})	
		
		$('.slides_nav').html(html)
		

		//Prometheus.Slides.paginationChange('1')
	},
	hidePagination: function(remove){
		$('.slide_pagination').addClass('bezier')
		
		$('.slide_pagination').css({
			"left" : "-50px"
		})
		if ( remove !== "true" ) {
			setTimeout(function(){
				$('.slide_pagination').remove()
			}, 300);
		}
		
	},	
	paginationChange: function(id){
		$('.slides_nav a').removeClass('current')
		var current_pagination = $('.slides_nav a[data-id="'+ id +'"]')
		current_pagination.addClass('current')
		
	},

}

scrollTop = 0
$(window).scroll(function(){

	scroll = $(window).scrollTop();

	if ( scroll > scrollTop ) {
		var slide = $('.slide.current').next()
		if ( slide.length > 0 ) { 
			count = slide.offset().top - ($('.slide.current').outerHeight() / 2) - $('.slide_pagination').outerHeight()
			if ( $(window).scrollTop() > count ) {
				Prometheus.Slides.scrollToSlide(slide)	
			}
		}
	} else {
		slide = $('.slide.current').prev()
			if ( slide.length > 0 ) { 
			count = slide.offset().top + slide.outerHeight() - $('.slide_pagination').outerHeight()
			console.log(4)
			if ( $(window).scrollTop() < count ) {
				Prometheus.Slides.scrollToSlide(slide)
			}
		}
		
	}

	$('.slide').each(function(){
		element = $(this)
		if ( isScrolledIntoView(element) == true ) {
			element.addClass('visible')
		}
	})
	scrollTop = scroll


	function isScrolledIntoView(elem)
	{
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + ($(elem).height() * (1/4));

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

})

function showcase_animate(){
	var items = ["onestop", "caztech", "delvik", "musclemania"]
	i = 0
	var showcaseGallery = setInterval(function(){
		$('.showcase li').removeClass('caztech onestop delvik musclemania').addClass(items[i])
		if ( i == 3 ) {
			i = -1
		} 
		i++
	}, 2000)
	showcaseGallery;
}

function hero_slide_animate(){
	$('#prev_figure').addClass('animate')
	setTimeout(function(){
		$('#prev_figure').addClass('animate2')
	}, 200)
}