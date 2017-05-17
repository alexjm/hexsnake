import World from '../core/World';
import Cell from '../core/Cell';

abstract class Renderer {
    protected world: World;

    constructor(world: World) {
        this.world = world;
    }

    public start() {}

}

export default Renderer;
