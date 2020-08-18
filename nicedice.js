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
  //each function is greedy unless it passes to subexpressions
  //(the subexpressions are greedy, then)
  //and each grammar function peeks to pass to the correct next function
  //(pick_valuable doesn't follow that rule, it's called when we need a value and then must peek to dispatch)
  function expression(){
    var left=valuable();

    //if it's just a number, subexpression, or dice throw, we are done.
    //(though, since the value might be 0 we can't check that, we have to check if we're out of room)
    if(!peek()||peek()==')'){return left;}

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
