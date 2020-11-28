export interface Element {

    readonly text: string

    readonly route: string

    readonly param: string

}

export default class Utils {

    public static format(ms: number): string {
        return new Date(Math.floor(ms))
            .toLocaleTimeString()
            .replace(/[A-Z]/gi, '').trim()
            .split(/:(.+)/, 2)[1];
    }

    public static map(array: any[], route: string): readonly Element[] {
        const elements = array.map(e => ({
            text: e.name,
            param: e.id,
            route
        } as Element));

        return Object.freeze(elements);
    }

}