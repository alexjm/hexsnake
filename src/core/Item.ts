

export default class Item {

    private type: ItemType;

    constructor(type: ItemType) {
        this.type = type;
    }

    public getType(): ItemType {
        return this.type;
    }

}

export enum ItemType {
    FOOD
}