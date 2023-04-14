const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  
  root() {
    // throw new NotImplementedError('Not implemented');
    return this.treeRoot;
  }

  add(data) {
    let newNode = new Node (data)
    if(!this.treeRoot) {
      this.treeRoot = newNode;
      return;
    }

    let activeNode = this.treeRoot;
    while(activeNode) {
      if (newNode.data < activeNode.data) {
        if (!activeNode.left) {
          activeNode.left = newNode;
          return;
        }
        activeNode = activeNode.left;
      } else {
        if (!activeNode.right) {
          activeNode.right = newNode;
          return;
        }
        activeNode = activeNode.right;
      }
    }
  }


  has(data) {
    return defineBoolean(this.treeRoot, data);

    function defineBoolean(node, data) {
      if (node == null) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      if (data < node.data) {
        return defineBoolean(node.left, data);
      } else {
        return defineBoolean(node.right, data);
      }
    }
  }

  find(data) {
    return this.findNode(this.treeRoot, data);
  }

  findNode(node, data) {
    if (node === null) {
      node = null;
    } else if (data < node.data) {
      node = this.findNode(node.left, data);
    } else if (data > node.data) {
      node = this.findNode(node.right, data);
    }
    return node;
  }

  remove(data) {
    this.treeRoot = deleteNode(this.treeRoot, data);

    function deleteNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = deleteNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
      }

      let minFromRightNode = node.right;
      while (minFromRightNode.left) {
        minFromRightNode = minFromRightNode.left
      }
      node.data = minFromRightNode.data;
      node.right = deleteNode(node.right, minFromRightNode.data)
      return node;
    }

  }


  min() {
    if (!this.treeRoot) {
      return;
    }

    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.treeRoot) {
      return;
    }

    let node = this.treeRoot;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }

}


module.exports = {
  BinarySearchTree
};