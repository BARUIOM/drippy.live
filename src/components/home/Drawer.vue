<template>
    <div class="row fit">
        <div class="col-12">
            <q-list class="nav" padding>
                <q-item clickable v-ripple to="/" exact>
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>Home</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/collection" exact>
                    <q-item-section avatar>
                        <q-icon name="view_list" />
                    </q-item-section>
                    <q-item-section>Library</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/collection/tracks" exact>
                    <q-item-section avatar>
                        <q-icon name="thumb_up" />
                    </q-item-section>
                    <q-item-section>Liked songs</q-item-section>
                </q-item>
            </q-list>
            <div class="q-px-md flex flex-center">
                <span class="text-subtitle2 text-grey">Playlists</span>
                <q-space />
                <q-btn icon="add" flat dense></q-btn>
            </div>
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
.q-list.nav .q-item {
    min-height: 40px;
    border-radius: 4px;
    margin: 0px 8px 4px 8px;
    padding: 0px 8px 0px 8px;
}
</style>