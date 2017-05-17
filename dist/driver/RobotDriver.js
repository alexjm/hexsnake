"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Driver_1 = require("./Driver");
const Navigator_1 = require("../navigator/Navigator");
class RobotDriver extends Driver_1.default {
    constructor(snake) {
        super(snake);
        this.navigator = new Navigator_1.default(this.snake);
    }
    think(world) {
        let nextTurn = this.navigator.getTurn(world);
        this.snake.turn(nextTurn);
    }
    getNavigator() {
        return this.navigator;
    }
}
exports.default = RobotDriver;
//# sourceMappingURL=RobotDriver.js.map