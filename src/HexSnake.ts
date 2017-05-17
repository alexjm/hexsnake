import Cube from './core/Cube';
import World from './core/World';
import ASCIIRenderer from './renderer/ASCIIRenderer';
import THREERenderer from './renderer/THREERenderer';
import FoodMan from './core/./FoodMan';
import Snake from './core/./Snake';
import Driver, { DummyDriver } from './driver/Driver';
import PlayerDriver from './driver/PlayerDriver';
import RobotDriver from './driver/RobotDriver';
import Ticker from './core/./Ticker';
import Eventer from "./core/Eventer";

class HexSnake {
    public static main(): number {
        console.log("Hex Snake");

        const ee = new Eventer()

        let world = new World()
        for(let i = 0; i < 10; i++) world.makeRing(i);

        let threeRenderer = new THREERenderer(world, ee);
        let asciiRenderer = new ASCIIRenderer(world, ee, (str) => {
            document.getElementById('world').innerHTML = str;
        });
        world.addRenderer(threeRenderer);// so world can tell threeRenderer about cell creates/deletes.

        let foodMan = new FoodMan(world);

        let ticker = new Ticker(world, ee, [ foodMan ], [])

        let snake = new Snake(0);
        world.addSnake(snake);

        let driver = new RobotDriver(snake);
        ticker.addDriver(driver);
        snake.setDriver(driver);

        threeRenderer.start();
        ticker.start();

        return 0;
    }
}

HexSnake.main();