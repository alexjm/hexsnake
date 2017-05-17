import Driver from './Driver';
import World from '../core/World';
import Snake from '../core/./Snake';
import Navigator from '../navigator/Navigator';

export default class RobotDriver extends Driver {
    private navigator: Navigator;

    constructor(snake: Snake | null) {
        super(snake);
        this.navigator = new Navigator(this.snake);
    }
    
    public think(world: World) {
        let nextTurn = this.navigator.getTurn(world);
        this.snake.turn(nextTurn);
    }

    public getNavigator(): Navigator {
        return this.navigator;
    }
}