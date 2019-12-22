<template>
    <div class="page-container">
        <Login @set-user="update" v-if="!hasToken()" />
        <Main v-else />
    </div>
</template>

<script>
import Main from './components/Main.vue'
import Login from './components/Login.vue'

export default {
    name: "App",
    data: () => ({
        userdata: {}
    }),
    mounted() {
        this.$root.api_url = 'https://drippy-music.herokuapp.com';
        if (localStorage['USER_DATA']) {
            this.userdata = JSON.parse(localStorage['USER_DATA']);
            this.axios({
                url: '/validate',
                baseURL: this.$root.api_url,
                headers: { 'User-Token': this.userdata['idToken'] }
            }).catch(error => {
                if (error.response && error.response.status == 403) this.userdata = {};
            }).then(() => {
                this.$root.userdata = this.userdata;
            });
        }
    },
    methods: {
        update(userdata) {
            this.$root.userdata = this.userdata = userdata;
        },
        hasToken() {
            return this.userdata['idToken'] !== undefined;
        }
    },
    watch: {
        userdata(data) {
            localStorage['USER_DATA'] = JSON.stringify(data);
        }
    },
    components: { Main, Login }
};
</script>

