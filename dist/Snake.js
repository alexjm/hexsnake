"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Segment_1 = require("./Segment");
var Item_1 = require("./Item");
var Turn;
(function (Turn) {
    Turn[Turn["LEFT"] = 1] = "LEFT";
    Turn[Turn["STRAIGHT"] = 0] = "STRAIGHT";
    Turn[Turn["RIGHT"] = -1] = "RIGHT";
})(Turn = exports.Turn || (exports.Turn = {}));
var Snake = (function () {
    function Snake(cube, direction, length) {
        this.segments = [];
        this.driver = null;
        this.spawn(cube, direction, length);
    }
    Snake.prototype.spawn = function (headCube, headDirection, length) {
        var cube = headCube.clone();
        var direction = headDirection;
        for (var i = 0; i < length; i++) {
            var segment = new Segment_1.default(this, cube.clone(), direction);
            this.segments.push(segment);
            cube.step(direction + 3);
            //direction += 0;
        }
    };
    Snake.prototype.turn = function (turn) {
        if (this.segments.length < 1)
            throw new Error("Cannot turn because snake has no segments!");
        var canTurn = true;
        // If snake has a tail, new direction must be no more than 1 turn from straight.
        if (this.segments.length > 1) {
            var newDirection = this.segments[0].getDirection() + turn;
            //newDirection += Math.ceil(newDirection / -6) * 6;
            var prevDirection = this.segments[1].getDirection(); // Final direction in previous tick (one back from head).
            canTurn = Math.abs(newDirection - prevDirection) <= 1;
        }
        if (canTurn)
            this.segments[0].turn(turn);
        else
            console.log("CANNOT TURN!");
    };
    Snake.prototype.getNextCube = function () {
        if (this.segments.length < 1)
            throw new Error("Cannot get next cube because snake has no segments!");
        var headSegment = this.segments[0];
        var nextCube = headSegment.getCube().clone();
        nextCube.step(headSegment.getDirection());
        return nextCube;
    };
    Snake.prototype.stepForward = function () {
        // Step each segment forward starting from the back.
        for (var i = this.segments.length - 1; i >= 0; i--) {
            var segment = this.segments[i];
            var higherSegment = i !== 0 ? this.segments[i - 1] : null; // Segment one-closer to head.
            var furtherSegment = i !== this.segments.length - 1 ? this.segments[i + 1] : null; // Segment one-further from head.
            // Push food towards tail.
            if (segment.isFed()) {
                segment.setFed(false);
                if (furtherSegment === null)
                    this.grow(); // Grow if last segment.
                else
                    furtherSegment.setFed(true); // Push food along.
            }
            // Step into higher segment's position.
            segment.stepForward();
            if (higherSegment !== null)
                segment.turn(higherSegment.getDirection() - segment.getDirection());
        }
    };
    Snake.prototype.eat = function (item) {
        switch (item.getType()) {
            case Item_1.ItemType.FOOD:
                var segment = this.getHeadSegment();
                segment.setFed(true);
                break;
        }
    };
    Snake.prototype.grow = function () {
        var tail = this.getTailSegment();
        var newTail = new Segment_1.default(this, tail.getCube().clone(), tail.getDirection());
        this.segments.push(newTail);
    };
    Snake.prototype.setDriver = function (driver) {
        this.driver = driver;
    };
    Snake.prototype.getHeadSegment = function () {
        return this.segments[0];
    };
    Snake.prototype.getTailSegment = function () {
        return this.segments[this.segments.length - 1];
    };
    Snake.prototype.getSegments = function () {
        return this.segments;
    };
    Snake.prototype.getDriver = function () {
        return this.driver;
    };
    return Snake;
}());
exports.default = Snake;
//# sourceMappingURL=Snake.js.map