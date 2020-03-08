<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <component @set-user="update" v-bind:is="component" />
    </div>
</template>

<script>
import Main from './components/Main'
import Login from './components/Login'
import { api_url } from './main.js'

export default {
    name: 'App',
    components: { Main, Login },
    data: () => ({
        userdata: {},
        overlay: true,
        component: ''
    }),
    mounted() {
        this.$root.api_url = api_url;
    },
    methods: {
        update(component, userdata = {}) {
            localStorage['USER_DATA'] = JSON.stringify(userdata);
            this.$root.userdata = Object.assign(this.userdata, userdata);
            this.component = component;
            this.overlay = false;
        }
    },
    sockets: {
        "ready"() {
            if (localStorage['USER_DATA']) {
                this.userdata = JSON.parse(localStorage['USER_DATA']);
                if (this.userdata['idToken'] || this.userdata['refreshToken']) {
                    return this.axios({
                        url: '/validate',
                        baseURL: this.$root.api_url,
                        headers: { 'User-Token': this.userdata['idToken'] }
                    }).then(() => this.update('Main', this.userdata)).catch(error => {
                        if (error.response && error.response.status == 403) {
                            this.axios({
                                method: 'POST',
                                url: '/refresh',
                                baseURL: this.$root.api_url,
                                data: { 'refresh_token': this.userdata['refreshToken'] }
                            }).then((response) => this.update('Main', response.data)).catch(() => this.update('Login'));
                        }
                    });
                }
            }
            this.update('Login');
        }
    }
};
</script>

<style lang="scss">
html {
    overflow: hidden !important;
}
</style>