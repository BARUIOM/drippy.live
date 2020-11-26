<template>
    <div class="flex flex-col h-screen">
        <header
            class="shadow-md h-16 bg-accent-light dark:bg-accent-dark"
        ></header>
        <main
            class="flex flex-wrap p-2 h-full bg-main-light text-black dark:bg-main-dark dark:text-white overflow-auto"
        >
            <div class="w-full">
                <div class="p-2 text-xl font-bold">Artists</div>
            </div>
            <div class="w-full">
                <div class="p-2 text-xl font-bold">Playlists</div>
                <div class="flex flex-wrap">
                    <template
                        v-for="(playlist, i) in $user.collection.playlists"
                    >
                        <div
                            :key="i"
                            class="p-2 w-1/2 sm:w-1/4 lg:w-1/6 xl:w-1/8"
                        >
                            <ContentCard
                                :title="playlist.name"
                                :cover="playlist.images[0].url"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </main>
        <footer
            class="shadow-md h-20 bg-accent-light dark:bg-accent-dark"
        ></footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import ContentCard from '@/components/ContentCard.vue'

@Component({ components: { ContentCard } })
export default class Home extends Vue {

}
</script>

<style lang="scss">
@media screen and (min-width: 1024px) {
    .q-drawer {
        padding-bottom: 72px;
    }
}

.q-footer {
    left: 0px !important;
}
</style>