"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
}
exports.default = Item;
var ItemType;
(function (ItemType) {
    ItemType[ItemType["FOOD"] = 0] = "FOOD";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
//# sourceMappingURL=Item.js.map