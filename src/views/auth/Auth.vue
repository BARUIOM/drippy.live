<template>
    <router-view />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Auth extends Vue {

    private mounted() {
        if (this.$route.name === 'auth') {
            this.$router.push({ name: 'login' });
        }
    }

}
</script>