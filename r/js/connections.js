$(document).ready(function(){

  showTimer_end();

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
          $("#question_id").html("Q" + (message.num + 1) +  " " + message.question);
        }
        else {
          $("#question_id").html("Q" + (message.num + 1) +  " " + message.question);
          $('#ques').append("<img id=\"image_id\" src=\"" + message.image_url + "\"/>");
        }

      }
      else {
        questiontwentytwo();
      }
      hint = message.hint;
      console.log("Hey: -" + message.ban_time);

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

function showTimer_end() {
  var deadline = 'April 12 2017 23:59:59 GMT+0530';
  var booMinutes  = Date.parse(deadline) - Date.parse(new Date());
  var display = document.querySelector('#end-time');
  startTimer(booMinutes, display);
}


  


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

function questiontwentytwo() {
  $("#answer_id").on('keyup', function(e)
  {

    var defaultStr = '.,pyfgcrl/aoeuidhtns-;qjkxbmwvz';
    var checkstr = $(this).val();
    var str1 = '';

    str1=checkstr.substring(0,checkstr.length-1);
    var ch = checkstr.charCodeAt(checkstr.length-1);
    if (ch==101){str1 += defaultStr.charAt(0);}
    else if (ch==113){str1 += "'";}
    else if (ch==81){str1 += '"';}
    else if (ch==87){str1 += "<";}
    else if (ch==69){str1 += ">";}
    else if (ch==123){str1 += "?";}
    else if (ch==34){str1 += "-";}


    else if (ch==119){str1 += defaultStr.charAt(1);}
    else if (ch==114){str1 += defaultStr.charAt(2);}
    else if (ch==116){str1 += defaultStr.charAt(3);}
    else if (ch==121){str1 += defaultStr.charAt(4);}
    else if (ch==117){str1 += defaultStr.charAt(5);}
    else if (ch==105){str1 += defaultStr.charAt(6);}
    else if (ch==111){str1 += defaultStr.charAt(7);}
    else if (ch==112){str1 += defaultStr.charAt(8);}
    else if (ch==91){str1 += defaultStr.charAt(9);}
    else if (ch==97){str1 += defaultStr.charAt(10);}
    else if (ch==115){str1 += defaultStr.charAt(11);}
    else if (ch==100){str1 += defaultStr.charAt(12);}
    else if (ch==102){str1 += defaultStr.charAt(13);}
    else if (ch==103){str1 += defaultStr.charAt(14);}
    else if (ch==104){str1 += defaultStr.charAt(15);}
    else if (ch==106){str1 += defaultStr.charAt(16);}
    else if (ch==107){str1 += defaultStr.charAt(17);}
    else if (ch==108){str1 += defaultStr.charAt(18);}
    else if (ch==59){str1 += defaultStr.charAt(19);}
    else if (ch==39){str1 += defaultStr.charAt(20);}
    else if (ch==122){str1 += defaultStr.charAt(21);}
    else if (ch==120){str1 += defaultStr.charAt(22);}
    else if (ch==99){str1 += defaultStr.charAt(23);}
    else if (ch==118){str1 += defaultStr.charAt(24);}
    else if (ch==98){str1 += defaultStr.charAt(25);}
    else if (ch==110){str1 += defaultStr.charAt(26);}
    else if (ch==109){str1 += defaultStr.charAt(27);}
    else if (ch==44){str1 += defaultStr.charAt(28);}
    else if (ch==46){str1 += defaultStr.charAt(29);}
    else if (ch==47){str1 += defaultStr.charAt(30);}

    else{
      str1 += checkstr.charAt(i);
    }

    $(this).focus();
    $(this).val(str1);
  });
}

function showHint() {
  $("#hint_bulb").attr("src","images/bulb-glow.png");
  $("#hint_count").attr("src","images/bulb-glow.png");
  $("#hint-popup").html(hint);
  $("#hint-popup").append(" ");
  var popup = document.getElementById("hint-popup");
  popup.classList.toggle("show");
}
});
