/**
 * Event emitter objects, for emitting events.
 * Publish / Subscribe
 */

type EventHandler = (message: any) => void

export default class Eventer {

    private subs: { [key:string]: EventHandler[] }

    public constructor() {
        this.subs = {}
    }


    public sub(channel: string, listener: EventHandler) {
        if(! this.subs.hasOwnProperty(channel)) this.subs[channel] = []

        const arr = this.subs[channel]
        arr.push(listener)

        const unsub = () => arr.splice(arr.indexOf(listener), 1)
        return unsub
    }


    public emit(channel: string, message: any) {
        if(this.subs.hasOwnProperty(channel)) this.subs[channel].forEach(listener => listener(message))
    }

}