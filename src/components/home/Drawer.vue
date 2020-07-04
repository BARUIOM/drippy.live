<template>
    <div class="row">
        <div class="col-12">
            <q-list padding>
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
export default Vue.extend({

});
</script>