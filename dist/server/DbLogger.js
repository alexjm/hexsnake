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
//import sql from 'mssql'
var sql = require('mssql');
class DbLogger {
    constructor() {
        this.setupPromise = this.setupDbConn();
    }
    setupDbConn() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pool = yield sql.connect('mssql://hexsnake:password@localhost/hexsnake');
            yield sql.query `delete from snake_tick`;
            const result = yield sql.query `select * from snake_tick`;
            console.dir(result);
        });
    }
    onSnakeMove(tickId, snake, cube) {
        let s = snake.getId();
        let t = tickId;
        let x = cube.getX();
        let y = cube.getY();
        const result = sql.query `insert into snake_tick (snake, tick, x, y) values (${s}, ${t}, ${x}, ${y})`;
    }
}
exports.default = DbLogger;
//# sourceMappingURL=DbLogger.js.map