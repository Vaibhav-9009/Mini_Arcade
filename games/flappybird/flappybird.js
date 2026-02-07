const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ---- GAME STATE ----
let birdY = 200;
let birdVelocity = 0;
const gravity = 0.5;

let pipeX = 320;
const pipeWidth = 40;
const gap = 120;

let score = 0;
let started = false;

// ---- INPUT ----
document.addEventListener("click", () => {
    if (!started) started = true;
    birdVelocity = -8;
});

// ---- GAME LOOP ----
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Start physics ONLY after click
    if (started) {
        birdVelocity += gravity;
        birdY += birdVelocity;
        pipeX -= 2;
    }

    // Bird
    ctx.fillStyle = "yellow";
    ctx.fillRect(50, birdY, 20, 20);

    // Pipes
    ctx.fillStyle = "green";
    ctx.fillRect(pipeX, 0, pipeWidth, 200);
    ctx.fillRect(pipeX, 200 + gap, pipeWidth, canvas.height);

    // Reset pipe
    if (pipeX < -pipeWidth) {
        pipeX = canvas.width;
        score++;
    }

    // Collision (ONLY after game starts)
    if (started) {
        const hitPipe =
            50 + 20 > pipeX &&
            50 < pipeX + pipeWidth &&
            (birdY < 200 || birdY + 20 > 200 + gap);

        const hitGround = birdY + 20 > canvas.height;
        const hitTop = birdY < 0;

        if (hitPipe || hitGround || hitTop) {
            alert("Game Over! Score: " + score);
            location.reload();
            return;
        }
    }

    // Start text
    if (!started) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Click to Start", 90, 220);
    }

    // Score
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(loop);
}

// ---- START ----
loop();
