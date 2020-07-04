<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-grey-10">
            <q-toolbar>
                <q-btn @click="drawer = !drawer" icon="menu" flat dense></q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" :width="256" :breakpoint="500" show-if-above bordered>
            <Drawer />
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'

import Drawer from '@/components/home/Drawer.vue'

export default Vue.extend({
    components: { Drawer },
    data: () => ({
        drawer: false
    })
});
</script>