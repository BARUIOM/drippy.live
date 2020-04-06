<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <component @update="update" v-bind:is="component" />
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
        overlay: true,
        component: ""
    }),
    methods: {
        update(component) {
            this.component = component;
            this.overlay = false;
        }
    },
    sockets: {
        async ready() {
            if (drippy.userdata["idToken"] || drippy.userdata["refreshToken"]) {
                drippy.validate().then(() => this.update("Main")).catch(() => {
                    drippy.refresh().then(() => {
                        if (drippy.userdata['idToken']) {
                            this.update("Main");
                        }
                    }).catch(() => this.update("Login"));
                });
            } else {
                this.update("Login");
            }
        }
    }
};
</script>

<style lang="scss">
* {
    scrollbar-width: thin !important;
    scrollbar-color: #6e6e6e transparent !important;
}

::-webkit-scrollbar {
    width: 6px !important;
}

::-webkit-scrollbar-thumb {
    background: #6e6e6e !important;
}

::-webkit-scrollbar-track-piece {
    background: transparent !important;
}

html {
    overflow: hidden !important;
}
</style>