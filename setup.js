
window.onload = function() {

  let canvas_container = document.getElementById('canvas-container');
  let infobox_container = document.getElementById('infobox-container');
  canvas_container.appendChild(box.returnCanvas());
  infobox_container.appendChild(box.returnInfobox());
  
  box.resizeCanvas();
  updateEdgeworthBox();
  
  input_range_alpha_amy.addEventListener('input', function(e) {
    let val = constrainInputValue(this);
    input_number_alpha_amy.value = val;
    
    input_range_beta_amy.value = Math.ceil((1-Math.floor(val*100)/100)*100)/100;
    input_number_beta_amy.value = Math.ceil((1-Math.floor(val*100)/100)*100)/100;
    
    box.updateAlphaAmy(val);
    updateEdgeworthBox();
  });
  
  input_range_alpha_mark.addEventListener('input', function(e) {
    let val = constrainInputValue(this);
    input_number_alpha_mark.value = val;
    
    input_range_beta_mark.value = Math.ceil((1-Math.floor(val*100)/100)*100)/100;
    input_number_beta_mark.value = Math.ceil((1-Math.floor(val*100)/100)*100)/100;
    
    box.updateAlphaMark(val);
    updateEdgeworthBox();
  });
  
  // UPDATE EX VALUES
  input_range_ex_amy_abs.addEventListener('input', function(e) {
    let val = parseInt(constrainInputValue(this));
    input_number_ex_amy_abs.value = val;
    input_range_ex_mark_abs.value = 100-val;
    input_number_ex_mark_abs.value = 100-val;

    box.updateExAmy(val);
    box.updateExMark(100-val);
    updateEdgeworthBox();
  });
  
  input_range_ex_mark_abs.addEventListener('input', function(e) {
    let val = parseInt(constrainInputValue(this));
    input_number_ex_mark_abs.value = val;
    input_range_ex_amy_abs.value = 100-val;
    input_number_ex_amy_abs.value = 100-val;

    box.updateExMark(val);
    box.updateExAmy(100-val);
    updateEdgeworthBox();
  });

  // UPDATE EY VALUES
  input_range_ey_amy_abs.addEventListener('input', function(e) {
    let val = parseInt(constrainInputValue(this));
    input_number_ey_amy_abs.value = val;
    input_range_ey_mark_abs.value = 100-val;
    input_number_ey_mark_abs.value = 100-val;

    box.updateEyAmy(val);
    box.updateEyMark(100-val);
    updateEdgeworthBox();
  });
  
  input_range_ey_mark_abs.addEventListener('input', function(e) {
    let val = parseInt(constrainInputValue(this));
    input_number_ey_mark_abs.value = val;
    input_range_ey_amy_abs.value = 100-val;
    input_number_ey_amy_abs.value = 100-val;

    box.updateEyMark(val);
    box.updateEyAmy(100-val);
    updateEdgeworthBox();
  });
  
 /*
 let input_range_ex_amy_abs = document.getElementById('input_range_ex_amy_abs');
 let input_range_ex_amy_pct = document.getElementById('input_range_ex_amy_pct');
 let input_number_ex_amy_abs = document.getElementById('input_number_ex_amy_abs');
 let input_number_ex_amy_pct = document.getElementById('input_number_ex_amy_pct');
  
 input_range_ex_amy_abs.addEventListener('input', function() {
   let val_abs = constrainInputValue(input_range_ex_amy_abs);
   
   let total = val_abs + constrainInputValue(input_range_ex_amy_abs);
   
 });
 */
 
  
}

function updateEdgeworthBox() {
  box.clearCanvas();
  box.updateUtilities();
  box.updateIsoquants();
  box.updatePrice();
  box.updateBudgets();
  box.showBudgetLine();
  box.showInitialEndowment();

  box.showContractCurve();
  box.updateOptimalAllocation();
  box.showOptimalAllocation();
}

function constrainInputValue(inputEl) {
  let val = parseFloat(inputEl.value);
  let min = parseFloat(inputEl.min);
  let max = parseFloat(inputEl.max);
  if (val < min) {
   val = min;
  }
  if (val > max) {
   val = max;
  }  
  return val;
}
