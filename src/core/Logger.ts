

import Cube from "./Cube";
import Snake from "./Snake";

interface Logger {

    onSnakeMove(tickId: number, snake: Snake, cube: Cube)

}

export default Logger