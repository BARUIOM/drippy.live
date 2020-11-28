<template>
    <Container
        v-bind:headline="artist.name"
        v-bind:thumbnail="
            (artist.images[0] || $drippy.thumbnails['artist']).url
        "
    >
        <div class="p-2">
            <Collection
                title="Albums"
                v-bind:collection="albums"
                @click="open"
            />
            <Collection
                title="Singles &amp; EPs"
                v-bind:collection="singles"
                @click="open"
            />
            <Collection
                title="Compilations"
                v-bind:collection="compilations"
                @click="open"
            />
            <Collection
                title="Appears on"
                v-bind:collection="related"
                @click="open"
            />
        </div>
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import { Component, Watch } from 'vue-property-decorator'

import Collection from '@/components/misc/Collection.vue'
import Container from '@/components/misc/Container.vue'

@Component({ components: { Collection, Container } })
export default class Artist extends Vue {

    private artist: any = {
        name: '',
        images: [{ url: '' }]
    };

    private albums: any[] = [];
    private singles: any[] = [];
    private compilations: any[] = [];
    private related: any[] = [];

    public open(artist: any): void {
        this.$router.push({ name: 'album', params: { id: artist['id'] } });
    }

    @Watch('$route', { immediate: true, deep: true })
    private change(route: Route): void {
        const artist_id = route.params['id'];
        this.$drippy.getArtist(artist_id)
            .then(artist =>
                this.artist = Object.freeze(artist)
            );

        this.$drippy.getCollection(artist_id, 'album')
            .then(albums =>
                this.albums = Object.freeze(albums)
            );

        this.$drippy.getCollection(artist_id, 'single')
            .then(singles =>
                this.singles = Object.freeze(singles)
            );

        this.$drippy.getCollection(artist_id, 'compilation')
            .then(compilations =>
                this.compilations = Object.freeze(compilations)
            );

        this.$drippy.getCollection(artist_id, 'appears_on')
            .then(related =>
                this.related = Object.freeze(related)
            );
    }

}
</script>