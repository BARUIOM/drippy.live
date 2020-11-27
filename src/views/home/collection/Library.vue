<template>
    <div class="p-2">
        <div class="w-full">
            <div class="p-2 text-xl font-bold">Artists</div>
        </div>
        <div class="w-full">
            <div class="p-2 text-xl font-bold">Playlists</div>
            <div class="flex flex-wrap">
                <template v-for="(playlist, i) in $user.collection.playlists">
                    <div :key="i" class="p-2 w-1/2 sm:w-1/4 lg:w-1/6 xl:w-1/8">
                        <ContentCard
                            :title="playlist.name"
                            :cover="playlist.images[0].url"
                            @click="open('playlist', playlist.id)"
                        />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import ContentCard from '@/components/ContentCard.vue'

@Component({ components: { ContentCard } })
export default class Library extends Vue {

    public mounted(): void {
        this.$user.on('ready', () => this.$forceUpdate());
    }

    public open(name: string, id: string): void {
        this.$router.push({ name, params: { id } });
    }

}
</script>