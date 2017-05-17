"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = require("./Renderer");
const Cell_1 = require("../core/Cell");
class ASCIIRenderer extends Renderer_1.default {
    constructor(world, ee, outputCb = console.log) {
        super(world);
        this.outputCb = outputCb;
        ee.sub("TICK_END", this.handleTickEnd.bind(this));
    }
    handleTickEnd() {
        this.outputCb(this.worldToString());
    }
    worldToString() {
        //    # # # #   
        //   # # # # #  
        //  # # # # # # 
        // # # # O # # #
        //  # # # o # # 
        //   o o o # #  
        //    # # # #   
        let table = new Table(40, 19);
        // Mark each cell on the table.
        table.markCells(this.world.getCellsArray());
        // ROUTE DEBUG
        // Mark route cubes on the table.
        let driver = this.world.getSnakes()[0].getDriver();
        let route = driver.getNavigator().getRoute();
        table.markRoute(route);
        // Transform the table into a printable string.
        return table.toString();
    }
}
exports.default = ASCIIRenderer;
class Table {
    constructor(width, height) {
        this.w = width;
        this.h = height;
        if (typeof process !== 'undefined') {
            //strW = (<MyProcessStdout>process.stdout).columns;
            //strH = (<MyProcessStdout>process.stdout).rows;
        }
        this.table = new Array(this.h);
        for (let y = 0; y < this.table.length; y++)
            this.table[y] = new Array(Math.floor(this.w / 2));
        this.centerX = Math.floor(this.table[0].length / 2);
        this.centerY = Math.floor(this.table.length / 2);
    }
    markCells(cells) {
        for (let cell of cells) {
            let cube = cell.getCube();
            let x = cube.getX() + Math.ceil(cube.getZ() / 2) + this.centerX;
            let y = cube.getZ() + this.centerY;
            // Check that cell is within the viewport.
            if (y >= 0 && y < this.table.length && x >= 0 && x < this.table[y].length) {
                this.table[y][x] = this.cellToString(cell);
            }
        }
        ;
    }
    // Used for printing world in console.
    cellToString(cell) {
        switch (cell.getState()) {
            case Cell_1.CellState.CLEAR:
                return '·';
            case Cell_1.CellState.SNAKE:
                let segment = cell.getEntity();
                return segment.isFed() ? 'P' : 'o';
            //return ''+(<Segment>cell.getEntity()).getDirection();
            //return ['0', '1', '2', '3', '4', '5'][(<Segment>cell.getEntity()).getDirection()];
            case Cell_1.CellState.FOOD:
                return '$';
        }
    }
    markRoute(route) {
        // Mark route cubes on the table.
        for (let cube of route.getCubes()) {
            let x = cube.getX() + Math.ceil(cube.getZ() / 2) + this.centerX;
            let y = cube.getZ() + this.centerY;
            // Check that cell is within the viewport.
            if (y >= 0 && y < this.table.length && x >= 0 && x < this.table[y].length) {
                this.table[y][x] = '~';
            }
        }
    }
    // Transform the table into a printable string.
    toString() {
        const voidChar = ' ';
        const gapChar = ' '; //'.';
        let str = '';
        for (let y = 0; y < this.table.length; y++) {
            let odd = y % 2 === 0;
            if (!odd)
                str += gapChar;
            for (let x = 0; x < this.table[y].length; x++) {
                let c = this.table[y][x] !== undefined ? this.table[y][x] : voidChar;
                str += c;
                //console.log(this.w - 2 * x);
                if (odd || this.w - 2 * x > 3)
                    str += gapChar;
            }
            str += "\n";
        }
        return str;
    }
}
//# sourceMappingURL=ASCIIRenderer.js.map