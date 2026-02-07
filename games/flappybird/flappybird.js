const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// --------------------
// GAME VARIABLES
// --------------------
let birdY = 200;
let velocity = 0;
const gravity = 0.6;

let pipeX = 320;
const gap = 120;

let score = 0;
let gameStarted = false;
let gameOver = false;

// --------------------
// GAME LOOP
// --------------------
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Start physics ONLY after click
    if (gameStarted && !gameOver) {
        velocity += gravity;
        birdY += velocity;
        pipeX -= 2;
    }

    // Bird
    ctx.fillStyle = "yellow";
    ctx.fillRect(50, birdY, 20, 20);

    // Pipes
    ctx.fillStyle = "green";
    ctx.fillRect(pipeX, 0, 40, 200);
    ctx.fillRect(pipeX, 200 + gap, 40, canvas.height);

    // Reset pipe + score
    if (pipeX < -40) {
        pipeX = canvas.width;
        score++;
    }

    // Collision detection
    if (
        gameStarted &&
        (
            birdY < 0 ||
            birdY > canvas.height - 20 ||
            (
                50 + 20 > pipeX &&
                50 < pipeX + 40 &&
                (birdY < 200 || birdY + 20 > 200 + gap)
            )
        )
    ) {
        gameOver = true;
        setTimeout(() => {
            alert("Game Over! Score: " + score);
            location.reload();
        }, 100);
        return;
    }

    // Start text
    if (!gameStarted) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Click to Start", 90, 200);
    }

    // Score
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(loop);
}

// --------------------
// INPUT
// --------------------
window.addEventListener("click", () => {
    gameStarted = true;
    velocity = -8;
});

// --------------------
// START GAME
// --------------------
loop();
