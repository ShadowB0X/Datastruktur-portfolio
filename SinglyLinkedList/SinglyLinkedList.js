
export class SinglyLinkedList {
  constructor() {
    this.head = null;    
    this._size = 0;      
  }

  _createNode(data) {
    return {
      data: data,
      next: null
    };
  }

  add(data) {
    const newNode = this._createNode(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this._size++;
    return data;
  }

  get(index) {
    const node = this.getNode(index);
    return node ? node.data : null;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    const node = this.getLastNode();
    return node ? node.data : null;
  }

  set(index, data) {
    const node = this.getNode(index);
    if (!node) return false;
    node.data = data;
    return true;
  }

  insert(index, data) {
    if (index < 0 || index > this._size) {
      return false;
    }

    const newNode = this._createNode(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const prev = this.getNode(index - 1);
      if (!prev) return false;
      newNode.next = prev.next;
      prev.next = newNode;
    }

    this._size++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this._size || !this.head) {
      return null;
    }

    let removed;

    if (index === 0) {
      removed = this.head;
      this.head = this.head.next;
    } else {
      const prev = this.getNode(index - 1);
      if (!prev || !prev.next) return null;
      removed = prev.next;
      prev.next = removed.next;
    }

    this._size--;
    const data = removed.data;
    removed.next = null; 
    return data;
  }

  removeFirst() {
    return this.remove(0);
  }

  removeLast() {
    if (this._size === 0) return null;
    return this.remove(this._size - 1);
  }

  size() {
    return this._size;
  }

  clear() {
    this.head = null;
    this._size = 0;
  }

  printList() {
    if (!this.head) {
      console.log("Liste: (tom)");
      return;
    }

    let current = this.head;
    let index = 0;
    const parts = [];

    while (current) {
      const nextInfo = current.next ? "node" : "null";
      parts.push(
        `[${index}] data: ${JSON.stringify(current.data)} -> next: ${nextInfo}`
      );
      current = current.next;
      index++;
    }

    console.log("Liste:");
    console.log(parts.join("\n"));
  }

  getNode(index) {
    if (index < 0 || index >= this._size) {
      return null;
    }

    let current = this.head;
    let i = 0;

    while (i < index && current) {
      current = current.next;
      i++;
    }

    return current || null;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    if (!this.head) return null;

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  getNextNode(node) {
    if (!node) return null;
    return node.next || null;
  }

  getPreviousNode(node) {
    if (!this.head || !node) return null;
    if (this.head === node) return null;

    let current = this.head;

    while (current && current.next !== node) {
      current = current.next;
    }

    return current && current.next === node ? current : null;
  }

  insertBefore(node, data) {
    if (!node) return null;

    const newNode = this._createNode(data);

    if (this.head === node) {
      newNode.next = this.head;
      this.head = newNode;
      this._size++;
      return newNode;
    }

    const prev = this.getPreviousNode(node);
    if (!prev) return null;

    prev.next = newNode;
    newNode.next = node;
    this._size++;
    return newNode;
  }

  insertAfter(node, data) {
    if (!node) return null;

    const newNode = this._createNode(data);

    newNode.next = node.next;
    node.next = newNode;

    this._size++;
    return newNode;
  }

  
  removeNode(node) {
    if (!this.head || !node) return null;


    if (this.head === node) {
      this.head = this.head.next;
      node.next = null;
      this._size--;
      return node;
    }

    const prev = this.getPreviousNode(node);
    if (!prev || !prev.next) return null;

    prev.next = node.next;
    node.next = null;
    this._size--;
    return node;
  }
}