import Phaser from 'phaser';

function preload() {
    this.load.image('bibo', 'assets/bibo.png');
    this.load.image('ground', 'assets/platform.png');
}

let platforms;
let player;
let cursors;

function create() {
    platforms = this.physics.add.staticGroup();

    platforms
        .create(400, 568, 'ground')
        .setScale(2)
        .refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'bibo');

    player.setBounce(0);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    this.zoneMoveBack = this.add
        .zone(0, 0, 1280 / 4, 720)
        .setOrigin(0)
        .setName('zoneMoveBack')
        .setInteractive();
    this.zoneMoveFoward = this.add
        .zone(1280 / 4, 0, 1280 / 2, 720)
        .setOrigin(0)
        .setName('zoneMoveFoward')
        .setInteractive();
    this.zoneJump = this.add
        .zone(1280 / 2, 0, 1280, 720)
        .setOrigin(0)
        .setName('zoneJump')
        .setInteractive();

    this.input.on('gameobjectdown', (pointer, gameObject) => {
        try {
            this[gameObject.name].down = true;
        } catch {}
    });
    this.input.on('gameobjectup', (pointer, gameObject) => {
        try {
            this[gameObject.name].down = false;
        } catch { }
    });
    this.input.on('gameobjectout', (pointer, gameObject) => {
        try {
            this[gameObject.name].down = false;
        } catch { }
    });
    this.input.on('gameobjectover', (pointer, gameObject) => {
        try {
            if (pointer.downTime) {
                this[gameObject.name].down = true;
            }
        } catch { }
    });
    
}

function update() {
    if (cursors.left.isDown || this.zoneMoveBack.down) {
        player.setVelocityX(-160);
        console.log('left');
    } else if (cursors.right.isDown || this.zoneMoveFoward.down) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if ((cursors.up.isDown || this.zoneJump.down) && player.body.touching.down) {
        player.setVelocityY(-550);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
