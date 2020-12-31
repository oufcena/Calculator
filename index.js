/* Functional Programming Paradigm (No global variables at all) */
/* JS generates DRY HTML code */
function buttons() {
  let arr = ['/', '-', 'X', '+', 7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.', 'C', '='];
  let music = [
    'https://vgmdownloads.com/soundtracks/claw-gamerip-sounds/dxhdnzfw/COIN.mp3', 
    'https://vgmdownloads.com/soundtracks/claw-gamerip-sounds/dxrxoogg/MILK.mp3', 
    'https://vgmdownloads.com/soundtracks/claw-gamerip-sounds/bgyftjmw/FLAGWAVE.mp3',
    'https://vgmdownloads.com/soundtracks/claw-gamerip-sounds/pzaxyfip/WARP.mp3'
  ];
  let root = document.getElementById('root');
  root.innerHTML += arr.map((v, i, a) => v == '=' ? 
  `<button class='button equal' onclick='calculate(this); playMe(this)'>${v}</button>` : v == 'C' ? 
  `<button class='button clear' onclick='calculate(this); playMe(this)'>${v}</button>` : '/-X+'.includes(v) ?
  `<button class='button operator' onclick='calculate(this); playMe(this)'>${v}</button>` :
  `<button class='button' onclick='calculate(this); playMe(this)'>${v}</button>`).join(' ');
  root.innerHTML += music.map((v, i, a) => 
  `<audio id='audio${i}' preload="auto" controls style='display:none'>
     <source src="${v}">
   </audio>`).join(' ') + 
  `<audio id='audio' preload="auto" controls loop style='display:none'>
     <source src="https://vgmdownloads.com/soundtracks/wolfenstein-3d-pc-1992/nycpflvc/02%20-%20Wondering%20About%20My%20Loved%20Ones.mp3">
   </audio>`;
} buttons();
/*===============================================*/
function calculate(input) {
  let button = input.textContent, monitor = document.getElementById('monitor'), result = monitor.textContent;

  /* if-else ladder logic */
  if(result == 'NaN' || result == 'Infinity' || button == 'C') {
    monitor.textContent = 0;
  } 
  else if(result == 0 && '0123456789'.includes(button) ) {
    monitor.textContent = Number(result + button);
  } 
  else if(result == 0 && '-'.includes(button) ) {
    monitor.textContent = button;
  } 
  else if(button == '=') {
    if('/X+-'.includes(result[result.length-1]) ) { 
      result = result.slice(0, result.length-1);
    }
    result = result.replace(/ /g, '')
                   .replace(/X/g, '*')
                   .replace(/[+|/|-]/g, function(found) { return ` ${found} `; })
    result = parseFloat( eval(result).toFixed(2).replace('-', '- ') );
    monitor.textContent = result;
  }
  /*===============================================*/
  else if( '/+'.includes(button) && 'X-'.includes(result[result.length-3]) ) {
    monitor.textContent = result.slice(0, result.length-3) + ` ${button}`;
  } 
  else if( '-'.includes(button) && 'X'.includes(result[result.length-3]) ) {
    monitor.textContent = result.slice(0, result.length-3) + `X ${button}`;
  } 
  else if( 'X-'.includes(button) && button == result[result.length-1] ) {
    if('X-'.includes(result[result.length-3]) ) {
      monitor.textContent = result.slice(0, result.length-3) + ` ${button}`;
    } else {
      monitor.textContent += ` ${button}`;
    }
  } 
  else if( '/X+-'.includes(button) && '/X+-'.includes(result[result.length-1]) ) {
    monitor.textContent = result.replace(result[result.length-1], button);
  } 
  else if( '/X+-'.includes(button) || '/X+-'.includes(result[result.length-1]) ) {
    monitor.textContent += ` ${button}`;
  }
  else {
    monitor.textContent += button;
  }  
  /*===============================================*/
  monitor.textContent = monitor.textContent
                               .replace(/[+|/|X|-]/g, function(found) { return `,${found},`; }) 
                               .split(',')
                               .map(v => v.split('').filter(v => v==='.').length > 1 ? 
                                    v =  v.replace('.', '') : v )
                               .join('');
  /* The best way to add HTML || CSS using JS */
  /* ID HTML element for the functionality it requires, instead of re-overwriting the entire DOM like React */
  monitor.innerHTML = monitor.textContent.replace(/[-|/|X|+]/g, function(found) { 
                                return `<span class='monitor'>${found}</span>`; });
}
/*===============================================*/
window.onload = function() {
  document.getElementById('audio').play();
}
function playMe(x) {
  if('.0123456789'.includes(x.textContent) ) {
    document.getElementById('audio0').play();
  } 
  else if('-+/X'.includes(x.textContent) ) {
    document.getElementById('audio1').play();
  } 
  else if(x.textContent == 'C') {
    document.getElementById('audio2').play();
  }  
  else {
    document.getElementById('audio3').play();
  }
}
document.body.onkeypress = function keyboard(event) {
  let key = event.key;
  if('*x'.includes(key)) { key = 'X'; }
  if(key == 'Enter') { key = '='; }
  if(key == 'c') { key = 'C'; }
  [...document.querySelectorAll('button')].map(
    v => v.textContent == key ? v.click() : v);
}