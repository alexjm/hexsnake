"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Snake_1 = require("../core/./Snake");
class Driver {
    constructor(snake) {
        this.snake = snake;
    }
    useSnake(snake) {
        this.snake = snake;
    }
    getSnake() {
        return this.snake;
    }
}
exports.default = Driver;
class DummyDriver extends Driver {
    constructor() {
        super(...arguments);
        this.nTicks = 0;
    }
    think(world) {
        //this.snake.turn(Turn.LEFT);
        this.snake.turn(Math.floor(this.nTicks / 6) % 2 === 0 ? Snake_1.Turn.LEFT : Snake_1.Turn.RIGHT);
        this.nTicks++;
    }
}
exports.DummyDriver = DummyDriver;
//# sourceMappingURL=Driver.js.map