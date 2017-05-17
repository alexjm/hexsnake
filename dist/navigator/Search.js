"use strict";
/**
 * Search for goal.
 * Generates an origin cube map and the goal to backtrack from.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const CubeMap_1 = require("../core/CubeMap");
const Cell_1 = require("../core/Cell");
const Frontier_1 = require("./Frontier");
class Search {
    constructor(world, startCube, startDirection) {
        this.originMap = new CubeMap_1.default();
        this.frontier = new Frontier_1.default();
        this.goal = null;
        // Add starting node to the frontier.
        this.frontier.push({
            cube: startCube,
            direction: startDirection,
            cost: 0
        });
        // Spawn the child nodes for the first node.
        // This is necessary because the starting node isn't passable (snake head).
        this.spawnChildNodes(this.frontier.pop());
        while (this.frontier.count() > 0 && this.goal === null) {
            this.examineNextNode(world);
        }
        //this.debug("Search complete", this.frontierHead, goal);
    }
    addOrigin(node) {
        let origins = this.originMap.get(node.cube);
        // If this cube hasn't been reached yet, initialise its origins.
        // -1 means not reachable.
        let originsWasNull = origins === null;
        if (originsWasNull)
            origins = [-1, -1, -1, -1, -1, -1];
        // Update the cost to reach this node (this cube from this direction).
        // Only update if the cost is less than the existing cost.
        if (origins[node.direction] === -1
            || node.cost < origins[node.direction])
            origins[node.direction] = node.cost;
        if (originsWasNull)
            this.originMap.add(node.cube, origins);
        else
            this.originMap.set(node.cube, origins);
    }
    // Returns whether a node has already been visited.
    // (same cube and same direction.)
    haveVisited(node) {
        let origins = this.originMap.get(node.cube);
        if (origins !== null)
            return origins[node.direction] > 0;
        else
            return false;
    }
    // Generate 3 child nodes from parent node: one for each turn.
    spawnChildNodes(parentNode) {
        for (let turn of [0, 1, 5]) {
            let childDirection = (parentNode.direction + turn) % 6;
            let childNode = {
                cube: parentNode.cube.neighbour(childDirection),
                direction: childDirection,
                cost: parentNode.cost + 1
            };
            this.frontier.push(childNode);
            // DEBUG: highnight child nodes in colour...
            //this.highlight(childNode.cube, frontier.length * 0.02);
        }
    }
    // Examine the next frontier node and increment the head.
    examineNextNode(world) {
        let node = this.frontier.pop();
        let cell = world.getCell(node.cube);
        if (cell !== null && cell.isPassable()) {
            if (cell.getState() === Cell_1.CellState.FOOD) {
                //console.log("FOUND GOAL: " + node.cube.toString());
                this.goal = node.cube;
            }
            else {
                if (!this.haveVisited(node)) {
                    this.spawnChildNodes(node);
                }
            }
            this.addOrigin(node);
        }
    }
    ;
    getOriginCubeMap() {
        return this.originMap;
    }
    getGoal() {
        return this.goal;
    }
}
exports.default = Search;
//# sourceMappingURL=Search.js.map