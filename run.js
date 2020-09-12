var g = ga(1200, 900, setup);
g.start();

var mainScene;
var dieMessage, dieScene;
var timer, timerStep, timerIntervalId, timerCount, timerStart, timerStop;
var player;
var enemyCounts, enemyArr;
var outerBar, innerBar, healthBar;

function setup() {

    const randomNumber = (max) => {
        parseInt(Math.random()*(max+1),10);
        return Math.floor(Math.random()*(max+1));
    }

    g.canvas.style.border = "1px black dashed";
    g.backgroundColor = "Grey";

    // main scene
    mainScene = g.group();

    dieMessage = g.text("You Died!", "64px Futura", "black");
    g.stage.putCenter(dieMessage, 0, 0);
    dieScene = g.group(dieMessage);
    dieScene.visible = false;

    // --------------- scene setting end ----------------

    // timer
    timer = g.text(0+ " s", "30px sans-serif", "#ffffff", 4, 4);
    mainScene.addChild(timer);

    timerStep = 0;
    timerIntervalId = null;
    timerCount = () => {
        timer.content = timerStep.toFixed(2) + ' s';
        timerStep += 0.1;
    }

    timerStart = () => {
        if (!timerIntervalId) {
            timerCount();
            timerIntervalId = setInterval(timerCount, 100);
        }
    }

    timerStop = () => {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }

    // ---------------- timer setting end ----------------

    // player
    player = g.rectangle(32, 32, "red");
    g.stage.putCenter(player, 0, 0);
    mainScene.addChild(player);

    // enemy groups
    enemyCounts = 5;
    enemyArr = [];
    for (var i = 0; i < enemyCounts; i++) {
        var $404 = g.text("404", "50px sans-serif", "#808A87", randomNumber(g.canvas.width - 100), randomNumber(g.canvas.height - 100));
        mainScene.addChild($404);
        enemyArr.push($404);
    }

    // health bar
    outerBar = g.rectangle(200, 20, 'black');
    innerBar = g.rectangle(200, 20, 'yellowGreen');
    healthBar = g.group(outerBar, innerBar);
    healthBar.inner = innerBar;
    healthBar.x = g.canvas.width - 250;
    healthBar.y = 18;
    mainScene.addChild(healthBar);

    // player control
    g.fourKeyController(player, 12, 87, 68, 83, 65);
    // ---------- control setting end ------------

    g.state = play;
}

function play() {
    g.move(player);
    g.contain(player, g.stage.localBounds);
}

