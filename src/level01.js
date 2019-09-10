const LEVEL_01_GROUNDS = [
    [[0, 155], [15, 155]],
    [[17, 158], [17, 158]],
    [[16, 157], [16, 157]],
    [[5, 154], [10, 155]],
    [[6, 153], [9, 154]],
    [[0, 0], [0, 160]],
    [[0, 0], [160, 0]],
    [[0, 160], [160, 160]],
    [[160, 0], [160, 160]]
];

const GROUND_PIXEL_SIZE = 100;

class Level01 extends Phaser.Scene {
    constructor() {
        super('Leval01');
    }

    preload() {
        this.load.spritesheet('bibo', 'assets/bibo.png', {
            frameWidth: 128,
            frameHeight: 224
        });
        this.load.spritesheet('grounds', 'assets/grounds.png', {
            frameWidth: GROUND_PIXEL_SIZE,
            frameHeight: GROUND_PIXEL_SIZE
        });
    }

    create() {
        this.platforms = this.physics.add.staticGroup();

        for (ground of LEVEL_01_GROUNDS) {
            const [start, finish] = ground;
            const [startx, starty] = start;
            const [finishx, finishy] = finish;

            for (let x = startx; x <= finishx; x++) {
                for (let y = starty; y <= finishy; y++) {
                    console.log(`ground on ${x} , ${y}`);
                    this.platforms.create(x * GROUND_PIXEL_SIZE, y * GROUND_PIXEL_SIZE, 'grounds');
                }
            }
        }

        this.player = this.physics.add.sprite(200, 15000, 'bibo');

        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);

        this.cameras.main.startFollow(
            this.player,
            true,
            0.1,
            0.05,
            -(this.game.scale.width / 4),
            this.game.scale.height / 7
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('bibo'),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('bibo', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-250);
            this.player.flipX = true;
            if (this.player.body.touching.down) this.player.anims.play('walk', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(250);
            this.player.flipX = false;
            if (this.player.body.touching.down) this.player.anims.play('walk', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('stop');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-650);
            this.player.anims.play('stop');
        }
    }
}

module.exports = Level01;
