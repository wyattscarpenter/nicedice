module.exports = {roll};
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
  //each function is greedy
  //and each grammar function peeks to pass to the correct next function
  /*E -> M + E | M       //expression (additive)
    M -> D * M | D       //multiplicative expression
    D -> d D | D d D | N //dice expression
    N -> /\d+/ | ( E )   //numerical value
  */

  function expression(){
    var left=valuable();

    //if it's just a number, subexpression, or dice throw, we are done.
    //(though, since the value might be 0 we can't check that, we have to check if we're out of room)
    if(!peek()||peek()==')'){
      return left;
    }

    return additive_statement(left);
  }
  function subexpression(){
    pop(); //we know this is '('
    var value = expression();
    if(peek()&&peek()==")"){
      pop();
    } else {
      valid = false;
    }
    return value;
  }
  function valuable(){
    if (peek()&&peek()=="(") {
      return subexpression();
    } else if (peek()&&peek().match(/\d/)) {
      return number();
    } else if (peek()&&['!','d'].includes(peek())) {
      return dice_statement(1);
    } else {
      valid=false;
    }
  }

  function dice_statement(left){
    pop(); //we know this is d or !
    var running_total = 0;
    var right = valuable();
    if(!right){ //that ain't right. wait...
      valid=false;
    }
    result += "["
    for(var i = 0; i < left; i++){
      var a_roll = Math.floor(Math.random()*right)+1;
      result += a_roll + " ";
      running_total += a_roll;
    }
    result += ": " + running_total;
    result += "]"

    if(peek()&&['!','d'].includes(peek())){
      return dice_statement(running_total);
    } else {
      return running_total;
    }
  }

  function multiplicative_statement(left){
    op = pop(); //we know this is * / or %
    var running_total = 0;
    var right = valuable();
    if(right!==0 && !right){
      valid=false;
    }

    if(peek()&&['d','!'].includes(peek())) { //we know it's like 1 * 2 d... so we have to recurse into dice first
      right = dice_statement(right);
    }

    if(op=="*"){
      running_total = left * right;
    } else if (op=="/") {
      running_total = left / right;
    } else if (op=="%") {
      running_total = left % right;
    }

    if(peek()&&['*','/','%'].includes(peek())){
      return multiplicative_statement(running_total);
    } else {
      result += ": " + running_total;
      return running_total;
    }
  }

  function additive_statement(left){
    op = pop(); //we don't know what this is
    var running_total = 0;

    if(['*','/','%'].includes(op)){ //we know it's like 1 + 2 *... so we have to recurse into multiplicaiton first
      left = multiplicative_statement(left);
    } else if(['d','!'].includes(op)) { //we know it's like 1 + 2 d... so we have to recurse into dice first
      left = dice_statement(left);
    }

    var right = valuable();
    if(right!==0 && !right){
      valid=false;
    }

    if(op=="+"){
      running_total = +left + +right;
      //result += "+ "+right //we don't know if the dice are printing on left or right...
    } else if (op=="-") {
      running_total = +left - +right;
    }
    if(peek()&&['*','/','%'].includes(peek())){ //we know it's like 1 + 2 *... so we have to recurse into multiplicaiton first
      right = multiplicative_statement(right);
    } else if(peek()&&['d','!'].includes(peek())) { //we know it's like 1 + 2 d... so we have to recurse into dice first
      right = dice_statement(right);
    }

    if(peek()&&['+','-'].includes(peek())){
      return additive_statement(running_total);
    } else {
      result += ": " + running_total;
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
  return {valid: valid, input: string, result: result};
}
