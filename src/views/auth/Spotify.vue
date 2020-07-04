<template></template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    mounted() {
        if (this.$route.query['code']) {
            localStorage['spotify_code'] = this.$route.query['code'];
            this.$router.push({ name: 'login' });
        }
    }
});
</script>