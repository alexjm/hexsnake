"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const World_1 = require("./core/World");
const ASCIIRenderer_1 = require("./renderer/ASCIIRenderer");
const THREERenderer_1 = require("./renderer/THREERenderer");
const FoodMan_1 = require("./core/./FoodMan");
const Snake_1 = require("./core/./Snake");
const RobotDriver_1 = require("./driver/RobotDriver");
const Ticker_1 = require("./core/./Ticker");
const Eventer_1 = require("./core/Eventer");
class HexSnake {
    static main() {
        console.log("Hex Snake");
        const ee = new Eventer_1.default();
        let world = new World_1.default();
        for (let i = 0; i < 10; i++)
            world.makeRing(i);
        let threeRenderer = new THREERenderer_1.default(world, ee);
        let asciiRenderer = new ASCIIRenderer_1.default(world, ee, (str) => {
            document.getElementById('world').innerHTML = str;
        });
        world.addRenderer(threeRenderer); // so world can tell threeRenderer about cell creates/deletes.
        let foodMan = new FoodMan_1.default(world);
        let ticker = new Ticker_1.default(world, ee, [foodMan], []);
        let snake = new Snake_1.default(0);
        world.addSnake(snake);
        let driver = new RobotDriver_1.default(snake);
        ticker.addDriver(driver);
        snake.setDriver(driver);
        threeRenderer.start();
        ticker.start();
        return 0;
    }
}
HexSnake.main();
//# sourceMappingURL=HexSnake.js.map