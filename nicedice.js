module.exports = {roll};

function roll(string){
  var input = string;
  var roll_record = "";

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

  string=string.replace(/(\d+)[d\!](\d+)/g, 'd($1, $2)');
  string=string.replace(/[d\!](\d+)/g, 'd(1, $1)');
  roll_record += string;

  var value;
  var valid;
  try{
    value = eval(string);
    valid = true;
  }catch{
    valid = false;
  }
  return {value: value, valid: valid, input: input, roll_record: roll_record};
}
