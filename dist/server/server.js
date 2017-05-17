"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const World_1 = require("../core/World");
const ASCIIRenderer_1 = require("../renderer/ASCIIRenderer");
const FoodMan_1 = require("../core/./FoodMan");
const Snake_1 = require("../core/./Snake");
const RobotDriver_1 = require("../driver/RobotDriver");
const Ticker_1 = require("../core/./Ticker");
const DbLogger_1 = require("./DbLogger");
const Eventer_1 = require("../core/Eventer");
class HexSnakeServer {
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Hex Snake Server");
            const ee = new Eventer_1.default();
            let world = new World_1.default();
            for (let i = 0; i < 10; i++)
                world.makeRing(i);
            let asciiRenderer = new ASCIIRenderer_1.default(world, ee);
            let logger = new DbLogger_1.default();
            yield logger.setupPromise;
            let foodMan = new FoodMan_1.default(world);
            let ticker = new Ticker_1.default(world, ee, [foodMan], [logger]);
            for (let i = 0; i < 2; i++) {
                let snake = new Snake_1.default(i);
                world.addSnake(snake);
                let driver = new RobotDriver_1.default(snake);
                ticker.addDriver(driver);
                snake.setDriver(driver);
            }
            ticker.start();
            return 0;
        });
    }
}
HexSnakeServer.main();
//# sourceMappingURL=server.js.map