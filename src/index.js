import Phaser from 'phaser';
import './index.css';

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

    this.cameras.main.startFollow(player);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-550);
    }
}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE
    },
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
