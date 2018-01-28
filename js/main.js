let game = new Phaser.Game(1050, 588, Phaser.AUTO, 'game', {
    preload: preload, create: create, update: update
});

const MAX_STAT = 100;
const MIN_STAT = 0;

let dad, beer, burger, chicken;
let hasItem = false;

function preload() {
    // Load in the game assests
    game.load.image('dad', 'assets/dad.png');
    game.load.image('beer', 'assets/beer.png');
    game.load.image('button', 'assets/button.png');
    game.load.image('background', 'assets/livingroom.png');
    game.load.image('speech', 'assets/speech.png');
    game.load.image('burger', 'assets/burger.png');
    game.load.image('chicken', 'assets/chicken.png');
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

    // Render the living room
    game.background = game.add.sprite(0, 0, 'background');

    // Add in game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Dad sprite and physics setup
    let start = getRandomLocation();
    dad = game.add.sprite(start.x, start.y, 'dad');
    game.physics.enable(dad, Phaser.Physics.ARCADE);
    dad.scale.setTo(0.6, 0.6);
    dad.anchor.setTo(0.5, 0.5);

    // Draw all items here and hide them to start
    chicken = game.add.sprite(105, -7, 'chicken');
    chicken.scale.setTo(0.5, 0.5);
    chicken.angle = 60;
    dad.addChild(chicken);
    chicken.visible = false;

    burger = game.add.sprite(55, 35, 'burger');
    burger.scale.setTo(0.2, 0.2);
    dad.addChild(burger);
    burger.visible = false;

    beer = game.add.sprite(75, 35, 'beer');
    beer.scale.setTo(0.4, 0.4);
    beer.angle = 30;
    dad.addChild(beer);
    beer.visible = false;

    // Have the dad move around the room
    game.time.events.repeat(Phaser.Timer.SECOND * 7, Infinity, moveDad, this);

    //Have the dad make jokes every so often
    game.time.events.repeat(Phaser.Timer.SECOND * 30, Infinity, makeJoke, this);

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

    setTimeout(function () {
        speech.kill();
        text.destroy();
    }, 10000);
}

function hide() {
    beer.visible = false;
}

function itemRecieved(item) {
    if (hasItem) {
        killAllItems();
    }
    hasItem = true;
    switch (item) {
        case 'BEER':
            beer.visible = true;
            break;
        case 'BURGER':
            burger.visible = true;
            break;
        case 'CHICKEN':
            chicken.visible = true;
            break;
        default:
            break;
    }

    setTimeout(function () {
        killAllItems();
    }, 7000);
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

function makeJoke() {
    fetch("https://icanhazdadjoke.com/", {
        headers: {
            'Accept': 'text/plain'
        }

    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        speak(text);
    });
}

function killAllItems() {
    beer.visible = false;
    burger.visible = false;
    chicken.visible = false;
}
