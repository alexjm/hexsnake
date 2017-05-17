"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../../core/Cell");
/**
 * A Cell3D is a THREE.Mesh that represents a cell in the world.
 */
class Cell3D extends THREE.Mesh {
    constructor(cell) {
        super(Cell3D.geometry.clone(), Cell3D.material);
        this.cell = cell;
        this.rotation.y = Math.PI / 6;
        let pos = this.cell.getCube().position();
        this.position.set(pos.x, 0, pos.y);
    }
    animate() {
        switch (this.cell.getState()) {
            case Cell_1.CellState.CLEAR:
                this.setColor(new THREE.Color().setHSL(0.5, // Sea blue
                0.4, 0.9));
                break;
            case Cell_1.CellState.SNAKE:
                /*this.setColor((<Segment>this.cell.getEntity()).getSnake().color.clone()
                        .offsetHSL(0.025 * sine, 0, 0);*/
                this.setColor(new THREE.Color().setHSL(0.8, 0.4, 0.5));
                break;
            case Cell_1.CellState.FOOD:
                this.setColor(new THREE.Color().setHSL(0.2, 0.75, 0.4));
                break;
        }
    }
    setColor(color) {
        let geom = this.geometry;
        const faceIndices = ['a', 'b', 'c'];
        for (let face of geom.faces) {
            for (let i = 0; i < 3; i++) {
                let vertex = geom.vertices[face[faceIndices[i]]];
                if (vertex.y > 0) {
                    // Copy the color, don't assign it.
                    // http://stackoverflow.com/questions/17874682/dynamically-change-vertex-color-in-three-js
                    face.vertexColors[i].copy(color);
                }
                ;
            }
        }
        geom.colorsNeedUpdate = true;
    }
}
Cell3D.geometry = (() => {
    let height = 8;
    let geom = new THREE.CylinderGeometry(.9, .9, height, 6, 1, false);
    const faceIndices = ['a', 'b', 'c'];
    for (let face of geom.faces) {
        for (let i = 0; i < 3; i++) {
            let vertex = geom.vertices[face[faceIndices[i]]];
            let color = new THREE.Color();
            if (vertex.y < 0)
                color.setHSL(0, 0, 1); // Bottom color.
            else
                color.setHSL(0, 0, 0.5); // Top color.
            face.vertexColors[i] = color;
        }
    }
    return geom;
})();
Cell3D.material = (() => {
    let mat = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    mat.side = THREE.DoubleSide;
    return mat;
})();
exports.default = Cell3D;
//# sourceMappingURL=Cell3D.js.map