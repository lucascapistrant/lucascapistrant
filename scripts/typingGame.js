const hardWords = ["awesome", "bicycle", "calendar", "dolphin", "elephant", "favorite", "giraffe", "happiness", "internet", "jubilant", "kangaroo", "landscape", "magnolia", "navigate", "opposite", "penguin", "quantum", "rhapsody", "serenade", "troubadour", "umbrella", "velocity", "whisper", "xylophone", "yellow", "zeppelin", "abstract", "butterfly", "caterpillar", "dandelion", "ephemeral", "fandango", "gazebo", "harmonica", "ignition", "jamboree", "kaleidoscope", "labyrinth", "mysterious", "nectarine", "oblivion", "paradigm", "quintessence", "radiant", "synthesis", "tangerine", "universe", "vagabond", "waterfall", "xylograph", "yearning", "zealous", "aberration", "bivouac", "cacophony", "dyslexia", "ephedrine", "facetious", "garrulous", "haphazard", "impromptu", "juxtapose", "kleptomaniac", "laudable", "mnemonic", "obfuscate", "penultimate", "quizzical", "rambunctious", "sycophant", "taciturn", "ubiquitous", "verisimilitude", "whimsical", "xenophobic", "yodeling", "zeitgeist", "asparagus", "boulevard", "cavalier", "daffodil", "eucalyptus", "fantastic", "gentleman", "hologram", "invisible", "juxtaposition", "kiwi", "luminous", "marvelous", "navigable", "orchestra", "plentiful", "quicksand", "resilient", "silhouette", "tantalize", "ultraviolet", "vibrant", "whirlwind", "xylography", "yesterday", "zigzag", "ambitious", "benevolent", "carnival", "delicate", "effervescent", "flamboyant", "gigantic", "harmonious", "indigo", "jubilation", "kaleidoscopic", "luscious", "mysterious", "nurturing", "oblong", "pandemonium", "quasar", "radiate", "serendipity", "turbulent", "unwavering", "vivacious", "whispering", "xenon", "yearbook", "zeppelin", "alabaster", "bewilder", "cacophony", "defenestrate", "ephemeral", "fandango", "gregarious", "higgledy-piggledy", "impetuous", "jamboree", "kangaroo", "liberate", "malicious", "nonchalant", "onomatopoeia", "plethora", "quizzical", "recalcitrant", "surreptitious", "trepidation", "ubiquitous", "verdant", "wanderlust", "xylograph", "yarn-dyed", "zealous", "abracadabra", "bivouac", "clandestine", "discombobulate", "ephedrine", "fugacious", "garrulous", "hallucinate", "ignominious", "juxtapose", "kaleidoscope"];
const mediumWords = ["apple", "blaze", "crisp", "daisy", "eagle", "flute", "grain", "happy", "ivory", "jolly", "knots", "lunar", "mango", "noble", "oasis", "piano", "quart", "rider", "sunny", "teeth", "unzip", "vivid", "woven", "xerox", "youth", "zebra", "amber", "blink", "chase", "drown", "elbow", "flame", "grape", "hello", "irons", "joker", "knife", "lemon", "melon", "naval", "olive", "pouch", "quiet", "rider", "sweep", "table", "uncle", "valor", "wrist", "xenon", "youth", "zebra", "aloof", "blitz", "clash", "drown", "evoke", "flint", "globe", "hover", "inbox", "jelly", "knees", "lucky", "major", "novel", "orbit", "plush", "quick", "radar", "sweep", "tiara", "ultra", "vault", "whale", "xenon", "yacht", "zebra", "acute", "bliss", "crave", "dwell", "elite", "frost", "grind", "heart", "input", "jumbo", "karma", "lunar", "azure", "bison", "cider", "drain", "elude", "flock", "gears", "hound", "input", "joust", "kitty", "latch", "moose", "nymph", "ocean", "plaid", "quack", "radix", "scent", "tramp", "upend", "vivid", "wedge", "xerox", "youth", "zebra", "awful", "blush", "climb", "drift", "evoke", "flute", "graze", "hitch", "icily", "jolt", "kicks", "latch", "mirth", "nudge", "orbit", "pluck", "quart", "rider", "spicy", "tramp", "unzip", "vault", "whale", "xenon", "yacht", "zebra", "amber", "blink", "chase", "drown", "elbow", "flame", "grape", "hello", "irons", "joker", "knife", "lemon", "melon", "naval", "olive", "pouch", "quiet", "rider", "sweep", "table", "uncle", "valor", "wrist", "xenon", "youth", "zebra", "aloof", "blitz", "clash", "drown", "evoke", "flint", "globe", "hover", "inbox", "jelly", "knees", "lucky", "major", "novel", "orbit", "plush", "quick", "radar"];
const easyWords = ["air", "bold", "charm", "dart", "echo", "flit", "grit", "hope", "iris", "jazz", "keen", "lime", "muse", "nest", "opal", "peak", "quad", "rose", "star", "twig", "urge", "vibe", "whiz", "axis", "beam", "chip", "dusk", "elf", "fern", "glow", "hush", "isle", "jolt", "knot", "loop", "mint", "nova", "opal", "palm", "quiz", "rose", "salt", "tide", "urge", "vast", "wisp", "axle", "bark", "clay", "dusk", "elf", "fade", "gale", "hive", "iris", "jolt", "knee", "loop", "muse", "nova", "opal", "pave", "quiz", "rose", "silk", "tide", "urge", "vest", "wisp", "axis", "beam", "calm", "dusk", "else", "fade", "gale", "hush", "isle", "jazz", "keen", "lime", "muse", "nova", "opal", "pure", "quiz", "rose", "salt", "tide", "urge", "vest", "wisp", "apex", "bash", "curl", "deck", "edge", "fern", "gush", "harp", "isle", "jinx", "keen", "lily", "mote", "nook", "opal", "pace", "quip", "ruby", "star", "tide", "urge", "void", "whim", "axis", "balm", "coin", "dare", "elms", "fade", "gaze", "hush", "iron", "jest", "knee", "loop", "muse", "nova", "opal", "pave", "quiz", "rose", "silk", "tide", "urge", "vast", "wisp", "apex", "blip", "cone", "dart", "echo", "fern", "gale", "hive", "iris", "jest", "keen", "loop", "mint", "nova", "opal", "palm", "quip", "rose", "salt", "tide", "urge", "vest", "wisp", "zinc", "bark", "clay", "dusk", "else", "fade", "gaze", "hush", "iron", "jinx", "keen", "lily", "muse", "nova", "opal", "pure", "quip", "rose", "salt", "tide", "urge", "vest", "wisp", "zero"];
let health = 100;
let healthDecrease = .1;
let gameIsGoing = false;
let gameMode = 'medium';

let points = {
    easy: 0,
    medium: 0,
    hard: 0
}


// retrive old highscore data if there is some
const storedHighscore = localStorage.getItem('highscore');
let highscore = storedHighscore ? JSON.parse(storedHighscore) : {easy: 0, medium: 0, hard: 0}

let preivousWord;
function randomWord(mode) {
    if(mode === 'easy') return easyWords[Math.floor(Math.random() * (easyWords.length))];
    else if(mode === 'medium') return mediumWords[Math.floor(Math.random() * (mediumWords.length))];
    else if(mode === 'hard') return hardWords[Math.floor(Math.random() * (hardWords.length))];
}

const wordbox = document.getElementById('wordbox');
let letters;
function stringToSpan() {
    letters = randomWord(gameMode).split('');
    letters.forEach(l => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.innerHTML = l;
        wordbox.appendChild(span);
    })
    return letters;
}

function letterUpdate(l, isCorrect) {
    const firstChild = wordbox.children[l];
    const nextChild = wordbox.children[l+1];
    if(isCorrect === true) {
        firstChild.classList.add('letter-completed');
        firstChild.classList.remove('letter-incorrect');
    }else {
        nextChild.classList.add('letter-incorrect');
        nextChild.classList.add('shake');
        setTimeout(() => {
            nextChild.classList.remove('shake');
          }, 200);
    }

}

let lettersCompeted = -1;
document.addEventListener('keydown', e => {
    if(gameIsGoing) {
        let nextLetter = letters[0];
        if(e.key === nextLetter) {
            lettersCompeted++
            letterUpdate(lettersCompeted, true);
            letters.shift();
            nextLetter = letters[0];
        } else if(e.key !== nextLetter) {
            letterUpdate(lettersCompeted, false);
        }
        if(letters.length <= 0) wordComplete();
    }
})

const pointUI = document.getElementById('points');
const highscoreUI = document.getElementById('highscore');
highscoreUI.innerHTML = highscore[gameMode];
function wordComplete() {
    health += 10;
    changePoints(10);
    pointUI.innerHTML = points[gameMode];
    if(health > 100) health = 100;
    lettersCompeted = -1;
    wordbox.innerHTML = '';
    stringToSpan();
    pointPopup();
}

function changePoints(add) {
    points[gameMode] += add;
    if(points[gameMode] > highscore[gameMode]) {
        highscore[gameMode] = points[gameMode];
        highscoreUI.innerHTML = highscore[gameMode];
    }
}

const popup = document.getElementById('pointPopup');
function pointPopup() {
    popup.style.display = 'flex';
    popup.style.animation = 'popup 1s';
    popup.innerHTML = `+10`
    setTimeout(() => {
        popup.style.display = 'none';
    }, 900);
}

// timer

const timeBar = document.getElementById('timeRemaining');

function healthUpdate() {
    if(health <= 0) endGame();
    health -= healthDecrease;
    timeBar.style.width = `${health}%`
}

// dropdown menu

const options = document.querySelectorAll('.gameModeBtn');
const startBtn = document.getElementById('start');
const endPopup = document.getElementById('endGame');

options.forEach(option => {
    option.addEventListener('click', () => {
        health = 100;
        gameMode = option.value;
        wordbox.innerHTML = '';
        stringToSpan();
        highscoreUI.innerHTML = highscore[gameMode];
        pointUI.innerHTML = 0;
        endPopup.style.display = 'none';
        if(gameIsGoing) startGame();
        options.forEach((option) => {option.style.backgroundColor = '#fff'; option.style.color = '#000'});
        option.style.backgroundColor = 'red';
        option.style.color = '#fff';
    })
})

// ui

let healthInterval;

startBtn.addEventListener('click', () => {startGame();})

function startGame() {
    if(!gameIsGoing) {
        points['easy'] = 0; points['medium'] = 0; points['hard'] = 0;
        highscoreUI.innerHTML = highscore[gameMode];
        pointUI.innerHTML = 0;
        endPopup.style.display = 'none';
        wordbox.innerHTML = '';
        gameIsGoing = true;
        stringToSpan();
        healthInterval = setInterval(healthUpdate, 10);
        health = 100;
    } else {
        endGame();
        startGame();
    }
}

function endGame() {
    endPopup.style.display = 'block';
    gameIsGoing = false;
    clearInterval(healthInterval);
    lettersCompeted = -1;
    letters = undefined;
}

// save highscores

window.addEventListener('beforeunload', saveHighscore);

function saveHighscore() {
    const highscoreToString = JSON.stringify(highscore);
    localStorage.setItem('highscore', highscoreToString);
}