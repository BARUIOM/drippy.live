<template>
    <div class="text-opacity-40 text-black dark:text-white truncate">
        <span v-for="(element, i) in elements" :key="i">
            <span v-if="i > 0" class="mx-2" v-text="separator" />
            <span
                class="cursor-pointer hover:underline hover:text-black dark:hover:text-white"
                v-text="element.text"
                @click.stop="open(arguments[0], element)"
            />
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { Element } from '@/modules/utils'

@Component
export default class Hyperlink extends Vue {

    @Prop({ required: true })
    private readonly elements!: Element[];

    @Prop({ default: '•' })
    private separator!: string;

    public open(event: Event, element: Element) {
        this.$emit('click', event);

        const { id } = this.$route.params;
        if (this.$route.name !== element.route || id !== element.param) {
            this.$router.push({
                name: element.route,
                params: { id: element.param }
            });
        }
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