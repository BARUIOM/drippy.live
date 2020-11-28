<template>
    <div class="truncate">
        <template v-for="(element, i) in elements">
            <div class="inline-block" :key="i">
                <span v-if="i > 0" class="mx-2" v-text="separator" />
                <span
                    class="hover:underline hover:text-black dark:hover:text-white"
                    v-text="element.text"
                    @click.stop="open(arguments[0], element)"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

export interface Element {

    readonly text: string

    readonly route: string

    readonly param: string

}

@Component
export default class Hyperlink extends Vue {

    @Prop({ required: true })
    private readonly elements!: Element[];

    @Prop({ default: '•' })
    private separator!: string;

    public open(event: Event, element: Element) {
        this.$router.push({
            name: element.route,
            params: { id: element.param }
        });
    }

}
</script>

<style lang="scss" scoped>
span.link {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
}

span.link:hover {
    color: white;
    text-decoration: underline;
}
</style>