function setup() {
    g.state = play;
}

const randomNumber = (max) => {
    parseInt(Math.random()*(max+1),10);
    return Math.floor(Math.random()*(max+1));
}


var g = ga(1200, 900, setup, []);
g.canvas.style.border = "1px black dashed";
g.backgroundColor = "Grey";

// main scene
mainScene = g.group();

// timer
var timer = g.text(0+ " s", "30px sans-serif", "#ffffff", 4, 4);
mainScene.addChild(timer);

var timerStep = 0;
var timerIntervalId = null;
var timerCount = () => {
    timer.content = timerStep.toFixed(2) + ' s';
    timerStep += 0.1;
}

var timerStart = () => {
    if (!timerIntervalId) {
        timerCount();
        timerIntervalId = setInterval(timerCount, 100);
    }
}

var timerStop = () => {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
}


timerStart();

// player
var player = g.rectangle(32, 32, "red");
g.stage.putCenter(player, 0, 0);
mainScene.addChild(player);

// enemy groups
var enemyCounts = 5;
var enemyArr = [];
for (var i = 0; i < enemyCounts; i++) {
    var $404 = g.text("404", "50px sans-serif", "#808A87", randomNumber(1150), randomNumber(850));
    mainScene.addChild($404);
    enemyArr.push($404);
}



g.start();