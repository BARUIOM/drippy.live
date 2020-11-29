<template>
    <div class="flex flex-col h-screen text-black dark:text-white">
        <header class="shadow-md bg-accent-light dark:bg-accent-dark"></header>
        <main
            class="flex flex-wrap h-full bg-main-light dark:bg-main-dark overflow-x-hidden overflow-y-auto"
        >
            <router-view />
        </main>
        <footer class="shadow-md bg-accent-light dark:bg-accent-dark"></footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

export default class Home extends Vue {

}
</script>

<style lang="scss">
header {
    flex: 0 0 54px;
}

footer {
    flex: 0 0 72px;
}
</style>