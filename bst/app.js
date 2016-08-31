'use strict';

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;

        this.Node = class Node {
            constructor(value) {
                this.value = value;
                this.next = null;
            }
        }
    }

    enqueue(value) {
        var node = new this.Node();

        if (this.head === null) {
            this.head = node;
            this.tail = node;

            return this;
        }

        this.tail.next = node;
        this.tail = node;
    }

    dequeue() {
        if (this.head === null) {
            return undefined;
        }

        var value = this.head.value;
        this.head = this.head.next;

        return value;
    }
}

class BST {
    constructor() {
        this.root = null;

        this.Node = class Node {
            constructor(value) {
                this.value = value;
                this.left = null;
                this.right = null;
            }
        }
    }

    isEmpty() {
        return this.root === null;
    }

    add(value) {
        var node = new this.Node(value);

        if (this.isEmpty()) {
            this.root = node;
        } else {
            var currentNode = this.root;

            while (currentNode !== null) {
                if (currentNode.value > value) {
                    if (currentNode.left === null) {
                        currentNode.left = node;
                    } else {
                        currentNode = currentNode.left;
                    }
                } else if (currentNode.value < value) {
                    if (currentNode.right === null) {
                        currentNode.right = node;
                    } else {
                        currentNode = currentNode.right;
                    }
                } else {
                    currentNode = null;
                }
            }
        }

        return this;
    }

    addArray(values) {
        for (var i = 0, len = values.length; i < len; i++) {
            this.add(values[i]);
        }

        return this;
    }

    contains(value) {
        var currentNode = this.root;
        var contains = false;

        while (!contains && currentNode !== null) {
            if (currentNode.value === value) {
                contains = true;
            } else if (currentNode.value > value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return contains;
    }

    min(node) {
        var value = null;

        node = (node instanceof this.Node || node === null) ? node : this.root;

        while (node !== null) {
            value = node.value;
            node = node.left;
        }

        return value;
    }

    max(node) {
        var value = null;

        node = (node instanceof this.Node || node === null) ? node : this.root;

        while (node !== null) {
            value = node.value;
            node = node.right;
        }

        return value;
    }

    size(node) {
        node = (node instanceof this.Node || node === null) ? node : this.root;
        // Count the number of nodes we have.

        // This will allow us to walk all of the nodes.
        function sizeOf(currentNode) {
            // Do we have a valid node?
            if (currentNode === null) {
                // No, so we return 0.
                return 0;
            }

            // We have a valid node, so go to the branches and add 1 to count
            // for this node.
            return sizeOf(currentNode.left) + sizeOf(currentNode.right) + 1;
        }

        // Start at the root and return the final count.
        return sizeOf(node);
    }

    _isValid() {
        function validTree(node, min, max) {
            if (node == null) {
                // Null branch can't be in wrong position, so it is valid.
                return true;
            }

            if (node.value >= min && node.value <= max) {
                // The value is inside the min and max, so this node is valid.
                // We go to the branches until they are null, which will be true.
                return validTree(node.left, min, node.value) &&
                       validTree(node.right, node.value, max);
            }

            // We are out of side of min and max, so no longer valid.
            return false;
        }

        // We start at the root with the min and max of the BST.
        return validTree(this.root, this.min(), this.max());
    }

    height(node) {
        node = (node instanceof this.Node || node === null) ? node : this.root;

        var heightOf = function(currentNode) {
            if (currentNode === null) {
                return 0;
            }

            return Math.max(heightOf(currentNode.left),
                    heightOf(currentNode.right)) + 1;
        }

        return heightOf(node);
    }

    _isBalanced(node) {
        node = (node instanceof this.Node || node === null) ? node : this.root;

        var currentNode = node;
        var q = new Queue();

        while (currentNode) {
            var leftHeight = this.height(currentNode.left);
            var rightHeight = this.height(currentNode.right);

            if (Math.abs(leftHeight - rightHeight) < 2) {
                return false;
            }

            if (currentNode.left && (currentNode.left.left ||
                    currentNode.left.right)) {
                q.enqueue(currentNode.left);
            }

            if (currentNode.right && (currentNode.right.left ||
                    currentNode.right.right)) {
                q.enqueue(currentNode.right);
            }

            if (q.length) {
                currentNode = q.dequeue();
            } else {
                currentNode = null;
            }
        }

        return true;
        // function balanced(currentNode) {
        //     var leftHeight = self.height(currentNode.left);
        //     var rightHeight = self.height(currentNode.right);
        //     var treeBalanced = (Math.abs(leftHeight - rightHeight) < 2);
        //
        //     if (treeBalanced && currentNode.left !== null) {
        //         treeBalanced = balanced(currentNode.left);
        //     }
        //
        //     if (treeBalanced && currentNode.right !== null) {
        //         treeBalanced = balanced(currentNode.right);
        //     }
        //
        //     return treeBalanced;
        // }
        //
        // return balanced(node);
    }

    valueBefore(value) {
        if (this.isEmpty()) {
            return null;
        }

        var currentNode = this.root;
        var previousValue = null;
        var found = false;

        while (currentNode && !found) {
            if (value > currentNode.value) {
                previousValue = currentNode.value;
                currentNode = currentNode.right;
            } else if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                found = true;
            }

            if (found && currentNode.left) {
                previousValue = this.max(currentNode.left);
            }
        }

        if (previousValue > value || !found) {
            previousValue = null;
        }

        return previousValue;
    }

    valueAfter(value) {
        if (this.isEmpty()) {
            return null;
        }

        var currentNode = this.root;
        var nextValue = null;
        var found = false;

        while (currentNode && !found) {
            if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else if (value < currentNode.value) {
                nextValue = currentNode.value;
                currentNode = currentNode.left;
            } else {
                found = true;
            }

            if (found && currentNode.right) {
                nextValue = this.min(currentNode.right);
            }
        }

        if (nextValue < value || !found) {
            nextValue = null;
        }

        return nextValue;
    }

    toArray() {
        function createArray(currentNode, arr) {
            if (currentNode === null) {
                return;
            }

            arr = arr || [];

            createArray(currentNode.left, arr);
            arr.push(currentNode.value);
            createArray(currentNode.right, arr);

            return arr;
        }

        return createArray(this.root);
    }

    remove(value) {
        // Hopefully we are removing the correct node!

        function findAndRemoveNode(value, currentNode, parent) {
            // Here we do the real work.

            // Check if the value should be to the left branch.
            if (currentNode.value > value) {
                // The value is lower than the current node.
                // So do we have the branch?
                if (currentNode.left !== null) {
                    // We do, so we call the function again to checking it.
                    return findAndRemoveNode(value, currentNode.left, currentNode);
                } else {
                    // The value must not exist, or we have a bad tree.
                    return false;
                }
            // Check if the value should be to the right branch.
            } else if (currentNode.value < value) {
                // The value is higher than the current node.
                // So do we have the branch?
                if (currentNode.right !== null) {
                    // We do, so we call the function again to checking it.
                    return findAndRemoveNode(value, currentNode.right, currentNode);
                } else {
                    // The value must not exist, or we have a bad tree.
                    return false;
                }
            // We should have our value.
            } else {
                // Check if we have both branches filled.
                if (currentNode.left !== null && currentNode.right !== null) {
                    // Crap! We can't assign two nodes to replace one!

                    // Go to the right branch, get minimum and set to that value.
                    // Could also go to the left and find max.
                    currentNode.value = this.min(currentNode.right);
                    // Now we find our new value on the right branch and remove.
                    findAndRemoveNode(currentNode.value, currentNode.right, currentNode);
                // We know that we have no more than one branch to deal with.
                // So we can focus on attaching the child, if we have one, to
                // the parent.
                // Check if current node is the left branch of the parent.
                } else if (parent.left === currentNode) {
                    // Current node is the left branch, so assign the child of
                    // current node to the parent.
                    // If we don't have a node in right branch we can assign the
                    // left, even if it is null since that would mean that
                    // current node does not have children.
                    parent.left = (currentNode.right === null) ? currentNode.left : currentNode.right;
                // Check if current node is the right branch of the parent.
                } else if (parent.right === currentNode) {
                    // Current node is the right branch, so assign the child of
                    // current node to the parent.
                    // If we don't have a node in right branch we can assign the
                    // left, even if it is null since that would mean that
                    // current node does not have children.
                    parent.right = (currentNode.right === null) ? currentNode.left : currentNode.right;
                }

                // We successfully removed the node with the value.
                return true;
            }
        }

        if (this.isEmpty()) {
            // There is nothing to remove.
            return false;
        }

        if (this.root.value === value) {
            // Oh NOES!!! We haz to remove the root!

            // Create a temp root so we can run the function without it crashing.
            var tempRoot = new this.Node(0);
            // Set the current root to one of the branches of the temp root.
            tempRoot.left = this.root;
            // Now we can delete normally.
            // And we hold on to the return value, which should always be true.
            var result = findAndRemoveNode(value, this.root, tempRoot);
            // Now that the values have been rearranged we set the root again,
            // since it might have changed nodes.
            this.root = tempRoot.left;

            return result;
        }

        // Yea!! We don't have to replace the root, so less steps.
        return findAndRemoveNode(value, this.root, null);
    }

}
