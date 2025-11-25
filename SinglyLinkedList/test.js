import { SinglyLinkedList } from "./SinglyLinkedList.js";

const list = new SinglyLinkedList();

console.log("Tilføjer elementer...");
list.add("A");
list.add("B");
list.add("C");

list.printList();

console.log("\nHenter første og sidste:");
console.log("Første:", list.getFirst());
console.log("Sidste:", list.getLast());

console.log("\nIndsætter på index 1:");
list.insert(1, "X");
list.printList();

console.log("\nFjerner index 2:");
const removed = list.remove(2);
console.log("Fjernet:", removed);
list.printList();

console.log("\nTester node-metoder:");
const firstNode = list.getFirstNode();
const afterFirst = list.getNextNode(firstNode);

console.log("Første node data:", firstNode.data);
console.log("Næste node data:", afterFirst.data);

console.log("\nIndsætter før første node:");
list.insertBefore(firstNode, "START");
list.printList();

console.log("\nIndsætter efter første node:");
list.insertAfter(firstNode, "AFTER_FIRST");
list.printList();

console.log("\nFjerner en node direkte:");
list.removeNode(afterFirst);
list.printList();

console.log("\nStørrelse:", list.size());