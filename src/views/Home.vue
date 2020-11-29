<template>
    <div class="flex flex-col h-screen text-black dark:text-white">
        <header class="bg-accent-light dark:bg-accent-dark"></header>
        <main
            class="flex flex-wrap h-full bg-main-light dark:bg-main-dark overflow-x-hidden overflow-y-auto"
        >
            <router-view />
        </main>
        <footer class="bg-accent-light dark:bg-accent-dark"></footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

export default class Home extends Vue {

}
</script>

<style lang="scss">
$shadow-1: 0 0 10px 2px
    rgba(
        $color: #000000,
        $alpha: 0.2,
    );
$shadow-2: 0 0 10px
    rgba(
        $color: #000000,
        $alpha: 0.24,
    );

header {
    z-index: 10;
    flex: 0 0 54px;
    box-shadow: $shadow-1, $shadow-2;
}

footer {
    z-index: 10;
    flex: 0 0 72px;
    box-shadow: $shadow-1, $shadow-2;
}
</style>