---
descripcion: https://ull-esit-gradoii-pl.github.io/practicas/ast-types.html
alumno: "Nombre apellidos (aluxxxx)"
---

# [Práctica AST Types (Spread Module)](https://ull-esit-gradoii-pl.github.io/practicas/ast-types.html)

### Procesadores de Lenguajes 2022 - 2022

### Nombre apellidos (aluxxxx)

### Descripción de la práctica: 

En esta práctica, seguiremos trabajando con los árboles AST, manipulándolos para hacer operaciones en el código de origen.

En concreto, desarrollaremos un módulo que exporta funcionalidades para traducir el operador spread de ES6 a versiones anteriores.
Publicaremos el módulo en el registry de GitHub, haciendo buen uso del versionado semántico.

Por último, daremos práctica a lo aprendido sobre VuePress para desarrollar el informe.

### Setup del repositorio:

Para empezar, vamos a revisar la estructura básica del repositorio. Para el desarrollo del módulo, debemos inicializar el repo como tal con ```npm init -y```. Después, podemos rellenar el ```package.json``` con la información relevante.

Una estructura básica de carpetas:

```
.
├── bin
├── docs
├── node_modules
├── package.json
├── package-lock.json
├── README.md
├── src
└── test
```

Nada fuera de lo común, src contendrá el código fuente, con sus correspondientes pruebas en test. bin contendrá nuestro archivo ejecutable que exportaremos en package.json y docs contendrá la documentación generada por vuePress.

### Funcionamiento de la función spread()

Para esta práctica, utilizaremos visit(), de la librería ast-types.

Dentro, distinguiremos dos casos: cuando entramos en una función (transformaciones de rest en argumentos de una función), y cuando entramos en una ArrayExpression.

Vamos a ver el primer caso:

```js
visitFunction(path) {
  const node = path.node;
  this.traverse(path);
  let lastArg = node.params.pop();
  if (lastArg.type !== "RestElement") return;
  n.BlockStatement.assert(node.body);
  const restVarDecl = b.variableDeclaration("var", [
    b.variableDeclarator(
      lastArg.argument,
      b.callExpression(sliceExpr, [
        b.identifier("arguments"),
        b.literal(node.params.length)
      ])
    )
  ]);
  path.get("body", "body").unshift(restVarDecl);
}
```

Como hemos visto en clase: obtenemos el último argumento de la función. Si es un elemento de tipo Rest, pasaremos a hacer la transformación.

Queremos insertar una declaración de variable como primera línea de la función, sustituyendo así el rest que se recibe como argumento. 
Lo creamos, utilizando builders.variableDeclaration.

Básicamente estamos creando un nodo que representa el código ```var *nombre argumento* = Array.prototype.slice.call(arguments, posición del argumento rest).```. Así, al objeto arguments, que no es un array pero sí un "array-like" le haremos un slice obteniendo todos los parámetros recibidos, guardándolo en una variable con el mismo nombre que el rest que existía antes.

Pasemos al siguiente caso: operadores de tipo spread en array expressions.
Por ejemplo: expresiones del tipo ```a = [1, 2, ...a, 4, 5]```. Para traducir esto a ES5, simplemente lo convertiremos a una sucesión de ```concat()```.

```js
visitExpressionStatement(path) {
  this.traverse(path);
  if (path.node.expression.type === "ArrayExpression") {
    path.replace(buildNode(unspreadElements(path.node.expression.elements)).body[0]);
  }
}
```

Básicamente, al visitar una expresión de tipo Array, pasamos a llamar a ```unspreadElements()```

```js
const unspreadElements = (array) => {
  const index = array.findIndex(el => el.type === "SpreadElement");
  if (index >= 0) {
    let firstPart = index === 0 ? `[]` : `${unspreadElements(array.slice(0, index))}`;
    let middlePart = `.concat(${getValue(array[index])})`;
    let finalPart = (index === array.length - 1) ? `` : `.concat(${unspreadElements(array.slice(index + 1))})`;
    return (`${firstPart}${middlePart}${finalPart}`);
  }
  else return JSON.stringify(array.map(e => getValue(e)));
}
```

Esta función busca elementos de tipo Spread en el array que recibe. Si no hay, no se hacen más operaciones.

Si los hay, los convierte a (todos los elementos anteriores al spread).concat(elemento spread).concat(todos los elementos después del spread)
Tanto a la parte anterior como a la posterior se les hace una llamada al propio ```unspreadElements```, por si hubieran más elementos de tipo Spread que requieran a su vez conversión.


### Documentación con VuePress

Para el desarrollo del informe, utilizaremos vuepress. Siguiendo la guía de inicio rápido de su página, haremos una configuración básica inicial. 

Como nota: es importante, sobre todo, añadir el prefijo base a la configuración en ```docs/.vuepress/config.js``` para que el deploy en github pages no tenga error.

Básicamente, desarrollaremos el informe en un archivo README.md dentro de docs, y con nuestro script de ```docs:build```, vuepress, lo convertirá a html.

Además, nuestros scripts ```genCov``` y ```jsdoc```, generan respectivamente el coverage de los tests y la documentación de jsdoc de nuestro código, ambas cosas en html, y ese resultado se mueve también dentro de docs, para que sea accesible desde nuestro deploy en github pages.
