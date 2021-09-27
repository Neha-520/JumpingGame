const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d'); //returns  drawing context - which is an object that has all the drawing properties and functions you use to draw on the canvas. 

//SFX
let scoreSFX = new Audio("./audio/classiccoin.mp3")
let gameOverSFX = new Audio('./audio/jump/mp3');
let jumpSFX = new Audio('./smb_gameover/mp3');

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
        //spin animation related
        this.spin = 0;
        //get perfect 90 degree rotation
        this.spinIncrement = 90 / 32;
    }

    rotation() {
        //take center point of square 
        let offsetXPosition = this.x + (this.size / 2);
        let offsetYPosition = this.y + (this.size / 2);
        //move canvas origin to that point and cube will rotate in relation to its center
        ctx.translate(offsetXPosition, offsetYPosition);

        ctx.rotate(this.spin * Math.PI / 180);
        ctx.rotate(this.spinIncrement * Math.PI / 180) //convert degree to radians
        //move the canvas back to its original position 
        ctx.translate(-offsetXPosition, -offsetYPosition);
        this.spin += this.spinIncrement;

    }

    counterRotation() {
        //rotate cube back to its origin so it can be moved upwars properly  
        let offsetXPosition = this.x + (this.size / 2);
        let offsetYPosition = this.y + (this.size / 2);
        ctx.translate(offsetXPosition, offsetYPosition);
        ctx.rotate(-this.spin * Math.PI / 180);
        ctx.translate(-offsetXPosition, -offsetYPosition);

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
            this.rotation();
            //end the cycle
            if (this.jumpCounter >= 32) {
                this.counterRotation();
                this.spin = 0;
                this.shouldJump = false;
            }
        }
    }

    draw() {
        this.jump();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        if (this.shouldJump) this.counterRotation();
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