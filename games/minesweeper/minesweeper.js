
const size = 8;
const minesCount = 10;
let board = [];


function startGame() {
board = [];
const grid = document.getElementById('grid');
grid.innerHTML = '';


for (let i = 0; i < size * size; i++) {
board.push({ mine: false, revealed: false, count: 0 });
}


let placed = 0;
while (placed < minesCount) {
let idx = Math.floor(Math.random() * board.length);
if (!board[idx].mine) {
board[idx].mine = true;
placed++;
}
}
board.forEach((cell, i) => {
if (cell.mine) return;
let count = 0;
for (let x = -1; x <= 1; x++) {
for (let y = -1; y <= 1; y++) {
let ni = i + x * size + y;
if (board[ni] && board[ni].mine) count++;
}
}
cell.count = count;
});


board.forEach((cell, i) => {
const div = document.createElement('div');
div.className = 'cell';
div.onclick = () => reveal(i, div);
grid.appendChild(div);
});
}
function reveal(i, div) {
if (board[i].revealed) return;
board[i].revealed = true;
div.classList.add('revealed');


if (board[i].mine) {
div.innerText = '💣';
alert('Game Over');
return;
}


if (board[i].count > 0) {
div.innerText = board[i].count;
}
}


startGame();