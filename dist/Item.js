"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Item = (function () {
    function Item(type) {
        this.type = type;
    }
    Item.prototype.getType = function () {
        return this.type;
    };
    return Item;
}());
exports.default = Item;
var ItemType;
(function (ItemType) {
    ItemType[ItemType["FOOD"] = 0] = "FOOD";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
//# sourceMappingURL=Item.js.map