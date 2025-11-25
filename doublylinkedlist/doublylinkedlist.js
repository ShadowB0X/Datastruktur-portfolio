
class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
  }
  
  export default class DoublyLinkedList {
    constructor() {
      this.head = null; 
      this.tail = null; 
      this._length = 0; 
    }
  
    _isIndexOutOfBounds(index) {
      return index < 0 || index >= this._length;
    }
  
    _getNodeInternal(index) {
      if (this._isIndexOutOfBounds(index)) {
        return null;
      }
  
      let current;
      if (index < this._length / 2) {
        current = this.head;
        let i = 0;
        while (i < index) {
          current = current.next;
          i++;
        }
      } else {
        current = this.tail;
        let i = this._length - 1;
        while (i > index) {
          current = current.prev;
          i--;
        }
      }
  
      return current;
    }
  
    _attachNodeAtEnd(node) {
      node.next = null;
      node.prev = this.tail;
      if (!this.head) {
        this.head = node;
      } else {
        this.tail.next = node;
      }
      this.tail = node;
      this._length++;
    }
  
    _attachNodeAtStart(node) {
      node.prev = null;
      node.next = this.head;
      if (!this.tail) {
        this.tail = node;
      } else {
        this.head.prev = node;
      }
      this.head = node;
      this._length++;
    }
  
    _detachNode(node) {
      if (!node) return;
  
      if (node.prev) {
        node.prev.next = node.next;
      } else {
   
        this.head = node.next;
      }
  
      if (node.next) {
        node.next.prev = node.prev;
      } else {
     
        this.tail = node.prev;
      }
  
      node.next = null;
      node.prev = null;
      this._length--;
    }
  
    printList() {
      let current = this.head;
      let index = 0;
  
      console.log("DoublyLinkedList (length =", this._length + "):");
      while (current) {
        const prevInfo = current.prev ? "data=" + current.prev.data : "null";
        const nextInfo = current.next ? "data=" + current.next.data : "null";
  
        console.log(
          `[${index}] Node { data=${current.data}, prev=${prevInfo}, next=${nextInfo} }`
        );
  
        current = current.next;
        index++;
      }
      if (this._length === 0) {
        console.log("(tom liste)");
      }
    }

    addLast(data) {
      const newNode = new Node(data);
      this._attachNodeAtEnd(newNode);
    }
  

    addFirst(data) {
      const newNode = new Node(data);
      this._attachNodeAtStart(newNode);
    }
  
 
    get(index) {
      const node = this._getNodeInternal(index);
      return node ? node.data : null;
    }
  
    getFirst() {
      return this.head ? this.head.data : null;
    }
  
    getLast() {
      return this.tail ? this.tail.data : null;
    }
  
    set(index, data) {
      const node = this._getNodeInternal(index);
      if (!node) return false;
      node.data = data;
      return true;
    }
  
    insert(index, data) {
      if (index < 0 || index > this._length) return false;
  
      if (index === 0) {
        this.addFirst(data);
        return true;
      }
  
      if (index === this._length) {
        this.addLast(data);
        return true;
      }
  
      const existingNode = this._getNodeInternal(index);
      if (!existingNode) return false;
  
      const newNode = new Node(data);
      newNode.prev = existingNode.prev;
      newNode.next = existingNode;
  
      existingNode.prev.next = newNode;
      existingNode.prev = newNode;
  
      this._length++;
      return true;
    }
  
    insertAfter(index, data) {
      if (this._isIndexOutOfBounds(index)) return false;
  
      const current = this._getNodeInternal(index);
      if (!current) return false;
  
      if (current === this.tail) {
        this.addLast(data);
        return true;
      }
  
      const newNode = new Node(data);
      newNode.next = current.next;
      newNode.prev = current;
  
      current.next.prev = newNode;
      current.next = newNode;
  
      this._length++;
      return true;
    }
  
    insertBefore(index, data) {
      if (this._isIndexOutOfBounds(index)) return false;
  
      if (index === 0) {
        this.addFirst(data);
        return true;
      }
  
      return this.insert(index, data);
    }
  
    remove(index) {
      if (this._isIndexOutOfBounds(index)) return null;
  
      const node = this._getNodeInternal(index);
      if (!node) return null;
  
      const data = node.data;
      this._detachNode(node);
      return data;
    }
  
    removeFirst() {
      if (!this.head) return null;
      const data = this.head.data;
      this._detachNode(this.head);
      return data;
    }
  
    removeLast() {
      if (!this.tail) return null;
      const data = this.tail.data;
      this._detachNode(this.tail);
      return data;
    }
  
    size() {
      return this._length;
    }
  
    clear() {
      this.head = null;
      this.tail = null;
      this._length = 0;
    }
  
  
    makeLast(node) {
      if (!node || this._length <= 1 || node === this.tail) return;
  
      this._detachNode(node);
      this._attachNodeAtEnd(node);
    }
  
    makeFirst(node) {
      if (!node || this._length <= 1 || node === this.head) return;
  
      this._detachNode(node);
      this._attachNodeAtStart(node);
    }
  
    getNode(index) {
      return this._getNodeInternal(index);
    }
  
    getFirstNode() {
      return this.head;
    }
  
    getLastNode() {
      return this.tail;
    }
  
    getNextNode(node) {
      if (!node) return null;
      return node.next;
    }
  
    getPreviousNode(node) {
      if (!node) return null;
      return node.prev;
    }
  
    insertBeforeNode(node, data) {
      if (!node) return null;
  
      if (node === this.head) {
        this.addFirst(data);
        return this.head;
      }
  
      const newNode = new Node(data);
      newNode.prev = node.prev;
      newNode.next = node;
  
      node.prev.next = newNode;
      node.prev = newNode;
  
      this._length++;
      return newNode;
    }
  
    insertAfterNode(node, data) {
      if (!node) return null;
  
      if (node === this.tail) {
        this.addLast(data);
        return this.tail;
      }
  
      const newNode = new Node(data);
      newNode.next = node.next;
      newNode.prev = node;
  
      node.next.prev = newNode;
      node.next = newNode;
  
      this._length++;
      return newNode;
    }
  
    removeNode(node) {
      if (!node) return;
      this._detachNode(node);
    }
  
    swap(nodeA, nodeB) {
      if (!nodeA || !nodeB || nodeA === nodeB) return;
  
      const aPrev = nodeA.prev;
      const aNext = nodeA.next;
      const bPrev = nodeB.prev;
      const bNext = nodeB.next;
  
      const aIsHead = nodeA === this.head;
      const aIsTail = nodeA === this.tail;
      const bIsHead = nodeB === this.head;
      const bIsTail = nodeB === this.tail;
  
      if (aNext === nodeB) {
        if (aPrev) aPrev.next = nodeB;
        nodeB.prev = aPrev;
  
        nodeB.next = nodeA;
        nodeA.prev = nodeB;
  
        nodeA.next = bNext;
        if (bNext) bNext.prev = nodeA;
      }
      else if (bNext === nodeA) {
        if (bPrev) bPrev.next = nodeA;
        nodeA.prev = bPrev;
  
        nodeA.next = nodeB;
        nodeB.prev = nodeA;
  
        nodeB.next = aNext;
        if (aNext) aNext.prev = nodeB;
      }
      else {
        if (aPrev) aPrev.next = nodeB;
        if (aNext) aNext.prev = nodeB;
        if (bPrev) bPrev.next = nodeA;
        if (bNext) bNext.prev = nodeA;
  
        nodeA.prev = bPrev;
        nodeA.next = bNext;
        nodeB.prev = aPrev;
        nodeB.next = aNext;
      }
  
      if (aIsHead) this.head = nodeB;
      else if (bIsHead) this.head = nodeA;
  
      if (aIsTail) this.tail = nodeB;
      else if (bIsTail) this.tail = nodeA;
    }
  }
  