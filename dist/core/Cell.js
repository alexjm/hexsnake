"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cell {
    constructor(cube) {
        this.cube = cube;
        this.state = CellState.CLEAR;
        this.entity = null;
    }
    set(state, entity) {
        this.state = state;
        this.entity = entity;
    }
    getCube() {
        return this.cube;
    }
    getState() {
        return this.state;
    }
    getEntity() {
        return this.entity;
    }
    isPassable() {
        switch (this.state) {
            case CellState.CLEAR:
            case CellState.FOOD:
            default:
                return true;
            case CellState.SNAKE:
                return false;
        }
    }
}
exports.default = Cell;
var CellState;
(function (CellState) {
    CellState[CellState["CLEAR"] = 0] = "CLEAR";
    CellState[CellState["SNAKE"] = 1] = "SNAKE";
    CellState[CellState["FOOD"] = 2] = "FOOD";
})(CellState = exports.CellState || (exports.CellState = {}));
//# sourceMappingURL=Cell.js.map