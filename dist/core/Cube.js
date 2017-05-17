"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cube {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getZ() {
        return this.z;
    }
    clone() {
        return new Cube(this.x, this.y, this.z);
    }
    step(direction) {
        direction += Math.ceil(direction / -6) * 6;
        this.add(Cube.neighbours[direction % 6]);
        return this;
    }
    neighbour(direction) {
        return this.clone().step(direction);
    }
    add(cube) {
        this.x += cube.x;
        this.y += cube.y;
        this.z += cube.z;
        return this;
    }
    equals(cube) {
        return this.x === cube.x
            && this.y === cube.y
            && this.z === cube.z;
    }
    position() {
        return {
            x: this.x - ((this.y + this.z) / 2),
            y: (this.y - this.z) * Math.sqrt(3) / 2
        };
    }
    toString() {
        let str = 'x:' + this.x + ', y:' + this.y + ', z:' + this.z;
        return str;
    }
}
Cube.neighbours = [
    new Cube(1, -1, 0), new Cube(1, 0, -1),
    new Cube(0, 1, -1), new Cube(-1, 1, 0),
    new Cube(-1, 0, 1), new Cube(0, -1, 1)
];
exports.default = Cube;
//# sourceMappingURL=Cube.js.map