define(function() {
  return function(num, min, max){
    if(num > max) {
      return max;
    }else if(num < min) {
      return min;
    }else {
      return num;
    }
  };
})