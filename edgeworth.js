
function updateEdgeWorthBox(a, b) {
 
 //console.log(a);
 
 let c = document.getElementById('mycanvas');
 let ctx = c.getContext('2d');
 let scale = 10;

 let w = scale*(a.ex + b.ex);
 let h = scale*(a.ey + b.ey);
 
 c.width = w;
 c.height = h;
 
 c.addEventListener('mousemove', function(e) {
   let pixel = {
     'x':e.offsetX,
     'y':h-e.offsetY
   }
   let val = {
     'x':pixel.x/scale,
     'y':pixel.y/scale
   }
   console.log(val);
 });
 
 let u_a = a.ex**a.alpha * a.ey**(1-a.alpha);
 let u_b = b.ex**b.alpha * b.ey**(1-b.alpha);

 // THE BUDGET LINE
 let px = (a.alpha*a.ey + b.alpha*b.ey) / ((1-b.alpha)*b.ex + (1-a.alpha)*a.ex)
 //console.log(px);
 
 
 // exchange points
 // BUDGETS
 a.budget = px*a.ex + a.ey;
 b.budget = px*b.ex + b.ey;
 let x = a.alpha*a.budget / px;
 let y = (1-a.alpha)*a.budget / 1;
 
 // THE NEW POINT
 ctx.fillStyle = '#adc2eb99'; 
 ctx.beginPath();
 ctx.arc(x*scale, h-y*scale, 5, 0, 2*Math.PI);
 //ctx.arc(w-(b.alpha*b.budget/px)*scale, ((1-b.alpha)*b.budget)*scale, 3, 0, 2*Math.PI);
 ctx.fill()
 ctx.fillStyle = '#adc2eb'; 
 ctx.beginPath();
 //ctx.arc(x*scale, h-y*scale, 7, 0, 2*Math.PI);
 ctx.arc(w-(b.alpha*b.budget/px)*scale, ((1-b.alpha)*b.budget)*scale, 2, 0, 2*Math.PI);
 ctx.fill()
 // above 
 
 ctx.strokeStyle = '#adc2eb';
 ctx.beginPath();
 ctx.moveTo(0, h - a.ey*scale - px*a.ex*scale);
 ctx.lineTo(a.ex*scale, h-a.ey*scale);
 ctx.lineTo(w, (h-a.ey*scale)+px*(w-a.ex*scale));
 ctx.stroke();
 

 let dx = 2;
 ctx.strokeStyle = '#ddd';
 ctx.fillStyle = '#ddd'; 
 for (let i = 0; i < w; i++) {

  // draw u_a isoquant
  let x_a = i/scale;
  let y_a = (u_a / (x_a**a.alpha))**(1/(1-a.alpha));
  let x_a2 = (i+dx)/scale;
  let y_a2 = (u_a / (x_a2**a.alpha))**(1/(1-a.alpha));
  ctx.strokeStyle = '#ddd';
  ctx.beginPath();
  //ctx.arc(x_a*scale, h-y_a*scale, 1, 0, 2*Math.PI);
  ctx.moveTo(x_a*scale, h-y_a*scale);
  ctx.lineTo(x_a2*scale, h-y_a2*scale);
  ctx.stroke();
  
  //ctx.fill();
  
  
 
  // draw u_b
  let x_b = (w-i)/scale;
  let y_b = (u_b / (x_b**b.alpha))**(1/(1-b.alpha));
  let x_b2 = (w-i-dx)/scale;
  let y_b2 = (u_b / (x_b2**b.alpha))**(1/(1-b.alpha));
  ctx.beginPath();
  //ctx.arc(w-x_b*scale, y_b*scale, 1, 0, 2*Math.PI);
  ctx.strokeStyle = '#ddd';
  ctx.moveTo(w-x_b*scale, y_b*scale);
  ctx.lineTo(w-x_b2*scale, y_b2*scale);
  ctx.stroke();
  //ctx.fill();


    
  // COMPARE
  ctx.strokeStyle = '#fc05';
  if (i%5 === 0) {
   if ((h-y_a*scale) > y_b*scale) {
    ctx.beginPath();
    ctx.moveTo(x_a*scale, h-y_a*scale);
    ctx.lineTo(w-x_b*scale, y_b*scale);
    ctx.stroke();
   }
  }
  
 }


 // THE INITIAL ENDOWMENT 
 ctx.fillStyle = '#fc0'; 
 ctx.beginPath();
 ctx.arc(a.ex*scale, h-a.ey*scale, 5, 0, 2*Math.PI);
 ctx.fill()

}