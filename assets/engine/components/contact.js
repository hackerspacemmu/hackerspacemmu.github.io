var Prometheus = Prometheus || {};
sent = 0;
Prometheus.Contact = {
	init: function(){
		console.log('contact')
		$(window).scrollTop(0)
		$('.contact_content').addClass('animate')
		$('#submitForm').on('click', function(){
			submitBtn = $(this).siblings('input[type="submit"]')
			form = $(this).parents('form')
			r_name = form.find('input[name="real_name"]')
			email = form.find('input[name="email"]')
			message = form.find('textarea[name="message"]')
			$('#form_messages_wrapper').removeClass('show')
			$('#contact_form').find('.fields').removeClass('error')
			if ( r_name.val() == "" || email.val() == "" || message == "" ) {
				Prometheus.Contact.contact_form_addError('all', "All fields cannot be left empty.")
			} else {
				if( /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i.test(r_name.val()) == false ) { 
					Prometheus.Contact.contact_form_addError(r_name, "Are you sure that is an actual name ?")
				} else {
					if ( /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.val()) !== true ){
						Prometheus.Contact.contact_form_addError(email, "Umm, that is not a valid email")
					} else {
						var message_length = message.val().length
						if ( message_length < 20  ){
							Prometheus.Contact.contact_form_addError(message, "Come on, write a little bit more!")
						} else {
							Prometheus.Contact.sendForm()
						}

					}
				}
			}
			return false;
		});

		$('#contact_form .fields').on('keypress', function(){
			$(this).parent('div').removeClass('error')
			if ( $('div.error').length == 0 ) {
				$('#submitForm').removeClass('disabled')
			}
		})

	},
	sendForm: function(){
		if ( sent == 0 ) { 
			form = $('#contact_form').find('form')
			r_name = form.find('input[name="real_name"]').val()
			email = form.find('input[name="email"]').val()
			message = form.find('textarea[name="message"]').val()
			form.addClass('disabled')
			$.ajax({
				url: base + 'contact.php',
				type: "POST",
				data: {
					"formSubmit" : true,
					"real_name" : r_name,
					"email" : email,
					"message" :message
				},
				dataType : 'json',
				encode: true,
				success: function(response){
					var addClass = ""
					if ( response['return'] == "success" ) {
						id = "success"

						sent = 1
					} else {
						id = "errors"
						form.removeClass('disabled')
					}
					$('#form_messages_wrapper').html('<div id = "form_'+ id +'" class = "bezier">'+ response['output'] +'</div>')
	 				setTimeout(function(){
	 					$('#form_messages_wrapper').addClass('show')
	 				}, 100)
				}
			})
		}
	},
	contact_form_addError: function(element, error_message){
		$('#form_messages_wrapper').html('<div id = "form_errors" class="bezier">'+ error_message +'</div>')
		setTimeout(function(){
			$('#form_messages_wrapper').addClass('show')
			$('#contact_form').find('div').removeClass('error')
			if ( element == "all" ) {
				$('#contact_form').find('.fields').parent('div').addClass('error')
			} else {
				element.parent('div').addClass('error')
			}
			$('#submitForm').addClass('disabled')
		}, 100)
	},
	animate: function(url){
		
		var slide = $('#what_slide')
		

		slide.addClass('fixed').css('z-index', '9999').css("width", $('.container').width())
		$("html, body").animate({
			"scrollTop" : 0
		}, 100)

		$.ajax({
			url: url,
	        success: function(result) {
	        	$('#what_slide #find_button').addClass('animate')
				$('#what_slide').find('.screen_animator').css('opacity', '1')
				$('#main_header').addClass('hidden')
				setTimeout(function(){
					slide.addClass('fixed').css('z-index', '10')
					$('body').prepend('<div class = "contact_bg fixed"></div>')

					$('.contact_bg').css({
						"top" : $('#find_button').position().top,
						"left" : $('#find_button').offset().left,
						"width" : $('#find_button').outerWidth(),
						"height" : $('#find_button').outerHeight(),
					})
					Prometheus.Slides.hidePagination('remove')
					setTimeout(function(){
						$('.contact_bg').addClass('bezier').css({
							"left" : $('.container').offset().left,
							"top" : 0,
							"width" : $('.container').width(),
							"height" : slide.outerHeight()
						})
						setTimeout(function(){
							$('#main_content').after('<div id = "ajax_content"></div>')

							
						            var html = jQuery('<div>').html(result);
						            $('#main_header').removeClass('blue white black').addClass('blue')
						            $('#ajax_content').html(html.find("div#main_content").html());

						            $('#ajax_content').addClass('ajax').attr('id', 'main_content')
						            $('#main_content').not('.ajax').remove()
						            $('#main_content').removeClass('ajax')

						            $('body > .contact_bg').remove()
						            $('#main_header').removeClass('hidden')
						            setTimeout(function(){
						            	$('.contact_content').addClass('animate')
						            	Prometheus.hideLoader()
						            }, 200)
						            
						       
						}, 400);
					}, 400);
				}, 0)
	        }
	    });

		
		
	},
	deanimate: function(url){
		var bg = $('.contact_bg')
		bg.css('left', $('#main_content').offset().left )
		bg.addClass('fixed bezier').css("width", $('.container').width())
		$("html, body").animate({
        	"scrollTop" : 0
        }, 200)
        $('.contact_content').css('z-index', '9999').removeClass('animate')
       
       $.ajax({
			url: base,
	        success: function(result) {
	        	$('#main_header').addClass('bezier hidden')
				$('#main_content').after('<div id = "ajax_content"></div>')
				setTimeout(function(){
		            var html = jQuery('<div>').html(result);
		            $('#main_header').removeClass('blue white black').addClass('blue')
		            $('#ajax_content').html(html.find("div#main_content").html());
		            $('#ajax_content').addClass('ajax').attr('id', 'main_content')
		            $('#main_content').not('.ajax').find('.row').remove()
		            var slide = $('#what_slide')
		            slide_btn = slide.find('#find_button')
		            
		            Prometheus.Slides.resizeSlide()

			        $("html, body").animate({
			        	"scrollTop" : slide.offset().top
			        }, 200)
		            setTimeout(function(){
		            	bg.css({
		            		"top" : slide_btn.position().top,
		            		"left" : slide_btn.offset().left,
		            		"width" : slide_btn.outerWidth(),
		            		"height" : slide_btn.outerHeight()
		            	})
		            	setTimeout(function(){
		            		bg.css("opacity", 0)
		            		setTimeout(function(){
		            			$('#main_content').not('.ajax').remove()
		            			$('#main_content').removeClass('ajax')
		            			 $('#main_header').removeClass('hidden')
		            			 hero_slide_animate();
		            		}, 200);
		            	}, 400);
			        }, 800);
				}, 200);
	        }
	    })
			
	}

}