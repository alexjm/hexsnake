"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = require("./Renderer");
const CubeMap_1 = require("../core/CubeMap");
const Cell3D_1 = require("./3d/Cell3D");
class THREERenderer extends Renderer_1.default {
    constructor(world, ee) {
        super(world);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xF5F5F5);
        this.parentEl = document.getElementById('game');
        let el = this.renderer.domElement;
        this.parentEl.appendChild(el);
        this.camera = new THREE.PerspectiveCamera(60, 4 / 3, 0.1, 100);
        this.camera.position.set(0, 20, 20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.resize();
        window.addEventListener('resize', (e) => this.resize());
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);
        this.cell3Ds = new CubeMap_1.default();
        this.cell3DsArray = [];
        for (let cell of this.world.getCellsArray())
            this.createCell3D(cell);
        ee.sub("CELL_CREATE", this.handleCellCreate.bind(this));
    }
    start() {
        this.animate();
    }
    animate() {
        requestAnimationFrame(() => {
            this.animate();
        });
        for (let cell3D of this.cell3DsArray)
            cell3D.animate();
        //this.renderer.setClearColor(Math.random() * 0xffffff);
        this.renderer.render(this.scene, this.camera);
    }
    resize() {
        // Get viewport dimensions.
        //let w = window.innerWidth;
        //let h = window.innerHeight;
        //let w = this.parentEl.clientWidth;
        //let h = this.parentEl.clientHeight;
        let w = 600;
        let h = 600;
        this.renderer.setSize(w, h);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    }
    handleCellCreate(cell) {
        this.createCell3D(cell);
    }
    createCell3D(cell) {
        let cell3D = new Cell3D_1.default(cell);
        this.cell3Ds.add(cell.getCube(), cell3D);
        this.cell3DsArray.push(cell3D);
        this.scene.add(cell3D);
    }
}
exports.default = THREERenderer;
//# sourceMappingURL=THREERenderer.js.map