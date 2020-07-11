<template>
    <Container v-bind:headline="artist.name" v-bind:thumbnail="artist.images[0].url">
        <template v-slot:actions>
            <q-btn icon="more_horiz" flat />
            <q-btn flat>Follow</q-btn>
        </template>

        <Collection title="Albums" v-bind:collection="artist.albums" @click="open" />
        <Collection title="Singles & EPs" v-bind:collection="artist.singles" @click="open" />
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import { Component, Watch } from 'vue-property-decorator'

import Collection from '@/components/artist/Collection.vue'
import Container from '@/components/misc/Container.vue'

@Component({ components: { Collection, Container } })
export default class Artist extends Vue {

    private artist: any = {
        name: '',
        images: [
            {
                url: ''
            }
        ]
    };

    public async mounted(): Promise<void> {
        this.artist = await this.$drippy.getArtist(this.$route.params['id']);
    }

    public open(id: string): void {
        this.$router.push({ name: 'album', params: { id } });
    }


    @Watch('$route', { immediate: true, deep: true })
    private async change(route: Route): Promise<void> {
        this.artist = await this.$drippy.getArtist(route.params['id']);
    }

}
</script>