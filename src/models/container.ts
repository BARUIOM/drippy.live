export interface Item {

    readonly id: string;

}

export default class Container<T extends Item> {

    private _data: string[] = [];
    private _collection: Map<string, T> = new Map();

    public unshift(item: T): void {
        this._data.unshift(item.id);
        this._collection.set(item.id, item);
    }

    public push(item: T): void {
        this._data.push(item.id);
        this._collection.set(item.id, item);
    }

    public remove(id: string): void {
        this._data.splice(this._data.indexOf(id), 1);
        this._collection.delete(id);
    }

    public contains(id: string): boolean {
        return this._collection.has(id);
    }

    public get collection(): T[] {
        return this._data.map(e => this._collection.get(e) as T);
    }

    public set collection(collection: T[]) {
        this._data = collection.map(e => e.id);
        collection.forEach(e => this._collection.set(e.id, e));
    }

}