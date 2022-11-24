var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
  playSound(randomChosenColour);
  /*var aud = new Audio("sounds/"+audio);
  aud.play();*/
}

$(".btn").on("click",function(){
  var chosenColor=this.id;
  userClickedPattern.push(chosenColor);
  playSound(chosenColor);
  animatePress(chosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $('#'+currentColor).addClass("pressed");
  setTimeout(function(){
      $('#'+currentColor).removeClass("pressed");
  }, 100);
}
var level = 0;
var pressed = false;
$(document).keypress(function(){
  if(!pressed){
    nextSequence();
    pressed=true;
  }
  $("#level-title").text("Level "+level);
});
function checkAnswer(l){
  if(userClickedPattern[l]===gamePattern[l]){
    console.log("success");
    console.log(userClickedPattern);
    console.log(gamePattern);
    setTimeout (()=>nextSequence(), 1000);
  }else{
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  level = 0;
  gamePattern = [];
  pressed = false;
}
