const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

//SFX
let scoreSFX = new Audio("https://ia903403.us.archive.org/0/items/classiccoin/classiccoin.mp3")
let gameOverSFX = new Audio();
let jumpSFX = new Audio();

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
        this.jumpHeight = 12; //y velocity
        //thse 3 are used for jump configuration
        this.shouldJump = false;
        this.jumpCounter = 0; //allows us to stop animation after 32 frames
    }
    jump() {
        if (this.shouldJump) {
            this.jumpCounter++;
            if (this.jumpCounter < 15) {
                //go up
                this.y -= this.jumpHeight;
            } else if (this.jumpCounter > 14 && this.jumpCounter < 19)
                this.y += 0;
            else if (this.jumpCounter < 33)
                this.y += this.jumpHeight;
        }
        //end the cycle
        if (this.jumpCounter >= 32) this.shouldJump = false;
    }

    draw() {
        this.jump();
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
//jumping lasts for 32 frames >> 1st 14 jumping above+ 4 in air + 14
animate();

//event listeners
addEventListener("keydown", e => {
    if (e.code === "Space") {
        if (!player.shouldJump) {
            jumpSFX.play();
            player.jumpCounter = 0;
            player.shouldJump = true;
        }
    }
})