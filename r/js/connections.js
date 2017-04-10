$(document).ready(function(){
  //console.log($('#registerForm'));
  // Get the modal
  var modal = document.getElementById('myModal');
  modal.style.display = "none";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

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

  /* Popup ends */
  var x_access_token = Cookies.get('x-access-token');
  var num;
  var hint;
  var hints;
  var ban;
  var ban_time;

  $.ajax({
    url: "https://enigma2.herokuapp.com/solve/question",
    type: "GET",
    datatype: "json",
    contentType: "application/json; charset=utf-8",
    cache: false,
    headers:{
      "x-access-token":x_access_token
    },

    beforeSend: function(){
      $("#image_id").hide();
      $("#ban-error").hide();
      $("#ques-loader").show();
      $("#answerForm").hide();
    },

    success: function(message, textStatus, request) {
      $("#image_id").show();
      $("#ques-loader").hide();
      $("#answerForm").show();
      if(message.type == 'default'){
        if(message.image_url == "" || message.image_url == null){
          $("#question_id").append("Q" + (message.num + 1) +  " " + message.question);
        }
        else {
          $("#question_id").append("Q" + (message.num + 1) +  " " + message.question);
          $('#ques').append("<img id=\"image_id\" src=\"" + message.image_url + "\"/>");
        }

      }
      else {
        $('#ques').append(message.data);
      }
      hint = message.hint;

      if(message.ban==true){
        hint = "not_found";
        ban = true;
        ban_time = message.ban_time;
        showBan(true);
      }
      else{
        ban = false;
        showBan(false);
      }

      if(hint!="not_found"){
        showHint();
      }

      hints = message.hints;
      updateHints();
      $('#score_id').html(message.score);
      num = message.num;

    },

    error: function(){
      $("#ques-loader").hide();
      $('#ques').append("<img id=\"image_id\" src=\"images/net-error.png\"/>");
    }
  }
);

function showModal(message){
  //modal.style.display = "block";
  $('#notification_box').html(message.message);
}

function showBan(status) {
  console.log(status);
  if(status){
    $("#ban-error").show();
    showTimer(ban_time);
  }
  else{
    $("#ban-error").hide();
  }
}

function startTimer(duration, display) {
  var timer = duration, hours, minutes, seconds;
  setInterval(function () {
    hours = ~~(timer/(1000*60*60));
    minutes = ~~((timer - (hours*60*60*1000))/(60*1000));
    seconds = ~~((timer - (hours*60*60*1000) - (minutes*60*1000))/1000);
    display.textContent = ((hours < 10) ? ("0" + hours) : hours) + ":" + ((minutes < 10) ? ("0" + minutes) : minutes) + ":"
    + ((seconds < 10) ? ("0" + seconds) : seconds);

    timer = timer - 1000;

    if(timer < 0){
      timer = duration;
    }
  }, 1000);
}

function showTimer(timeLeft) {
  var fiveMinutes = timeLeft,
  display = document.querySelector('#ban-time');
  startTimer(fiveMinutes, display);
};

function updateHints() {
  $("#hint-count").html(hints);
  $("#hint-count").append(" ");
}

$('#logout_butt a').click(function(e) {
  Cookies.remove('x-access-token');
  window.location.replace("../index.php");
});

$('#leader_butt a').click(function(e) {
  window.location.replace("./leaderboard.html");
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
      console.log(message);
      if(message.code!='0'){
        showModal(message.message);
      }
      else{
        window.location.replace("ques.html");
      }
    }
  });
});

$('#hint_bulb').click(function(e){
  if(ban){
    confirm("Warning: Hints not available for alternate questions!");
  }
  else if(hint=='not_found' && hints>0){
    var a = confirm("Warning: You are using a hint!");
    if(a == true){
      $.ajax({
        url: "https://enigma2.herokuapp.com/solve/hint",
        type: "POST",
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        headers:{
          "x-access-token":x_access_token
        },
        data: JSON.stringify({
          num: num
        }),
        cache: false,
        success: function(message, textStatus, request) {
          hint = message.hint;
          hints = message.hints;
          showHint();
          updateHints();
        }
      });
    }
  }
  else if( hint != 'not_found'){
    var popup = document.getElementById("hint-popup");
    popup.classList.toggle("show");
  }
  else{
    if(hints == 0){
      confirm("Warning: You do not have enough hints! Keep playing to earn more.")
    }
  }
});

function showHint() {
  $("#hint_bulb").attr("src","images/bulb-glow.png");
  $("#hint_count").attr("src","images/bulb-glow.png");
  $("#hint-popup").html(hint);
  $("#hint-popup").append(" ");
  var popup = document.getElementById("hint-popup");
  popup.classList.toggle("show");
}
});
