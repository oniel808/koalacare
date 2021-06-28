$(document).ready(function() {
					$('nav').removeClass("navbar-fixed-top");//
					$('.parallax').css({"padding-bottom":"70vh"});//
					$('.myNavbar').css({'height':'90px'});//
					$('.dropdown-menus').css({'background-color':'rgba(130,126,123,0.5)'});//
					$('.navbar-rightt').css({'position':'relative', 'top':'20px','transition': '.5s'});//
					$('.brand').css({'position':' relative', 'left':'55px','top':'-30px'});
					$('nav').css({'transition':'1s'});
					$('navbar-static-top').css({'transition':'1s'});
					$('navbar-fixed-top').css({'transition':'1s'});
			$(window).scroll(function() {
				var getUrl = window.location;
				var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
				if(getUrl.pathname.split('/')[1] == ''){
					if($(document).scrollTop() > 1) {
						$('.myNavbar').addClass('shrink');
						$('nav').removeClass("navbar-static-top");
						$('nav').addClass("navbar-fixed-top");
						$('.myNavbar').css({'height':'30px'});
						$('.parallax').css({"padding-bottom":"100px"});
						$('.brand').css({'position':' relative', 'left':'55px','top':'-45px'}); 
						// $('.brandLogo').css({'position':'relative', 'top': '-5px'});
						$('.dropdown-menu').css({'background-color':'rgba(255,255,255,1)'});
						$('.navbar-right').css({'position':'relative', 'top':'0px'});
					}
					else {
						$('.myNavbar').removeClass('shrink'); 
						$('.myNavbar').css({'height':'90px'}); 
						$('nav').removeClass("navbar-fixed-top");
						$('nav').addClass("navbar-static-top");
						$('.parallax').css({"padding-bottom":"70vh"});
						$('.brand').css({'position':' relative', 'left':'55px','top':'-30px'});
						$('.brandLogo').css({'position':'relative', 'top': '0px'});
						$('.dropdown-menu').css({'background-color':'rgba(130,126,123,0.5)'});
						$('.navbar-right').css({'position':'relative', 'top':'20px'});
					}
				}
			else{
				// $('nav').addClass("navbar-fixed-top");
				// $('.brand').css({'position':' relative', 'left':'55px','top':'-30px'});
			}
	});
});