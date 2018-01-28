let game = new Phaser.Game(1050, 588, Phaser.AUTO, 'game', {
    preload: preload, create: create, update: update
});


const MAX_STAT = 100;
const MIN_STAT = 0;

const DEPLETION_RATE = 1;

let dad;
let beer;

let button;

function preload() {
    // Load in the game assests
    game.load.image('dad', 'assets/dad.png');
    game.load.image('beer', 'assets/beer.jpg');
    game.load.image('button', 'assets/button.png');
    game.load.image('background', 'assets/livingroom.png');
    game.load.image('speech', 'assets/speech.png');
}

function create() {
    // Initialize all the dad's stats to full 100%
    if (!Cookies.get("gameStarted")) {
        Cookies.set("gameStarted", true);
        Cookies.set("dad", {
            health: MAX_STAT,
            hunger: MAX_STAT,
            thirst: MAX_STAT,
            happiness: MAX_STAT
        });
    }

    isDadChugginOut = false;

    game.background = game.add.sprite(0, 0, 'background');

    // Add in game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Dad sprite and physics setup
    let start = getRandomLocation();
    dad = game.add.sprite(start.x, start.y, 'dad');
    game.physics.enable(dad, Phaser.Physics.ARCADE);
    dad.scale.setTo(0.6, 0.6);
    dad.anchor.setTo(0.5, 0.5);

    // Have the dad move around the room
    game.time.events.repeat(Phaser.Timer.SECOND * 7, Infinity, moveDad, this);

}

function update() {

}

function moveDad() {
    // Moves the dad around the floor in the room
    let target = getRandomLocation();

    // Flips the dad sprite to face the correct direction
    if (target.x < dad.x) {
        dad.scale.x = -0.6;
    } else if (target.x > dad.x) {
        dad.scale.x = 0.6;
    }

    game.physics.arcade.moveToXY(dad, target.x, target.y, 100, 4000);

    setTimeout(function () {
        dad.body.velocity.setTo(0, 0);
    }, 4000);
}

function speak(phrase) {
    speech = game.add.sprite(75, -215, 'speech');
    speech.scale.setTo(0.6, 0.6);
    dad.addChild(speech);
    let text = game.add.text(60, 30, phrase, { font: "40px Arial", fill: "black" });
    speech.addChild(text);
}

function drinkBeer() {
    beer = game.add.sprite(75, 35, 'beer');
    beer.scale.setTo(0.4, 0.4);
    beer.angle = 30;
    dad.addChild(beer);
    setTimeout(function () {
        beer.kill();
    }, 7000);
}

function itemRecieved(item) {
    switch (item) {
        case 'BEER':
            drinkBeer();
        default:
            break;
    }
}

function getRandomLocation() {
    const MIN_X = 5;
    const MIN_Y = 570;

    const MAX_X = 950;
    const MAX_Y = 700;

    Math.floor(Math.random() * 10 + 1);

    let xCoor = getRandomInteger(MIN_X, MAX_X);
    let yCoor = getRandomInteger(MIN_Y, MAX_Y) - 220;

    return {
        x: xCoor,
        y: yCoor
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStat(statType, value) {
    let stats = Cookies.getJSON("dad");
    console.log(stats);
    switch (statType) {
        case 'HEALTH':
            stats.health += value;
            break;
        case 'HUNGER':
            stats.hunger += value;
            break;
        case 'THIRST':
            stats.thirst += value;
            break;
        case 'HAPPINESS':
            stats.happiness += value;
            break;
    }

    stats = validateStats(stats);
    Cookies.set("dad", stats);
}

function getStat(statType) {
    switch (statType) {
        case 'HEALTH':
            return Cookies.getJSON("dad").health;
        case 'HUNGER':
            return Cookies.getJSON("dad").hunger;
        case 'THIRST':
            return Cookies.getJSON("dad").thirst;
        case 'HAPPINESS':
            return Cookies.getJSON("dad").happiness;
    }
}

function validateStats(stats) {
    let correctedStats = stats;

    for (let stat in stats) {
        if (stats[stat] < MIN_STAT) {
            correctedStats[stat] = MIN_STAT;
        } else if (stats[stat] > MAX_STAT) {
            correctedStats[stat] = MAX_STAT;
        }
    }

    return correctedStats;
}

