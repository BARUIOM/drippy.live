<template>
    <Container v-bind:headline="artist.name" v-bind:thumbnail="artist.images[0].url">
        <template v-slot:actions>
            <div class="row q-gutter-sm">
                <q-btn icon="more_horiz" flat />
                <q-btn flat>Follow</q-btn>
            </div>
        </template>

        <Collection title="Albums" v-bind:collection="artist.albums" />
        <Collection title="Singles & EPs" v-bind:collection="artist.singles" />
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Collection from '@/components/artist/Collection.vue'
import Container from '@/components/misc/Container.vue'

@Component({ components: { Collection, Container } })
export default class Artist extends Vue {

    private artist: any = {
        name: '',
        images: [
            {
                url: require('@/assets/person_white.png')
            }
        ]
    };

    async mounted() {
        this.artist = await this.$drippy.getArtist(this.$route.params['id']);
    }

}
</script>