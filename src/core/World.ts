import Cube from './Cube';
import CubeMap from './CubeMap';
import Cell, { CellState } from './Cell';
import Snake from './Snake';
import Renderer from '../renderer/Renderer';

/**
 * World contains all the cells, snakes, and perhaps
 * other entities that physically exist in the game world.
 */
export default class World {
    private cells: CubeMap<Cell>;
    private cellsArray: Cell[];
    private snakes: Snake[];
    private renderers: Renderer[];

    constructor() {
        this.cells = new CubeMap<Cell>();
        this.cellsArray = [];
        this.snakes = [];
        this.renderers = [];
    }

    public cellExists(cube: Cube): boolean {
        return this.cells.has(cube);
    }

    public getCell(cube: Cube): Cell {
        return this.cells.get(cube);
    }

    private addCell(cell: Cell) {
        this.cells.add(cell.getCube(), cell);
        this.cellsArray.push(cell);

        for(let renderer of this.renderers) renderer.handleCellCreate(cell);
    }

    public makeRing(r: number) {
        let cube = new Cube(-r, 0, r);

        let make = () => {
            let cell = new Cell(cube.clone());
            this.addCell(cell);
        }

        if(r === 0) make();
        else if(r > 0) {
            for(let d = 0; d < 6; d++) {
                for(let i = 0; i < r; i++) {
                    make();
                    cube.step(d);
                }
            }
        }
    }


    public getRandomCell(): Cell {
        return this.cellsArray[Math.floor(Math.random() * this.cellsArray.length)]
    }

    private pickSnakeSpawn(length: number): {
        cube: Cube,
        direction: number
    } {
        //for(let i = 0; i < 100; i++) {// Finite time.
        while(true) {
            const cubeHead = this.getRandomCell().getCube()

            const direction = 0
            
            let accept = true;
            let cube = cubeHead.clone()
            for(let i = 0; accept && i < length; i++) {

                const cell = this.getCell(cube)

                if(cell === null) {
                    accept = false
                    break
                }
                
                switch(cell.getState()) {
                    case CellState.CLEAR:
                        break
                    default:
                        accept = false
                }

                // Calculate direction going backwards, as this is where the next segment should be.
                let directionBack = direction + 3
                cube = cube.neighbour(directionBack)
            }

            if(accept) return {
                cube: cubeHead,
                direction
            }
        }
        //return null;
    }


    public addRenderer(renderer: Renderer) {
        this.renderers.push(renderer);
    }

    public addSnake(snake: Snake) {
        this.snakes.push(snake)

        // If snake is not spawned, spawn it now.
        if(! snake.isSpawned()) {
            this.spawnSnake(snake)
        }

        // Apply snake segments to cells.
        for(let segment of snake.getSegments()) {
            this.cells.get(segment.getCube()).set(CellState.SNAKE, segment)
        }
    }

    // TODO AM: Use
    public removeSnake(snake: Snake) {
        let i = this.snakes.indexOf(snake)
        if(i > -1) {
            this.snakes.splice(i, 1)

            // Remove segments from cells.
            this.despawnSnake(snake)
        }
    }

    public spawnSnake(snake: Snake) {
        const length = 3
        const spawn = this.pickSnakeSpawn(length)
        //console.debug(`spawning snake at`, spawn)
        snake.spawn(spawn.cube, spawn.direction, length)
    }

    public despawnSnake(snake: Snake) {
        for(let segment of snake.getSegments()) {
            this.cells.get(segment.getCube()).set(CellState.CLEAR, null)
        }
    }

    public respawnSnake(snake: Snake) {
        this.despawnSnake(snake)
        this.spawnSnake(snake)
    }

    public getSnakes(): Snake[] {
        return this.snakes;
    }
    
    public getCellsCubeMap(): CubeMap<Cell> {
        return this.cells;
    }

    public getCellsArray(): Cell[] {
        return this.cellsArray;
    }
}