"use strict";
/**
 * Backtrack from a goal cube to a start cube using origins cube map.
 * Generates array of directions in order.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Backtrack {
    constructor(startCube, originMap, goal) {
        //this.debug("Backtracking");
        this.originMap = originMap;
        this.path = [];
        let currentCube = goal.clone();
        // Loop until the start cube is reached.
        let n = 0, nMax = 1000; // Max iterations...
        while (!currentCube.equals(startCube) && n++ < nMax) {
            // DEBUG:
            // this.highlight(currentCube, n);
            // console.log(n, currentCube);
            // Get the best origin direction of the current cube.
            let bestOrigin = this.getBestOrigin(currentCube);
            //this.debug("Best cost:", currentOrigins[bestOrigin]);
            this.path.push(bestOrigin);
            let prevCube = currentCube.neighbour((bestOrigin + 3) % 6);
            currentCube = prevCube;
        }
        // Reverse the path.
        // The directions are already correctly oriented.
        this.path.reverse();
    }
    // Returns the direction from the given origins with the least cost.
    getBestOrigin(cube) {
        let origins = this.originMap.get(cube);
        let best = 0;
        for (let direction = 0; direction < 6; direction++) {
            let cost = origins[direction];
            let bestCost = origins[best];
            if (cost > -1) {
                if (bestCost > -1) {
                    if (cost < bestCost) {
                        best = direction;
                    }
                }
                else {
                    best = direction;
                }
            }
        }
        if (origins[best] < 0)
            console.error("No origins, so cube is not reachable!");
        return best;
    }
    ;
    getPath() {
        return this.path;
    }
}
exports.default = Backtrack;
//# sourceMappingURL=Backtrack.js.map