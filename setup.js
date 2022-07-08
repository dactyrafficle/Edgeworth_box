
function Human(obj) {
  this.delta = (obj.delta || null);
  this.alpha = (obj.alpha || null);
  this.beta = (obj.beta || null);
  this.ex = (obj.ex || null);
  this.ey = (obj.ey || null);
};

let humans = [
  new Human({
    'delta':-2.1,
    'alpha':0.4,
    'beta':0.6,
    'ex':55,
    'ey':45
  }),
  new Human({
    'delta':-0.1,
    'alpha':0.53,
    'beta':0.47,
    'ex':37,
    'ey':163
  })
];


let box, px;
window.addEventListener('load', function() {

  let market_solution = solve_p(humans);
  px = market_solution.p;
  console.log(px);

  // INITIALIZE BOX
  box = new Box();
  container.appendChild(box.RETURN_CONTAINER());
  box.CANVAS_SIZE(500, 500);
  
  
  box.RANGE_X(0, humans[0].ex + humans[1].ex);          
  box.RANGE_Y(0, humans[0].ey + humans[1].ey);

  box.CLEAR_CANVAS();

  // GRIDLINES 
  box.LINE_WIDTH(1);
  box.STROKE_STYLE('#ddd');
  box.SHOW_GRID_X(10);
  box.SHOW_GRID_Y(10);
  
  box.LINE_WIDTH(2);
  
  // THE FIRST IDC
  box.STROKE_STYLE('#fc0a');
  box.SHOW_CES_INDIFFERENCE_CURVE({
    'delta':humans[0].delta, 
    'alpha':humans[0].alpha,
    'beta':humans[0].beta, 
    'u':null,
    'x':humans[0].ex,
    'y':humans[0].ey
  });

  // THE 2ND IDC
  box.STROKE_STYLE('#58Da');
  box.SHOW_CES_INDIFFERENCE_CURVE({
    'delta':humans[1].delta, 
    'alpha':humans[1].alpha,
    'beta':humans[1].beta, 
    'u':null,
    'x':humans[1].ex,
    'y':humans[1].ey,
    'inverted':true
  });
  
  // THE INITIAL ENDOWMENTS
  box.FILL_STYLE('#3339');
  box.RADIUS(1.4);
  box.POINT({'x':(box.data.range.x.max - humans[1].ex),'y':(box.data.range.y.max - humans[1].ey)});
  
  // DRAW THE BUDGET LINE
  box.LINE_WIDTH(1);
  box.STROKE_STYLE('#9999');
  box.CONNECT_POINTS([
    {'x':0,'y':(humans[0].ey + humans[0].ex*px)},
    {'x':box.data.range.x.max,'y':humans[0].ey-(box.data.range.x.max - humans[0].ex)*px}
  ]);
  
}); // CLOSING window.onload 



function solve_p(humans) {
  
  let dec = 8;  //  MAX DECIMAL PLACES OF DP
  let count = 0;
  let p = 1;
  let dp = 0.1;
  let market_solution = get_market_solution(humans, p);
  let net_demand_for_x = market_solution.net_demand_for_x;
  
  // HERE, IM LOOKING AT THE NET DEMAND FOR X, WHICH IS TOTAL DEMAND LESS TOTAL SUPPLY
  // TOTAL DEMAND = D[0] + D[1]
  // TOTAL SUPPLY IS CONSTANT [THE ENDOWMENTS]
  // THE EQUILIBRIUM CONDITION IS THAT D[0] + D[1] = S[0] + S[1]
  // BUT AT A RANDOM PRICE, THIS ISNT TRUE
  // BOTH D[0] AND D[1] GO DOWN AS P GOES UP
  // SO NET DEMAND FOR X IS A DECREASING FUNCTION OF P
  
  // I START AT AN ARBITRARY P, AND I CALCULATE THE NET DEMAND FOR X AT THAT PRICE
  // THEN I INCREASE P (VIA DP) AND RECALCULATE THE NET DEMAND FOR X
  // IF THE ABSOLUTE VALUE OF THE NET DEMAND FOR X IS SMALLER AT THE NEW PRICE, THEN THE NEW PRICE BECOMES THE CURRENT PRICE
  
  // BASICALLY, START AT P.
  // LOOK UP. IF ITS BETTER, GO THERE. CONTINUE (GO TO THE NEXT ITERATION OF THE LOOP)
  // IF NOT, THEN LOOK DOWN. IF ITS BETTER, GO THERE. CONTINUE.
  // IF NEITHER UP OR DOWN IS BETTER, TAKE SMALLER STEPS
  
  // COUNT IS JUST A BREAK CONTITION
  
  while (dp > 10**(-dec) && count < 75) {
    
    count++;
    
    if (net_demand_for_x > 0) {
      
      if (Math.abs(get_market_solution(humans, p+dp).net_demand_for_x) < Math.abs(net_demand_for_x)) {
        
        // IF (p+dp) LEADS TO AN IMPROVEMENT
        p = p + dp;
        market_solution = get_market_solution(humans, p);
        net_demand_for_x = market_solution.net_demand_for_x;
        // print_stats(count, p, dp, net_demand_for_x, dec);
        continue;  // REITERATE THE LOOP
      }
    }
    
    if (net_demand_for_x < 0) {

      if (Math.abs(get_market_solution(humans, p-dp).net_demand_for_x) < Math.abs(net_demand_for_x)) { 
        
        // IF (p-dp) LEADS TO AN IMPROVEMENT
        p = p - dp;
        market_solution = get_market_solution(humans, p);
        net_demand_for_x = market_solution.net_demand_for_x;
        // print_stats(count, p, dp, net_demand_for_x, dec);
        continue;  // REITERATE THE LOOP
      }
    }
    
    // print_stats(count, p, dp, net_demand_for_x, dec);
    dp = dp/10;
  }
  
  return {
    'dec':dec,
    'count':count,
    'p':p,
    'dp':dp,
    'market_solution':market_solution
  };

};

function get_market_solution(humans, p) {
  
  let D = [];
  D[0] = (p*humans[0].ex + humans[0].ey) / (p + (humans[0].beta/humans[0].alpha * p)**(1/(1-humans[0].delta)));
  D[1] = (p*humans[1].ex + humans[1].ey) / (p + (humans[1].beta/humans[1].alpha * p)**(1/(1-humans[1].delta)));
  let total_demand_for_x = D[0] + D[1];
  
  let S = [];
  S[0] = humans[0].ex;
  S[1] = humans[1].ex;
  let total_supply_of_x = S[0] + S[1];
  
  let net_demand_for_x = total_demand_for_x - total_supply_of_x;
  
  return {
   'D':D,
   'S':S,
   'net_demand_for_x':net_demand_for_x
  };
};

function print_stats(count, p, dp, net_demand_for_x, dec) {
  console.log('count : ' + count + ', p : ' + p.toFixed(dec) + ', dp : ' + dp.toFixed(dec) + ', net_demand_for_x : ' + net_demand_for_x.toFixed(dec));
};
