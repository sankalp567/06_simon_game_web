var gamePattern = [];
var userClickedPattern = [];
var array_color = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keydown(function (event) {
    if (!started) {
        // $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function () {
    // here we have to use this to gget element which get triggerd
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1)
    // by this by all button click get check for corresct answer 
});
// console.log(userClickedPattern);

function checkAnswer(currentLevel) {
    // here it check correct ans as it check element of both array as all previous element is check in perivous button click  so if also length of both arrays is same then ans is correct
    // and userClickedPattern is different for diffrent iterater as u can see in nextsequence func
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("game over,press any key to restart")
        startover();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomnumber = Math.floor(Math.random() * 4);//to generate number between 0 and 3
    var randomcolor = array_color[randomnumber];
    gamePattern.push(randomcolor);
    // console.log(gamePattern);
    $("#" + randomcolor).fadeOut(100).fadeIn(100);
    playSound(randomcolor);
}
function playSound(name) {
    new Audio("" + name + ".mp3").play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startover(){
    level=0;
    started=false;
    gamePattern=[];
}
