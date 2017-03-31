$(document).ready(function(){

  $("#table_body").append("<tr><td>Lol</td><td>HI</td><td>HI</td><td>HI</td></tr>");
  var x_access_token = Cookies.get('x-access-token');

  $.ajax({
      url: "https://enigma2.herokuapp.com/admin/banned",
      type: "GET",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      cache: false,
      headers:{
        "x-access-token":x_access_token
      },
      success: function(message, textStatus, request) {
          var i = 0;
          var string = "";
          for(i=0; i<=message.banned; i++){
            string = string + "<tr><td>" + (i+1)  + "</td><td>" + message.result[i].email + "</td><td>" + message.result[i].score + "</td><td>" + message.result[i].num + "</td></tr>"
          }
          $('#table_body').append(string);
      }
    }
  );

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
        $("#latest_ques").append(message.message.num);
      }
    }
  );
  $.ajax({
      url: "https://enigma2.herokuapp.com/admin/attempts",
      type: "GET",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      cache: false,
      headers:{
        "x-access-token":x_access_token
      },
      success: function(message, textStatus, request) {
        $("#attempts").append(message.result);
      }
    }
  );
  $.ajax({
      url: "https://enigma2.herokuapp.com/results/profile",
      type: "GET",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      cache: false,
      headers:{
        "x-access-token":x_access_token
      },
      success: function(message, textStatus, request) {
        $("#profile_email").append(message.result.email);
      }
    }
  );
});
