"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("./Item");
const Cell_1 = require("./Cell");
class FoodMan {
    constructor(world) {
        this.world = world;
        this.items = [];
        this.assessFoodSituation();
    }
    handleTickBegin() {
        this.assessFoodSituation();
    }
    handleItemEat(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }
    assessFoodSituation() {
        let nItemsToSpawn = 3 - this.items.length;
        for (let i = 0; i < nItemsToSpawn; i++) {
            this.spawnFood();
        }
    }
    spawnFood() {
        let cell = this.pickSpawnCell();
        if (cell !== null) {
            let item = new Item_1.default(Item_1.ItemType.FOOD);
            this.items.push(item);
            cell.set(Cell_1.CellState.FOOD, item);
        }
    }
    pickSpawnCell() {
        for (let i = 0; i < 100; i++) {
            let cell = this.world.getRandomCell();
            // TODO: Consider neighbouring cells.
            switch (cell.getState()) {
                case Cell_1.CellState.CLEAR:
                    return cell;
            }
        }
        return null;
    }
}
exports.default = FoodMan;
//# sourceMappingURL=FoodMan.js.map