import { Grid } from "./grid.js";
export class Life {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = new Grid(rows, cols);
    this.generation = 0;
  }

  countNeighbours(pos) {
    let n = 0;
    for (const v of this.grid.neighbourValues(pos)) if (v === true) n++;
    return n;
  }

  nextState(isAlive, n) {
    if (n < 2) return false;       // underpopulation
    if (n === 2) return !!isAlive; // survives if alive
    if (n === 3) return true;      // born or survives
    return false;                  // overpopulation
  }

  step() {
    const next = new Grid(this.rows, this.cols);
    for (let i = 0; i < this.grid.size(); i++) {
      const pos = this.grid.rowColFor(i);
      const alive = this.grid.get(pos) === true;
      const n = this.countNeighbours(pos);
      next.set(pos, this.nextState(alive, n));
    }
    this.grid = next;
    this.generation++;
  }

  clear() {
    this.grid.fill(false);
    this.generation = 0;
  }

  addRandom(count) {
    for (let k = 0; k < count; k++) {
      const r = (Math.random() * this.rows) | 0;
      const c = (Math.random() * this.cols) | 0;
      this.grid.set({ row: r, col: c }, true);
    }
  }

  seed(prob = 0.22) {
    for (let i = 0; i < this.grid.size(); i++) {
      const pos = this.grid.rowColFor(i);
      this.grid.set(pos, Math.random() < prob);
    }
  }

  toggle(pos) {
    const v = this.grid.get(pos) === true;
    this.grid.set(pos, !v);
  }
}