<template>
    <router-view />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    mounted() {
        if (this.$user === undefined && this.$route.name !== "login")
            this.$router.push({ name: "login" });
    }
});
</script>