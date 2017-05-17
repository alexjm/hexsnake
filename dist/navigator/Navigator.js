"use strict";
/**
 * Navigator navigates a driver.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Snake_1 = require("../core/./Snake");
const Route_1 = require("./Route");
class Navigator {
    constructor(snake) {
        this.snake = snake;
        this.route = null;
    }
    getRoute() {
        return this.route;
    }
    /**
     * Get/pop the next turn.
     * If the current route isn't set or is blocked, calculate a new one.
     * Pass the start cube and direction in case a new route needs to be generated.
     */
    getTurn(world) {
        let headSegment = this.snake.getHeadSegment();
        let startCube = headSegment.getCube().clone();
        let startDirection = headSegment.getDirection();
        let recalculate = () => {
            this.route = new Route_1.default(world, startCube, startDirection);
        };
        // Recalculate route if empty.
        // DEBUG (true)
        if (true || this.route === null || this.route.getStepsRemaining() === 0) {
            //this.debug("Recalculating route because empty.");
            recalculate();
        }
        // TODO AM THERE IS A BUG HERE BUT DOESN@T MATTER YET TBH
        /*
        // Recalculate route if blocked.
        if(!this.route.isPassable()) {
            this.debug("Recalculating route because blocked.");
            recalculate();
        }*/
        //console.log(this.route.toString());
        let turn;
        if (this.route.getStepsRemaining() > 0) {
            turn = this.route.popNextTurn();
        }
        else {
            // ???
            // Turn straight if route still bodged.
            console.log("NO ROUTE SO TURNING STRAIGHT");
            turn = Snake_1.Turn.STRAIGHT;
        }
        return turn;
    }
    debug(...args) {
        console.log.call(this, args);
    }
}
exports.default = Navigator;
//# sourceMappingURL=Navigator.js.map