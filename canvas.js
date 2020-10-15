const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const mouse = {
    x: null,
    y: null,
};
//const fillStyleColors = ["#808080", "#000000", "#ff4500", "#111168"];
//const fillStyleColors = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9", "#808080"];
const fillStyleColors = ["#2C3E50", "#F2303E", "#ECF0F1", "#808080"];
let circleArray = [];

function Circle(x, y, radius, fillColor, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.fillColor = fillColor;
    this.dx = dx;
    this.dy = dy;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    };

    this.update = function () {
        if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        } else if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 40) {
                this.radius++;
            }
        } else if (this.radius > this.minRadius + 1) {
            this.radius--;
        }
        this.draw();
    };
}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    circleArray = [];
    init();
});

function init() {
    for (var i = 0; i < 800; i++) {
        var r = Math.random() * 5 + 1;
        var x = Math.random() * (window.innerWidth - r * 2) + r;
        var y = Math.random() * (window.innerHeight - r * 2) + r;
        var dx = Math.random() - 0.5;
        var dy = Math.random() - 0.5;
        var color = fillStyleColors[Math.floor(Math.random() * fillStyleColors.length)];
        circleArray.push(new Circle(x, y, r, color, dx, dy));
    }
}

function animateCircles() {
    requestAnimationFrame(animateCircles);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animateCircles();
