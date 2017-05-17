import World from '../core/World';
import Snake, { Turn } from '../core/./Snake';

abstract class Driver {
    protected snake: Snake | null;

    constructor(snake: Snake | null) {
        this.snake = snake;
    }

    // Prompt the driver to do something.
    public abstract think(world: World);

    public useSnake(snake: Snake) {
        this.snake = snake;
    }

    public getSnake(): Snake {
        return this.snake;
    }
}
export default Driver;


export class DummyDriver extends Driver {
    private nTicks: number = 0;

    public think(world: World) {
        //this.snake.turn(Turn.LEFT);
        this.snake.turn(Math.floor(this.nTicks / 6) % 2 === 0 ? Turn.LEFT : Turn.RIGHT);
        this.nTicks++;
    }
}
