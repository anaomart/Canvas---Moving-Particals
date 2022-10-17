let canvas = document.querySelector('canvas');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let c = canvas.getContext('2d');
// c.fillRect(00, 00, 100, 100)
// c.fillStyle = 'blue'
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'red'
// c.fillRect(200, 200, 100, 100)
// c.fillStyle = 'green'
// c.fillRect(300, 300, 100, 100)

// // line 
// c.beginPath();
// c.moveTo(50, 300)
// c.lineTo(300, 10)
// c.lineTo(600, 200)
// c.strokeStyle = 'red'
// c.stroke();
// c.beginPath();
// // arc / circle

// for (let i = 0; i < 100; i++) {
//     c.beginPath();
//     let x = Math.random() * w;
//     let y = Math.random() * h;
//     c.arc(x, y, 40, 0, Math.PI * 2, false);
//     c.strokeStyle = `rgb(${x/5}, ${y}, ${y})`;
//     c.stroke();
// }
let colorArray = [
    '#AEE0FF',
    '#7D35E6',
    '#FC4765',
    '#275950',
    '#FEEE3A'
]


minRadius = 5;

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx
    this.dy = dy
    this.radius = radius;
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.stroke()
        c.fill();
    }
    this.update = function() {
        if (this.x + this.radius > w || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > w || this.y - this.radius < 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 40) {
                this.radius += 1;
                console.log(mouse)
            }
        } else if (this.radius > minRadius) {
            this.radius -= 1;

        }

        this.draw();
    }

}

var mouse = {
    x: undefined,
    y: undefined,
};
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize', (event) => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    init()
})

let circleArray = [];


/* Color Theme Swatches in Hex */


function init() {
    circleArray = []
    for (let i = 0; i < 500; i++) {
        var radius = 5;
        var x = Math.random() * (w - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var y = Math.random() * (h - radius * 2) + radius;
        var dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, w, h);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}
init()
animate();