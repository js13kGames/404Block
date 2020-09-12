var g = ga(1200, 900, setup, ["button.png", "bullet.png"]);
g.scaleToWindow();
g.start();


var mainScene;
var dieMessage, dieScene, scores;
var waitScene;
var timer, timerStep, timerIntervalId, timerCount, timerStart, timerStop;
var player;
var enemyCounts, enemyArr;
var enemySpeed;
var outerBar, innerBar, healthBar;
var startButton, restartButton;
var bullet;
var outerBar1, innerBar1, ammoBar;
var ifReload = false;

const randomNumber = (max) => {
    parseInt(Math.random()*(max+1),10);
    return Math.floor(Math.random()*(max+1));
}

function setup() {

    g.canvas.style.border = "1px black dashed";
    g.backgroundColor = "Grey";

    // wait scene
    var buttonFrame = g.frames(
        "button.png",
        [[0,0],[0,96],[0,192]],
        192, 96
    );

    // build start button
    startButton = g.button(buttonFrame);
    waitScene = g.group(startButton);
    waitScene.addChild(startButton);
    g.stage.putCenter(startButton, 0, 0);
 
    // main scene
    mainScene = g.group();
    mainScene.visible = false;

    // timer
    timer = g.text(0+ " s", "30px sans-serif", "#ffffff", 4, 4);
    mainScene.addChild(timer);

    timerStep = 0;
    timerIntervalId = null;

    timerCount = function () {
        timer.content = timerStep.toFixed(2) + ' s';
        timerStep += 0.1;
    }

    timerStart = function () {
        if (!timerIntervalId) {
            timerCount();
            timerIntervalId = setInterval(timerCount, 100);
        }
    }

    timerStop = function () {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }

    // ---------------- timer setting end ----------------

    // die ui
    restartButton = g.button(buttonFrame);
    g.stage.putCenter(restartButton, 50, 150);
    dieMessage = g.text("You Died!", "64px Futura", "black");
    g.stage.putCenter(dieMessage, 0, 0);
    scores = g.text('scores: ' + timerStep.toFixed(2) + 's', "40px Futura", "black");
    g.stage.putCenter(scores, 0, 60);
    dieScene = g.group(dieMessage, scores, restartButton);
    dieScene.addChild(restartButton);
    dieScene.visible = false;

    // --------------- scene setting end ----------------



    // player
    player = g.rectangle(32, 32, "red");
    g.stage.putCenter(player, 0, 0);
    mainScene.addChild(player);

    // shoot setting
    bullet = [];

    // ammo bar
    outerBar1 = g.rectangle(200, 20, 'white');
    innerBar1 = g.rectangle(200, 20, 'blue');
    ammoBar = g.group(outerBar1, innerBar1);
    ammoBar.inner = innerBar1;
    ammoBar.x = g.canvas.width / 2;
    ammoBar.y = 18;
    mainScene.addChild(ammoBar);

    
    g.key.upArrow.press = function () {
        if (ammoBar.inner.width > 0 && !ifReload) {
            g.shoot(
                player,
                4.71,
                16,
                8,
                bullet,
                function () {
                    return g.sprite("bullet.png");
                }
            );
            ammoBar.inner.width -= 15;
        }
    }

    g.key.downArrow.press = function () {
        if (ammoBar.inner.width > 0 && !ifReload) {
            g.shoot(
                player,
                -4.71,
                16,
                8,
                bullet,
                function () {
                    return g.sprite("bullet.png");
                }
            );
            ammoBar.inner.width -= 15;
        }
       
    }

    g.key.leftArrow.press = function () {
        if (ammoBar.inner.width > 0 && !ifReload) {
            g.shoot(
                player,
                3.14,
                16,
                8,
                bullet,
                function () {
                    return g.sprite("bullet.png");
                }
            );
            ammoBar.inner.width -= 15;
        }
        
    }

    g.key.rightArrow.press = function () {
        if (ammoBar.inner.width > 0 && !ifReload) {
            g.shoot(
                player,
                0,
                16,
                8,
                bullet,
                function () {
                    return g.sprite("bullet.png");
                }
            );
            ammoBar.inner.width -= 15;
        }
      
    }

    // reload
    g.key.space.press = function () {
        ammoBar.inner.width = 0;
        ifReload = true;
    }

    // ----------- shoot setting done ------------ 

    // enemy groups
    enemyCounts = 8;
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

    g.state = wait;
}


function wait() {
    startButton.press = function () {
        waitScene.visible = false;
        mainScene.visible = true;
        timerStart();
        g.state = play;
    }

}

function die() {
    g.pause();
    timerStop();
    scores.content = 'scores: ' + timerStep.toFixed(2) + 's';
    mainScene.visible = false;
    dieScene.visible = true;
    restartButton.press = function () {
        document.location.reload();
    }
}

function updateEnemySpeed (enemy) {
    enemySpeed = randomNumber(10);
    var xDirection = player.x > enemy.x ? 1 : -1;
    var yDirection = player.y > enemy.y ? 1 : -1;
    enemy.vx = xDirection * enemySpeed;
    enemy.vy = yDirection * enemySpeed;
}

function play() {

    // timer on
    g.move(player);
    g.move(bullet);
    g.contain(player, g.stage.localBounds);
    var playerHit = false;

    // collision
    enemyArr.forEach(enemy => {
        updateEnemySpeed(enemy);
        g.move(enemy);
        if (g.hitTestRectangle(player, enemy)) {
            playerHit = true;
        }

    });

    // reload
    if (ifReload) {
        if (ammoBar.inner.width >= 200) {
            ifReload = false;
        } else {
            ammoBar.inner.width += 2;
        }
    }

    if (playerHit) {
        player.alpha = 0.5;
        healthBar.inner.width -= 10;
    } else {
        player.alpha = 1;
    }

    if (healthBar.inner.width <= 0) {
        g.state = die;
    }


}

