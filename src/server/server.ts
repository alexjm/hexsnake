import Cube from '../core/Cube';
import World from '../core/World';
import ASCIIRenderer from '../renderer/ASCIIRenderer';
import FoodMan from '../core/./FoodMan';
import Snake from '../core/./Snake';
import Driver, { DummyDriver } from '../driver/Driver';
import PlayerDriver from '../driver/PlayerDriver';
import RobotDriver from '../driver/RobotDriver';
import Ticker from '../core/./Ticker';
import DbLogger from "./DbLogger";
import Eventer from "../core/Eventer";

class HexSnakeServer {
    public static async main(): Promise<number> {
        console.log("Hex Snake Server")
        
        const ee = new Eventer()

        let world = new World()
        for(let i = 0; i < 10; i++) world.makeRing(i)

        let asciiRenderer = new ASCIIRenderer(world, ee)

        let logger = new DbLogger()
        await logger.setupPromise


        let foodMan = new FoodMan(world)

        let ticker = new Ticker(world, ee, [ foodMan ], [ logger ])

        for(let i = 0; i < 2; i++) {

            let snake = new Snake(i)
            world.addSnake(snake)

            let driver = new RobotDriver(snake)
            ticker.addDriver(driver)
            snake.setDriver(driver)
        }

        ticker.start()

        return 0
    }
}

HexSnakeServer.main();