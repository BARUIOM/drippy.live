<template>
    <v-app dark>
        <v-snackbar v-model="snackbar" :color="status" :top="top" :timeout="4000">{{ message }}</v-snackbar>
        <v-overlay :value="overlay" z-index="100">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <nuxt />
    </v-app>
</template>

<script>
export default {
    data: () => ({
        overlay: true,
        snackbar: false,
        status: 'success',
        message: '',
        top: false
    }),
    created() {
        this.$root.$on('overlay', value => this.overlay = value);
        this.$root.$on('snackbar', (message, color, top) => {
            this.message = message;
            this.status = color || this.status;
            if (top !== undefined) this.top = top;
            this.snackbar = true;
        });
    },
    mounted() {
        if (!this.$route.path.startsWith('/auth') || this.$route.path.includes('/auth/login')) {
            this.$drippy.validate().then(() => {
                if (this.$route.path === '/auth/login') {
                    this.$router.push('/');
                }
            }).catch(() => {
                if (this.$route.path !== '/auth/login') {
                    this.$router.push('/auth/login');
                }
            }).finally(() => this.overlay = false);
        } else this.overlay = false;
    }
}
</script>