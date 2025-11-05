import { Life } from "./life.js";


// --- Config ---
const ROWS = 30;
const COLS = 50;
let TICK_MS = 500;

// --- Model ---
const life = new Life(ROWS, COLS);
life.seed(0.22);

// --- View setup ---
const gridEl = document.getElementById("grid");
gridEl.style.setProperty("--rows", ROWS);
gridEl.style.setProperty("--cols", COLS);

const cells = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const div = document.createElement("div");
    div.className = "cell";
    div.dataset.row = r;
    div.dataset.col = c;
    gridEl.appendChild(div);
    cells.push(div);
  }
}

// --- Rendering ---
function render() {
  for (let i = 0; i < cells.length; i++) {
    const row = (i / COLS) | 0;
    const col = i % COLS;
    const alive = life.grid.get({ row, col }) === true;
    cells[i].classList.toggle("alive", alive);
  }
  document.getElementById("gen").textContent = life.generation;
}

// --- Interactivity ---
gridEl.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLElement)) return;
  if (!e.target.classList.contains("cell")) return;
  const row = +e.target.dataset.row;
  const col = +e.target.dataset.col;
  life.toggle({ row, col });
  render();
});

// --- Loop ---
let timer = null;
function start() {
  if (timer) return;
  timer = setInterval(() => { life.step(); render(); }, TICK_MS);
}
function stop() {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
}

// --- Controls ---
document.getElementById("btn-clear").addEventListener("click", () => {
  life.clear(); render();
});
document.getElementById("btn-random").addEventListener("click", () => {
  const n = +document.getElementById("rnd-count").value || 0;
  life.addRandom(n); render();
});
document.getElementById("btn-pause").addEventListener("click", stop);
document.getElementById("btn-play").addEventListener("click", start);
document.getElementById("speed").addEventListener("change", (e) => {
  const v = +e.target.value;
  if (v >= 50) {
    TICK_MS = v;
    if (timer) { stop(); start(); }
  }
});

// --- Initial ---
render();
start();