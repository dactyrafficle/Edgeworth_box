
let input_a_alpha;
let input_b_alpha;
let input_a_beta;
let input_b_beta;
let input_a_x;
let input_b_x;
let input_a_y;
let input_b_y;


let points = [];
let params = [];

let box, canvas, container;

let canvasIsClicked = false;

function update_table(point) {
 
  // ALLOCATIONS, CURRENT
  document.getElementById('current-allocation-a-x-' + point.id).innerHTML = (point.actual.a.allocation.x).toFixed(3);
  document.getElementById('current-allocation-a-y-' + point.id).innerHTML = (point.actual.a.allocation.y).toFixed(3);   
  document.getElementById('current-allocation-b-x-' + point.id).innerHTML = (point.actual.b.allocation.x).toFixed(3);    
  document.getElementById('current-allocation-b-y-' + point.id).innerHTML = (point.actual.b.allocation.y).toFixed(3);
  
  // ALLOCATIONS, OPTIMAL
  document.getElementById('optimal-allocation-a-x-' + point.id).innerHTML = (point.optimal.a.allocation.x).toFixed(3);
  document.getElementById('optimal-allocation-a-y-' + point.id).innerHTML = (point.optimal.a.allocation.y).toFixed(3);   
  document.getElementById('optimal-allocation-b-x-' + point.id).innerHTML = (point.optimal.b.allocation.x).toFixed(3);    
  document.getElementById('optimal-allocation-b-y-' + point.id).innerHTML = (point.optimal.b.allocation.y).toFixed(3);

  // BUDGET, CURRENT
  document.getElementById('current-budget-a-' + point.id).innerHTML = (point.actual.a.budget).toFixed(4);
  document.getElementById('current-budget-b-' + point.id).innerHTML = (point.actual.b.budget).toFixed(4);
  
  // BUDGET, OPTIMAL
  document.getElementById('optimal-budget-a-' + point.id).innerHTML = (point.optimal.a.budget).toFixed(4);
  document.getElementById('optimal-budget-b-' + point.id).innerHTML = (point.optimal.b.budget).toFixed(4);

  // UTILITY, CURRENT
  document.getElementById('current-utility-a-' + point.id).innerHTML = (point.actual.a.utility).toFixed(4);
  document.getElementById('current-utility-b-' + point.id).innerHTML = (point.actual.b.utility).toFixed(4);
  
  // UTILITY, OPTIMAL
  document.getElementById('optimal-utility-a-' + point.id).innerHTML = (point.optimal.a.utility).toFixed(4);
  document.getElementById('optimal-utility-b-' + point.id).innerHTML = (point.optimal.b.utility).toFixed(4);
  
  // MU, CURRENT
  document.getElementById('current-mu-a-x-' + point.id).innerHTML = (point.actual.a.mu.x).toFixed(3);
  document.getElementById('current-mu-a-y-' + point.id).innerHTML = (point.actual.a.mu.y).toFixed(3);   
  document.getElementById('current-mu-b-x-' + point.id).innerHTML = (point.actual.b.mu.x).toFixed(3);    
  document.getElementById('current-mu-b-y-' + point.id).innerHTML = (point.actual.b.mu.y).toFixed(3);
  
  // MU, OPTIMAL
  document.getElementById('optimal-mu-a-x-' + point.id).innerHTML = (point.optimal.a.mu.x).toFixed(3);
  document.getElementById('optimal-mu-a-y-' + point.id).innerHTML = (point.optimal.a.mu.y).toFixed(3);   
  document.getElementById('optimal-mu-b-x-' + point.id).innerHTML = (point.optimal.b.mu.x).toFixed(3);    
  document.getElementById('optimal-mu-b-y-' + point.id).innerHTML = (point.optimal.b.mu.y).toFixed(3);

  // MRS, CURRENT
  document.getElementById('current-mrs-a-xy-' + point.id).innerHTML = (point.actual.a.mrs.xy).toFixed(3);
  document.getElementById('current-mrs-a-yx-' + point.id).innerHTML = (point.actual.a.mrs.yx).toFixed(3);   
  document.getElementById('current-mrs-b-xy-' + point.id).innerHTML = (point.actual.b.mrs.xy).toFixed(3);    
  document.getElementById('current-mrs-b-yx-' + point.id).innerHTML = (point.actual.b.mrs.yx).toFixed(3);
  
  // MRS, OPTIMAL
  document.getElementById('optimal-mrs-a-xy-' + point.id).innerHTML = (point.optimal.a.mrs.xy).toFixed(3);
  document.getElementById('optimal-mrs-a-yx-' + point.id).innerHTML = (point.optimal.a.mrs.yx).toFixed(3);   
  document.getElementById('optimal-mrs-b-xy-' + point.id).innerHTML = (point.optimal.b.mrs.xy).toFixed(3);    
  document.getElementById('optimal-mrs-b-yx-' + point.id).innerHTML = (point.optimal.b.mrs.yx).toFixed(3);

  // PRICE, X
  document.getElementById('price-x-' + point.id).innerHTML = (point.system.price.x).toFixed(3);

  // MU/PRICE, CURRENT
  document.getElementById('current-mu-price-a-x-' + point.id).innerHTML = (point.actual.a.mu_per_dollar.x).toFixed(3);
  document.getElementById('current-mu-price-a-y-' + point.id).innerHTML = (point.actual.a.mu_per_dollar.y).toFixed(3);   
  document.getElementById('current-mu-price-b-x-' + point.id).innerHTML = (point.actual.b.mu_per_dollar.x).toFixed(3);    
  document.getElementById('current-mu-price-b-y-' + point.id).innerHTML = (point.actual.b.mu_per_dollar.y).toFixed(3);
  
  // MU/PRICE, OPTIMAL
  document.getElementById('optimal-mu-price-a-x-' + point.id).innerHTML = (point.optimal.a.mu_per_dollar.x).toFixed(3);
  document.getElementById('optimal-mu-price-a-y-' + point.id).innerHTML = (point.optimal.a.mu_per_dollar.y).toFixed(3);   
  document.getElementById('optimal-mu-price-b-x-' + point.id).innerHTML = (point.optimal.b.mu_per_dollar.x).toFixed(3);    
  document.getElementById('optimal-mu-price-b-y-' + point.id).innerHTML = (point.optimal.b.mu_per_dollar.y).toFixed(3);

}


function update_box() {

  // TO HOUSEKEEP GERUND
  box.CLEAR_CANVAS();
  box.SHOW_GRID_Y(10);
  box.SHOW_GRID_X(10);


  // A INITIAL
  box.SHOWVALUE({'x':points[0].actual.a.allocation.x,'y':points[0].actual.a.allocation.y}, '#fc0', 3);
  
  // A OPTIMAL
  box.SHOWVALUE({'x':points[0].optimal.a.allocation.x,'y':points[0].optimal.a.allocation.y}, '#fc0', 3);
  
  // B INITIAL
  box.SHOWVALUE({'x':points[1].actual.a.allocation.x,'y':points[1].actual.a.allocation.y}, '#c2d1f0', 3);

  // B OPTIMAL
  box.SHOWVALUE({'x':points[1].optimal.a.allocation.x,'y':points[1].optimal.a.allocation.y}, '#c2d1f0', 3);
  
  // A : 0
  box.DRAW_ISOQUANT({'x':points[0].actual.a.allocation.x, 'y':points[0].actual.a.allocation.y, 'alpha':points[0].params.a.alpha, 'beta':points[0].params.a.beta, 'm':null}, '#fc0', 1);

  // B : 0
  box.DRAW_ISOQUANT({'x':points[0].actual.b.allocation.x, 'y':points[0].actual.b.allocation.y, 'alpha':points[0].params.b.alpha, 'beta':points[0].params.b.beta, 'm':null}, '#fc0', 1, true);
  
  // A : 1
  box.DRAW_ISOQUANT({'x':points[1].actual.a.allocation.x, 'y':points[1].actual.a.allocation.y, 'alpha':points[1].params.a.alpha, 'beta':points[1].params.a.beta, 'm':null}, '#c2d1f0', 1);

  // B : 1
  box.DRAW_ISOQUANT({'x':points[1].actual.b.allocation.x, 'y':points[1].actual.b.allocation.y, 'alpha':points[1].params.b.alpha, 'beta':points[1].params.b.beta, 'm':null}, '#c2d1f0', 1, true);
  
  
  /* add the price lines */
  
  /* add the regional shading */

  
}

window.onload = function() {

  myinputs = document.getElementsByClassName('myinputs');

  input_a_alpha = document.getElementById('input_a_alpha');
  input_b_alpha = document.getElementById('input_b_alpha');
  input_a_beta = document.getElementById('input_a_beta');
  input_b_beta = document.getElementById('input_b_beta');
  input_a_x = document.getElementById('input_a_x');
  input_b_x = document.getElementById('input_b_x');
  input_a_y = document.getElementById('input_a_y');
  input_b_y = document.getElementById('input_b_y');
  
  // INITIALIZE POINTS
  points[0] = new Point(0);
  points[1] = new Point(1);
  points[2] = new Point(2); // TESTING

  // PULL DATA FROM INPUT TABLE
  update_params_from_table(true);
  
  // UPDATE POINTS
  points[0].update(params[0]);
  points[1].update(params[1]);

  // UPDATE INFO TABLE
  update_table(points[0]);
  update_table(points[1]);

  // NEW BOX, SIZE
  box = new Box();
  box.dimension(700, 600);
  box.rangex(0, points[0].actual.a.allocation.x+points[0].actual.b.allocation.x);
  box.rangey(0, points[0].actual.a.allocation.y+points[0].actual.b.allocation.y);
  
  // GET ITS CANVAS, ATTACH IT
  canvas = box.returnCanvas();
  container = document.getElementById('container');
  container.appendChild(canvas);
  
  update_box();

  for (let i = 0; i < myinputs.length; i++) {
    myinputs[i].addEventListener('input', function() {

      // PULL DATA FROM INPUT TABLE
      update_params_from_table();

      // UPDATE POINTS
      points[0].update(params[0]);
      points[1].update(params[1]);

      // UPDATE INFO TABLE
      update_table(points[0]);
      update_table(points[1]);
      
      // UPDATE BOX
      box.rangex(0, points[0].actual.a.allocation.x+points[0].actual.b.allocation.x);
      box.rangey(0, points[0].actual.a.allocation.y+points[0].actual.b.allocation.y);
      update_box();
    
    });
  }

 
 
 
 
   /*
  let blurb = document.getElementById('blurb');
  blurb.style.width = document.getElementById('parameter-table').clientWidth; // or offsetWidth
  
  let infoboxContainer = document.getElementById('infobox-container');
  let canvas_width = window.innerWidth - infoboxContainer.getBoundingClientRect().right;

  if (canvas_width > window.innerHeight) {
    canvas_width = window.innerHeight;
  }
  



  window.onresize = function(e) {
    
    blurb.style.width = document.getElementById('parameter-table').clientWidth;
    canvas_width = window.innerWidth - infoboxContainer.getBoundingClientRect().right;
    console.log(canvas_width);
    
    if (canvas_width > window.innerHeight) {
      canvas_width = window.innerHeight;
    }
  
    box.updateScale(canvas_width/120);
    box.resizeCanvas();
    updateEdgeworthBox();

    
  }

 */

  canvas.addEventListener('click', function(e) {
    if (!canvasIsClicked) {
      canvasIsClicked = true;
    } else {
      canvasIsClicked = false;
      
      
     // CANVAS DIMENSIONS
    let canvas_width = canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left;
    let canvas_height = canvas.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top;
    
    // MOUSE POSITION
    let x = e.x - canvas.getBoundingClientRect().left;
    let y = e.y - canvas.getBoundingClientRect().top;

    let pixel = {'x':x,'y':y};
    let val = box.PIXEL2VAL(pixel);
    
    if (val.x < 1) {
      val.x = 1;
    }
    if (val.x >= (box.data.range.x.max-1)) {
      val.x = box.data.range.x.max - 1;
    }
    if (val.y < 1) {
      val.y = 1;
    }
    if (val.y >= (box.data.range.y.max-1)) {
      val.y = (box.data.range.y.max - 1);
    }

    // console.log(val);

    // RELATIVE POSITION
    params[1].a.x_pct = (val.x/box.data.range.x.max);
    params[1].a.y_pct = (val.y/box.data.range.y.max);

    // ABSOLUTE POSITION
    params[1].a.x = (box.data.range.x.max)*(val.x/box.data.range.x.max);
    params[1].a.y = (box.data.range.y.max)*(val.y/box.data.range.y.max);
     
    params[1].b.x_pct = 1-params[1].a.x_pct;
    params[1].b.y_pct = 1-params[1].a.y_pct;
    params[1].b.x = (box.data.range.x.max) - params[1].a.x;
    params[1].b.y = (box.data.range.y.max) - params[1].a.y;
     
    // UPDATE POINTS
    points[1].update(params[1]);

    // UPDATE INFO TABLE
    update_table(points[1]);
    
    // UPDATE BOX
    update_box();
      
      
      
      
      
      
    }
  });


  canvas.addEventListener('mousemove', function(e) {
    
    if (canvasIsClicked) {
      return;
    }
    
    // CANVAS DIMENSIONS
    let canvas_width = canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left;
    let canvas_height = canvas.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top;
    
    // MOUSE POSITION
    let x = e.x - canvas.getBoundingClientRect().left;
    let y = e.y - canvas.getBoundingClientRect().top;

    let pixel = {'x':x,'y':y};
    let val = box.PIXEL2VAL(pixel);
    
    if (val.x < 1) {
      val.x = 1;
    }
    if (val.x >= (box.data.range.x.max-1)) {
      val.x = box.data.range.x.max - 1;
    }
    if (val.y < 1) {
      val.y = 1;
    }
    if (val.y >= (box.data.range.y.max-1)) {
      val.y = (box.data.range.y.max - 1);
    }

    // console.log(val);

    // RELATIVE POSITION
    params[1].a.x_pct = (val.x/box.data.range.x.max);
    params[1].a.y_pct = (val.y/box.data.range.y.max);

    // ABSOLUTE POSITION
    params[1].a.x = (box.data.range.x.max)*(val.x/box.data.range.x.max);
    params[1].a.y = (box.data.range.y.max)*(val.y/box.data.range.y.max);
     
    params[1].b.x_pct = 1-params[1].a.x_pct;
    params[1].b.y_pct = 1-params[1].a.y_pct;
    params[1].b.x = (box.data.range.x.max) - params[1].a.x;
    params[1].b.y = (box.data.range.y.max) - params[1].a.y;
     
    // UPDATE POINTS
    points[1].update(params[1]);

    // UPDATE INFO TABLE
    update_table(points[1]);
    
    // UPDATE BOX
    update_box();

  });



  function update_params_from_table(initialize) {

    params[0] = {
     'a':{
       'alpha':parseFloat(input_a_alpha.value),
       'beta':1-parseFloat(input_a_alpha.value), // parseFloat(input_a_beta.value),
       'x_pct':parseFloat(input_a_x.value)/(parseFloat(input_a_x.value)+parseFloat(input_b_x.value)),
       'y_pct':parseFloat(input_a_y.value)/(parseFloat(input_a_y.value)+parseFloat(input_b_y.value)),
       'x':parseFloat(input_a_x.value),
       'y':parseFloat(input_a_y.value)
     },
     'b':{
       'alpha':parseFloat(input_b_alpha.value),
       'beta':1-parseFloat(input_b_alpha.value), // parseFloat(input_b_beta.value),
       'x_pct':parseFloat(input_b_x.value)/(parseFloat(input_a_x.value)+parseFloat(input_b_x.value)),
       'y_pct':parseFloat(input_b_y.value)/(parseFloat(input_a_y.value)+parseFloat(input_b_y.value)),
       'x':parseFloat(input_b_x.value),
       'y':parseFloat(input_b_y.value)
     }
    };
  
  if (initialize) {
      params[1] = {
       'a':{
         'alpha':parseFloat(input_a_alpha.value),
         'beta':1-parseFloat(input_a_alpha.value), // parseFloat(input_a_beta.value),
         'x_pct':0.7,
         'y_pct':0.85,
         'x':0.7*(parseFloat(input_a_x.value)+parseFloat(input_b_x.value)),
         'y':0.85*(parseFloat(input_a_y.value)+parseFloat(input_b_y.value))
       },
       'b':{
         'alpha':parseFloat(input_b_alpha.value),
         'beta':1-parseFloat(input_b_alpha.value), // parseFloat(input_b_beta.value),
         'x_pct':0.3,
         'y_pct':0.15,
         'x':0.3*(parseFloat(input_a_x.value)+parseFloat(input_b_x.value)),
         'y':0.15*(parseFloat(input_a_y.value)+parseFloat(input_b_y.value))
       }
      };
    } else {
  
    params[1].a.alpha = parseFloat(input_a_alpha.value);
    params[1].a.beta = 1-parseFloat(input_a_alpha.value);
    params[1].a.x = params[1].a.x_pct * (parseFloat(input_a_x.value)+parseFloat(input_b_x.value));
    params[1].a.y = params[1].a.y_pct * (parseFloat(input_a_y.value)+parseFloat(input_b_y.value));
    
    params[1].b.alpha = parseFloat(input_b_alpha.value);
    params[1].b.beta = 1-parseFloat(input_b_alpha.value);
    params[1].b.x = params[1].b.x_pct * (parseFloat(input_a_x.value)+parseFloat(input_b_x.value));
    params[1].b.y = params[1].b.y_pct * (parseFloat(input_a_y.value)+parseFloat(input_b_y.value));

    }

  }



}





