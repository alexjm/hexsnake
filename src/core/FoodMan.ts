import World from './World';
import Item, { ItemType } from './Item';
import Cell, { CellState } from './Cell';
import Cube from './Cube';

export default class FoodMan {
    private world: World;
    
    private items: Item[];

    constructor(world: World) {
        this.world = world;
        this.items = [];

        this.assessFoodSituation();
    }

    public handleTickBegin() {
        this.assessFoodSituation();
    }

    public handleItemEat(item: Item) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    private assessFoodSituation() {
        let nItemsToSpawn = 3 - this.items.length;
        for(let i = 0; i < nItemsToSpawn; i++) {
            this.spawnFood();
        }
    }

    private spawnFood() {
        let cell = this.pickSpawnCell();

        if(cell !== null) {
            let item = new Item(ItemType.FOOD);
            this.items.push(item);

            cell.set(CellState.FOOD, item);
        }
    }

    private pickSpawnCell(): Cell {
        for(let i = 0; i < 100; i++) {// Finite time.
            let cell = this.world.getRandomCell();

            // TODO: Consider neighbouring cells.
            
            switch(cell.getState()) {
                case CellState.CLEAR:
                    return cell;
            }
        }
        return null;
    }
}