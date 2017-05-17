import Driver from './Driver';
import World from '../core/World';
import Snake, { Turn } from '../core/./Snake';

export default class PlayerDriver extends Driver {
    constructor(snake: Snake | null) {
        super(snake);

        // Register key event listener.
        if(typeof document !== 'undefined') {
            document.addEventListener('keydown', (e) => {
                switch(e.keyCode) {
                    case 37: // left arrow
                    case 65: // A
                        this.turn(Turn.LEFT);
                        break;
                    case 39: // right arrow
                    case 68: // D
                        this.turn(Turn.RIGHT);
                        break;
                }
            });
        }
        if(typeof process !== 'undefined') {
            let tty = require('tty');
            let stdin = process.stdin;
            // TODO... accept input via console. 
        }
    }

    private turn(turn: Turn) {
        this.snake.turn(turn);
        console.log('Turned ' + Turn[turn]);
    }

    public think(world: World) {
        // Do nothing.
    }
}