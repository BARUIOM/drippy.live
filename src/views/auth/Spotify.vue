<template></template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Spotify extends Vue {

    mounted() {
        if (this.$route.query['code']) {
            this.$q.localStorage.set('spotify_code', this.$route.query['code']);
            this.$router.push({ name: 'login' });
        }
    }

}
</script>