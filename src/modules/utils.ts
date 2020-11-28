export default class Utils {

    public static format(ms: number): string {
        return new Date(Math.floor(ms))
            .toLocaleTimeString()
            .replace(/[A-Z]/gi, '').trim()
            .split(/:(.+)/, 2)[1];
    }

}