import * as chai from 'chai';
import { spread } from '../src/spread.js';
const should = chai.should();

const newLine = "\n    ";

const testCases = [
  {
    input: `function tutu(x, ...rest) {return x + rest[0];}`,
    result: `function tutu(x) {${newLine}var rest = Array.prototype.slice.call(arguments, 1);${newLine}return x + rest[0];\n}`
  },
  {
    input: `function restFun(...things) {return things[2];}`,
    result: `function restFun() {${newLine}var things = Array.prototype.slice.call(arguments, 0);${newLine}return things[2];\n}`
  },
  {
    input: `[1,2,3,...a,4,5]`,
    result: `[1, 2, 3].concat(a).concat([4, 5]);`
  },
  {
    input: `[...a, 2, 3, 4]`,
    result: `[].concat(a).concat([2, 3, 4]);`
  },
  {
    input: `[1, 2, 3, ...a]`,
    result: `[1, 2, 3].concat(a);`
  },
  {
    input: `[1, 2, ...a, 3, ...b]`,
    result: `[1, 2].concat(a).concat([3].concat(b));`
  },
  {
    input: `[1, 2, ...a, 3, ...b, 8]`,
    result: `[1, 2].concat(a).concat([3].concat(b).concat([8]));`
  }
]

describe('Testing module', () => {
  testCases.forEach((testCase) => {
    it(`Input: ${testCase.input}\n      Expected result: ${testCase.result}`, () => {
      spread(testCase.input).should.equal(testCase.result);
    })
  })
});
