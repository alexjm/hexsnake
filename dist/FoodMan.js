"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Item_1 = require("./Item");
var Cell_1 = require("./Cell");
var FoodMan = (function () {
    function FoodMan(world) {
        this.world = world;
        this.items = [];
        this.assessFoodSituation();
    }
    FoodMan.prototype.handleTickBegin = function () {
        this.assessFoodSituation();
    };
    FoodMan.prototype.handleItemEat = function (item) {
        this.items.splice(this.items.indexOf(item), 1);
    };
    FoodMan.prototype.assessFoodSituation = function () {
        var nItemsToSpawn = 3 - this.items.length;
        for (var i = 0; i < nItemsToSpawn; i++) {
            this.spawnFood();
        }
    };
    FoodMan.prototype.spawnFood = function () {
        var cell = this.pickSpawnCell();
        if (cell !== null) {
            var item = new Item_1.default(Item_1.ItemType.FOOD);
            this.items.push(item);
            cell.set(Cell_1.CellState.FOOD, item);
        }
    };
    FoodMan.prototype.pickSpawnCell = function () {
        for (var i = 0; i < 100; i++) {
            var cell = this.world.getRandomCell();
            // TODO: Consider neighbouring cells.
            switch (cell.getState()) {
                case Cell_1.CellState.CLEAR:
                    return cell;
            }
        }
        return null;
    };
    return FoodMan;
}());
exports.default = FoodMan;
//# sourceMappingURL=FoodMan.js.map