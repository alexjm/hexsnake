"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cell = (function () {
    function Cell(cube) {
        this.cube = cube;
        this.state = CellState.CLEAR;
        this.entity = null;
    }
    Cell.prototype.set = function (state, entity) {
        this.state = state;
        this.entity = entity;
    };
    Cell.prototype.getCube = function () {
        return this.cube;
    };
    Cell.prototype.getState = function () {
        return this.state;
    };
    Cell.prototype.getEntity = function () {
        return this.entity;
    };
    Cell.prototype.isPassable = function () {
        switch (this.state) {
            case CellState.CLEAR:
            case CellState.FOOD:
            default:
                return true;
            case CellState.SNAKE:
                return false;
        }
    };
    return Cell;
}());
exports.default = Cell;
var CellState;
(function (CellState) {
    CellState[CellState["CLEAR"] = 0] = "CLEAR";
    CellState[CellState["SNAKE"] = 1] = "SNAKE";
    CellState[CellState["FOOD"] = 2] = "FOOD";
})(CellState = exports.CellState || (exports.CellState = {}));
//# sourceMappingURL=Cell.js.map