"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("./Cube");
var CubeMap_1 = require("./CubeMap");
var Cell_1 = require("./Cell");
/**
 * World contains all the cells, snakes, and perhaps
 * other entities that physically exist in the game world.
 */
var World = (function () {
    function World() {
        this.cells = new CubeMap_1.default();
        this.cellsArray = [];
        this.snakes = [];
        this.renderers = [];
    }
    World.prototype.cellExists = function (cube) {
        return this.cells.has(cube);
    };
    World.prototype.getCell = function (cube) {
        return this.cells.get(cube);
    };
    World.prototype.addCell = function (cell) {
        this.cells.add(cell.getCube(), cell);
        this.cellsArray.push(cell);
        for (var _i = 0, _a = this.renderers; _i < _a.length; _i++) {
            var renderer = _a[_i];
            renderer.handleCellCreate(cell);
        }
    };
    World.prototype.makeRing = function (r) {
        var _this = this;
        var cube = new Cube_1.default(-r, 0, r);
        var make = function () {
            var cell = new Cell_1.default(cube.clone());
            _this.addCell(cell);
        };
        if (r === 0)
            make();
        else if (r > 0) {
            for (var d = 0; d < 6; d++) {
                for (var i = 0; i < r; i++) {
                    make();
                    cube.step(d);
                }
            }
        }
    };
    World.prototype.getRandomCell = function () {
        return this.cellsArray[Math.floor(Math.random() * this.cellsArray.length)];
    };
    World.prototype.addRenderer = function (renderer) {
        this.renderers.push(renderer);
    };
    World.prototype.addSnake = function (snake) {
        this.snakes.push(snake);
        // Apply snake segments to cells.
        for (var _i = 0, _a = snake.getSegments(); _i < _a.length; _i++) {
            var segment = _a[_i];
            this.cells.get(segment.getCube()).set(Cell_1.CellState.SNAKE, segment);
        }
    };
    // TODO AM: Use
    World.prototype.removeSnake = function (snake) {
        var i = this.snakes.indexOf(snake);
        if (i > -1) {
            this.snakes.splice(i, 1);
            for (var _i = 0, _a = snake.getSegments(); _i < _a.length; _i++) {
                var segment = _a[_i];
                this.cells.get(segment.getCube()).set(Cell_1.CellState.CLEAR, null);
            }
        }
    };
    World.prototype.getSnakes = function () {
        return this.snakes;
    };
    World.prototype.getCellsCubeMap = function () {
        return this.cells;
    };
    World.prototype.getCellsArray = function () {
        return this.cellsArray;
    };
    return World;
}());
exports.default = World;
//# sourceMappingURL=World.js.map