import Cell, { CellState } from '../../core/Cell';
import Segment from '../../core/Segment';

/**
 * A Cell3D is a THREE.Mesh that represents a cell in the world.
 */
export default class Cell3D extends THREE.Mesh {
    private cell: Cell;

    constructor(cell: Cell) {
        super(Cell3D.geometry.clone(), Cell3D.material);
        this.cell = cell;

        this.rotation.y = Math.PI / 6;

        let pos = this.cell.getCube().position();
        this.position.set(pos.x, 0, pos.y);
    }

    public animate() {
        switch(this.cell.getState()) {
            case CellState.CLEAR:
                this.setColor(new THREE.Color().setHSL(
                    0.5,// Sea blue
                    0.4,
                    0.9
                ));
                break;
            case CellState.SNAKE:
                /*this.setColor((<Segment>this.cell.getEntity()).getSnake().color.clone()
                        .offsetHSL(0.025 * sine, 0, 0);*/
                this.setColor(new THREE.Color().setHSL(
                    0.8,
                    0.4,
                    0.5
                ));
                break;
            case CellState.FOOD:
                this.setColor(new THREE.Color().setHSL(
                    0.2,
                    0.75,
                    0.4
                ));
                break;
        }
    }

    private setColor(color: THREE.Color) {
        let geom = <THREE.Geometry>this.geometry;
        const faceIndices = ['a', 'b', 'c'];
        for (let face of geom.faces) {
            for (let i = 0; i < 3; i++) {
                let vertex = geom.vertices[face[faceIndices[i]]];
                if (vertex.y > 0) {
                    // Copy the color, don't assign it.
                    // http://stackoverflow.com/questions/17874682/dynamically-change-vertex-color-in-three-js
                    face.vertexColors[i].copy(color);
                };
            }
        }
        geom.colorsNeedUpdate = true;
    }


    private static geometry: THREE.Geometry = (() => {
        let height = 8;
        let geom = new THREE.CylinderGeometry(.9, .9, height, 6, 1, false);

        const faceIndices = ['a', 'b', 'c'];
        for (let face of geom.faces) {
            for (let i = 0; i < 3; i++) {
                let vertex = geom.vertices[face[faceIndices[i]]];
                let color = new THREE.Color();
                if (vertex.y < 0) color.setHSL(0, 0, 1);// Bottom color.
                else color.setHSL(0, 0, 0.5);// Top color.
                face.vertexColors[i] = color;
            }
        }
        return geom;
    })();

    private static material: THREE.Material = (() => {
        let mat = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors
        });
        mat.side = THREE.DoubleSide;
        return mat;
    })();
} 