"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cube_1 = require("./Cube");
const CubeMap_1 = require("./CubeMap");
const Cell_1 = require("./Cell");
/**
 * World contains all the cells, snakes, and perhaps
 * other entities that physically exist in the game world.
 */
class World {
    constructor() {
        this.cells = new CubeMap_1.default();
        this.cellsArray = [];
        this.snakes = [];
        this.renderers = [];
    }
    cellExists(cube) {
        return this.cells.has(cube);
    }
    getCell(cube) {
        return this.cells.get(cube);
    }
    addCell(cell) {
        this.cells.add(cell.getCube(), cell);
        this.cellsArray.push(cell);
        for (let renderer of this.renderers)
            renderer.handleCellCreate(cell);
    }
    makeRing(r) {
        let cube = new Cube_1.default(-r, 0, r);
        let make = () => {
            let cell = new Cell_1.default(cube.clone());
            this.addCell(cell);
        };
        if (r === 0)
            make();
        else if (r > 0) {
            for (let d = 0; d < 6; d++) {
                for (let i = 0; i < r; i++) {
                    make();
                    cube.step(d);
                }
            }
        }
    }
    getRandomCell() {
        return this.cellsArray[Math.floor(Math.random() * this.cellsArray.length)];
    }
    pickSnakeSpawn(length) {
        //for(let i = 0; i < 100; i++) {// Finite time.
        while (true) {
            const cubeHead = this.getRandomCell().getCube();
            const direction = 0;
            let accept = true;
            let cube = cubeHead.clone();
            for (let i = 0; accept && i < length; i++) {
                const cell = this.getCell(cube);
                if (cell === null) {
                    accept = false;
                    break;
                }
                switch (cell.getState()) {
                    case Cell_1.CellState.CLEAR:
                        break;
                    default:
                        accept = false;
                }
                // Calculate direction going backwards, as this is where the next segment should be.
                let directionBack = direction + 3;
                cube = cube.neighbour(directionBack);
            }
            if (accept)
                return {
                    cube: cubeHead,
                    direction
                };
        }
        //return null;
    }
    addRenderer(renderer) {
        this.renderers.push(renderer);
    }
    addSnake(snake) {
        this.snakes.push(snake);
        // If snake is not spawned, spawn it now.
        if (!snake.isSpawned()) {
            this.spawnSnake(snake);
        }
        // Apply snake segments to cells.
        for (let segment of snake.getSegments()) {
            this.cells.get(segment.getCube()).set(Cell_1.CellState.SNAKE, segment);
        }
    }
    // TODO AM: Use
    removeSnake(snake) {
        let i = this.snakes.indexOf(snake);
        if (i > -1) {
            this.snakes.splice(i, 1);
            // Remove segments from cells.
            this.despawnSnake(snake);
        }
    }
    spawnSnake(snake) {
        const length = 3;
        const spawn = this.pickSnakeSpawn(length);
        //console.debug(`spawning snake at`, spawn)
        snake.spawn(spawn.cube, spawn.direction, length);
    }
    despawnSnake(snake) {
        for (let segment of snake.getSegments()) {
            this.cells.get(segment.getCube()).set(Cell_1.CellState.CLEAR, null);
        }
    }
    respawnSnake(snake) {
        this.despawnSnake(snake);
        this.spawnSnake(snake);
    }
    getSnakes() {
        return this.snakes;
    }
    getCellsCubeMap() {
        return this.cells;
    }
    getCellsArray() {
        return this.cellsArray;
    }
}
exports.default = World;
//# sourceMappingURL=World.js.map