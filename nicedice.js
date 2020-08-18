//dice features.
  /* tentative dice grammar:
  //note that we observe pemdas, and do NOT care about whitespace
  expression -> arithmetic | roll | subexpression
  roll -> subexpression die-symbol subexpression
  arithmetic -> arithmetic * arithmetic |  arithmetic / arithmetic | subexpression | addition
  addition -> addition + addition |  addition - addition | subexpression | number
  subexpression -> ( expression ) | number | advantage roll | disadvantage roll | min roll | max roll
  die-symbol -> ! | d
  number -> anything the implementation language will take as a number I guess
  */
module.exports = { roll };
function roll(string){
  var valid = true;
  var result = "";
  var total = 0;
  
  var symbolindex = 0;
  function pop(){
    return string[symbolindex++];
  }
  function peek(){
    return string[symbolindex];
  }
  
  function expression(){ //this will have to be expanded later
    var lhs = number() || 1; //allow this to be empty so the user can say eg "d6"
    var d   = die_symbol();
    var rhs = number() || (valid=false); //lol //don't allow this to be empty
    for(var i = 0; i < lhs; i++){
      var a_roll = Math.floor(Math.random()*rhs)+1;
      result += a_roll + " ";
      total += a_roll;
    }
    result += ": " + total;
  }
  function die_symbol(){
    var die_symbols = ['!','d'];
    if(die_symbols.includes(peek())){
      return pop();
    } else {
      valid = false;
    }
  }
  function number(){
    var digits = "";
    while(peek()&&peek().match(/\d/)){
      digits += pop();
    }
    return digits; //this will implicitly convert from string to number later
  }
  /* //might need to keep this test code to avoid annoying everyone with live debugging
  var match = string.match(/([0-9]+)[d!]([0-9]+)/);
  if(match){
    
  } else {
    valid = false;
  }
  */
  /*
  if(!subresult.valid){
    valid=false;
    result += "[parse error]";
  } else {
    result += subresult.result;
  }
  */
  expression();
  return {result: result, valid: valid}; 
}