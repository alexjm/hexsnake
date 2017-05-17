//import sql from 'mssql'
var sql = require('mssql')
// ^^ TODO: fix module system

import Logger from '../core/Logger'
import Snake from "../core/Snake";
import Cube from "../core/Cube";

export default class DbLogger implements Logger {
    private pool

    public setupPromise: Promise<void>

    constructor() {
        this.setupPromise = this.setupDbConn()
    }


    public async setupDbConn() {
        this.pool = await sql.connect('mssql://hexsnake:password@localhost/hexsnake')
        await sql.query`delete from snake_tick`
        const result = await sql.query`select * from snake_tick`
        console.dir(result)
    }


    onSnakeMove(tickId: number, snake: Snake, cube: Cube) {

        let s = snake.getId()
        let t = tickId
        let x = cube.getX()
        let y = cube.getY()
        
        const result = sql.query`insert into snake_tick (snake, tick, x, y) values (${s}, ${t}, ${x}, ${y})`;
    }
    

}