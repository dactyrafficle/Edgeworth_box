
window.onload = function() {

  let canvas_container = document.getElementById('canvas-container');
  let infobox_container = document.getElementById('infobox-container');
  canvas_container.appendChild(box.returnCanvas());
  infobox_container.appendChild(box.returnInfobox());
  
  box.resizeCanvas();
  box.updateUtilities();
  box.updateIsoquants();
  box.updatePrice();
  box.updateBudgets();
  box.showBudgetLine();
  box.showInitialEndowment();
  
  box.showContractCurve();
  box.updateOptimalAllocation();
  box.showOptimalAllocation();
  

  
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

function constrainInputValue(inputEl) {
  let val = ParseFloat(inputEl.value);
  let min = ParseFloat(inputEl.min);
  let max = ParseFloat(inputEl.max);
  if (val < min) {
   val = min;
  }
  if (val > max) {
   val = max;
  }  
  return val;
}
