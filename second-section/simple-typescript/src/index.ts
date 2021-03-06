import multiply, { multiplyByTwo as mBy2, HelloWorld } from "./multiply";

const a = 3;
const b = 4;
console.log(`${a} * ${b} = ${multiply(a, b)}`);

console.log(`${a} * 2 = ${mBy2(a)}`);
