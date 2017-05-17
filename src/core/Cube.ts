export default class Cube {
    private x: number;
    private y: number;
    private z: number;

    constructor(x: number, y: number, z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    public getZ(): number {
        return this.z;
    }
    
    public clone(): Cube {
        return new Cube(this.x, this.y, this.z);
    }

    private static neighbours: Cube[] = [
        new Cube(1, -1, 0), new Cube(1, 0, -1),
        new Cube(0, 1, -1), new Cube(-1, 1, 0),
        new Cube(-1, 0, 1), new Cube(0, -1, 1)
    ];

    public step(direction: number): Cube {
        direction += Math.ceil(direction / -6) * 6;
        this.add(Cube.neighbours[direction % 6]);
        return this;
    }

    public neighbour(direction: number): Cube {
        return this.clone().step(direction);
    }

    public add(cube: Cube): Cube {
        this.x += cube.x;
        this.y += cube.y;
        this.z += cube.z;
        return this;
    }
    
    public equals(cube: Cube): boolean {
        return this.x === cube.x
            && this.y === cube.y
            && this.z === cube.z;
    }
    
    public position(): any {
        return {
            x: this.x - ((this.y + this.z) / 2),
            y: (this.y - this.z) * Math.sqrt(3) / 2
        };
    }

    public toString(): string {
        let str = 'x:'+this.x+', y:'+this.y+', z:'+this.z;
        return str;
    }
}
