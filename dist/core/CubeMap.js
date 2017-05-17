"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A CubeMap is a collection of cells, accessible by
 * cube coordinates.
 */
class CubeMap {
    constructor() {
        this.map = [[], []];
    }
    get(cube) {
        let [xs, xn, ys, yn] = this.indices(cube.getX(), cube.getY());
        if (this.map[xs][xn] !== undefined
            && this.map[xs][xn][ys][yn] !== undefined) {
            // Cube set.
            return this.map[xs][xn][ys][yn];
        }
        else {
            return null; // Cube not set.
        }
    }
    has(cube) {
        let [xs, xn, ys, yn] = this.indices(cube.getX(), cube.getY());
        return this.map[xs][xn] !== undefined
            && this.map[xs][xn][ys][yn] !== undefined;
    }
    add(cube, value) {
        // Add to map.
        let [xs, xn, ys, yn] = this.indices(cube.getX(), cube.getY());
        if (this.map[xs][xn] === undefined)
            this.map[xs][xn] = [[], []];
        this.map[xs][xn][ys][yn] = value;
    }
    set(cube, value) {
        // Set value with existing cube index.
        let [xs, xn, ys, yn] = this.indices(cube.getX(), cube.getY());
        this.map[xs][xn][ys][yn] = value;
    }
    indices(x, y) {
        // Signs (0=positive, 1=negative)
        let xs = x < 0 ? 1 : 0;
        let ys = y < 0 ? 1 : 0;
        // Normalised (negative numbers are flipped and start at 0, not -1)
        let xn = x < 0 ? -1 - x : x;
        let yn = y < 0 ? -1 - y : y;
        return [xs, xn, ys, yn];
    }
}
exports.default = CubeMap;
//# sourceMappingURL=CubeMap.js.map