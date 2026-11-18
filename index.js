class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


function buildTree(array) {
  const sortedUnique = [...new Set(array)].sort((a, b) => a - b);

  const build = (start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(sortedUnique[mid]);
    node.left = build(start, mid - 1);
    node.right = build(mid + 1, end);

    return node;
  };

  return build(0, sortedUnique.length - 1);
}



const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) return;

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};



class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) return true;
      current = value < current.data ? current.left : current.right;
    }

    return false;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (value === current.data) return this; 

      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }


  deleteItem(value) {
    const remove = (node, target) => {
      if (node === null) return null;

      if (target < node.data) {
        node.left = remove(node.left, target);
      } else if (target > node.data) {
        node.right = remove(node.right, target);
      } else {
        

      
        if (node.left === null && node.right === null) return null;

        
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

      
        const successor = this.minNode(node.right);
        node.data = successor.data;
        node.right = remove(node.right, successor.data);
      }

      return node;
    };

    this.root = remove(this.root, value);
    return this;
  }

  
  minNode(node) {
    let current = node;
    while (current.left !== null) current = current.left;
    return current;
  }

  
  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Se requiere una función de callback');
    }
    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }


  levelOrderForEachRecursive(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Se requiere una función de callback');
    }

    const levels = [];

    const groupByLevel = (node, level) => {
      if (node === null) return;
      if (levels[level] === undefined) levels[level] = [];
      levels[level].push(node);
      groupByLevel(node.left, level + 1);
      groupByLevel(node.right, level + 1);
    };

    groupByLevel(this.root, 0);
    levels.forEach((level) => level.forEach((node) => callback(node.data)));
  }

 
  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Se requiere una función de callback');
    }

    const traverse = (node) => {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  
  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Se requiere una función de callback');
    }

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Se requiere una función de callback');
    }

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };

    traverse(this.root);
  }

  findNode(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) return current;
      current = value < current.data ? current.left : current.right;
    }

    return null;
  }

  height(value) {
    const node = this.findNode(value);
    if (node === null) return undefined;
    return this.heightOf(node);
  }


  heightOf(node) {
    if (node === null) return -1;
    return 1 + Math.max(this.heightOf(node.left), this.heightOf(node.right));
  }

  
  depth(value) {
    const findDepth = (node, target, currentDepth) => {
      if (node === null) return undefined;
      if (target === node.data) return currentDepth;

      return target < node.data
        ? findDepth(node.left, target, currentDepth + 1)
        : findDepth(node.right, target, currentDepth + 1);
    };

    return findDepth(this.root, value, 0);
  }

  
  isBalanced() {
    const check = (node) => {
      if (node === null) return { balanced: true, height: -1 };

      const left = check(node.left);
      if (!left.balanced) return left;

      const right = check(node.right);
      if (!right.balanced) return right;

      return {
        balanced: Math.abs(left.height - right.height) <= 1,
        height: 1 + Math.max(left.height, right.height),
      };
    };

    return check(this.root).balanced;
  }

  
  rebalance() {
    const values = [];
    this.inOrderForEach((value) => values.push(value));
    this.root = buildTree(values);
    return this;
  }
}



const randomArray = (length = 15, max = 99) =>
  Array.from({ length }, () => Math.floor(Math.random() * max) + 1);

const printTraversals = (tree) => {
  const print = (label, method) => {
    const values = [];
    method.call(tree, (value) => values.push(value));
    console.log(`${label}: ${values.join(', ')}`);
  };

  print('Por nivel  ', tree.levelOrderForEach);
  print('Preorden   ', tree.preOrderForEach);
  print('Inorden    ', tree.inOrderForEach);
  print('Postorden  ', tree.postOrderForEach);
};

const main = () => {
  const treeCanvas = document.getElementById('treeCanvas');
  if (!treeCanvas) {
    const initialValues = randomArray();
    const tree = new Tree(initialValues);
    prettyPrint(tree.root);
    console.log('¿Está equilibrado?', tree.isBalanced());
    printTraversals(tree);
    return;
  }

  let tree = new Tree(randomArray());

  const valueInput = document.getElementById('valueInput');
  const arrayInput = document.getElementById('arrayInput');
  const statusText = document.getElementById('statusText');
  const traversalResults = document.getElementById('traversalResults');

  const getTraversal = (method) => {
    const values = [];
    method.call(tree, (value) => values.push(value));
    return values;
  };

  const updateTraversals = () => {
    const traversals = [
      ['Por nivel', tree.levelOrderForEach],
      ['Preorden', tree.preOrderForEach],
      ['Inorden', tree.inOrderForEach],
      ['Postorden', tree.postOrderForEach],
    ];

    traversalResults.innerHTML = traversals.map(([label, method]) => `
      <div class="traversal-row">
        <span>${label}</span>
        <strong>${getTraversal(method).join('  ·  ') || 'Vacío'}</strong>
      </div>
    `).join('');
  };

  const renderTree = () => {
    treeCanvas.innerHTML = '';

    if (tree.root === null) {
      treeCanvas.innerHTML = '<p class="empty-state">El árbol está vacío</p>';
      return;
    }

    const nodeWidth = 54;
    const nodeHeight = 54;
    const levelHeight = 96;
    const horizontalPadding = 34;
    const treeHeight = tree.height(tree.root.data) + 1;

    let leafIndex = 0;
    const positions = new Map();

    const assignPositions = (node, level) => {
      if (node === null) return;
      assignPositions(node.left, level + 1);
      const x = leafIndex * 78 + horizontalPadding;
      leafIndex += 1;
      positions.set(node, { x, y: level * levelHeight + 28 });
      assignPositions(node.right, level + 1);
    };

    assignPositions(tree.root, 0);

    const contentWidth = Math.max(760, leafIndex * 78 + horizontalPadding * 2);
    const contentHeight = Math.max(310, treeHeight * levelHeight + 24);
    treeCanvas.style.width = `${contentWidth}px`;
    treeCanvas.style.height = `${contentHeight}px`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'tree-lines');
    svg.setAttribute('width', contentWidth);
    svg.setAttribute('height', contentHeight);

    positions.forEach((position, node) => {
      if (node.left) {
        const child = positions.get(node.left);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', position.x + nodeWidth / 2);
        line.setAttribute('y1', position.y + nodeHeight);
        line.setAttribute('x2', child.x + nodeWidth / 2);
        line.setAttribute('y2', child.y);
        svg.appendChild(line);
      }
      if (node.right) {
        const child = positions.get(node.right);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', position.x + nodeWidth / 2);
        line.setAttribute('y1', position.y + nodeHeight);
        line.setAttribute('x2', child.x + nodeWidth / 2);
        line.setAttribute('y2', child.y);
        svg.appendChild(line);
      }
    });

    treeCanvas.appendChild(svg);

    positions.forEach((position, node) => {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'tree-node';
      element.textContent = node.data;
      element.title = `Altura: ${tree.heightOf(node)} · Profundidad: ${tree.depth(node.data)}`;
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
      element.addEventListener('click', () => {
        valueInput.value = node.data;
        valueInput.focus();
      });
      treeCanvas.appendChild(element);
    });
  };

  const updateUI = (message) => {
    renderTree();
    updateTraversals();
    statusText.textContent = message;
    statusText.className = `status-pill ${tree.isBalanced() ? 'balanced' : 'unbalanced'}`;
  };

  document.getElementById('insertButton').addEventListener('click', () => {
    const value = Number(valueInput.value);
    if (!Number.isFinite(value)) {
      statusText.textContent = 'Ingresa un número válido';
      statusText.className = 'status-pill unbalanced';
      return;
    }
    tree.insert(value);
    valueInput.value = '';
    updateUI(tree.isBalanced() ? 'Árbol equilibrado' : 'Árbol desequilibrado');
  });

  document.getElementById('deleteButton').addEventListener('click', () => {
    const value = Number(valueInput.value);
    if (!Number.isFinite(value)) return;
    tree.deleteItem(value);
    valueInput.value = '';
    updateUI(tree.isBalanced() ? 'Árbol equilibrado' : 'Árbol desequilibrado');
  });

  document.getElementById('rebalanceButton').addEventListener('click', () => {
    tree.rebalance();
    updateUI('Árbol equilibrado');
  });

  document.getElementById('randomButton').addEventListener('click', () => {
    tree = new Tree(randomArray());
    arrayInput.value = '';
    updateUI(tree.isBalanced() ? 'Árbol equilibrado' : 'Árbol desequilibrado');
  });

  document.getElementById('buildButton').addEventListener('click', () => {
    const values = arrayInput.value
      .split(',')
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value));

    if (values.length === 0) {
      statusText.textContent = 'Ingresa al menos un número';
      statusText.className = 'status-pill unbalanced';
      return;
    }

    tree = new Tree(values);
    updateUI(tree.isBalanced() ? 'Árbol equilibrado' : 'Árbol desequilibrado');
  });

  valueInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') document.getElementById('insertButton').click();
  });

  updateUI(tree.isBalanced() ? 'Árbol equilibrado' : 'Árbol desequilibrado');
};

main();
