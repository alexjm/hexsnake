"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = require("./Cell");
var Ticker = (function () {
    function Ticker(world, renderers, managers) {
        this.world = world;
        this.drivers = [];
        this.renderers = renderers;
        this.managers = managers;
        this.timeoutHandle = null;
    }
    Ticker.prototype.addDriver = function (driver) {
        this.drivers.push(driver);
    };
    Ticker.prototype.manualTick = function () {
        this.tick();
    };
    Ticker.prototype.start = function () {
        this.scheduleNextTick();
        // Think all drivers before the first tick.
        for (var _i = 0, _a = this.drivers; _i < _a.length; _i++) {
            var driver = _a[_i];
            if (driver !== null)
                driver.think(this.world);
        }
    };
    Ticker.prototype.pause = function () {
        if (this.timeoutHandle !== null)
            clearTimeout(this.timeoutHandle);
    };
    Ticker.prototype.scheduleNextTick = function () {
        var _this = this;
        this.timeoutHandle = setTimeout(function () {
            _this.scheduleNextTick();
            _this.tick();
        }, this.getDelay());
    };
    // Delay in milliseconds for scheduling the next tick.
    Ticker.prototype.getDelay = function () {
        //return 1000 * 1 / (5 + (level * 1/3));
        return 1000 * 1 / 3;
    };
    Ticker.prototype.tick = function () {
        // TODO: Consider event model...
        for (var _i = 0, _a = this.renderers; _i < _a.length; _i++) {
            var renderer = _a[_i];
            renderer.handleTickBegin();
        }
        for (var _b = 0, _c = this.managers; _b < _c.length; _b++) {
            var manager = _c[_b];
            manager.handleTickBegin();
        }
        var movers = [];
        // Assumes snakes have already turned their heads if they want to.
        // Get snakes and their next cubes.
        for (var _d = 0, _e = this.drivers; _d < _e.length; _d++) {
            var driver = _e[_d];
            var snake = driver.getSnake();
            if (snake !== null) {
                movers.push({
                    driver: driver,
                    snake: snake,
                    nextCube: snake.getNextCube(),
                    canMove: null
                });
            }
        }
        var _loop_1 = function (mover) {
            mover.canMove =
                // Cell must exist in world.
                this_1.world.cellExists(mover.nextCube)
                    && movers.reduce(function (canMove, otherMover) {
                        return canMove && (
                        // Don't compare with self!
                        otherMover.snake === mover.snake
                            || !otherMover.nextCube.equals(mover.nextCube)
                            || !otherMover.snake.getSegments().reduce(function (canMove, segment) {
                                return canMove &&
                                    !segment.getCube().equals(mover.nextCube);
                            }, true));
                    }, true);
        };
        var this_1 = this;
        // Determine whether each snake can move. (no possible collision).
        for (var _f = 0, movers_1 = movers; _f < movers_1.length; _f++) {
            var mover = movers_1[_f];
            _loop_1(mover);
        }
        // Move snakes that can move.
        for (var _g = 0, movers_2 = movers; _g < movers_2.length; _g++) {
            var mover = movers_2[_g];
            var snake = mover.snake;
            if (mover.canMove) {
                var wakeCube = snake.getTailSegment().getCube().clone();
                // Eat the item if there was one.
                var cell = this.world.getCell(mover.nextCube);
                var item = null;
                if (cell.getState() === Cell_1.CellState.FOOD) {
                    item = cell.getEntity();
                }
                // Move snake forward.
                snake.stepForward();
                if (item !== null) {
                    snake.eat(item);
                    for (var _h = 0, _j = this.managers; _h < _j.length; _h++) {
                        var manager = _j[_h];
                        manager.handleItemEat(item);
                    }
                }
                // Update cells.
                for (var _k = 0, _l = snake.getSegments(); _k < _l.length; _k++) {
                    var segment = _l[_k];
                    this.world.getCell(segment.getCube()).set(Cell_1.CellState.SNAKE, segment);
                }
                this.world.getCell(wakeCube).set(Cell_1.CellState.CLEAR, null);
            }
            else {
                console.log("Snake crashed!");
                // TODO AM: kill snake, remove snake from world (and driver),
                // create new snake (add to world), assign snake to driver.
                // Consider killing snake then handling its dead body in the next tick.
            }
        }
        // Think all drivers.
        for (var _m = 0, _o = this.drivers; _m < _o.length; _m++) {
            var driver = _o[_m];
            if (driver !== null)
                driver.think(this.world);
        }
        for (var _p = 0, _q = this.renderers; _p < _q.length; _p++) {
            var renderer = _q[_p];
            renderer.handleTickEnd();
        }
    };
    return Ticker;
}());
exports.default = Ticker;
//# sourceMappingURL=Ticker.js.map