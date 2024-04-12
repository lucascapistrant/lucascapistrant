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
  
  playNote(200+barArray[i]*10);
  playNote(200+barArray[j]*10);
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

function selectionSort(barArray){
  const moves = [];
  const len = barArray.length;

  for(let i = 0; i < len - 1; i++){
    let minIndex = i;

    for(let j = i + 1; j < len; j++){
      if(barArray[j] < barArray[minIndex]){
        minIndex = j;
      }
    }

    if(minIndex !== i){
      moves.push({indices: [i, minIndex], type: "swap"});
      [barArray[i], barArray[minIndex]] = [barArray[minIndex], barArray[i]];
    }
  }

  return moves;
}

function insertionSort(barArray) {
  const moves = [];
  const len = barArray.length;

  for (let i = 1; i < len; i++) {
    let current = barArray[i];
    let j = i - 1;

    while (j >= 0 && barArray[j] > current) {
      moves.push({ indices: [j, j + 1], type: "swap" });
      barArray[j + 1] = barArray[j];
      j--;
    }

    barArray[j + 1] = current;
  }

  return moves;
}

function heapify(barArray, n, i, moves) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && barArray[left] > barArray[largest]) {
    largest = left;
  }

  if (right < n && barArray[right] > barArray[largest]) {
    largest = right;
  }

  if (largest !== i) {
    moves.push({ indices: [i, largest], type: "swap" });
    [barArray[i], barArray[largest]] = [barArray[largest], barArray[i]];

    heapify(barArray, n, largest, moves);
  }
}

function heapSort(barArray) {
  const moves = [];

  // Build max heap
  const n = barArray.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(barArray, n, i, moves);
  }

  // Heap sort
  for (let i = n - 1; i > 0; i--) {
    moves.push({ indices: [0, i], type: "swap" });
    [barArray[0], barArray[i]] = [barArray[i], barArray[0]];
    heapify(barArray, i, 0, moves);
  }

  return moves;
}

function shellSort(barArray) {
  const moves = [];

  // Determine initial gap 
  let gap = Math.floor(barArray.length / 2);

  while (gap > 0) {

    // Do insertion sort for each gap
    for (let i = gap; i < barArray.length; i++) {
      let j = i;
      let temp = barArray[i];

      while (j >= gap && barArray[j - gap] > temp) {
        moves.push({
          indices: [j, j - gap],
          type: "swap"
        });
        
        barArray[j] = barArray[j - gap];
        j -= gap;
      }

      barArray[j] = temp;
    }

    // Reduce the gap
    gap = Math.floor(gap / 2); 
  }

  return moves;
}

function combSort(barArray) {
  const moves = [];
  
  let gap = barArray.length;
  let shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if(gap <= 1) {
      gap = 1;
      sorted = true; 
    }
    if (sorted) {
      // Additional check
      sorted = isSorted(barArray); 
    }
    
    function isSorted(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i+1]) return false;
      }
      return true;
    }

    for (let i = 0; i + gap < barArray.length; i++) {
      if (barArray[i] > barArray[i + gap]) {
        [barArray[i], barArray[i+gap]] = [barArray[i+gap], barArray[i]]; 
        moves.push({indices: [i, i+gap], type:"swap"});
      }
    }
  }

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

const options = document.querySelectorAll('.dropdown-option');

options.forEach((option) => {
  option.addEventListener("click", () => {
    if(option.value == 'bubble'){
      selectedFunction = bubbleSort;
      options.forEach((option) => {option.style.backgroundColor = '#fff'});
      option.style.backgroundColor = 'red';
    }else if(option.value == 'quick') {
      selectedFunction = quickSort;
      options.forEach((option) => {option.style.backgroundColor = '#fff'});
      option.style.backgroundColor = 'red';
    }else if(option.value == 'selection') {
      selectedFunction = selectionSort;
      options.forEach((option) => {option.style.backgroundColor = '#fff'});
      option.style.backgroundColor = 'red';
    }else if(option.value == 'insertion') {
      selectedFunction = insertionSort;
      options.forEach((option) => {option.style.backgroundColor = '#fff'});
      option.style.backgroundColor = 'red';
    }else if(option.value == 'heap') {
      selectedFunction = heapSort;
      options.forEach((option) => {option.style.backgroundColor = '#fff'});
      option.style.backgroundColor = 'red';
    }else if(option.value == 'shell') {
      selectedFunction = shellSort;
      options.forEach((option) => {option.style.backgroundColor = '#fff'});
      option.style.backgroundColor = 'red';
    }else if(option.value == 'comb') {
      selectedFunction = combSort;
      options.forEach((option) => {option.style.backgroundColor = '#fff'});
      option.style.backgroundColor = 'red';
    } else {
      console.error(`Option not found: "${option.value}"`);
    }
  })
})