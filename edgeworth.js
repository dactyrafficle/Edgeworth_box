
let box = (function() {
  
 let c = document.createElement('canvas');
 let ctx = c.getContext('2d');

 let scale = 10;
 
 let w = 500;
 let h = 500;
 
 let dx = 2;
 let dy = 2;
 
 let px;
 let py = 1;
 
 let x_optimal;
 let y_optimal;
 
 let amy = {
  'ex':20,
  'ey':30,
  'alpha':0.30
 }
 
 let mark = {
  'ex':35,
  'ey':22,
  'alpha':0.20
 } 
 
 let infobox = document.createElement('div');
 infobox.style.width = '200px';
 infobox.style.padding = '1vh';
 
 c.addEventListener('mousemove', function(e) {
   let pixel = {
     'x':e.offsetX,
     'y':h-e.offsetY
   }
   let val = {
     'x':pixel.x/scale,
     'y':pixel.y/scale
   }
   let span = document.createElement('span');
   span.innerHTML = '(' + Math.floor(val.x*100)/100 + ', ' + Math.floor(val.y*100)/100 + ')';
   infobox.innerHTML = '';
   infobox.appendChild(span);
 });
 
 return {
   'returnCanvas': function() {
     return c;
   },
   'returnInfobox': function() {
     return infobox;
   },
   'clearCanvas': function() {
     ctx.fillStyle = '#fff';
     ctx.fillRect(0, 0, c.width, c.height);
     ctx.fill();
   },
   'resizeCanvas': function() {
     w = (amy.ex + mark.ex)*scale;
     h = (amy.ey + mark.ey)*scale;
     c.width = w;
     c.height = h;
   },
   'showInitialEndowment': function() {
     ctx.fillStyle = '#fc0a'; 
     ctx.beginPath();
     ctx.arc(amy.ex*scale, h-amy.ey*scale, 5, 0, 2*Math.PI);
     ctx.fill()
   },
   'updateUtilities': function() {
     amy.u = amy.ex**amy.alpha*amy.ey**(1-amy.alpha);
     mark.u = mark.ex**mark.alpha*mark.ey**(1-mark.alpha);
   },
   'updateIsoquants': function() {
     
     for (let i = 0; i < w; i += dx) {
       
       let x1_amy = i/scale;
       let x2_amy = (i+dx)/scale;
       let y1_amy = (amy.u / (x1_amy**amy.alpha))**(1/(1-amy.alpha));
       let y2_amy = (amy.u / (x2_amy**amy.alpha))**(1/(1-amy.alpha));
       
       let x1_mark = (w-i)/scale;
       let x2_mark = (w-i-dx)/scale;
       let y1_mark = (mark.u / (x1_mark**mark.alpha))**(1/(1-mark.alpha));
       let y2_mark = (mark.u / (x2_mark**mark.alpha))**(1/(1-mark.alpha));      
 
       ctx.strokeStyle = '#ddd';
       
       // ISOQUANT AMY
       ctx.beginPath();
       ctx.moveTo(x1_amy*scale, h-y1_amy*scale);
       ctx.lineTo(x2_amy*scale, h-y2_amy*scale);
       ctx.stroke();
       
       // ISOQUANT MARK
       ctx.beginPath();
       ctx.moveTo(w-x1_mark*scale, y1_mark*scale);
       ctx.lineTo(w-x2_mark*scale, y2_mark*scale);
       ctx.stroke();
       
       // WIN-WIN REGION
       ctx.strokeStyle = '#fc05';
       if (i%3 === 0) {
        if ((h-y1_amy*scale) > (y1_mark*scale)) {
         ctx.beginPath();
         ctx.moveTo(x1_amy*scale, h-y1_amy*scale);
         ctx.lineTo(x1_amy*scale, y1_mark*scale);
         ctx.stroke();
       }
      }
       
     }
     
   },
   'updatePrice': function() {
     px = (amy.alpha*amy.ey + mark.alpha*mark.ey) / ((1-mark.alpha)*mark.ex + (1-amy.alpha)*amy.ex);
   },
   'updateBudgets': function() {
     amy.budget = amy.ex*px+amy.ey;
     mark.budget = mark.ex*px+mark.ey;
   },
   'showBudgetLine': function() {
     ctx.strokeStyle = '#adc2eb';
     ctx.beginPath();
     ctx.moveTo(0, h-amy.ey*scale-px*amy.ex*scale);
     ctx.lineTo(amy.ex*scale, h-amy.ey*scale);
     ctx.lineTo(w, (h-amy.ey*scale)+px*(w-amy.ex*scale));
     ctx.stroke();
   },
   'updateOptimalAllocation': function() {
     x_optimal = amy.alpha*amy.budget / px;
     y_optimal = (1-amy.alpha)*amy.budget / 1;
   },
   'showOptimalAllocation': function() {
      
     ctx.fillStyle = '#adc2eb99'; 
     ctx.beginPath();
     ctx.arc(x_optimal*scale, h-y_optimal*scale, 6, 0, 2*Math.PI);
     ctx.fill()
     
     ctx.fillStyle = '#adc2eb'; 
     ctx.beginPath();
     ctx.arc(w-(mark.alpha*mark.budget/px)*scale, ((1-mark.alpha)*mark.budget)*scale, 3, 0, 2*Math.PI);
     ctx.fill()
   },
   'showContractCurve': function() {
     for (let i = 0; i < w; i += dx) {
       
       let x1 = i/scale;
       let A1 = mark.alpha/(1-mark.alpha);
       let K1 = A1/((amy.ex+mark.ex)-x1);
       let S1 = x1*((1-amy.alpha)/amy.alpha);
       let y1 = S1*(amy.ey+mark.ey)*K1/(1+S1*K1);
       
       let x2 = (i+dx)/scale;
       let A2 = mark.alpha/(1-mark.alpha);
       let K2 = A2/((amy.ex+mark.ex)-x2);
       let S2 = x2*((1-amy.alpha)/amy.alpha);
       let y2 = S2*(amy.ey+mark.ey)*K2/(1+S2*K2);
       
       ctx.strokeStyle = '#adc2eb99'; 
       ctx.beginPath();
       ctx.moveTo(x1*scale, h-y1*scale);
       ctx.lineTo(x2*scale, h-y2*scale);
       ctx.stroke();
     }
   }
 }
  
})();
  





function updateEdgeWorthBox(a, b) {
 
 

 
};