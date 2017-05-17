"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Snake_1 = require("../core/./Snake");
const Search_1 = require("./Search");
const Backtrack_1 = require("./Backtrack");
/**
 * A route can be followed by a driver.
 */
class Route {
    constructor(world, startCube, startDirection) {
        this.world = world;
        this.turns = [];
        this.cubes = [];
        //console.log("Finding route", startCube, startDirection);
        let search = new Search_1.default(world, startCube, startDirection);
        let originMap = search.getOriginCubeMap();
        let goal = search.getGoal();
        if (goal === null) {
            console.log("Couldn't find a goal!");
        }
        else {
            //console.log('goal is: ' + goal.toString());
            let backtrack = new Backtrack_1.default(startCube, originMap, goal);
            let path = backtrack.getPath();
            // Convert path directions into turns that a snake could follow.
            let currentDirection = startDirection;
            let currentCube = startCube.clone();
            for (let direction of path) {
                // Compare this direction with current direction.
                // //5 is left, 0 is straight, 1 is right.
                // 1 is left, 0 is straight, 5 is right.
                let diff = (direction - currentDirection + 6) % 6;
                /*const turnByDirectionDiff = [
                    Turn.STRAIGHT,
                    Turn.RIGHT,
                    null,
                    null,
                    null,
                    Turn.LEFT
                ];*/
                const turnByDirectionDiff = [
                    Snake_1.Turn.STRAIGHT,
                    Snake_1.Turn.LEFT,
                    null,
                    null,
                    null,
                    Snake_1.Turn.RIGHT
                ];
                let turn = turnByDirectionDiff[diff];
                if (turn === null)
                    console.error("Path contains consecutive directions which imply invalid turns");
                this.turns.push(turn);
                this.cubes.push(currentCube.clone());
                currentDirection = direction;
                currentCube.step(direction);
            }
        }
    }
    getStepsRemaining() {
        return this.turns.length;
    }
    // Whether all cells in the route are currently passable.
    isPassable() {
        for (let cube of this.cubes) {
            let cell = this.world.getCell(cube);
            if (!cell.isPassable())
                return false;
        }
        return true;
    }
    popNextTurn() {
        this.cubes.shift();
        return this.turns.shift();
    }
    getCubes() {
        return this.cubes;
    }
    toString() {
        let str = 'Route: \n';
        for (let i = 0; i < this.turns.length; i++) {
            let cube = this.cubes[i];
            let turn = this.turns[i];
            str += '' + i + ':: ' + Snake_1.Turn[turn] + ' :: ' + cube.toString() + "\n";
        }
        return str;
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map