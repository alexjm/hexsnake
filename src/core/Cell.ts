import Cube from './Cube';
import Segment from './Segment';
import Item from './Item';

export default class Cell {
    private cube: Cube;
    private state: CellState;
    private entity: CellEntity | null;

    constructor(cube: Cube) {
        this.cube = cube;
        this.state = CellState.CLEAR;
        this.entity = null;
    }

    public set(state: CellState, entity: CellEntity | null) {
        this.state = state;
        this.entity = entity;
    }

    public getCube(): Cube {
        return this.cube;
    }

    public getState(): CellState {
        return this.state;
    }

    public getEntity(): CellEntity {
        return this.entity;
    }

    public isPassable(): boolean {
        switch(this.state) {
            case CellState.CLEAR:
            case CellState.FOOD:
            default:
                return true;
            case CellState.SNAKE:
                return false;
        }
    }
}

export enum CellState {
    CLEAR,
    SNAKE,
    FOOD
}

// What things can be on a cell.
export type CellEntity = Segment | Item;
