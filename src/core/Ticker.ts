import World from './World'
import Snake from './Snake'
import Segment from './Segment'
import Cube from './Cube'
import Driver from '../driver/Driver'
import { CellState } from './Cell'
import Item, { ItemType } from './Item'
import Renderer from '../renderer/Renderer'
import FoodMan from './FoodMan'
import Logger from './Logger'
import Eventer from "./Eventer";

export default class Ticker {
    private tickId: number
    private world: World
    private drivers: Driver[]
    private loggers: Logger[]
    private managers: FoodMan[]
    private ee: Eventer
    private timeoutHandle: NodeJS.Timer | number | null

    constructor(world: World, ee: Eventer, managers: FoodMan[], loggers: Logger[]) {
        this.tickId = 0
        this.world = world
        this.drivers = []
        this.timeoutHandle = null
        this.ee = ee
        this.managers = managers
        this.loggers = loggers
    }


    public addDriver(driver: Driver) {
        this.drivers.push(driver);
    }

    public manualTick() {
        this.tick();
    }

    public start() {
        this.scheduleNextTick();

        // Think all drivers before the first tick.
        for(let driver of this.drivers) {
            if(driver !== null) driver.think(this.world);
        }
    }

    public pause() {
        if(this.timeoutHandle !== null) clearTimeout(<number>this.timeoutHandle);
    }

    private scheduleNextTick() {
        this.timeoutHandle = setTimeout(() => {
            this.scheduleNextTick();
            this.tick();
        }, this.getDelay());
    }

    // Delay in milliseconds for scheduling the next tick.
    private getDelay(): number {
        return 1
        //return 1000 * 1 / (5 + (level * 1/3))
        //return 1000 * 1 / 3
    }

    private tick() {
        for(let manager of this.managers) manager.handleTickBegin();

        let movers: SnakeMover[] = [];

        // Assumes snakes have already turned their heads if they want to.
        
        // Get snakes and their next cubes.
        for(let driver of this.drivers) {
            let snake = driver.getSnake();
            if(snake !== null) {
                movers.push({
                    driver: driver,
                    snake: snake,
                    nextCube: snake.getNextCube(),
                    canMove: null
                });
            }
        }
        
        // Determine whether each snake can move. (no possible collision).
        for(let mover of movers) {
            mover.canMove =
                // Cell must exist in world.
                this.world.cellExists(mover.nextCube)

                // Must not collide with another snake.
                && movers.reduce((canMove: boolean, otherMover: SnakeMover) => {
                    return canMove && (
                        // Don't compare with self!
                        otherMover.snake === mover.snake

                        // Check collision with other snake's next cube.
                        || !otherMover.nextCube.equals(mover.nextCube)

                        // Check collision with other snake's segments.
                        || !otherMover.snake.getSegments().reduce(
                            (canMove: boolean, segment: Segment) => {
                                return canMove &&
                                    !segment.getCube().equals(mover.nextCube);
                            }, true)
                    );
                }, true);
        }

        // Move snakes that can move.
        for(let mover of movers) {
            const snake = mover.snake
            const world = this.world
            
            if(mover.canMove) {
                let wakeCube = snake.getTailSegment().getCube().clone();

                // Eat the item if there was one.
                let cell = world.getCell(mover.nextCube);
                let item: Item | null = null;
                if(cell.getState() === CellState.FOOD) {
                    item = <Item>cell.getEntity();
                }

                // Move snake forward.
                snake.stepForward();

                if(item !== null) {
                    snake.eat(item);
                    for(let manager of this.managers) manager.handleItemEat(item);
                }

                // Update cells.
                for(let segment of snake.getSegments()) {
                    world.getCell(segment.getCube()).set(CellState.SNAKE, segment);
                }
                world.getCell(wakeCube).set(CellState.CLEAR, null);


                // Notify loggers.
                for(let logger of this.loggers) logger.onSnakeMove(this.tickId, snake, mover.nextCube)

            } else {
                console.log(`Snake ${snake.getId()} crashed!`)

                // TODO AM: kill snake, remove snake from world (and driver),
                // create new snake (add to world), assign snake to driver.
                // Consider killing snake then handling its dead body in the next tick.

                world.respawnSnake(snake)
            }
        }

        // Think all drivers.
        for(let driver of this.drivers) if(driver !== null) driver.think(this.world);

        this.ee.emit("TICK_END", this.tickId)

        this.tickId++
    }
}

interface SnakeMover {
    driver: Driver;
    snake: Snake;
    nextCube: Cube; // Cube that snake wants to move onto.
    canMove: boolean | null;
}