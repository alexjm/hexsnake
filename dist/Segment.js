"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Segment = (function () {
    function Segment(snake, cube, direction) {
        this.cube = cube;
        this.direction = direction + Math.ceil(direction / -6) * 6;
        this.fed = false;
    }
    Segment.prototype.turn = function (turn) {
        this.direction += turn;
        this.direction += Math.ceil(this.direction / -6) * 6;
    };
    Segment.prototype.stepForward = function () {
        this.cube.step(this.direction);
    };
    Segment.prototype.setFed = function (fed) {
        this.fed = fed;
    };
    Segment.prototype.getSnake = function () {
        return this.snake;
    };
    Segment.prototype.getCube = function () {
        return this.cube;
    };
    Segment.prototype.getDirection = function () {
        return this.direction;
    };
    Segment.prototype.isFed = function () {
        return this.fed;
    };
    return Segment;
}());
exports.default = Segment;
//# sourceMappingURL=Segment.js.map