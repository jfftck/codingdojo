var PriorityQueue = require('./PriorityQueue');

var pq = PriorityQueue();

pq
    .enqueue(200, 20)
    .enqueue(42, 10)
    .enqueue(37, 1)
    .enqueue(7, 8)
    .enqueue('This is awesome!', 3)
    .enqueue(25, 25);

console.log(pq);

console.log(pq.dequeue());
console.log(pq);

console.log(pq.dequeue());
console.log(pq);

console.log(pq.dequeue());
console.log(pq);

console.log(pq.dequeue());
console.log(pq);

console.log(pq.dequeue());
console.log(pq);

console.log(pq.dequeue());
console.log(pq);

console.log(pq.dequeue());
console.log(pq);

console.log(pq.dequeue());
