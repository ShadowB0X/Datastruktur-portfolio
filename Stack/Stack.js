

export class Stack {
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
  
    push(data) {
      const newNode = this._createNode(data);
  
      
      newNode.next = this.head;
      this.head = newNode;
  
      this._size++;
      return data;
    }
  
   
    pop() {
      if (!this.head) {
        return null;
      }
  
      const removed = this.head;
      this.head = this.head.next;
  
      this._size--;
      const data = removed.data;
      removed.next = null; 
      return data;
    }
  
  
    peek() {
      return this.head ? this.head.data : null;
    }
  
    size() {
      return this._size;
    }
  

    get(index) {
      if (index < 0 || index >= this._size) {
        return null;
      }
  
      let current = this.head;
      let i = 0;
  
      while (i < index && current) {
        current = current.next;
        i++;
      }
  
      return current ? current.data : null;
    }
  
  
    printStack() {
      if (!this.head) {
        console.log("Stack: (tom)");
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
  
      console.log("Stack:");
      console.log(parts.join("\n"));
    }
  }
  