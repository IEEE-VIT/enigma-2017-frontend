$(document).ready(function(){
  console.log("Document Ready!");
  var x_access_token = Cookies.get('x-access-token');
  var num;
  $.ajax({
      url: "https://enigma2.herokuapp.com/results",
      type: "GET",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      cache: false,
      headers:{
        "x-access-token":x_access_token
      },
      success: function(message, textStatus, request) {
        console.log("Results returned!");
        var i = 0;
        var string = "";
        for(i=0; i<=message.result.length-1; i++){
          string = string + "<tr><td>" + (i+1)  + "</td><td>" + message.result[i].name + "</td><td>" + message.result[i].score + "</td><td>" + message.result[i].num + "</td></tr>"
        }
        $('#table_body').append(string);
      }
    }
  );
});
