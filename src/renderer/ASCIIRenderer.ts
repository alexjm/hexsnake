import Renderer from './Renderer';
import Cube from '../core/Cube';
import Cell, { CellState } from '../core/Cell';
import Segment from '../core/Segment';
import RobotDriver from '../driver/RobotDriver';
import Route from '../navigator/Route';
import World from "../core/World";
import Eventer from "../core/Eventer";


export default class ASCIIRenderer extends Renderer {
    private outputCb;

    public constructor(world: World, ee: Eventer, outputCb: (str: string) => void = console.log) {
        super(world);
        this.outputCb = outputCb;

        ee.sub("TICK_END", this.handleTickEnd.bind(this))
    }

    public handleTickEnd() {
        this.outputCb(this.worldToString());
    }

    private worldToString(): string {
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
        let driver = <RobotDriver>this.world.getSnakes()[0].getDriver();
        let route = driver.getNavigator().getRoute();
        table.markRoute(route);

        // Transform the table into a printable string.
        return table.toString();
    }
}

class Table {
    private table: string[][];

    private w: number;
    private h: number;

    private centerX: number;
    private centerY: number;

    constructor(width: number, height: number) {
        this.w = width;
        this.h = height;
        
        if(typeof process !== 'undefined') {
            interface MyProcessStdout extends NodeJS.WritableStream {
                columns: number;
                rows: number;
            } // Missing from node types :(
            //strW = (<MyProcessStdout>process.stdout).columns;
            //strH = (<MyProcessStdout>process.stdout).rows;
        }

        this.table = new Array(this.h);
        for(let y = 0; y < this.table.length; y++) this.table[y] = new Array(Math.floor(this.w/2));
        
        this.centerX = Math.floor(this.table[0].length / 2);
        this.centerY = Math.floor(this.table.length / 2);
    }

    public markCells(cells: Cell[]) {
        for(let cell of cells) {
            let cube: Cube = cell.getCube();
            let x = cube.getX() + Math.ceil(cube.getZ() / 2) + this.centerX;
            let y = cube.getZ() + this.centerY;

            // Check that cell is within the viewport.
            if(y >= 0 && y < this.table.length && x >= 0 && x < this.table[y].length) {
                this.table[y][x] = this.cellToString(cell);
            }
        };
    }

    // Used for printing world in console.
    private cellToString(cell: Cell): string {
        switch(cell.getState()) {
            case CellState.CLEAR:
                return '·';
            case CellState.SNAKE:
                let segment = <Segment>cell.getEntity();
                return segment.isFed() ? 'P' : 'o';
                //return ''+(<Segment>cell.getEntity()).getDirection();
                //return ['0', '1', '2', '3', '4', '5'][(<Segment>cell.getEntity()).getDirection()];
            case CellState.FOOD:
                return '$';
        }
    }

    public markRoute(route: Route) {
        // Mark route cubes on the table.
        for(let cube of route.getCubes()) {
            let x = cube.getX() + Math.ceil(cube.getZ() / 2) + this.centerX;
            let y = cube.getZ() + this.centerY;

            // Check that cell is within the viewport.
            if(y >= 0 && y < this.table.length && x >= 0 && x < this.table[y].length) {
                this.table[y][x] = '~';
            }
        }
    }

    // Transform the table into a printable string.
    public toString(): string {
        const voidChar = ' ';
        const gapChar = ' ';//'.';

        let str = '';
        for(let y = 0; y < this.table.length; y++) {
            let odd = y % 2 === 0;
            if(!odd) str += gapChar;
            for(let x = 0; x < this.table[y].length; x++) {
                let c = this.table[y][x] !== undefined ? this.table[y][x] : voidChar;
                str += c;
                //console.log(this.w - 2 * x);
                if(odd || this.w - 2*x > 3) str += gapChar;
            }
            str += "\n";
        }
        return str;
    }
}

