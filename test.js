nicedice = require("./nicedice.js");
console.log(nicedice.roll);
console.log(typeof nicedice.roll);
console.log("test");

function do_test_cases(array_of_test_cases){
  for (i of array_of_test_cases){
    result = nicedice.roll(i);
    console.log(result.valid, "|", result.input, "|", result.value, "|", result.roll_record);
  }
}

console.log("\n Examples of invalid input:");
console.log(nicedice.roll());
do_test_cases(["Nice long word sentence.", undefined, 0, 2, "", " ", {foo: "baz"}, {}, function(){}, "123", "2d", "2!", "!", "()", "(", ")", "dd", "d0d", "d0d0d", "dd", "(2d)d4", "(2dd)d4", "(2+1)d4", "No 2d12 embedding", "d6 d6", "1+3", "2*3", "3%2", "2/3", "!!0", "1/0"]);

console.log("\n Invalid use of advantage:");
do_test_cases(["advantage 6", "disadvantage 2", "advantage advantage 5", "advantageadvantage", "advantage advantage", "advantage foo"]);

console.log("\n Higher order rolls I decided not to implement:");
do_test_cases(["2d3d6", "(2d3)d6", "2d(3d6)", "d(3d6)",  /*This is a weird example b/c it almost works*/ "3d(d6)", "2dd4",  /*these are weird.*/"2ddd4", "2d(d(d4))", "2d2d2d2d2d2d2"]);

console.log("\n Examples of valid input:");
do_test_cases(["(2d6)", "2d6", "2d6", "10d10", "d6", "d99999999999999999999", "d9999999999999999999999999999999999999999", "d0", "d1", "2d2%2", "3%2d2", "2/3d3", "12+d3", "12+3d3", "4d4+3d3", "d1+3", "3d1+3", "12*d3", "12*3d3", "d1*3", "3d1*3", "4d4*3d3",  ]);

console.log("\n maybe you want to do some math:");
do_test_cases(["d0, 2+2", "2+2, d0", "2+2 * d0", "d0, 1/0", "d0 * 1/0", "d0 + 1/0", "d0 - 1/0", "d0, -1/0"]);


console.log("\n Examples of valid advantage/disadvantage:");
do_test_cases(["advantage 2d6", "advantage2d6", "adv 2d6", "adv2d6", "disadvantage 2d6", "disadvantage2d6", "disadv 2d6", "disadv2d6", "dis 2d6", "dis2d6", 
"advantage d6", "advantaged6", "advd6", "adv d6", "disadvantage d6", "disadvantaged6", "disadv d6", "disadvd6", "dis d6", "disd6", 
"advantage 2d6 + disadvantage 2d6 * advantage 2d6", ]);
