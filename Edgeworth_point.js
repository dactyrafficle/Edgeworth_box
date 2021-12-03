
/*

  let p = new Point();
  p.update(obj);

  obj = {
   'a':{
     'alpha':0.7,
     'beta':0.3,
     'x':60,
     'y':40
   },
   'b':{
     'alpha':0.8,
     'beta':0.2,
     'x':40,
     'y':60
   }
  };
*/

function Point(id) {
  this.id = (id === null) ? (Math.randon()) : (id) 
};

Point.prototype.update = function(obj) {
  this.params = {
    'a':{
      'alpha':(obj.a.alpha),
      'beta':(obj.a.beta),
      'x':(obj.a.x),
      'y':(obj.a.y)
    },
    'b':{
      'alpha':(obj.b.alpha),
      'beta':(obj.b.beta),
      'x':(obj.b.x),
      'y':(obj.b.y)
    } 
  },
  this.actual = {
    'a':{
      'allocation':{
        'x':0,
        'y':0
      },
      'utility':0,
      'budget':0,
      'mu':{
        'x':0,
        'y':0
      },
      'mu_per_dollar':{
        'x':0,
        'y':0
      },
      'mrs':{
        'xy':0,
        'yx':0
      }
    },
    'b':{
      'allocation':{
        'x':0,
        'y':0
      },
      'utility':0,
      'budget':0,
      'mu':{
        'x':0,
        'y':0
      },
      'mu_per_dollar':{
        'x':0,
        'y':0
      },
      'mrs':{
        'xy':0,
        'yx':0
      }
    } 
  },
  this.optimal = {
    'a':{
      'allocation':{
        'x':0,
        'y':0
      },
      'utility':0,
      'budget':0,
      'mu':{
        'x':0,
        'y':0
      },
      'mu_per_dollar':{
        'x':0,
        'y':0
      },
      'mrs':{
        'xy':0,
        'yx':0
      }
    },
    'b':{
      'allocation':{
        'x':0,
        'y':0
      },
      'utility':0,
      'budget':0,
      'mu':{
        'x':0,
        'y':0
      },
      'mu_per_dollar':{
        'x':0,
        'y':0
      },
      'mrs':{
        'xy':0,
        'yx':0
      }
    } 
  },
  this.system = {
    'price':{
      'x':0,
      'y':0
    }
  }
  
  // PRICES [USING ARGUMENTS]
  this.system.price.x = (obj.a.alpha * obj.a.y + obj.b.alpha * obj.b.y) / (obj.b.beta * obj.b.x + obj.a.beta * obj.a.x)
  this.system.price.y = 1;
  
  // CURRENT ALLOCATIONS [USING ARGUMENTS]
  this.actual.a.allocation.x = (obj.a.x);
  this.actual.a.allocation.y = (obj.a.y);
  this.actual.b.allocation.x = (obj.b.x);
  this.actual.b.allocation.y = (obj.b.y);
  
  // CURRENT BUDGETS [NO MORE ARGUMENTS]
  this.actual.a.budget = this.actual.a.allocation.x*this.system.price.x + this.actual.a.allocation.y;
  this.actual.b.budget = this.actual.b.allocation.x*this.system.price.x + this.actual.b.allocation.y;
  
  // CURRENT UTILITY
  this.actual.a.utility = obj.a.x**obj.a.alpha*obj.a.y**obj.a.beta;
  this.actual.b.utility = obj.b.x**obj.b.alpha*obj.b.y**obj.b.beta
 
  // CURRENT MARGINAL UTILITY
  this.actual.a.mu.x = obj.a.alpha*(obj.a.y)/(obj.a.x)**obj.a.beta;
  this.actual.a.mu.y = obj.a.beta*(obj.a.x)/(obj.a.y)**obj.a.alpha;
  this.actual.b.mu.x = obj.b.alpha*(obj.b.y)/(obj.b.x)**obj.b.beta;
  this.actual.b.mu.y = obj.b.beta*(obj.b.x)/(obj.b.y)**obj.b.alpha;


  // OPTIMAL ALLOCATION
  this.optimal.a.allocation.x = obj.a.alpha*this.actual.a.budget / this.system.price.x;
  this.optimal.a.allocation.y = obj.a.beta*this.actual.a.budget;
  this.optimal.b.allocation.x = obj.b.alpha*this.actual.b.budget / this.system.price.x;
  this.optimal.b.allocation.y = obj.b.beta*this.actual.b.budget;

  // OPTIMAL BUDGETS
  this.optimal.a.budget = this.optimal.a.allocation.x*this.system.price.x + this.optimal.a.allocation.y;
  this.optimal.b.budget = this.optimal.b.allocation.x*this.system.price.x + this.optimal.b.allocation.y;
  
  // OPTIMAL UTILITIES
  this.optimal.a.utility = this.optimal.a.allocation.x**obj.a.alpha*this.optimal.a.allocation.y**obj.a.beta;
  this.optimal.b.utility = this.optimal.b.allocation.x**obj.b.alpha*this.optimal.b.allocation.y**obj.b.beta;
  
  // MRS
  this.actual.a.mrs.xy = this.actual.a.mu.x / this.actual.a.mu.y;
  this.actual.a.mrs.yx = this.actual.a.mu.y / this.actual.a.mu.x;
  this.actual.b.mrs.xy = this.actual.b.mu.x / this.actual.b.mu.y;
  this.actual.b.mrs.yx = this.actual.b.mu.y / this.actual.b.mu.x;
  
  // MU AT PRICE
  this.actual.a.mu_per_dollar.x = this.actual.a.mu.x / this.system.price.x;
  this.actual.a.mu_per_dollar.y = this.actual.a.mu.y;
  this.actual.b.mu_per_dollar.x = this.actual.b.mu.x / this.system.price.x;
  this.actual.b.mu_per_dollar.y = this.actual.b.mu.y;

  // OPTIMAL MARGINAL UTILITY
  this.optimal.a.mu.x = obj.a.alpha*((this.optimal.a.allocation.y)/(this.optimal.a.allocation.x))**obj.a.beta;
  this.optimal.a.mu.y = obj.a.beta*((this.optimal.a.allocation.x)/(this.optimal.a.allocation.y))**obj.a.alpha;
  this.optimal.b.mu.x = obj.b.alpha*((this.optimal.b.allocation.y)/(this.optimal.b.allocation.x))**obj.b.beta;
  this.optimal.b.mu.y = obj.b.beta*((this.optimal.b.allocation.x)/(this.optimal.b.allocation.y))**obj.b.alpha;
  
  // OPTIMAL MRS
  this.optimal.a.mrs.xy = this.optimal.a.mu.x/this.optimal.a.mu.y;
  this.optimal.a.mrs.yx = this.optimal.a.mu.y/this.optimal.a.mu.x;
  this.optimal.b.mrs.xy = this.optimal.b.mu.x/this.optimal.b.mu.y;
  this.optimal.b.mrs.yx = this.optimal.b.mu.y/this.optimal.b.mu.x;

  // OPTIMAL MU OVER PRICE
  this.optimal.a.mu_per_dollar.x = this.optimal.a.mu.x / this.system.price.x;
  this.optimal.a.mu_per_dollar.y = this.optimal.a.mu.y;
  this.optimal.b.mu_per_dollar.x = this.optimal.b.mu.x / this.system.price.x;
  this.optimal.b.mu_per_dollar.y = this.optimal.b.mu.y;
}