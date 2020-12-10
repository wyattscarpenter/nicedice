nicedice = require("./nicedice.js");
console.log(nicedice.roll);
console.log(typeof nicedice.roll);
console.log("test");

console.log("\n Examples of invalid input:");
console.log(nicedice.roll("Nice long word sentence."));
console.log(nicedice.roll("123"));
console.log(nicedice.roll("2d"));
console.log(nicedice.roll("2!"));
console.log(nicedice.roll("!"));
console.log(nicedice.roll("()"));
console.log(nicedice.roll("("));
console.log(nicedice.roll(")"));
console.log(nicedice.roll("dd"));
console.log(nicedice.roll("d0d"));
console.log(nicedice.roll("d0d0d"));
console.log(nicedice.roll("dd"));
console.log(nicedice.roll("(2d)d4"));
console.log(nicedice.roll("(2dd)d4"));
console.log(nicedice.roll("(2+1)d4"));
console.log(nicedice.roll("No 2d12 embedding"));

console.log("\n Higher order rolls I decided not to implement:");
console.log(nicedice.roll("2d3d6"));
console.log(nicedice.roll("(2d3)d6"));
console.log(nicedice.roll("2d(3d6)"));
console.log(nicedice.roll("d(3d6)")); //This is a weird example b/c it almost works
console.log(nicedice.roll("3d(d6)"));
console.log(nicedice.roll("2dd4")); //these are weird.
console.log(nicedice.roll("2ddd4"));
console.log(nicedice.roll("2d(d(d4))"));
console.log(nicedice.roll("2d2d2d2d2d2d2"));

console.log("\n Examples of valid input:");
console.log(nicedice.roll("(2d6)"));
console.log(nicedice.roll("2d6"));
console.log(nicedice.roll("2!6"));
console.log(nicedice.roll("10!10"));
console.log(nicedice.roll("!6"));
console.log(nicedice.roll("d6"));
console.log(nicedice.roll("1+3"));
console.log(nicedice.roll("2*3"));
console.log(nicedice.roll("3%2"));
console.log(nicedice.roll("2/3"));
console.log(nicedice.roll("12+d3"));
console.log(nicedice.roll("12+3d3"));
console.log(nicedice.roll("4d4+3d3"));
console.log(nicedice.roll("d1+3"));
console.log(nicedice.roll("3d1+3"));
console.log(nicedice.roll("12*d3"));
console.log(nicedice.roll("12*3d3"));
console.log(nicedice.roll("d1*3"));
console.log(nicedice.roll("3d1*3"));
console.log(nicedice.roll("4d4*3d3"));

console.log("\n Examples of advantage/disadvantage:");
console.log(nicedice.roll("advantage 2d6"));
console.log(nicedice.roll("advantage2d6"));
console.log(nicedice.roll("adv 2d6"));
console.log(nicedice.roll("adv2d6"));
console.log(nicedice.roll("disadvantage 2d6"));
console.log(nicedice.roll("disadvantage2d6"));
console.log(nicedice.roll("disadv 2d6"));
console.log(nicedice.roll("disadv2d6"));
console.log(nicedice.roll("dis 2d6"));
console.log(nicedice.roll("dis2d6"));

console.log(nicedice.roll("advantage d6"));
console.log(nicedice.roll("advantaged6"));
console.log(nicedice.roll("advd6"));
console.log(nicedice.roll("adv d6"));
console.log(nicedice.roll("disadvantage d6"));
console.log(nicedice.roll("disadvantaged6"));
console.log(nicedice.roll("disadv d6"));
console.log(nicedice.roll("disadvd6"));
console.log(nicedice.roll("dis d6"));
console.log(nicedice.roll("disd6"));

console.log(nicedice.roll("advantage 2d6 + disadvantage 2d6 * advantage 2d6"));

console.log("\n Self-documenting code advantage/disadvantage:");
console.log(nicedice.roll("d"));
console.log(nicedice.roll("advantage"));
console.log(nicedice.roll("disadvantage"));
