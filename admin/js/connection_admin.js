$(document).ready(function(){

  
  $("#table_body").append("<tr><td>Lol</td><td>HI</td><td>HI</td><td>HI</td></tr>");

  $.getJSON("https://enigma2.herokuapp.com/admin/lastquestion", function(message){
    $("#latest_ques").append(message.message[0].num);
  });

});

