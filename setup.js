
window.onload = function() {
  let amy = {
   'ex': parseFloat(document.getElementById('input_number_ex_amy').value),
   'ey': parseFloat(document.getElementById('input_number_ey_amy').value),
   'alpha': parseFloat(document.getElementById('input_number_alpha_amy').value),
   'beta': parseFloat(document.getElementById('input_number_beta_amy').value)
  };
  
  let mark = {
   'ex': parseFloat(document.getElementById('input_number_ex_mark').value),
   'ey': parseFloat(document.getElementById('input_number_ey_mark').value),
   'alpha': parseFloat(document.getElementById('input_number_alpha_mark').value),
   'beta': parseFloat(document.getElementById('input_number_beta_mark').value)
  };
  
  
  updateEdgeWorthBox(amy, mark);
  
  document.getElementById('canvas-container').appendChild(box.getCanvas());
  
  
}


let myinputs = document.getElementsByClassName('myinputs');
for (let i = 0; i < myinputs.length; i++) {
 myinputs[i].addEventListener('input', function(e) {
 
  let val = parseFloat(this.value);
  let min = parseFloat(this.min);
  let max = parseFloat(this.max);
 
  e.stopPropagation();
  //console.log('val : ' + val);
  //console.log('min : ' + min);
  //console.log('max : ' + max);
  
  // check min-max
  if (val < min) {
   val = min;
  }
  if (val > max) {
   val = max;
  }
  
  //console.log('val : ' + val);
  //console.log('min : ' + min);
  //console.log('max : ' + max);
  
  let input_class = this.classList.value.split(' ')[1];
  let els = document.getElementsByClassName(input_class);
  for (let j = 0; j < els.length; j++) {
   els[j].value = val;
  }
  
  // make sure the sum of alpha and beta is 1
  if (this.classList.contains('alpha_amy')) {
   document.getElementById('input_range_beta_amy').value = Math.floor((1-(Math.floor(val*100)/100))*100)/100;
   document.getElementById('input_number_beta_amy').value = Math.floor((1-(Math.floor(val*100)/100))*100)/100;
  }
  if (this.classList.contains('alpha_mark')) {
   document.getElementById('input_range_beta_mark').value = Math.floor((1-(Math.floor(val*100)/100))*100)/100;
   document.getElementById('input_number_beta_mark').value = Math.floor((1-(Math.floor(val*100)/100))*100)/100;
  }
  
  
  // NOW GET ALL THE VALUES
  let amy = {
   'ex': parseFloat(document.getElementById('input_number_ex_amy').value),
   'ey': parseFloat(document.getElementById('input_number_ey_amy').value),
   'alpha': parseFloat(document.getElementById('input_number_alpha_amy').value),
   'beta': parseFloat(document.getElementById('input_number_beta_amy').value)
  };
  
  let mark = {
   'ex': parseFloat(document.getElementById('input_number_ex_mark').value),
   'ey': parseFloat(document.getElementById('input_number_ey_mark').value),
   'alpha': parseFloat(document.getElementById('input_number_alpha_mark').value),
   'beta': parseFloat(document.getElementById('input_number_beta_mark').value)
  };
  
  
  updateEdgeWorthBox(amy, mark);
  
  
 });
}