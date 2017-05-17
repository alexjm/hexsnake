"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("./Cell");
class Ticker {
    constructor(world, ee, managers, loggers) {
        this.tickId = 0;
        this.world = world;
        this.drivers = [];
        this.timeoutHandle = null;
        this.ee = ee;
        this.managers = managers;
        this.loggers = loggers;
    }
    addDriver(driver) {
        this.drivers.push(driver);
    }
    manualTick() {
        this.tick();
    }
    start() {
        this.scheduleNextTick();
        // Think all drivers before the first tick.
        for (let driver of this.drivers) {
            if (driver !== null)
                driver.think(this.world);
        }
    }
    pause() {
        if (this.timeoutHandle !== null)
            clearTimeout(this.timeoutHandle);
    }
    scheduleNextTick() {
        this.timeoutHandle = setTimeout(() => {
            this.scheduleNextTick();
            this.tick();
        }, this.getDelay());
    }
    // Delay in milliseconds for scheduling the next tick.
    getDelay() {
        return 1;
        //return 1000 * 1 / (5 + (level * 1/3))
        //return 1000 * 1 / 3
    }
    tick() {
        for (let manager of this.managers)
            manager.handleTickBegin();
        let movers = [];
        // Assumes snakes have already turned their heads if they want to.
        // Get snakes and their next cubes.
        for (let driver of this.drivers) {
            let snake = driver.getSnake();
            if (snake !== null) {
                movers.push({
                    driver: driver,
                    snake: snake,
                    nextCube: snake.getNextCube(),
                    canMove: null
                });
            }
        }
        // Determine whether each snake can move. (no possible collision).
        for (let mover of movers) {
            mover.canMove =
                // Cell must exist in world.
                this.world.cellExists(mover.nextCube)
                    && movers.reduce((canMove, otherMover) => {
                        return canMove && (
                        // Don't compare with self!
                        otherMover.snake === mover.snake
                            || !otherMover.nextCube.equals(mover.nextCube)
                            || !otherMover.snake.getSegments().reduce((canMove, segment) => {
                                return canMove &&
                                    !segment.getCube().equals(mover.nextCube);
                            }, true));
                    }, true);
        }
        // Move snakes that can move.
        for (let mover of movers) {
            const snake = mover.snake;
            const world = this.world;
            if (mover.canMove) {
                let wakeCube = snake.getTailSegment().getCube().clone();
                // Eat the item if there was one.
                let cell = world.getCell(mover.nextCube);
                let item = null;
                if (cell.getState() === Cell_1.CellState.FOOD) {
                    item = cell.getEntity();
                }
                // Move snake forward.
                snake.stepForward();
                if (item !== null) {
                    snake.eat(item);
                    for (let manager of this.managers)
                        manager.handleItemEat(item);
                }
                // Update cells.
                for (let segment of snake.getSegments()) {
                    world.getCell(segment.getCube()).set(Cell_1.CellState.SNAKE, segment);
                }
                world.getCell(wakeCube).set(Cell_1.CellState.CLEAR, null);
                // Notify loggers.
                for (let logger of this.loggers)
                    logger.onSnakeMove(this.tickId, snake, mover.nextCube);
            }
            else {
                console.log(`Snake ${snake.getId()} crashed!`);
                // TODO AM: kill snake, remove snake from world (and driver),
                // create new snake (add to world), assign snake to driver.
                // Consider killing snake then handling its dead body in the next tick.
                world.respawnSnake(snake);
            }
        }
        // Think all drivers.
        for (let driver of this.drivers)
            if (driver !== null)
                driver.think(this.world);
        this.ee.emit("TICK_END", this.tickId);
        this.tickId++;
    }
}
exports.default = Ticker;
//# sourceMappingURL=Ticker.js.map