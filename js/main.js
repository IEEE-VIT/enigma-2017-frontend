function main() {

(


  function () {
   'use strict';
          //smooth-scroll
  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 900);
            return false;
          }
        }
      });

    // CounterUp
	$(document).ready(function( $ ) {
		if($("span.count").length > 0){	
			$('span.count').counterUp({
					delay: 20, // the delay time in ms
			time: 3000 // the speed time in ms
			});
		}
	});
	
}());

}
function popup() {
    var popup = document.getElementById("myPopup");
    $('#myBtn').click(function () {
        $('.popup').show();
    });
    popup.classList.toggle("show");
}
main();

 $(window).on('load', function() { // makes sure the whole site is loaded
                $('#status').fadeOut(); // will first fade out the loading animation
                $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
                $('body').delay(350).css({'overflow':'visible'});
              });
