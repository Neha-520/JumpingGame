const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


function drawBackgrounfLine() {
    ctx.beginPath();
    ctx.moveTo(0, 450);
    ctx.lineTo(650, 450);
    ctx.lineWidth = 1.9;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

class Player {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

let player = new Player(150, 400, 50, "black");

function animate() {
    requestAnimationFrame(animate); //get invoked repeatedly on each new canvas frame
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears content of previous canvas frame

    //canvas logic
    drawBackgrounfLine();
    player.draw();
}

animate();