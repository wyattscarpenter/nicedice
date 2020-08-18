nicedice = require("./nicedice.js");
console.log(nicedice.roll);
console.log(typeof nicedice.roll);
console.log("test");
console.log(nicedice.roll("Examples of invalid input:"));
console.log(nicedice.roll("2d"));
console.log(nicedice.roll("2!"));
console.log(nicedice.roll("!"));
console.log(nicedice.roll("()"));
console.log(nicedice.roll("("));
console.log(nicedice.roll(")"));
console.log(nicedice.roll("d"));
console.log(nicedice.roll("dd"));
console.log(nicedice.roll("d0d"));
console.log(nicedice.roll("d0d0d"));
console.log(nicedice.roll("dd"));
console.log(nicedice.roll("(2d)d4"));
console.log(nicedice.roll("(2dd)d4"));
console.log(nicedice.roll("No 2d12 embedding"));

console.log("\nvalids:");
console.log(nicedice.roll("123"));
console.log(nicedice.roll("(2d6)"));
console.log(nicedice.roll("2d6"));
console.log(nicedice.roll("2!6"));
console.log(nicedice.roll("10!10"));
console.log(nicedice.roll("!6"));
console.log(nicedice.roll("d6"));
console.log(nicedice.roll("2d3d6"));
console.log(nicedice.roll("(2d3)d6"));
console.log(nicedice.roll("2d(3d6)"));
console.log(nicedice.roll("d(3d6)"));
console.log(nicedice.roll("3d(d6)"));
console.log(nicedice.roll("2dd4")); //these are weird.
console.log(nicedice.roll("2ddd4"));
console.log(nicedice.roll("2d(d(d4))"));
console.log(nicedice.roll("2d2d2d2d2d2d2"));

