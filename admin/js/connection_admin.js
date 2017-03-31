$(document).ready(function(){

  $("#table_body").append("<tr><td>Lol</td><td>HI</td><td>HI</td><td>HI</td></tr>");
  var x_access_token = Cookies.get('x-access-token');
  $.ajax({
      url: "https://enigma2.herokuapp.com/admin/lastquestion",
      type: "GET",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      cache: false,
      headers:{
        "x-access-token":x_access_token
      },
      success: function(message, textStatus, request) {
        $("#latest_ques").append(message.message[0].num);
      }
    }
  );
});
