
function updateEdgeWorthBox(a, b) {
 
 //console.log(a);
 
 let c = document.getElementById('mycanvas');
 let ctx = c.getContext('2d');
 let scale = 10;

 let w = scale*(a.ex + b.ex);
 let h = scale*(a.ey + b.ey);
 
 c.width = w;
 c.height = h;

 let u_a = a.ex**a.alpha * a.ey**(1-a.alpha);
 let u_b = b.ex**b.alpha * b.ey**(1-b.alpha);

 // THE BUDGET LINE
 let px = (a.alpha*a.ey + b.alpha*b.ey) / ((1-b.alpha)*b.ex + (1-a.alpha)*a.ex)
 console.log(px);

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