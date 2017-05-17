"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Frontier for search.
 * Is it a queue? Yes it is.
 */
class Frontier {
    constructor() {
        this.array = [];
        this.head = 0;
    }
    push(node) {
        this.array.push(node);
    }
    count() {
        return this.array.length - this.head;
    }
    pop() {
        return this.array[this.head++];
    }
}
exports.default = Frontier;
//# sourceMappingURL=Frontier.js.map