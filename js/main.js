let game = new Phaser.Game(1050, 588, Phaser.AUTO, null, {
    preload: preload, create: create, update: update
});


let health, hunger, thirst, happiness; // The dad's stats

const MAX_STAT = 100;
const MIN_STAT = 0;

const DEPLETION_RATE = 1;

let dad;
let beer;

let button;


function preload() {
    // Basic game canvas initialization
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.world.setBounds(0, 0, 800, 300);


    // game.stage.backgroundColor = '#eee';

    // Load in the game assests
    game.load.image('dad', 'assets/dad.png');
    game.load.image('beer', 'assets/beer.jpg');
    game.load.image('button', 'assets/button.png');
    game.load.image('background', 'assets/livingroom.png');


}

function create() {
    // Initialize all the dad's stats to full 100%
    health = MAX_STAT;
    hunger = MAX_STAT;
    thirst = MAX_STAT;
    happiness = MAX_STAT;

    game.background = game.add.sprite(0, 0, 'background');


    // Add in game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Dad sprite and physics setup
    dad = game.add.sprite(0, 0, 'dad');
    game.physics.enable(dad, Phaser.Physics.ARCADE);
    dad.scale.setTo(0.6, 0.6);
    // dad.enableBody = true;
    // dad.body.collideWorldBounds = true;

    // Button testing
    // button = game.add.button(100, 100, 'button', actionOnClick, this, 2, 1, 0);
    // button.scale.setTo(0.1, 0.1);
    getRandomLocation();


}

function update() {

}

function actionOnClick() {
    console.log('Hunger:', hunger);
    depleteHunger();
    console.log('Hunger:', hunger);
}

function eat(foodType) {
    const CHICKEN = 15;
    const BURGER = 25;
    const STEAK = 40;

    let updatedHunger = hunger;

    switch (foodType) {
        case 'CHICKEN':
            updatedHunger += CHICKEN;
        case 'BURGER':
            updatedHunger += BURGER;
        case 'STEAK':
            updatedHunger += STEAK;
        default:
            break;
    }

    if (updatedHunger > MAX_STAT) {
        hunger = MAX_STAT;
    } else {
        hunger = updatedHunger;
    }
}

function drink() {
    const BEER = 20;
    if (thirst += BEER > MAX_STAT) {
        thirst = MAX_STAT;
    } else {
        thirst += BEER
    }
}

function depleteHunger() {
    hunger -= DEPLETION_RATE;
}

function depleteThirst() {
    thirst -= DEPLETION_RATE;
}

function getRandomLocation() {
    const MIN_X = 5;
    const MIN_Y = 458;

    const MAX_X = 1025;
    const MAX_Y = 585;

    Math.floor(Math.random() * 10 + 1);

    let xCoor = getRandomInteger(MIN_X, MAX_X);
    let yCoor = getRandomInteger(MIN_Y, MAX_Y);

    console.log(MAX_X, MAX_Y);
    console.log(xCoor, yCoor);
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

