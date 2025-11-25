import { Queue } from "./queue.js";


const GRID_WIDTH = 30;
const GRID_HEIGHT = 20;
const CELL_SIZE = 20;
const TICK_MS = 200;

const model = {
  snake: new Queue(),       
  direction: "right",

  food: null,             
  canSpawnFood: true,
  alive: true
};


const canvas = document.getElementById("game");
canvas.width = GRID_WIDTH * CELL_SIZE;
canvas.height = GRID_HEIGHT * CELL_SIZE;
const ctx = canvas.getContext("2d");




function createRandomCell() {
  return {
    x: Math.floor(Math.random() * GRID_WIDTH),
    y: Math.floor(Math.random() * GRID_HEIGHT)
  };
}

function spawnFood() {
  if (!model.canSpawnFood) return;

  model.food = createRandomCell();
  model.canSpawnFood = false;

  setTimeout(() => { model.canSpawnFood = true; }, 600);
}

function moveSnake() {
  const head = model.snake.peek();
  if (!head) return;

  let newHead = { x: head.x, y: head.y };

  if (model.direction === "right") newHead.x++;
  if (model.direction === "left") newHead.x--;
  if (model.direction === "up") newHead.y--;
  if (model.direction === "down") newHead.y++;

  if (newHead.x < 0) newHead.x = GRID_WIDTH - 1;
  if (newHead.x >= GRID_WIDTH) newHead.x = 0;
  if (newHead.y < 0) newHead.y = GRID_HEIGHT - 1;
  if (newHead.y >= GRID_HEIGHT) newHead.y = 0;

  for (let i = 0; i < model.snake.size(); i++) {
    const part = model.snake.get(i);
    if (part.x === newHead.x && part.y === newHead.y) {
      model.alive = false;
      return;
    }
  }

  model.snake.enqueue(newHead);

  if (!model.food || newHead.x !== model.food.x || newHead.y !== model.food.y) {
    model.snake.dequeue();
  } else {
    model.food = null;
  }
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < model.snake.size(); i++) {
    const p = model.snake.get(i);
    ctx.fillStyle = "#4caf50";
    ctx.fillRect(p.x * CELL_SIZE, p.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  if (model.food) {
    ctx.fillStyle = "red";
    ctx.fillRect(model.food.x * CELL_SIZE, model.food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  if (!model.alive) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
  }
}



document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && model.direction !== "down") model.direction = "up";
  if (e.key === "ArrowDown" && model.direction !== "up") model.direction = "down";
  if (e.key === "ArrowLeft" && model.direction !== "right") model.direction = "left";
  if (e.key === "ArrowRight" && model.direction !== "left") model.direction = "right";
});




function tick() {
  if (!model.alive) return;

  moveSnake();

  if (!model.food && model.canSpawnFood) {
    spawnFood();
  }

  draw();
  setTimeout(tick, TICK_MS);
}

model.snake.enqueue({ x: 10, y: 10 });
model.snake.enqueue({ x: 9, y: 10 });
model.snake.enqueue({ x: 8, y: 10 });

spawnFood();
tick();
