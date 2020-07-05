<template>
    <router-view />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {

    mounted() {
        if (this.$user === undefined && this.$route.name !== "login")
            this.$router.push({ name: "login" });
    }

}
</script>