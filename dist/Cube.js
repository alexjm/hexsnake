"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube = (function () {
    function Cube(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Cube.prototype.getX = function () {
        return this.x;
    };
    Cube.prototype.getY = function () {
        return this.y;
    };
    Cube.prototype.getZ = function () {
        return this.z;
    };
    Cube.prototype.clone = function () {
        return new Cube(this.x, this.y, this.z);
    };
    Cube.prototype.step = function (direction) {
        direction += Math.ceil(direction / -6) * 6;
        this.add(Cube.neighbours[direction % 6]);
        return this;
    };
    Cube.prototype.neighbour = function (direction) {
        return this.clone().step(direction);
    };
    Cube.prototype.add = function (cube) {
        this.x += cube.x;
        this.y += cube.y;
        this.z += cube.z;
        return this;
    };
    Cube.prototype.equals = function (cube) {
        return this.x === cube.x
            && this.y === cube.y
            && this.z === cube.z;
    };
    Cube.prototype.position = function () {
        return {
            x: this.x - ((this.y + this.z) / 2),
            y: (this.y - this.z) * Math.sqrt(3) / 2
        };
    };
    Cube.prototype.toString = function () {
        var str = 'x:' + this.x + ', y:' + this.y + ', z:' + this.z;
        return str;
    };
    return Cube;
}());
Cube.neighbours = [
    new Cube(1, -1, 0), new Cube(1, 0, -1),
    new Cube(0, 1, -1), new Cube(-1, 1, 0),
    new Cube(-1, 0, 1), new Cube(0, -1, 1)
];
exports.default = Cube;
//# sourceMappingURL=Cube.js.map