<template>
    <div class="ellipsis">
        <template v-for="(artist, i) in artists">
            <span
                v-if="i > 0"
                v-bind:class="{ 'q-mx-xs': spacer, 'q-mr-xs': !spacer }"
                v-text="separator"
                :key="'s' + i"
            />
            <span
                :key="'a' + i"
                v-bind:class="{ 'link': !disabled }"
                v-text="artist.name"
                @click="open(arguments[0], artist.id)"
            />
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import Artist from '@/models/artist'

@Component
export default class ArtistHyperlink extends Vue {

    @Prop({ required: true })
    private artists!: Artist[];

    @Prop({ default: ',' })
    private separator!: string;

    @Prop({ default: false })
    private spacer!: boolean;

    @Prop({ default: false })
    private disabled!: boolean;

    public open(event: Event, id: string) {
        if (!this.disabled) {
            event.stopPropagation();
            this.$router.push({ name: 'artist', params: { id } });
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