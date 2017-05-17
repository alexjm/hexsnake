/**
 * Frontier for search.
 * Is it a queue? Yes it is.
 */
export default class Frontier<T> {
    // Frontier queue.
    private array: T[];
    private head: number;// queue

    constructor() {
        this.array = [];
        this.head = 0;
    }

    public push(node: T) {
        this.array.push(node);
    }
    
    public count(): number {
        return this.array.length - this.head;
    }

    public pop(): T {
        return this.array[this.head++];
    }
}