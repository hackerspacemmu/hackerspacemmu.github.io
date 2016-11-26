var Prometheus = Prometheus || {};
Prometheus.Project = {
	init: function(){
		console.log('project')
		$(window).scrollTop(0)
		$('#project_header').css('height', $(window).height() )
		setTimeout(function(){
			$('#project_header #project_image_holder').addClass('animate')
		}, 300)
		
	},
	animate: function(url){
		// get selected list element by id variable 
		var slide = $('#work_slide')
		slide.addClass('fixed').css("width", $('.container').width())
		var list = $('#case_studies_list')
		var element = $('#case_studies_list a[data-id="'+ case_id +'"]')
		var bg = element.parents('.slide').children('.bg')


		jQuery.ajax({
	        url: url,
	        success: function(result) {
	        	Prometheus.Slides.hidePagination()
				$('#main_header').addClass('hidden')
				setTimeout(function(){
					list.addClass('animate')
					element.parent('li').siblings('li').children('a').addClass('inactive')
					element.clone().addClass('case_study_cloned').insertBefore('.container');
					$('.case_study_cloned').css({
						"top" : element.offset().top,
						"left": element.offset().left ,
						"width" : element.outerWidth() 
					})
					element.css('opacity', 0)
					Prometheus.Slides.bg_extender(bg)
					slide.addClass('animate')
					
					
					setTimeout(function(){
						$('.case_study_cloned').addClass('bezier').addClass('animate')
						$('.case_study_cloned').css({
							"top" : list.offset().top - 43,
							"left": element.offset().left ,
							"width" : element.outerWidth() 
						})
						
						setTimeout(function(){
							list.addClass('animate2')
						}, 50)
						setTimeout(function(){
							slide.addClass('animate2')
							$('.case_study_cloned').addClass('animate2')
							setTimeout(function(){
								$('#main_content').after('<div id = "ajax_content"></div>')
								
							            var html = jQuery('<div>').html(result);
							            $('#main_header').removeClass('blue white black').addClass('white')
							            $('#ajax_content').html(html.find("div#main_content").html());
							            $('#ajax_content').addClass('ajax').attr('id', 'main_content')
							            $('#main_header').removeClass('hidden')
							            setTimeout(function(){
							            	$('#main_content').not('.ajax').remove()
								            $('#main_content').removeClass('ajax')
								            $('.case_study_cloned').remove()
								            Prometheus.Project.init()
							            }, 200)
							            
							            //$('#univb').click()
							       
							}, 400);
						}, 200)
					}, 200)
					
				}, 400)
			}
		}); 

	},
	deanimate: function(url){
		$('#univb').click()
		
		var height = $(document).height()
		$(window).scrollTop(0)
		jQuery.ajax({
			 url: base,
			 success: function(result) {
			 	$('#main_header').addClass('hidden')
			 	$('#project_header #project_image_holder').removeClass('animate')
				$('#project_header .inner').removeClass('bezier').css("opacity", 0)
				$('#project_header .inner').clone().addClass('case_study_cloned project_page').css('opacity', 0).removeClass('inner').insertBefore('.container');

				$('.case_study_cloned').css({
					"opacity" : 1,
					"top" : $('#project_header .inner').offset().top - 2,
					"left" : $('#project_header .inner').offset().left,
					"z-index": "999999"
				})
				case_id = $('#project_header .inner').attr('data-id')
				setTimeout(function(){
					$('#project_header .bg').clone().addClass('project_header_bg').removeClass('inner').insertAfter('#main_header');
					$('#main_content').after('<div id = "ajax_content"></div>')
					setTimeout(function(){
			            var html = jQuery('<div>').html(result);
			            $('#main_header').removeClass('blue white black').addClass('white')
			            $('#ajax_content').html(html.find("div#main_content").html());
			            Prometheus.Slides.resizeSlide()
			            
			            var slide = $('#ajax_content').find('#work_slide');
			            var top = (slide.offset().top) - height 
			            console.log("top: " + top)
			            var list = slide.find('#case_studies_list')
			            slide.removeClass('bezier').addClass('fixed animate animate2')
			            list.removeClass('bezier').addClass('animate animate2')
			            list.find('a').not('[data-id="'+ case_id +'"]').addClass('inactive')
			            $('#ajax_content').addClass('ajax').attr('id', 'main_content')
			            $('#main_content').not('.ajax').remove()
			            setTimeout(function(){
			            	Prometheus.Slides.hidePagination("true")
			            	
			            }, 100)
			            setTimeout(function(){
			            	slide.addClass('bezier')
			            	list.addClass('bezier')
			            	$('.bg.project_header_bg').remove()
			            	setTimeout(function(){
				            	slide.removeClass('animate2')
								$('.case_study_cloned').removeClass('animate2')
								var element = list.find('a[data-id="'+ case_id +'"]')
								$('.case_study_cloned').css({
									"top" : element.offset().top - 2 ,
									"left": element.offset().left ,
									"width" : element.outerWidth() 
								})
								setTimeout(function(){
									//$('.case_study_cloned').remove()
									list.removeClass('animate2')
									//list.addClass('bezier')
									list.find('.inactive').removeClass('inactive')
									setTimeout(function(){
										slide.removeClass('animate')
										$('#main_header').removeClass('white').addClass('blue')
										list.removeClass('animate')
										$(window).scrollTop(top)
										setTimeout(function(){
											Prometheus.Slides.paginationChange(4)
											slide.removeClass('fixed bezier')
											 $('#main_content').removeClass('ajax')
											 $('.slide_pagination').css('left', '0')
											 $('#main_header').removeClass('hidden')
											 $('.case_study_cloned').remove()
											 hero_slide_animate();
										}, 200)
									}, 200)
								}, 400)
							}, 100)
			            }, 200)
					}, 200);
				}, 200);
			 }
		});
		

	}

}
