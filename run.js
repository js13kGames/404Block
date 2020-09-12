function setup() {
    g.state = play;
}

var g = ga(800, 600, setup, []);
g.canvas.style.border = "1px black dashed";
g.backgroundColor = "white";
g.start();