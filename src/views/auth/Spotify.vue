<template></template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LocalStorage } from '@/modules/utils'

@Component
export default class Spotify extends Vue {

    mounted() {
        const code = this.$route.query['code'];
        if (code !== undefined) {
            LocalStorage.set('spotify_code', { code });
            this.$router.push({ name: 'login' });
        }
    }

}
</script>