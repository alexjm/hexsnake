import Segment from './Segment';
import Cube from './Cube';
import Item, { ItemType } from './Item';
import Driver from '../driver/Driver';

export enum Turn {
    LEFT = 1,
    STRAIGHT = 0,
    RIGHT = -1
}

export default class Snake {
    private id: number;
    private segments: Segment[];
    private driver: Driver | null;

    constructor(id: number) {
        this.id = id
        this.segments = []
        this.driver = null
    }

    public getId(): number {
        return this.id
    }

    public spawn(headCube: Cube, headDirection: number, length: number) {
        // Discard the old segments.
        this.segments = [];

        // Create new segments.
        
        let direction = headDirection
        let directionBack = direction + 3

        let cube = headCube.clone();
        for(let i = 0; i < length; i++) {
            let segment = new Segment(this, cube.clone(), direction);
            this.segments.push(segment);
            
            
            cube = cube.neighbour(directionBack)
        }
    }

    public turn(turn: Turn) {
        if(this.segments.length < 1) throw new Error("Cannot turn because snake has no segments!");
        
        let canTurn = true;

        // If snake has a tail, new direction must be no more than 1 turn from straight.
        if(this.segments.length > 1) {
            let newDirection = this.segments[0].getDirection() + turn;
            //newDirection += Math.ceil(newDirection / -6) * 6;
            let prevDirection = this.segments[1].getDirection();// Final direction in previous tick (one back from head).
            canTurn = Math.abs(newDirection - prevDirection) <= 1;
        }

        if(canTurn) this.segments[0].turn(turn);
        else console.log("CANNOT TURN!");
    }

    public getNextCube(): Cube {
        if(this.segments.length < 1) throw new Error("Cannot get next cube because snake has no segments!");

        let headSegment = this.segments[0];
        let nextCube = headSegment.getCube().clone();
        nextCube.step(headSegment.getDirection());
        return nextCube;
    }

    public stepForward() {
        // Step each segment forward starting from the back.
        for(let i = this.segments.length-1; i >= 0; i--) {
            let segment = this.segments[i];
            let higherSegment = i !== 0 ? this.segments[i-1] : null;// Segment one-closer to head.
            let furtherSegment = i !== this.segments.length-1 ? this.segments[i+1] : null;// Segment one-further from head.

            // Push food towards tail.
            if(segment.isFed()) {
                segment.setFed(false);
                if(furtherSegment === null) this.grow();// Grow if last segment.
                else furtherSegment.setFed(true);// Push food along.
            }

            // Step into higher segment's position.
            segment.stepForward();
            if(higherSegment !== null) segment.turn(higherSegment.getDirection() - segment.getDirection());
        }
    }

    public eat(item: Item) {
        switch(item.getType()) {
            case ItemType.FOOD:
                let segment = this.getHeadSegment();
                segment.setFed(true);
                break;
        }
    }
    
    private grow() {
        let tail = this.getTailSegment();
        let newTail = new Segment(this, tail.getCube().clone(), tail.getDirection());
        this.segments.push(newTail);
    }

    public setDriver(driver: Driver) {
        this.driver = driver;
    }

    public isSpawned(): boolean {
        return this.segments.length > 0
    }

    public getHeadSegment(): Segment {
        return this.segments[0];
    }

    public getTailSegment(): Segment {
        return this.segments[this.segments.length-1];
    }

    public getSegments(): Segment[] {
        return this.segments;
    }

    public getDriver(): Driver {
        return this.driver;
    }
}
