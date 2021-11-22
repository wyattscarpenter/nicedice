//I release this code into the public domain under CC0
//Note: this code uses Function, which is spooky. However, the input to that call is sanitized.

module.exports = {roll};

function roll(string){
  var input = string;
  var roll_record = "";

  function advantage(number_of_dice, faces_on_die){
    return Math.max(d(number_of_dice, faces_on_die), d(number_of_dice, faces_on_die));
  }
  
  function disadvantage(number_of_dice, faces_on_die){
    return Math.min(d(number_of_dice, faces_on_die), d(number_of_dice, faces_on_die));
  }
  
  function d(number_of_dice, faces_on_die){
    var running_total = 0;
    expansion = "[";
    for(var i = 0; i < number_of_dice; i++){
      var a_roll = Math.floor(Math.random()*faces_on_die)+1;
      expansion += a_roll+" ";
      running_total += a_roll;
    }
    expansion += ": "+running_total+"]";
    roll_record += " " + expansion;
    return running_total;
  }
  
  if(!string){
    return {valid: false, value: string, input: input, roll_record: "Input empty or roll function improperly called."};
  }
  
  if (!(typeof string === 'string' || string instanceof String)){
    return {valid: false, value: string, input: input, roll_record: "Input must be a string, yet the input provided is not a string."};
  }
  
  if(!string.includes("d")){
    return {valid: false, value: +string, input: input, roll_record: "Input lacks a dice operator or dice function so it has been ignored."};
  }

  if(!/\d/.test(string)){
    return {valid: false, value: undefined, input: input, roll_record: "Input includes no digits."};
  }
  
  //these (strongly normalizing!) rewrite rules rewrite nicedice shorthand
  // example: 2d6+d6+3d4+adv d5
  //to nicedice longhand
  //example: d(2,6)+d(1,6)+d(3,4)+advantage(1,5)
  //note that you are also allowed to pass longhand to roll, and longhand terms are unaffected by these regexs
  string=string.replace(/dis(?:adv)?(?:antage)?\s*(\d+)d(\d+)/g, 'disadvantage($1, $2)');
  string=string.replace(/dis(?:adv)?(?:antage)?\s*d(\d+)/g, 'disadvantage(1, $1)');
  string=string.replace(/adv(?:antage)?\s*(\d+)d(\d+)/g, 'advantage($1, $2)');
  string=string.replace(/adv(?:antage)?\s*d(\d+)/g, 'advantage(1, $1)');
  string=string.replace(/(\d+)d(\d+)/g, 'd($1, $2)');
  string=string.replace(/d(\d+)/g, 'd(1, $1)');
  roll_record += string;

  //This is our sanitization step. Hopefully the remaining characters are not enough for a jsfuck-style attack,
  // but it's hard to say. JavaScript, amirite? Anyhow, I think this should be good, but I'm not omniscient.
  //Since we know exactly what functions we're going to use in nicedice longhand expressions, we can conservatively disallow everything else.
  //Note that we have to allow the comma for function arguments, so we have to allow the comma operator, which is a strange operator.
  //This allows easy (ab)use of nicedice as a basic calculator, if the input is eg "d6, 2+2".
  //How doth the comma op'rator / return his shining tail / Confusing so his creator / On every golden scale!
  if(!/^([\d\s+*%\-\/\(\)\,]|disadvantage\(|advantage\(|d\()*$/.test(string)){
    return {valid: false, value: undefined, input: input, roll_record: "Input includes illegal characters or compositions: "+roll_record};
  }

  var value;
  var valid;
  try{
    //use strict has a marginal security benefit here about eg not being able to make new variables in global scope from here, but really I just hate octal constants.
    value = Function("d", "advantage", "disadvantage", "'use strict';return "+string)(d, advantage, disadvantage);
    valid = true;
    if(!value && value!=="0" &&  value!==0){ //sometimes you get a syntactically valid form that evals to NaN or undefined
      roll_record += "(syntactically valid form didn't evaluate to a valid numeric result)"
      valid = false;
    }
  }catch{
    valid = false;
  }
  return {valid: valid, value: value, input: input, roll_record: roll_record};
}
