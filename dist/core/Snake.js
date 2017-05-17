"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Segment_1 = require("./Segment");
const Item_1 = require("./Item");
var Turn;
(function (Turn) {
    Turn[Turn["LEFT"] = 1] = "LEFT";
    Turn[Turn["STRAIGHT"] = 0] = "STRAIGHT";
    Turn[Turn["RIGHT"] = -1] = "RIGHT";
})(Turn = exports.Turn || (exports.Turn = {}));
class Snake {
    constructor(id) {
        this.id = id;
        this.segments = [];
        this.driver = null;
    }
    getId() {
        return this.id;
    }
    spawn(headCube, headDirection, length) {
        // Discard the old segments.
        this.segments = [];
        // Create new segments.
        let direction = headDirection;
        let directionBack = direction + 3;
        let cube = headCube.clone();
        for (let i = 0; i < length; i++) {
            let segment = new Segment_1.default(this, cube.clone(), direction);
            this.segments.push(segment);
            cube = cube.neighbour(directionBack);
        }
    }
    turn(turn) {
        if (this.segments.length < 1)
            throw new Error("Cannot turn because snake has no segments!");
        let canTurn = true;
        // If snake has a tail, new direction must be no more than 1 turn from straight.
        if (this.segments.length > 1) {
            let newDirection = this.segments[0].getDirection() + turn;
            //newDirection += Math.ceil(newDirection / -6) * 6;
            let prevDirection = this.segments[1].getDirection(); // Final direction in previous tick (one back from head).
            canTurn = Math.abs(newDirection - prevDirection) <= 1;
        }
        if (canTurn)
            this.segments[0].turn(turn);
        else
            console.log("CANNOT TURN!");
    }
    getNextCube() {
        if (this.segments.length < 1)
            throw new Error("Cannot get next cube because snake has no segments!");
        let headSegment = this.segments[0];
        let nextCube = headSegment.getCube().clone();
        nextCube.step(headSegment.getDirection());
        return nextCube;
    }
    stepForward() {
        // Step each segment forward starting from the back.
        for (let i = this.segments.length - 1; i >= 0; i--) {
            let segment = this.segments[i];
            let higherSegment = i !== 0 ? this.segments[i - 1] : null; // Segment one-closer to head.
            let furtherSegment = i !== this.segments.length - 1 ? this.segments[i + 1] : null; // Segment one-further from head.
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
    }
    eat(item) {
        switch (item.getType()) {
            case Item_1.ItemType.FOOD:
                let segment = this.getHeadSegment();
                segment.setFed(true);
                break;
        }
    }
    grow() {
        let tail = this.getTailSegment();
        let newTail = new Segment_1.default(this, tail.getCube().clone(), tail.getDirection());
        this.segments.push(newTail);
    }
    setDriver(driver) {
        this.driver = driver;
    }
    isSpawned() {
        return this.segments.length > 0;
    }
    getHeadSegment() {
        return this.segments[0];
    }
    getTailSegment() {
        return this.segments[this.segments.length - 1];
    }
    getSegments() {
        return this.segments;
    }
    getDriver() {
        return this.driver;
    }
}
exports.default = Snake;
//# sourceMappingURL=Snake.js.map