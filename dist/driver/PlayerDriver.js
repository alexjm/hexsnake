"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Driver_1 = require("./Driver");
const Snake_1 = require("../core/./Snake");
class PlayerDriver extends Driver_1.default {
    constructor(snake) {
        super(snake);
        // Register key event listener.
        if (typeof document !== 'undefined') {
            document.addEventListener('keydown', (e) => {
                switch (e.keyCode) {
                    case 37: // left arrow
                    case 65:
                        this.turn(Snake_1.Turn.LEFT);
                        break;
                    case 39: // right arrow
                    case 68:
                        this.turn(Snake_1.Turn.RIGHT);
                        break;
                }
            });
        }
        if (typeof process !== 'undefined') {
            let tty = require('tty');
            let stdin = process.stdin;
            // TODO... accept input via console. 
        }
    }
    turn(turn) {
        this.snake.turn(turn);
        console.log('Turned ' + Snake_1.Turn[turn]);
    }
    think(world) {
        // Do nothing.
    }
}
exports.default = PlayerDriver;
//# sourceMappingURL=PlayerDriver.js.map