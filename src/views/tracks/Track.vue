<template></template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Track extends Vue {

    public async mounted(): Promise<void> {
        if (this.$route.params['id']) {
            const track = await this.$drippy.getTrack(this.$route.params['id']);

            this.$router.push({
                name: 'album',
                params: {
                    id: track['album'].id
                },
                query: {
                    highlight: track.id
                }
            });
        }
    }

}
</script>