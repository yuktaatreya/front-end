var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var level=0;
var userClickedPattern=[];
var started=false;

$(document).keydown(function(){
    if(!started)
    {
        console.log(level);
        $("h1").text("Level "+ level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
    var userAnswer=userClickedPattern[currentLevel];
    var correctAnswer=gamePattern[currentLevel];
    console.log(correctAnswer);
    console.log(userAnswer);
    if(correctAnswer===userAnswer){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else 
    {
        var audio= new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("h1").text("Game Over, Press any key to restart");
        startOver();
    }

}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = (Math.floor(Math.random()*4));
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}


function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    console.log($("#"+currentColor));
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");},100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
