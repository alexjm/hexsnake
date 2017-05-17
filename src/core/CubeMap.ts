import Cube from './Cube';

/**
 * A CubeMap is a collection of cells, accessible by
 * cube coordinates.
 */
export default class CubeMap<T> {
    // Collection of T, indexed by Cube.
    private map: [
        [T[], T[]][],
        [T[], T[]][]
    ];

    constructor() {
        this.map = [[], []];
    }

    public get(cube: Cube): T {
        let [xs, xn, ys, yn] = this.indices(cube.getX(), cube.getY());

        if(this.map[xs][xn] !== undefined
        && this.map[xs][xn][ys][yn] !== undefined) {
            // Cube set.
            return this.map[xs][xn][ys][yn]; 
        }
        else {
            return null; // Cube not set.
        }
    }
    
    public has(cube: Cube): boolean {
        let [xs, xn, ys, yn] = this.indices(cube.getX(), cube.getY());
        return this.map[xs][xn] !== undefined
            && this.map[xs][xn][ys][yn] !== undefined;
    }

    public add(cube: Cube, value: T) {
        // Add to map.
        let [xs, xn, ys, yn] = this.indices(cube.getX(), cube.getY());
        if(this.map[xs][xn] === undefined) this.map[xs][xn] = [[], []];
        this.map[xs][xn][ys][yn] = value;
    }

    public set(cube: Cube, value: T) {
        // Set value with existing cube index.
        let [xs, xn, ys, yn] = this.indices(cube.getX(), cube.getY());
        this.map[xs][xn][ys][yn] = value;
    }

    private indices(x: number, y: number): [number, number, number, number] {
        // Signs (0=positive, 1=negative)
        let xs = x < 0 ? 1 : 0;
        let ys = y < 0 ? 1 : 0;

        // Normalised (negative numbers are flipped and start at 0, not -1)
        let xn = x < 0 ? -1 - x : x;
        let yn = y < 0 ? -1 - y : y;

        return [xs, xn, ys, yn];
    }
}