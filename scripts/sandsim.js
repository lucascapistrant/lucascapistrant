
//dom

// color buttons
const colorBtns = document.getElementsByClassName('colorBtn');

Array.from(colorBtns).forEach(btn => {
    btn.style.background = `hsl(${btn.value}, 100%, 50%)`;
    btn.addEventListener("click", () => {
        clearInterval(hueChanger);
        hueValue = btn.value;
        hueUI.style.background = `hsl(${hueValue}, 100%, 50%)`;
        hueUI.innerHTML = hueValue;
    });
})

const rainbowBtn = document.getElementById('rainbow');

rainbowBtn.addEventListener('click', rainbow)

let hueChanger;
function rainbow() {
    hueChanger = setInterval(() => {
        hueValue += 1;
        hueUI.style.background = `hsl(${hueValue}, 100%, 50%)`;
        if(hueValue >= 360) hueValue = 1;
    }, 30);
}

const hueRange = document.getElementById('huePicker');
const hueUI = document.getElementById('hueColor');
hueRange.addEventListener("input", () => {
    clearInterval(hueChanger);
    hueValue = hueRange.value;
    hueUI.style.background = `hsl(${hueValue}, 100%, 50%)`;
    hueUI.innerHTML = hueValue;
})

const saveBtn = document.getElementById('saveHue');
const colorBtnGroup = document.getElementById('colorBtnGroup');

saveBtn.addEventListener('click', () => {
    const hueSave = document.createElement('button');
    hueSave.classList.add('colorBtn');
    hueSave.style.background = `hsl(${hueValue}, 100%, 50%)`;
    hueSave.value = hueValue;
    hueSave.addEventListener('click', () => {
        clearInterval(hueChanger);
        hueValue = hueSave.value;
        hueUI.style.background = `hsl(${hueValue}, 100%, 50%)`;
        hueUI.innerHTML = hueValue;
    })
    colorBtnGroup.appendChild(hueSave);
})

const penSize = document.getElementById('penSize');
const penSizeUI = document.getElementById('penSizeUI');

penSize.addEventListener("input", () => {
    strokeWidth = penSize.value;
    penSizeUI.innerHTML = strokeWidth;
})

// the sim

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
}
// The grid
let grid;
let cols, rows;

let hueValue = 1;


// sim rules
let w = 10;
let strokeWidth = 3;


function setup() {
  createCanvas(Math.floor(windowWidth / 10) * 10, Math.floor(windowHeight / 12) * 10);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
          grid[i][j] = 0;
      }
  }
}

function draw() {
  background(0);

  if(mouseIsPressed && (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)) {
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    let matrix = strokeWidth;
    let extent = floor(matrix/2);
    for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
            if(random(1) < 0.75 ) {
                let col = mouseCol + i;
                let row = mouseRow + j;
                if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
                    grid[col][row] = hueValue;
                }
            }
        }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        noStroke();
        if(grid[i][j] > 0) {
            fill(grid[i][j], 255, 255);
            let x = i * w;
            let y = j * w;
            square(x, y, w);
        }
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        if(state > 0) {
            let below = grid[i][j + 1];

            let dir = random([-1, 1]);

            let belowA, belowB;

            if(i + dir >= 0 && i + dir <= cols - 1) {
                belowA = grid[i + dir][j + 1];
            }
            if(i - dir >= 0 && i - dir <= cols - 1) {
                belowB = grid[i - dir][j + 1];
            }


            if(below === 0) {
                nextGrid[i][j + 1] = grid[i][j];
            } else if(belowA === 0) {
                nextGrid[i + dir][j+1] = grid[i][j];
            } else if(belowB === 0) {
                nextGrid[i - dir][j+1] = grid[i][j];
            } else {
                nextGrid[i][j] = grid[i][j];
            }
        }
      }
  }
  grid = nextGrid;
}

function clearCanvas() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

const clearBtn = document.getElementById('clearBoard');
clearBtn.addEventListener('click', clearCanvas);