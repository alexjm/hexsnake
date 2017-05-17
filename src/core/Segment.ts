import Snake, { Turn } from './Snake';
import Cube from './Cube';

export default class Segment {
    private snake: Snake;
    private cube: Cube;
    private direction: number;
    private fed: boolean;

    constructor(snake: Snake, cube: Cube, direction: number) {
        this.cube = cube;
        this.direction = direction + Math.ceil(direction / -6) * 6;
        this.fed = false;
    }

    public turn(turn: Turn) {
        this.direction += turn;
        this.direction += Math.ceil(this.direction / -6) * 6;
    }

    public stepForward() {
        this.cube.step(this.direction);
    }

    public setFed(fed: boolean) {
        this.fed = fed;
    }

    public getSnake(): Snake {
        return this.snake;
    }

    public getCube(): Cube {
        return this.cube;
    }

    public getDirection(): number {
        return this.direction;
    }

    public isFed(): boolean {
        return this.fed;
    }
}