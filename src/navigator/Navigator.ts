/**
 * Navigator navigates a driver.
 */

import Snake, { Turn } from '../core/./Snake';
import Segment from '../core/Segment';
import Route from './Route';
import World from '../core/World';
import Cube from '../core/Cube';


export default class Navigator {
    private snake: Snake;
    private route: Route;

    constructor(snake: Snake) {
        this.snake = snake;
        this.route = null;
    }

    public getRoute(): Route {
        return this.route;
    }
    
    /**
     * Get/pop the next turn.
     * If the current route isn't set or is blocked, calculate a new one.
     * Pass the start cube and direction in case a new route needs to be generated.
     */
    public getTurn(world: World): Turn {
        let headSegment = this.snake.getHeadSegment();
        let startCube = headSegment.getCube().clone();
        let startDirection = headSegment.getDirection();

        let recalculate = () => {
            this.route = new Route(world, startCube, startDirection);
        }

        // Recalculate route if empty.
        // DEBUG (true)
        if(true || this.route === null || this.route.getStepsRemaining() === 0) {
            //this.debug("Recalculating route because empty.");
            recalculate();
        }

        // TODO AM THERE IS A BUG HERE BUT DOESN@T MATTER YET TBH
        /*
        // Recalculate route if blocked.
        if(!this.route.isPassable()) {
            this.debug("Recalculating route because blocked.");
            recalculate();
        }*/

        //console.log(this.route.toString());

        let turn: Turn;
        if(this.route.getStepsRemaining() > 0) {
            turn = this.route.popNextTurn();
        } else {
            // ???
            // Turn straight if route still bodged.
            console.log("NO ROUTE SO TURNING STRAIGHT");
            turn = Turn.STRAIGHT;
        }

        return turn;
    }

    private debug(...args: any[]) {
        console.log.call(this, args);
    }
}
