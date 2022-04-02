# nicedice
rolls dnd-style dice

Online demo page: https://wyattscarpenter.github.io/nicedice

NPM listing: https://www.npmjs.com/package/nicedice

NiceDice is a public domain JavaScript module that allows for the generation of random numbers using XdY dice notation, as described here: https://en.wikipedia.org/wiki/Dice_notation

An arbitrary number of dice expressions can be combined together using the basic JavaScript arithmetic operators, +-*/%. The comma operator is also supported, as is ** for exponentiation.

The d, which I think of as an infix dice operator with extremely high precedence, may be upper or lower case.

Additionally, "advantage"/"disadvantage" (or certain abbreviations thereof) may be added before roll expressions to repeat the roll twice and take the higher/lower number. These also may be in any letter case.

Nicedice accepts nicedice shorthand, which is equivalent to conventional dice notation, like "2d6+d6+3d4+adv d5", or nicedice longhand, like "d(2,6)+d(1,6)+d(3,4)+advantage(1,5)". Internally, the former is converted to the latter before the expressions are evaluated, and the two notations can be mixed freely in the same expression without problem.

In addition to a result, nicedice also returns a roll record showing how the result was achieved. See the code for the full API.

Internally, dice expressions are evaluated using the Function object constructor, which is kind of like using eval. However, the input is sanitized to remove so many characters that not even JSFuck-style attacks have enough leeway to work. If you manage a JSFuck-style arbitrary code execution attack using only the characters mentioned above, digits, and/or parentheses, please tell me!!!

I consider NiceDice to be completely feature-complete, mature, and finished. I do not expect to ever have to update it.
