import Phaser from 'phaser';
import './index.css';

import Level01 from './level01';

new Phaser.Game({
    type: Phaser.AUTO,
    width: 11520,
    height: 6480,
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    scene: [ Level01 ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false,
            x: 0,
            y: 0,
            width: 16000,
            height: 16000
        }
    }
});
