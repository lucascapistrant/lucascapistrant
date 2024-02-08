const land = document.getElementById('land');
const cells = document.querySelectorAll('.cell');
let typeSelected = 'forest';
let typeUrl = 'url(/images/cityBuilder-images/forest65.png)'
let population = 0;
let happieness = .5;
let resources = 0;
let trees = 0;

let money = 1000000;
let taxRate = .15;

const instructions = document.getElementById('instructions');
const instructionsX = document.getElementById('instructions__x');
const helpButton = document.getElementById('help');
let instructionsToggle = true;
instructionsX.addEventListener('click', instructionToggle);
helpButton.addEventListener('click', instructionToggle);

function instructionToggle() {
    if(instructionsToggle === true) {
        instructions.style.display = 'none'
        instructionsToggle = false;
    }
    else {
        instructions.style.display = 'block';
        instructionsToggle = true;
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if(typeSelected === 'city'){all(20000, cell, 'populator', 1000000, typeUrl, 1000000);}
        if(typeSelected === 'suburb'){all(500, cell, 'populator', 20000, typeUrl, 500000);}
        if(typeSelected === 'farmland'){all(100, cell, 'resourcer', 1000, typeUrl, 10000);}
        if(typeSelected === 'forest'){addForest(0, cell, typeUrl, 5000);}
    })
    cell.addEventListener('mouseover', () => {
        if(!cell.istaken) cell.style.backgroundImage = typeUrl;
    })
    cell.addEventListener('mouseleave', () => {
        if(!cell.istaken) cell.style.backgroundImage = 'url(/images/cityBuilder-images/grass65.png)';
    })
});

function all(people, cell, type, popMax, image, price) {
    if(money >= price) {
        if(String(people).length > 3 && window.innerWidth > 680) cell.style.fontSize = '2rem';
        setTimeout(() => {
            cell.istaken = true;
            console.log(cell.istaken)
            cell.style.backgroundImage = image;
        }, 1);
        money -= price;
        population += people;
        let x = 0;
        cell.innerHTML = people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const cellChange = setInterval(() => {
            x = Math.round(people/10 * happieness);
            if(people > popMax && type === 'populator') {resources -= Math.round(people /3)};
            people += x;
            population += x;
            if(people > popMax && type === 'populator') {cell.style.filter = 'brightness(.5)';} else cell.style.backgroundImage = image;
            resources -= people * 2;
            cell.innerHTML = people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if(resources < 0) resources = 0;
            if(window.innerWidth > 680) {
                if(String(people).length > 3) cell.style.fontSize = '2rem';
                else if(String(people).length <= 3) cell.style.fontSize = '3rem';
            }
    
            if(type === 'resourcer') {
                resources += people * 10;
                if(people > popMax) {
                    let diff = people - popMax;
                    people -= diff;
                    population -= diff;
                    cell.innerHTML = people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            }
        }, 2000);
        cell.addEventListener('click', clickevent);
        function clickevent() {
            clearInterval(cellChange);
            cell.istaken = false;
            console.log(cell.istaken)
            population -= people;
            cell.innerHTML = '';
            cell.style.backgroundImage = 'url(/images/cityBuilder-images/grass65.png)'
            cell.removeEventListener('click', clickevent);
        }
    }
}

function addForest(people, cell, image, price) {
    if(money >= price) {
        setTimeout(() => {
            cell.istaken = true;
        }, 1);
        console.log(cell.istaken)
        cell.style.backgroundImage = image;
        money -= price;
        resources += 1000;
        trees += 10000;
        cell.addEventListener('click', clickevent);
        function clickevent() {
            cell.istaken = false;
            console.log(cell.istaken)
            population -= people;
            trees -= 10000;
            resources -= 1000;
            cell.innerHTML = '';
            cell.removeEventListener('click', clickevent);
        }
    }
}

// selector
const citySelector = document.getElementById('city');
const subrubSelector = document.getElementById('suburb');
const farmSelector = document.getElementById('farmland');
const forestSelector = document.getElementById('forest');

citySelector.addEventListener('click', () => {typeSelected = 'city'; typeUrl = 'url(/images/cityBuilder-images/city65.png)'})
subrubSelector.addEventListener('click', () => {typeSelected = 'suburb'; typeUrl = 'url(/images/cityBuilder-images/suburb65.png)'})
farmSelector.addEventListener('click', () => {typeSelected = 'farmland'; typeUrl = 'url(/images/cityBuilder-images/farm65.png)'})
forestSelector.addEventListener('click', () => {typeSelected = 'forest'; typeUrl = 'url(/images/cityBuilder-images/forest65.png)'})

// updates
const popTab = document.getElementById('population');
const happyTab = document.getElementById('happieness');
const resourceTab = document.getElementById('resources');
const resourceId = document.getElementById('resourceId');

const moneyTab = document.getElementById('money');

function updateHappieness() {
    happyTab.innerHTML = happieness.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updatePopulation() {
    popTab.innerHTML = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updateResources() {
    resourceTab.innerHTML = resources.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updateMoney() {
    moneyTab.innerHTML = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const taxRateInput = document.getElementById('taxation');
const taxRateTab = document.getElementById('taxRate');
taxRateTab.innerHTML = taxRate;
taxRateInput.addEventListener('input', () => {
    taxRate = taxRateInput.value;
    taxRateTab.innerHTML = taxRate;
})

// updates by tick

land.addEventListener('click', tick());

function tick() {
    setInterval(() => {
        updateHappieness();
        updatePopulation();
        updateResources();
        updateMoney();
    }, 10);
    let previousHappieness = 0;
    setInterval(() => {
        if(population > 0) {
            if((resources * 2) < population) {
                happieness -= .05;
                resourceId.innerHTML = 'There are not enough resources to substain the population!'
                resourceTab.style.color = 'red';
                resourceId.style.color = 'red';
                happyTab.style.color = 'red';
            } else {
                happieness += .05;
                resourceId.innerHTML = 'Resources are sustainable.';
                resourceTab.style.color = 'black';
                resourceId.style.color = 'black';
                happyTab.style.color = 'black';
            }
            if((trees) < population) {
                happieness -= .05;
                resourceId.innerHTML = resourceId.innerHTML = 'There are not enough trees to substain the population!';
                resourceTab.style.color = 'red';
                resourceId.style.color = 'red';
                happyTab.style.color = 'red';
            }
            else {
                happieness += 0.05;
                happyTab.style.color = 'black';
            }
            money += (population * 10) * taxRate;
            happieness -= taxRate / 5;

            if(happieness < previousHappieness) {happyTab.style.color = 'red'}
            else happyTab.style.color = 'black';
            previousHappieness = happieness; 
        }
    }, 2000);
    land.removeEventListener('click', tick);
}