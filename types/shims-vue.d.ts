declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module '*.scss' {
    const record: Record<string, string>;
    export default record;
}