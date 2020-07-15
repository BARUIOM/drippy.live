<template>
    <div class="row fit">
        <div class="col-12">
            <q-list class="nav" padding>
                <q-item clickable v-ripple to="/" exact>
                    <q-item-section avatar>
                        <q-icon name="mdi-home" />
                    </q-item-section>
                    <q-item-section>Home</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/collection" exact>
                    <q-item-section avatar>
                        <q-icon name="mdi-view-list" />
                    </q-item-section>
                    <q-item-section>Library</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/collection/tracks" exact>
                    <q-item-section avatar>
                        <q-icon name="mdi-thumb-up" />
                    </q-item-section>
                    <q-item-section>Liked songs</q-item-section>
                </q-item>
            </q-list>
            <div class="q-px-md flex flex-center">
                <span class="text-subtitle2 text-grey">Playlists</span>
                <q-space />
                <q-btn @click="$root.$emit('create')" icon="mdi-plus" flat dense></q-btn>
            </div>
        </div>
        <div class="col-12 playlists">
            <q-scroll-area class="fit">
                <q-list padding>
                    <template v-for="(item, i) in $user.collection.playlists">
                        <q-item
                            dense
                            clickable
                            v-ripple
                            :key="i"
                            :to="{ name: 'playlist', params: { id: item.id } }"
                        >
                            <q-item-section v-text="item.name"></q-item-section>
                        </q-item>
                    </template>
                </q-list>
            </q-scroll-area>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Drawer extends Vue {

}
</script>

<style lang="scss" scoped>
div.row {
    > div:nth-child(1) {
        height: 170px;
    }

    > div:nth-child(2) {
        height: calc(100% - 170px);
    }
}

.q-list.nav .q-item {
    min-height: 40px;
}
</style>