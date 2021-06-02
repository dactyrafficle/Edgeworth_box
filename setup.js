
function updateInfoBox() {
 let data = box.returnData();
 val_initial_amy.innerHTML = '(' + data.amy.ex + ', ' + data.amy.ey + ')';
 val_initial_mark.innerHTML = '(' + data.mark.ex + ', ' + data.mark.ey + ')';
 
 u_initial_amy.innerHTML = Math.floor(data.amy.u*100)/100;
 u_initial_mark.innerHTML = Math.floor(data.mark.u*100)/100;
}

function updateCurrentInfoBox(e) {
 let data = box.returnData();

 let pixel = {
  'x':e.offsetX,
  'y':data.h-e.offsetY
 }

 let val = {
  'x':pixel.x/data.scale,
  'y':pixel.y/data.scale
 }

 let amy_ex = val.x;
 let mark_ex = data.Ex - val.x;
 let amy_ey = val.y;
 let mark_ey = data.Ey - val.y;
 let u_amy = amy_ex**data.amy.alpha*amy_ey**(1-data.amy.alpha);
 let u_mark = mark_ex**data.mark.alpha*mark_ey**(1-data.mark.alpha);
 
 val_current_amy.innerHTML = '(' + Math.floor(amy_ex*100)/100 + ', ' + Math.floor(amy_ey*100)/100 + ')';
 val_current_mark.innerHTML = '(' + Math.floor(mark_ex*100)/100 + ', ' + Math.floor(mark_ey*100)/100 + ')';
 u_current_amy.innerHTML = Math.floor(u_amy*100)/100;
 u_current_mark.innerHTML = Math.floor(u_mark*100)/100;
}

window.onload = function() {

  let canvas_container = document.getElementById('canvas-container');
  let c = box.returnCanvas();
  canvas_container.appendChild(c);

  c.addEventListener('mousemove', function(e) {
    updateCurrentInfoBox(e);
    

  });

  
  box.resizeCanvas();
  updateEdgeworthBox();
  updateInfoBox();
  
  input_range_alpha_amy.addEventListener('input', function(e) {
    let val = constrainInputValue(this);
    input_number_alpha_amy.value = val;
    
    input_range_beta_amy.value = Math.ceil((1-Math.floor(val*100)/100)*100)/100;
    input_number_beta_amy.value = Math.ceil((1-Math.floor(val*100)/100)*100)/100;
    
    box.updateAlphaAmy(val);
    updateEdgeworthBox();
    updateInfoBox();
  });
  
  input_range_alpha_mark.addEventListener('input', function(e) {
    let val = constrainInputValue(this);
    input_number_alpha_mark.value = val;
    
    input_range_beta_mark.value = Math.ceil((1-Math.floor(val*100)/100)*100)/100;
    input_number_beta_mark.value = Math.ceil((1-Math.floor(val*100)/100)*100)/100;
    
    box.updateAlphaMark(val);
    updateEdgeworthBox();
    updateInfoBox();
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
    updateInfoBox();
  });
  
  input_range_ex_mark_abs.addEventListener('input', function(e) {
    let val = parseInt(constrainInputValue(this));
    input_number_ex_mark_abs.value = val;
    input_range_ex_amy_abs.value = 100-val;
    input_number_ex_amy_abs.value = 100-val;

    box.updateExMark(val);
    box.updateExAmy(100-val);
    updateEdgeworthBox();
    updateInfoBox();
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
    updateInfoBox();
  });
  
  input_range_ey_mark_abs.addEventListener('input', function(e) {
    let val = parseInt(constrainInputValue(this));
    input_number_ey_mark_abs.value = val;
    input_range_ey_amy_abs.value = 100-val;
    input_number_ey_amy_abs.value = 100-val;

    box.updateEyMark(val);
    box.updateEyAmy(100-val);
    updateEdgeworthBox();
    updateInfoBox();
  });
  

  
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
