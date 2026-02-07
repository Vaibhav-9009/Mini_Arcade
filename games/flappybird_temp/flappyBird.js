const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


let birdY = 200;
let velocity = 0;
let gravity = 0.6;
let pipeX = 320;
let gap = 120;
let score = 0;


function loop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);


velocity += gravity;
birdY += velocity;


ctx.fillStyle = 'yellow';
ctx.fillRect(50, birdY, 20, 20);


pipeX -= 2;
if (pipeX < -40) {
pipeX = 320;
score++;
}
ctx.fillStyle = 'green';
ctx.fillRect(pipeX, 0, 40, 200);
ctx.fillRect(pipeX, 200 + gap, 40, 480);


if (birdY < 0 || birdY > 460 ||
(50 + 20 > pipeX && 50 < pipeX + 40 &&
(birdY < 200 || birdY + 20 > 200 + gap))) {
alert('Game Over! Score: ' + score);
location.reload();
}


requestAnimationFrame(loop);
}


window.onclick = () => velocity = -8;
loop();
