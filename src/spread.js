import { builders as b, namedTypes as n, visit } from "ast-types";
import * as espree from "espree";
import recast from "recast";

const sliceExpr = b.memberExpression(
  /* fill the code here */
);

/**
 * Translates the given code from ES6 using spread operator into ES5
 * @param {string} code to be translated
 * @returns {string} the translated code
 */
export const spread = (code) => {
  let ast = espree.parse(code, { ecmaVersion: 7, loc: false });

  /* fill the code here */
  return recast.print(ast).code;
}

/**
 * Turns spread expressions into concat, like [1,2,...a] into [1,2].concat(a)
 * @param {Array} array to be translated
 * @returns {string} the translated code
 */
const unspreadElements = (array) => {
  /* fill the code here */
}


