<template>
    <v-app dark>
        <v-overlay :value="overlay" z-index="100">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <nuxt />
    </v-app>
</template>

<script>
export default {
    data: () => ({
        overlay: true
    }),
    mounted() {
        this.$drippy.validate().then(() => {
            if (this.$route.path.startsWith('/auth')) {
                this.$router.push('/');
            }
        }).catch(() => {
            this.$router.push('/auth/login');
        }).finally(() => this.overlay = false);
    }
}
</script>