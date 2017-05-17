/**
 * Search for goal.
 * Generates an origin cube map and the goal to backtrack from.
 */

import World from '../core/World';
import Cube from '../core/Cube';
import CubeMap from '../core/CubeMap';
import { CellState } from '../core/Cell';
import Frontier from './Frontier';
import Origins from './Origins';

export interface FrontierNode {
    cube: Cube,// Cube this node is on.
    direction: number,// Direction this node is facing.
    cost: number// Number of steps taken to get to this node.
}

export default class Search {
    private frontier: Frontier<FrontierNode>;

    // Origins cube map.
    // For each cube there is an array of 6 numbers, each representing the
    // lowest cost to reach that cube from that direction.
    private originMap: CubeMap<Origins>;

    // Goal cube to backtrack from.
    private goal: Cube | null;


    constructor(world: World, startCube: Cube, startDirection: number) {
        this.originMap = new CubeMap<Origins>();

        this.frontier = new Frontier<FrontierNode>();

        this.goal = null;

        // Add starting node to the frontier.
        this.frontier.push({
            cube: startCube,// No need to clone.
            direction: startDirection,
            cost: 0
        });

        // Spawn the child nodes for the first node.
        // This is necessary because the starting node isn't passable (snake head).
        this.spawnChildNodes(this.frontier.pop());

        while(this.frontier.count() > 0 && this.goal === null) {
            this.examineNextNode(world);
        }
        //this.debug("Search complete", this.frontierHead, goal);
    }

    private addOrigin(node: FrontierNode) {
        let origins: Origins | null = this.originMap.get(node.cube);

        // If this cube hasn't been reached yet, initialise its origins.
        // -1 means not reachable.
        let originsWasNull = origins === null;
        if(originsWasNull) origins = [-1, -1, -1, -1, -1, -1];

        // Update the cost to reach this node (this cube from this direction).
        // Only update if the cost is less than the existing cost.
        if(
            origins[node.direction] === -1
            || node.cost < origins[node.direction]
        ) origins[node.direction] = node.cost;

        if(originsWasNull) this.originMap.add(node.cube, origins);
        else this.originMap.set(node.cube, origins);
    }

    // Returns whether a node has already been visited.
    // (same cube and same direction.)
    private haveVisited(node: FrontierNode): boolean {
        let origins: Origins = this.originMap.get(node.cube);
        
        if(origins !== null) return origins[node.direction] > 0;
        else return false;
    }

    // Generate 3 child nodes from parent node: one for each turn.
    private spawnChildNodes(parentNode: FrontierNode) {
        for(let turn of [0, 1, 5]) {
            let childDirection = (parentNode.direction + turn) % 6;
            let childNode: FrontierNode = {
                cube: parentNode.cube.neighbour(childDirection),
                direction: childDirection,
                cost: parentNode.cost + 1
            };
            this.frontier.push(childNode);

            // DEBUG: highnight child nodes in colour...
            //this.highlight(childNode.cube, frontier.length * 0.02);
        }
    }

    // Examine the next frontier node and increment the head.
    private examineNextNode(world: World) {
        let node = this.frontier.pop();
        let cell = world.getCell(node.cube);

        if(cell !== null && cell.isPassable()) {
            if(cell.getState() === CellState.FOOD) {
                //console.log("FOUND GOAL: " + node.cube.toString());
                this.goal = node.cube;
            } else {
                if(!this.haveVisited(node)) {
                    this.spawnChildNodes(node);
                }
            }

            this.addOrigin(node);
        }
    };

    public getOriginCubeMap() {
        return this.originMap;
    }
    public getGoal() {
        return this.goal;
    }
}