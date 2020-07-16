<template>
    <div class="ellipsis">
        <template v-for="(artist, i) in artists">
            <span
                v-if="i > 0"
                v-bind:class="{ 'q-mx-xs': spacer, 'q-mr-xs': !spacer }"
                v-text="separator"
                :key="'s' + i"
            />
            <span class="link" :key="'a' + i" v-text="artist.name" @click.stop="open(artist.id)" />
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

    public open(id: string) {
        this.$router.push({ name: 'artist', params: { id } });
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