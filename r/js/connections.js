$(document).ready(function(){
  console.log("Document Ready!");
  var x_access_token = Cookies.get('x-access-token');
  var num;
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
        $('#score_id').html(message.score);
        num = message.num;
      }
    }
  );

  $('#logout_butt a').click(function(e) {
    Cookies.remove('x-access-token');
    window.location.replace("../index.php");
  });

  $("#answerForm").submit(function(e) {
    e.preventDefault();
    var answer = $("input#answer_id").val();
    $.ajax({
      url: "https://enigma2.herokuapp.com/solve/answer",
      type: "POST",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      headers:{
        "x-access-token":x_access_token
      },
      data: JSON.stringify({
        num: num,
        answer: answer
      }),
      cache: false,
      success: function(message, textStatus, request) {
          window.location.replace("ques.html");
      }
    });
  });
});
