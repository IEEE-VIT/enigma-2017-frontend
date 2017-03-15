$(document).ready(function(){
  console.log("Document Ready!");
  var x_access_token = Cookies.get('x-access-token');
  $.ajax({
      url: "https://enigma2.herokuapp.com/solve/question",
      type: "GET",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      cache: false,
      headers:{
        "x-access-token":x_access_token
      },
      success: function(message, textStatus, request) {
        $('#question_id').html(message.question);
      }
    }
  );
});
