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
  //this is basically a recursive descent parser
  function expression(){
    var left;
    if (peek()&&peek()=="(") {
      left = s();
    } else if (peek()&&peek().match(/\d/)) {
      left = number();
    } else if (peek()&&['!','d'].includes(peek())) {
      left=0;
    } else {
      valid=false;
    }

    if(peek()&&['!','d'].includes(peek())){
      return dice_statement(left);
    } else if (peek()&&['*','/','%'].includes(peek())){
      return multiplicative_statement(left);
    } else if (peek()&&['+','-'].includes(peek())){
      return additive_statement(left);
    } else {
      valid = false;
    }
  }

  function dice_statement(left){
    pop(); //we know this is d or !
    var running_total = 0;
    var right = number();
    if(right===""){
      valid=false;
    }
    result += " [ "
    for(var i = 0; i < left; i++){
      var a_roll = Math.floor(Math.random()*right)+1;
      result += a_roll + " ";
      running_total += a_roll;
    }
    result += ": " + running_total;
    result += " ] "

    if(peek()&&['!','d'].includes(peek())){
      return dice_statement(running_total);
    } else {
      return running_total;
    }
  }

  function number(){
    var digits = "";
    while(peek()&&peek().match(/\d/)){
      digits += pop();
    }
    return digits; //this will implicitly convert from string to number later
  }
  /*
  if(!subresult.valid){
    valid=false;
    result += "[parse error]";
  } else {
    result += subresult.result;
  }
  */
  total=expression();
  return {input: string, result: result, valid: valid};
}
