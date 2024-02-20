var buttonColors = ["red","yellow","blue","green"];
var gamePattern = [];   
var userPattern = [];
var started = false;
var level = 0;

$(document).on("keydown",function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").on("click",function(){
    if(started){
        var userColor = this.id;
        userPattern.push(userColor);
        playSound(userColor);
        animatePress(userColor);
        checkAnswer(userPattern.length - 1);
    }
});

function nextSequence(){
    userPattern = [];
    level += 1;
    $("h1").text("Level "+level);
    var randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    playButtons();
}


function checkAnswer(pos){
     if(userPattern[pos]  === gamePattern[pos]){
        if(userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
     }
     else{
        level = 0;
        gamePattern = [];
        userPattern = [];
        started = false;
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        $("h1").text("Press Any Key to Start");
     }
    
}


function playSound(color){
    var sound = new Audio("./sounds/"+color+".mp3");
    sound.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function playButtons(){
    for(var i=0;i<gamePattern.length; ++i){
        (function(index){
            setTimeout(function(){
                $("#"+gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[index]);
            },i * 400);
        })(i);
        
    }
}
