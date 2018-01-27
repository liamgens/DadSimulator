let game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
    preload: preload, create: create, update: update
});

let health, hunger, thirst, happiness; // The dad's stats

const MAX_STAT = 100;
const MIN_STAT = 0;

const DEPLETION_RATE = 0.005;

let dad;
let beer;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';

    // Load in the game assests
    game.load.image('dad', 'assets/dad.png');
    game.load.image('beer', 'assets/beer.jpg');
}

function create() {
    // Initialize all the dad's stats to full 100%
    health = MAX_STAT;
    hunger = MAX_STAT;
    thirst = MAX_STAT;
    happiness = MAX_STAT;

    // Add in game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Dad sprite and physics setup
    dad = game.add.sprite(0, 0, 'dad');
    game.physics.enable(dad, Phaser.Physics.ARCADE);
    dad.body.collideWorldBounds = true;
    dad.scale.setTo(0.2, 0.2);

    dad.body.velocity.set(25, 0);

}

function update() {

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