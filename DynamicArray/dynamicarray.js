import { StaticArray } from "../staticarray/staticarray.js";

export class DynamicArray {
    constructor(capacity = 4) {
        this._arr = new StaticArray(capacity);
        this._size = 0;
    }

    // ----- Basale metoder -----
    add(item) {
        if (this._size >= this._arr.length) this.grow();
        this._arr.set(this._size, item);
        this._size++;
    }

    get(index) {
        this._checkIndex(index);
        return this._arr.get(index);
    }

    set(index, item) {
        this._checkIndex(index);
        this._arr.set(index, item);
    }

    size() {
        return this._size;
    }

    // ----- Interne funktionaliteter -----
    capacity() {
        return this._arr.length;
    }

    grow() {
        const bigger = new StaticArray(this._arr.length * 2);
        for (let i = 0; i < this._size; i++) {
            bigger.set(i, this._arr.get(i));
        }
        this._arr = bigger;
    }

    // ----- Dynamiske liste-metoder -----
    insert(index, item) {
        if (index < 0 || index > this._size) {
            throw new RangeError("Index skal være mellem 0 og size()");
        }
        if (this._size >= this._arr.length) this.grow();

        for (let i = this._size; i > index; i--) {
            this._arr.set(i, this._arr.get(i - 1));
        }
        this._arr.set(index, item);
        this._size++;
    }

    remove(index) {
        this._checkIndex(index);

        for (let i = index; i < this._size - 1; i++) {
            this._arr.set(i, this._arr.get(i + 1));
        }
        this._size--;
        this._arr.set(this._size, undefined); // ryd sidste felt
    }

    clear() {
        const cap = this._arr.length;
        this._arr = new StaticArray(cap);
        this._size = 0;
    }

    // ----- Hjælp -----
    _checkIndex(index) {
        if (index < 0 || index >= this._size) {
            throw new RangeError("Index out of range");
        }
    }
}