//I release this code into the public domain under CC0
//Note: this code uses Function, which is spooky. An attempt is made to sanitize the input.

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
  
  if(/^\d*$/.test(string)){
    return {valid: false, value: +string, input: input, roll_record: "Input too trivial, just a number."};
  }
  //This is our sanitization attempt. Hopefully the remaining characters are not enough for a jsfuck-style attack,
  // but it's hard to say. JavaScript, amirite? Anyhow, I think this should be good, but I'm not omniscient.
  //Also, be wary of the attacker getting functions named of the form (d|dis|adv|antage)* in your global scope.
  if(!/^([\d\s+*%!d\-\/\(\)]|dis|adv|antage)*$/.test(string)){
    return {valid: false, value: undefined, input: input, roll_record: "Includes non-dice-roll elements."};
  }
  
  string=string.replace(/dis(?:adv)?(?:antage)?\s*(\d+)[d\!](\d+)/g, 'disadvantage($1, $2)');
  string=string.replace(/dis(?:adv)?(?:antage)?\s*[d\!](\d+)/g, 'disadvantage(1, $1)');
  string=string.replace(/adv(?:antage)?\s*(\d+)[d\!](\d+)/g, 'advantage($1, $2)');
  string=string.replace(/adv(?:antage)?\s*[d\!](\d+)/g, 'advantage(1, $1)');
  string=string.replace(/(\d+)[d\!](\d+)/g, 'd($1, $2)');
  string=string.replace(/[d\!](\d+)/g, 'd(1, $1)');
  roll_record += string;

  var value;
  var valid;
  try{
    value = Function("d", "advantage", "disadvantage", "return "+string)(d, advantage, disadvantage);
    valid = true;
  }catch{
    valid = false;
  }
  return {valid: valid, value: value, input: input, roll_record: roll_record};
}
