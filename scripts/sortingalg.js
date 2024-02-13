let nOfBars = 100;
let barArray = [];
let speed = 3;
let divider = nOfBars/100;
let audioCtx = null;
let isSorting = false;
init();

const barInput = document.getElementById('bars');
barInput.addEventListener('input', changeBars);


function changeBars(){
  if(!isSorting) {
    value = barInput.value;
    nOfBars = value;
    divider = nOfBars/100;
    barArray = [];
    init();
  }
}

const speedInput = document.getElementById('speed');
speedInput.addEventListener('input', changeSpeed);

function changeSpeed(){
  if(!isSorting) {
    speed = speedInput.value;
    init();
  }
}

function playNote(freq){
  if(audioCtx==null){
    audioCtx=new(
      AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext
    )();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime+dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(
    0, audioCtx.currentTime+dur
  );
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function getRandomNumber() {
  if (!getRandomNumber.numbers) {
    // Initialize array with numbers 1 to 100
    getRandomNumber.numbers = Array.from({ length: nOfBars }, (_, index) => index + 1);
  }

  // If all numbers have been used, reset the array
  if (getRandomNumber.numbers.length === 0) {
    getRandomNumber.numbers = Array.from({ length: nOfBars }, (_, index) => index + 1);
  }

  // Get a random index from the available numbers array
  const randomIndex = Math.floor(Math.random() * getRandomNumber.numbers.length);

  // Remove and return the number at the random index
  return getRandomNumber.numbers.splice(randomIndex, 1)[0];
}

const playBtn = document.getElementById('playBtn');
const initBtn = document.getElementById('initBtn');
playBtn.addEventListener('click', play);
initBtn.addEventListener('click', init);

function init(){
  if(!isSorting) {
    for(let i = 0; i < nOfBars; i++){
      barArray[i] = getRandomNumber();
    }
    showBars();
  }
}

let selectedFunction = bubbleSort;

function play(){
  if(!isSorting) {
    const copy = [...barArray];
    const moves = selectedFunction(copy);
    animate(moves);
  }
}

function animate(moves){
  if(moves.length==0){
    showBars();
    isSorting = false;
    return;
  }
  isSorting = true;

  const move = moves.shift();
  const [i, j] = move.indices;

  if(move.type== "swap"){
    [barArray[i],barArray[j]] = [barArray[j], barArray[i]];
  }
  
  playNote(200+barArray[i]*100);
  playNote(200+barArray[j]*100);
  showBars(move);
  setTimeout(function(){
    animate(moves);
  },speed);
}

// sorting algorithms

function bubbleSort(barArray){
  const moves = [];
  do{
    var swapped = false;
    for(let i = 1; i < barArray.length; i++){
      if(barArray[i-1]>barArray[i]){
        swapped = true;
        moves.push({indices:[i-1, i], type: "swap"});
        [barArray[i-1], barArray[i]]= [barArray[i], barArray[i-1]];
      }
    }
  } while(swapped)
  return moves;
}

function quickSort(barArray) {
  const moves = [];

  function partition(low, high) {
    const pivot = barArray[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (barArray[j] < pivot) {
        i++;
        moves.push({ indices: [i, j], type: "swap" });
        [barArray[i], barArray[j]] = [barArray[j], barArray[i]];
      }
    }

    moves.push({ indices: [i + 1, high], type: "swap" });
    [barArray[i + 1], barArray[high]] = [barArray[high], barArray[i + 1]];

    return i + 1;
  }

  function sort(low, high) {
    if (low < high) {
      const partitionIndex = partition(low, high);

      sort(low, partitionIndex - 1);
      sort(partitionIndex + 1, high);
    }
  }

  sort(0, barArray.length - 1);

  return moves;
}



function showBars(move){
  container.innerHTML='';
  for(let i = 0; i < barArray.length; i++){
    const bar = document.createElement('div');
    bar.style.height = barArray[i] * (3.7 / (nOfBars/100)) + "%";
    bar.style.width = 15/divider + "px";
    bar.classList.add("bar");
    container.appendChild(bar);

    if(move && move.indices.includes(i)){
      bar.style.backgroundColor = 
        move.type == "swap"? "red": "blue";
    }
    container.appendChild(bar);
  }
}

// dropdown menu logic

const options = document.querySelectorAll('.dropdown-menu');

// options.forEach
// selectedFunction