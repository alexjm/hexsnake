"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A CubeMap is a collection of cells, accessible by
 * cube coordinates.
 */
var CubeMap = (function () {
    function CubeMap() {
        this.map = [[], []];
    }
    CubeMap.prototype.get = function (cube) {
        var _a = this.indices(cube.getX(), cube.getY()), xs = _a[0], xn = _a[1], ys = _a[2], yn = _a[3];
        if (this.map[xs][xn] !== undefined
            && this.map[xs][xn][ys][yn] !== undefined) {
            // Cube set.
            return this.map[xs][xn][ys][yn];
        }
        else {
            return null; // Cube not set.
        }
    };
    CubeMap.prototype.has = function (cube) {
        var _a = this.indices(cube.getX(), cube.getY()), xs = _a[0], xn = _a[1], ys = _a[2], yn = _a[3];
        return this.map[xs][xn] !== undefined
            && this.map[xs][xn][ys][yn] !== undefined;
    };
    CubeMap.prototype.add = function (cube, value) {
        // Add to map.
        var _a = this.indices(cube.getX(), cube.getY()), xs = _a[0], xn = _a[1], ys = _a[2], yn = _a[3];
        if (this.map[xs][xn] === undefined)
            this.map[xs][xn] = [[], []];
        this.map[xs][xn][ys][yn] = value;
    };
    CubeMap.prototype.set = function (cube, value) {
        // Set value with existing cube index.
        var _a = this.indices(cube.getX(), cube.getY()), xs = _a[0], xn = _a[1], ys = _a[2], yn = _a[3];
        this.map[xs][xn][ys][yn] = value;
    };
    CubeMap.prototype.indices = function (x, y) {
        // Signs (0=positive, 1=negative)
        var xs = x < 0 ? 1 : 0;
        var ys = y < 0 ? 1 : 0;
        // Normalised (negative numbers are flipped and start at 0, not -1)
        var xn = x < 0 ? -1 - x : x;
        var yn = y < 0 ? -1 - y : y;
        return [xs, xn, ys, yn];
    };
    return CubeMap;
}());
exports.default = CubeMap;
//# sourceMappingURL=CubeMap.js.map