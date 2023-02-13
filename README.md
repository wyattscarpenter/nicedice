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

Edit, 2023-02-13: Some more interesting information about surprising constructions one can do in nicedice shorthand in javascript, but which I believe to be ultimately harmless.

Strings:

I have realized one can construct somewhat-arbitrary strings within these expressions, which is somewhat worrying. This is because `/ /` (the middle contents can be anything, but not nothing) is a regex literal in JavaScript. In terms of type-coercion, this acts as a string, so `/ / + 0` evaluates to `"/ /0"`. One can also get `"infinity"` and `"NaN"` this way. However, one can't use indices or methods of the string because there is no `[]` nor `.` allowed. JSFuck relies really heavily on `[]` ( see https://github.com/aemkei/jsfuck/blob/master/jsfuck.js ) to both get characters in the right order for certain strings, and, crucially, get `Function` and `eval`, which are needed to evaluate functions and variables, which is the scary part. One can't just run `"alert"()`, using a string as a function name, for example. So, I think we're still safe. I mean, JSFuck doesn't even work if one takes away the `!` ( see https://codegolf.stackexchange.com/questions/75423/jsfk-with-only-5-symbols ), which we already have taken away, and it sure as heck doesn't work if one takes away the `[]`. However, we do give the user more operators that aren't in JSFuck, like `,`, so it's *possible* that I've missed something and one can somehow use those to achieve the same result—but I still think it's unlikely. Still, anyone who figures something out, let me know!

Pathological Regex:

Initially, I became worried that a user could construct a pathological regex using `/ /`, which would take up unreasonable amounts of time and space and ddos nicedice ( see also: https://en.wikipedia.org/wiki/ReDoS ); this could potentially be difficult to defend against because javascript allows backreferences (writing `\1` to require matching against a previous match again) which are NP-complete, as described in https://swtch.com/~rsc/regexp/regexp1.html. However, I do not currently allow `\` as nicedice input, so backreferences shouldn't be a problem. I also assume javascript engines are pretty good and optimized these days, 16 years after Russ Cox eloquently elucidated the problem, and don't blow up during backtracking (nb: backtracking and backreferencing are distinct concepts) (again, see the regexp1 article), so any pedestrian non-backreferencing expression shouldn't be a problem—

Whoops, that assumption proved incorrect! https://neil.fraser.name/software/JS-Interpreter/demos/regexp.html contains the helpful example `'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.match(/^(a+)+b/)` with the description "will effectively crash any JavaScript runtime". I found this hard to believe, but it does indeed hang NodeJS, a popular javascript runtime. Firefox gives "Uncaught InternalError: too much recursion" after hanging the page for 5 seconds. Google Chrome will also hang the page indefinitely. Since node and chrome both use the V8 JavaScript engine, I assume it's a problem internal to that. We can modify the example to `'1111111111111111111111111111111113'.match(/(1+)+2/)` and it still works (uh, in a "task failed successfully" sense of "works"), and both `/(1+)+2/` and `1111111111111111111111111111111113` can be written in nicedice shorthand. We can even get `1111111111111111111111111111111113` to be a string by adding it to `/ /`! (For reasons unclear to me, adding these the naive way doesn't work, but I assume some trickery could get us to an appropriate string in the end.)

HOWEVER, as far as I can tell there is no way to actually EVALUATE a regular expression literal in javascript without alphabetical characters, which are still disallowed. One can't just write `/1*2/('1122')` or whatever, one needs to actually invoke methods with names, such as `.exec`, `.match`, etc. So we're still safe. One can construct a regex literal in nicedice shorthand, but one can't do anything with it.

