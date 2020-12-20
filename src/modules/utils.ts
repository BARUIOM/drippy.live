export interface Element {

    readonly text: string

    readonly route: string

    readonly param: string

}

export enum MessageType {

    Success = 'success', Error = 'error', Alert = 'alert'

}

export interface Message {

    readonly type: MessageType;
    readonly text: string;

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

    public static remove(key: string): void {
        localStorage.removeItem(key);
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

    public static remove(key: string): void {
        sessionStorage.removeItem(key);
    }

}

const breakpoints = {
    '$sm': false,
    '$md': false,
    '$lg': false,
    '$xl': false
}

window.addEventListener('resize', (event: UIEvent) => {
    const width = window.innerWidth;

    breakpoints['$sm'] = width >= 640;
    breakpoints['$md'] = width >= 768;
    breakpoints['$lg'] = width >= 1024;
    breakpoints['$xl'] = width >= 1280;
});

window.dispatchEvent(new Event('resize'));

export class Utils {

    public static range(value: number, min: number = 0, max: number = 0): number {
        return Math.min(Math.max(value, min), max);
    }

    public static format(ms: number): string {
        return new Date(Math.floor(ms))
            .toLocaleTimeString()
            .replace(/[A-Z]/gi, '').trim()
            .split(/:(.+)/, 2)[1];
    }

    public static map(array: any[], route: string): readonly Element[] {
        const elements = array.map(e => ({
            text: e.name || e.display_name,
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

    public static shuffle(array: any[]): any[] {
        return array.map(a => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort).map(a => a.value);
    }

    public static get(images: { url?: string }[], size: 'small' | 'medium' | 'large'): string | undefined {
        if (images.length) {
            switch (size) {
                case 'small':
                    return images[2].url;
                case 'medium':
                    return images[1].url;
                case 'large':
                    return images[0].url;
            }
        }
    }

    public static get $breakpoints() {
        return breakpoints;
    }

}