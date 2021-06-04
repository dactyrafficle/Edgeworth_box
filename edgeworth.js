
let box = (function() {
  
 let c = document.createElement('canvas');
 let ctx = c.getContext('2d');

 let scale = 5; // default
 
 let w = 100;  // default
 let h = 100;  // default
 
 let dx = 2;
 let dy = 2;
 
 let px;
 let py = 1;
 
 let x_optimal;
 let y_optimal;
 
 let amy = {
  'ex':40,
  'ey':60,
  'alpha':0.30,
  'u':0,
  'mu':{
    'x':0,
    'y':0
  },
  'mrs':0
 }
 
 let mark = {
  'ex':60,
  'ey':40,
  'alpha':0.20,
  'u':0,
  'mu':{
    'x':0,
    'y':0
  },
  'mrs':0
 } 
 

 
 return {
   'returnCanvas': function() {
     c.id = 'mycanvas';
     return c;
   },
   'updateScale': function(scale_) {
     scale = scale_;
   },
   'returnData': function() {
     return {
      'Ex':amy.ex + mark.ex,
      'Ey':amy.ey + mark.ey,
      'scale':scale,
      'h':h,
      'w':w,
      'px':px,
      'py':1,
      'amy':amy,
      'mark':mark
     };
   },
   'updateAlphaAmy': function(alpha_) {
     amy.alpha = alpha_;
   },
   'updateAlphaMark': function(alpha_) {
     mark.alpha = alpha_;
   },
   'updateExAmy': function(ex_) {
     amy.ex = ex_;
   },
   'updateExMark': function(ex_) {
     mark.ex = ex_;
   },
   'updateEyAmy': function(ey_) {
     amy.ey = ey_;
   },
   'updateEyMark': function(ey_) {
     mark.ey = ey_;
   },
   'updateInitialAnalysis': function() {
     return {
       'u_amy': amy.ex**amy.alpha*amy.ey**(1-amy.alpha),
       'u_mark': mark.ex**mark.alpha*mark.ey**(1-mark.alpha),
       'mu_x_amy': amy.alpha*(amy.ey/amy.ex)**(1-amy.alpha)
     };
   },
   'clearCanvas': function() {
     ctx.fillStyle = '#ffff';
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
     
     amy.mu.x = amy.alpha*(amy.ey/amy.ex)**(1-amy.alpha);
     amy.mu.y = (1-amy.alpha)*(amy.ex/amy.ey)**amy.alpha;
     amy.mrs = amy.mu.x/amy.mu.y;
     mark.mu.x = mark.alpha*(mark.ey/mark.ex)**(1-mark.alpha);
     mark.mu.y = (1-mark.alpha)*(mark.ex/mark.ey)**mark.alpha;
     mark.mrs = mark.mu.x/mark.mu.y;
     
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
  


