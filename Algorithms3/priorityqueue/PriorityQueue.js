'use strict';

class PriorityQueue {
    constructor() {
        this._queue = [];
    }

    enqueue(value, priority) {
        var item = {priority: priority, value: value};
        var index = this._queue.length;
        var lowerIndex = () => Math.floor(index/2);

        this._queue.push(item);

        while (this._queue[lowerIndex()].priority > this._queue[index].priority) {
            this._swap(lowerIndex(), index);

            index = lowerIndex();
        }

        return this;
    }

    dequeueItem() {
        if (this._queue.length < 1) {
            return null;
        }

        var q = this._queue;
        var index = 0;
        var left = () => (index * 2) + 1;
        var right = () => (index * 2) + 2;
        var checkLeft = () => left() < q.length;
        var checkRight = () => right() < q.length;

        this._swap(0, q.length - 1);

        var item = q.pop();

        while (isLowerPriority()) {
            if (right() >= q.length || q[left()].priority < q[right()].priority) {
                this._swap(index, left());
                index = left();
            } else {
                this._swap(index, right());
                index = right();
            }
        }

        return item;

        function isLowerPriority() {
            var isLP = false;

            if (checkLeft()) {
                isLP = q[left()].priority < q[index].priority;
            }

            if (checkRight()) {
                isLP = isLP || q[right()].priority < q[index].priority;
            }

            return isLP;
        }
    }

    dequeue() {
        var item = this.dequeueItem()
        return item ? item.value : null;
    }

    peek() {
        return this._queue[0];
    }

    length() {
        return this._queue.length;
    }

    _swap(a, b) {
        var temp = this._queue[a];
        this._queue[a] = this._queue[b];
        this._queue[b] = temp;
    }
}

exports = module.exports = () => {
    return new PriorityQueue();
}
