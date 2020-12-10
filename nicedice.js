module.exports = {roll};
function roll(string){
  var valid = true;
  var expansion = "";
  var total = 0;

  var symbolindex = 0;
  //if pop or peek return undefined, which is falsy, we have exceeded the length of the string
  function pop(){
    return string[symbolindex++];
  }
  function peek(){
    return string[symbolindex];
  }
  
  var dice_layer = 0;
  function expand_by(s){
    if(!dice_layer){
      expansion += s;
    }
  }

  //whitespace is ignored
  //all other non-parsable characters will expansion in valid = false, thus the parse will be ignored
  //TODO: advantage, disadvantage
  /*E -> M | M + E       //expression (additive) //+ stands for + or -
    M -> D | D * M       //multiplicative expression //* stands for * or / or %
    D -> N | d D | D d D //dice expression //d stands for ! (they are identical in value) //right associative
    N -> /\d+/ | ( E )   //numerical value //perhaps [ and { should be allowed?
  */

//TODO: these are accidentally all right assoc :(

  function expression(){
    var left = multiplicative();
    var op = peek();
    if(!op){
      return left;
    }else if(op == '+'){
      expand_by(pop());
      return left + expression();
    }else if(op == '-'){
      expand_by(pop());
      return left - expression();
    }
    return left;
  }
  
  function multiplicative(){
    var left=dice();
    var op = peek();
    if(!op){
      return left;
    }else if(op == '*'){
      expand_by(op);
      return left*multiplicative();
    }else if(op == '/'){
      expand_by(op);
      return left/multiplicative();
    }else if(op == '%'){
      expand_by(op);
      return left%multiplicative();
    }
    return left;
  }
  
  function dice(){ //test code
    var left;
    //leading number vs leading d
    if (peek()&&(peek().match(/\d/)||peek()=="(")){
      left = numerical();
    } else if (peek()&&['!','d'].includes(peek())) {
      left = 1;
    } else {
      valid=false;
    }
    
    //actual dice rolling
    //if there was a numberical to pop we've popped it at this point
    if (peek()&&['!','d'].includes(peek())) {
      pop(); //we know this is the dice operator, but we don't need the character anymore.
      dice_layer++;
      right = dice(); //recurse to find the right-hand side of the operator, since we need it now.
      dice_layer--;
      var running_total = 0;
      expand_by("[");
      for(var i = 0; i < left; i++){
        var a_roll = Math.floor(Math.random()*right)+1;
        expand_by(a_roll + " ");
        running_total += a_roll;
      }
      expand_by(": "+running_total+"]");
    }
    
    //plain numericals can fall through to this!
    return left;
  }
  
  function numerical(){
    if (peek()&&peek()=="(") {
      expand_by(pop());
      left = expression();
      end = pop(); //TODO: unclear if we should check this and set invalid or just let unclosed parens ride.
      if(end&&end!=")"){
        valid = false;
      } else {
        expand_by(")");
      }
    } else if (peek()&&peek().match(/\d/)) {
      var digits = "";
      while(peek()&&peek().match(/\d/)){
        digits += pop();
      }
      expand_by(digits);
      left = +digits;
    } else {
      valid = false; //no exception for empties because all empties are invalid this deep.
    }
    return left;
  }

  string=string.replace(/\s+/g, '');
  total=expression();
  return {valid: valid, total: total, input: string, expansion: expansion};
}
