"use strict";
/**
 * Event emitter objects, for emitting events.
 * Publish / Subscribe
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Eventer {
    constructor() {
        this.subs = {};
    }
    sub(channel, listener) {
        if (!this.subs.hasOwnProperty(channel))
            this.subs[channel] = [];
        const arr = this.subs[channel];
        arr.push(listener);
        const unsub = () => arr.splice(arr.indexOf(listener), 1);
        return unsub;
    }
    emit(channel, message) {
        if (this.subs.hasOwnProperty(channel))
            this.subs[channel].forEach(listener => listener(message));
    }
}
exports.default = Eventer;
//# sourceMappingURL=Eventer.js.map