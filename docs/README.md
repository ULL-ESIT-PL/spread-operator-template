---
descripcion: https://ull-esit-gradoii-pl.github.io/practicas/ast-types.html
alumno: "Nombre apellidos (aluxxxx)"
---

# [Práctica AST Types (Spread Module)](https://ull-esit-gradoii-pl.github.io/practicas/ast-types.html)

### Procesadores de Lenguajes 2022 - 2023

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

Lorem ipsum ...


### Documentación con VuePress

Para el desarrollo del informe, utilizaremos vuepress. El template está configurado con la versión 1.9.7. 
Es deseable que actualice vuepress a la última versión 2.x. En caso contrario puede tener problemas con el uso de node v18 y posteriores.
Para que funcione esta versión de vuepress necesita bajar a  v16.

Como nota: es importante, sobre todo, añadir el prefijo base a la configuración en ```docs/.vuepress/config.js``` para que el deploy en github pages no tenga error.


Además, los scripts ```genCov``` y ```jsdoc```, generan respectivamente el coverage de los tests y la documentación de jsdoc de nuestro código, ambas cosas en html, y ese resultado se mueve también dentro de docs, para que sea accesible desde nuestro deploy en github pages.
