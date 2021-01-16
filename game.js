var buttonColours = ["red","blue","green","yellow"];
var gamePattern = []; 
var userClickedPattern = [];

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour)
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

var started = 1;
$(document).keypress(function(){
    if(started === 1){
        nextSequence();
        started = 0;
    }
});

var level = 1;
function nextSequence(){
    userClickedPattern = [];
    var randomNumber =  Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    
    
    $("#level-title").text("Level " + level)
    level++;

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColour);

    // checkAnswer();
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success")
        if(userClickedPattern.length === gamePattern.length){ 
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    started = 1;
    level = 1;
    gamePattern = [];
}