// Flat grid with bounds checking, no exceptions
export class Grid {
  constructor(rows, cols) {
    this._rows = rows | 0;
    this._cols = cols | 0;
    this._data = new Array(this._rows * this._cols).fill(false);
  }

  rows() { return this._rows; }
  cols() { return this._cols; }
  size() { return this._rows * this._cols; }

  _inBounds({ row, col }) {
    return row >= 0 && row < this._rows && col >= 0 && col < this._cols;
  }

  indexFor({ row, col }) {
    if (!this._inBounds({ row, col })) return undefined;
    return row * this._cols + col;
  }

  rowColFor(index) {
    if (index < 0 || index >= this.size()) return undefined;
    const row = Math.floor(index / this._cols);
    const col = index % this._cols;
    return { row, col };
  }

  set(pos, value) {
    const i = this.indexFor(pos);
    if (i === undefined) return;
    this._data[i] = !!value;
  }

  get(pos) {
    const i = this.indexFor(pos);
    return i === undefined ? undefined : this._data[i];
  }

  neighbours(pos) {
    const dirs = [
      [-1, 0],[1, 0],[0,-1],[0,1],
      [-1,-1],[-1,1],[1,-1],[1,1]
    ];
    const out = [];
    for (const [dr, dc] of dirs) {
      const n = { row: pos.row + dr, col: pos.col + dc };
      if (this._inBounds(n)) out.push(n);
    }
    return out;
  }

  neighbourValues(pos) {
    return this.neighbours(pos).map(p => this.get(p));
  }

  fill(value) {
    this._data.fill(!!value);
  }
}