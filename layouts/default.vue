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
import drippy from '~/assets/js/drippy-api'

export default {
    data: () => ({
        overlay: false,
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
        this.$root.$on('logout', () => {
            delete localStorage['profile'];
            delete localStorage['spotify'];
            delete localStorage['idToken'];
            delete localStorage['refreshToken'];
            this.$router.push('/auth/login');
        });
    },
    middleware({ redirect, route }) {
        if (!route.name.startsWith('auth')) {
            return drippy.validate().catch(error => {
                if (error.response && error.response.status == 401) {
                    delete localStorage['idToken'];
                    delete localStorage['refreshToken'];
                    redirect('/auth/login');
                }
            });
        }
    }
}
</script>