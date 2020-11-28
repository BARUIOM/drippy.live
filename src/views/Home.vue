<template>
    <div class="flex flex-col h-screen">
        <header
            class="shadow-md h-16 bg-accent-light dark:bg-accent-dark"
        ></header>
        <main
            class="flex flex-wrap h-full bg-main-light text-black dark:bg-main-dark dark:text-white overflow-auto"
        >
            <router-view />
        </main>
        <footer
            class="border-t border-opacity-10 border-black dark:border-white shadow-md h-20 bg-accent-light dark:bg-accent-dark"
        ></footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
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