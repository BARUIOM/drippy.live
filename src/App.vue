<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <component @set-user="update" v-bind:is="component" />
    </div>
</template>

<script>
import drippy from "./plugins/drippy.js";

import Main from "./components/Main";
import Login from "./components/Login";

export default {
    name: "App",
    components: { Main, Login },
    data: () => ({
        userdata: {},
        overlay: true,
        component: ""
    }),
    methods: {
        update(component, userdata = {}) {
            localStorage["USER_DATA"] = JSON.stringify(userdata);
            this.$root.userdata = Object.assign(this.userdata, userdata);
            this.component = component;
            this.overlay = false;
        }
    },
    sockets: {
        async ready() {
            if (localStorage["USER_DATA"]) {
                this.userdata = JSON.parse(localStorage["USER_DATA"]);
                if (this.userdata["idToken"] || this.userdata["refreshToken"]) {
                    try {
                        await drippy.validate();
                        this.update("Main", this.userdata);
                    } catch (error) {
                        if (error.response && error.response.status == 403) {
                            try {
                                let data = await drippy.refresh();
                                this.update("Main", data);
                            } catch {
                                this.update("Login");
                            }
                        }
                    }
                    return;
                }
            }
            this.update("Login");
        }
    }
};
</script>

<style lang="scss">
html {
    overflow: hidden !important;
}
</style>