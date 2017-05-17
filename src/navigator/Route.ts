import World from '../core/World';
import Cube from '../core/Cube';
import { Turn } from '../core/./Snake';
import Search from './Search';
import Backtrack from './Backtrack';

/**
 * A route can be followed by a driver.
 */
export default class Route {
    world: World;
    
    // Queue of turns to follow.
    // Pop off at [0].
    turns: Turn[];

    // Cubes which correspond to turns in the route.
    // Use to check that the route isn't blocked.
    cubes: Cube[];


    constructor(world: World, startCube: Cube, startDirection: number) {
        this.world = world;

        this.turns = [];
        this.cubes = [];

        //console.log("Finding route", startCube, startDirection);

        let search = new Search(world, startCube, startDirection);
        let originMap = search.getOriginCubeMap();
        let goal = search.getGoal();

        if(goal === null) {
            console.log("Couldn't find a goal!");
        }
        else {
            //console.log('goal is: ' + goal.toString());

            let backtrack = new Backtrack(startCube, originMap, goal);
            let path = backtrack.getPath();

            // Convert path directions into turns that a snake could follow.
            let currentDirection = startDirection;
            let currentCube = startCube.clone();
            for(let direction of path) {
                // Compare this direction with current direction.
                // //5 is left, 0 is straight, 1 is right.
                // 1 is left, 0 is straight, 5 is right.
                let diff = (direction - currentDirection + 6) % 6;

                /*const turnByDirectionDiff = [
                    Turn.STRAIGHT,
                    Turn.RIGHT,
                    null,
                    null,
                    null,
                    Turn.LEFT
                ];*/
                const turnByDirectionDiff = [
                    Turn.STRAIGHT,
                    Turn.LEFT,
                    null,
                    null,
                    null,
                    Turn.RIGHT
                ];

                let turn = turnByDirectionDiff[diff];

                if(turn === null) console.error("Path contains consecutive directions which imply invalid turns");
                
                this.turns.push(turn);
                this.cubes.push(currentCube.clone());

                currentDirection = direction;
                currentCube.step(direction);
            }
        }
    }

    public getStepsRemaining(): number {
        return this.turns.length;
    }

    // Whether all cells in the route are currently passable.
    public isPassable(): boolean {
        for(let cube of this.cubes) {
            let cell = this.world.getCell(cube);
            if(
                !cell.isPassable()
            ) return false;
        }
        return true;
    }

    public popNextTurn(): Turn {
        this.cubes.shift();
        return this.turns.shift();
    }

    public getCubes(): Cube[] {
        return this.cubes;
    }

    public toString(): string {
        let str = 'Route: \n';

        for(let i = 0; i < this.turns.length; i++) {
            let cube = this.cubes[i];
            let turn = this.turns[i];
            str += ''+i+':: '+Turn[turn]+' :: '+cube.toString() + "\n";
        }

        return str;
    }
}