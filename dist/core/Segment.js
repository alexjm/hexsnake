"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Segment {
    constructor(snake, cube, direction) {
        this.cube = cube;
        this.direction = direction + Math.ceil(direction / -6) * 6;
        this.fed = false;
    }
    turn(turn) {
        this.direction += turn;
        this.direction += Math.ceil(this.direction / -6) * 6;
    }
    stepForward() {
        this.cube.step(this.direction);
    }
    setFed(fed) {
        this.fed = fed;
    }
    getSnake() {
        return this.snake;
    }
    getCube() {
        return this.cube;
    }
    getDirection() {
        return this.direction;
    }
    isFed() {
        return this.fed;
    }
}
exports.default = Segment;
//# sourceMappingURL=Segment.js.map