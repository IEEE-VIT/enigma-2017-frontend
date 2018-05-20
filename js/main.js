
$(document).ready(function() {

    //console.log($('#registerForm'));
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("signupp");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var tag=0;
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        $('.popup').hide();
        tag=1;
        console.log("CLICKED");

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        refresh();
    }

    var f=1;
    document.getElementById("registration").disabled = true;
    $("#cb_is_vit").click(function(){

        if(this.checked){
            //console.log("Checked");
            $("#txt_external_college").hide();
            $("#uni_div").hide();
            document.getElementById("registration").disabled = false;
        }

        else {
            //console.log("unChecked");
            $("#txt_external_college").show();
            $("#uni_div").show();
            document.getElementById("registration").disabled = true;
        }
    });

});





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
var tag;
function popup() {
    $('.popup').show();
    var popup = document.getElementById("myPopup");
    console.log("CLICKED MYbTN");
    if ( $('.popup').css('display') == 'none' ){
        tag=1;
    }
    if(tag==1)
    {
        tag=0;
        popup.classList.toggle("show");
    }
    popup.classList.toggle("show");

}
main();

 $(window).on('load', function() { // makes sure the whole site is loaded
                $('#status').fadeOut(); // will first fade out the loading animation
                $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
                $('body').delay(350).css({'overflow':'visible'});
              });
