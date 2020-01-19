<template>
    <div class="page-container">
        <div class="md-layout md-gutter md-alignment-center-center" v-if="!component">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <component @set-user="update" v-bind:is="component" />
    </div>
</template>

<script>
import Main from './components/Main.vue'
import Login from './components/Login.vue'

export default {
    name: "App",
    data: () => ({
        userdata: {},
        component: false
    }),
    mounted() {
        this.$root.api_url = 'https://drippy-music.herokuapp.com';
        if (localStorage['USER_DATA']) {
            this.userdata = JSON.parse(localStorage['USER_DATA']);
            if (this.userdata['idToken'] || this.userdata['refreshToken']) {
                return this.axios({
                    url: '/validate',
                    baseURL: this.$root.api_url,
                    headers: { 'User-Token': this.userdata['idToken'] }
                }).then(() => this.update(this.userdata)).catch(error => {
                    if (error.response && error.response.status == 403) {
                        this.axios({
                            method: 'POST',
                            url: '/refresh',
                            baseURL: this.$root.api_url,
                            data: { 'refresh_token': this.userdata['refreshToken'] }
                        }).then((response) => Object.assign(this.userdata, response.data)).catch(() => {
                            this.userdata = {};
                            this.component = 'Login';
                        }).finally(() => this.update(this.userdata));
                    }
                });
            }
        }
        this.component = 'Login';
    },
    methods: {
        update(userdata) {
            localStorage['USER_DATA'] = JSON.stringify(userdata);
            this.$root.userdata = this.userdata = userdata;
            this.component = 'Main';
        }
    },
    components: { Main, Login }
};
</script>

<style lang="scss" scoped>
.page-container {
    overflow: hidden;
}

.md-layout {
    min-height: 100vh;
}
</style>