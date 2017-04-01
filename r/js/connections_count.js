$(document).ready(function(){
  console.log("Document Ready!");
  var x_access_token = Cookies.get('x-access-token');
  var num;

  $('#logout_butt').click(function(e) {
    Cookies.remove('x-access-token');
    window.location.replace("../index.php");
  });
});
