export interface Element {

    readonly text: string

    readonly route: string

    readonly param: string

}

export class LocalStorage {

    public static has(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    public static get(key: string): any {
        return JSON.parse(localStorage.getItem(key) as string);
    }

    public static set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

}

export class SessionStorage {

    public static has(key: string): boolean {
        return sessionStorage.getItem(key) !== null;
    }

    public static get(key: string): any {
        return JSON.parse(sessionStorage.getItem(key) as string);
    }

    public static set(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

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

    public static collect(data: any[], key: string): any[] {
        const map = new Map<string, any>();
        data.forEach(e => map.set(String(e[key]).toLowerCase().trim(), e));
        return Array.from(map.values());
    }

}