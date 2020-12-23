/* DRY HTML code thanks to JS */
/* Vanilla JS (Framework) "Best Practices" > Virtual DOM React (Facebook Library) */
/* #DeathToReact ;-} */
/* This trick allows you to embed, fuse & write HTML inside script tags */
const JSX = document.body;
/* Functions take Functions as arguments (Lambda) Higher order functions */
const render = (monitor=calculated()) => JSX.innerHTML += `
<main>
  <header> Calculator </header>
  <!-- This trick allows you to embed, fuse & write JS inside HTML elements since we're already inside script tags --> 
  <section> ${ monitor } </section>
  ${ buttons() }
</main>
`; render(); 
/* render() is an IIFE because it calls itself */
/* & since it has no arguments in the function call it uses the predefined default parameter */
/* which is yet another function call & this ladies & gentlemen is "Functional Programming" */
/* if(uLikeCode) { alert('Thanks hackers for hating innerHTML & eval() function'); } */
/*===============================================*/
/* Functional Programming Paradigm (No global variables at all) */
function buttons() {
  /* Default values for arguments */
  arguments = ['/', '-', 'X', '+', 7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.', 'C', '='];
  /* This trick allows you to generate "DRY HTML code" */
  /* Also allows the Server to render dynamic HTML elements componants with pre-customized CSS style */
  return arguments.map((v, i, a) => v == '=' ? 
  `<button class='button equal' onclick='calculated(this)'>${v}</button>` : v == 'C' ? 
  `<button class='button clear' onclick='calculated(this)'>${v}</button>` : 
  v == '/' || v == '-' || v == 'X' || v == '+' ?
  `<button class='button operator' onclick='calculated(this)'>${v}</button>` :
  `<button class='button' onclick='calculated(this)'>${v}</button>`).join(' ');
}
/*===============================================*/
/* Default values for parameters */
/* 1st call & yes, functions can be called before being even defined. Thanks to the horrible Hoisting! */
function calculated() {
  return 0;
}
/* other calls for the same function calculated() but it's the new reformed one */
var calculated = ( () => {
  /* local variable which is also considered global for child nested function. All Thanks to closures */
  let values = [];
  return (input) => {
    /*===============================================*/
    /* Store in a local variable instead of repeatedly accessing it. All to improve performance */
    /* "Best Practices" to keep all variables at the top of your subprogram "function" */
    /* Use "this" whenever you add events for HTML tags */
    /* This way, you'll never need to access the DOM. I mean it really!! */
    let button = input.textContent;
    /*===============================================*/
    /* The "operator invalid redudancy Bug" found & eliminated */
    if((button === '/' || button === '-' || button === 'X' || button === '+' || button === '=' ) && 
        (values[values.length-1] === '/' || values[values.length-1] === '-'  || 
         values[values.length-1] === 'X' || values[values.length-1] === '+' ) ) {
      /* The or || logical operator is surrounded by parentheses to have an order in logic */ 
      /* Remove redundancy to stay consistent */
      values.pop(); 
      values.push(button); 
    } else {  
      /* Add new values */
      values.push(button); 
    }  
    /*===============================================*/
    /* Error Handling RESET "invalid startup operations Bug" found & eliminated */
    if(button=='C' || values[0] == 'Infinity'  || values.includes(NaN) || 
          values[0] == '/' || values[0] == '-' || values[0] == 'X' || values[0] == '+' || 
          values[0] == '=' || values[1] == '=' ) { 
      if(button=='=') {
        /* LOL do nothing :D */
      } else {
        values = [];
      }
    } 
    /*===============================================*/
    /* The f* "dot invalid redudancy Bug" found & eliminated */
    if( values.includes('.') ) { 
      values = values.join('').replace(/[+|/|X|-]/ig, 
      function(found) { return ` ${found} `; }) 
      .split(' ')
      .map((v, i, a) => 
      v.split('').filter(v => v==='.').length > 1 ? 
      v = v.replace('.', '') : v );
    }
    /*===============================================*/
    /* Calculate old values when the user press "=" */
    if(values.includes('=')) { 
      if(values[values.length-1] == '/' || values[values.length-1] == '-' || values[values.length-1] == '=' ||
         values[values.length-1] == 'X' || values[values.length-1] == '+') { 
         values.pop(); 
      }
      values = [ parseFloat( eval( values.join('').replace(/=/ig, '').replace(/X/ig, '*') ).toFixed(2) ) ];
      /* The "zero Bug" of result found & eliminated */
      if(values == 0) { values = []; }
    } 
    
    /* alert(values); set printable breakpoints for maintenance & testing purposes */    
    /*===============================================*/
    /* display result */ 
    if(values == 0) {
      render(0);
    } else {
      render(values.join()
                   .replace(/[+|/|X|-]/ig, function(found) { 
                    return ` <span class='monitor'>${found}</span> `; })
                   .split(',')
                   .join(''));
      /* Functions return Functions (Lambda) Higher order Functions */
    }
  }
})();