# Binary Search Trees (The Odin Project)

Implementación de un árbol binario de búsqueda (BST) en JavaScript.

## Contenido de `index.js`

| Elemento | Descripción |
| --- | --- |
| `Node` | Clase con `data`, `left` y `right`. |
| `buildTree(array)` | Función privada del módulo: ordena, elimina duplicados y construye el árbol equilibrado. Devuelve la raíz. |
| `Tree` | Clase que recibe un array y guarda la raíz en `this.root`. |
| `prettyPrint(root)` | Imprime el árbol en la consola. |
| `includes(value)` | Devuelve `true`/`false` según exista el valor. |
| `insert(value)` | Inserta un nodo respetando el BST (ignora duplicados). |
| `deleteItem(value)` | Elimina un nodo (0, 1 o 2 hijos). |
| `levelOrderForEach(cb)` | Recorrido por niveles, iterativo con cola. |
| `levelOrderForEachRecursive(cb)` | Versión recursiva del recorrido por niveles. |
| `preOrderForEach(cb)` / `inOrderForEach(cb)` / `postOrderForEach(cb)` | Recorridos DFS. |
| `height(value)` / `depth(value)` | Altura y profundidad del nodo (`undefined` si no existe). |
| `isBalanced()` | Comprueba el equilibrio en todos los nodos. |
| `rebalance()` | Reconstruye el árbol a partir de un recorrido inorden. |

Todas las funciones `forEach` lanzan un error si no se les pasa un callback.
Los métodos de inserción/eliminación/búsqueda recorren los nodos, nunca el array
original, por lo que mantienen la complejidad esperada del BST.
