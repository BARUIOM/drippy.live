<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <router-view />
        <router-view @update="update" :name="route" />
    </div>
</template>

<script>
import drippy from "./plugins/drippy.js";

export default {
    name: "App",
    data: () => ({
        route: "",
        overlay: true
    }),
    mounted() {
        if (this.$route.name === 'auth') {
            this.overlay = false;
        }
    },
    methods: {
        update(route) {
            this.route = route;
            this.overlay = false;
        }
    },
    sockets: {
        async ready() {
            if (this.$route.name === 'app') {
                if (drippy.userdata["idToken"] || drippy.userdata["refreshToken"]) {
                    drippy.validate().then(() => this.update("main")).catch(() => {
                        drippy.refresh().then(() => {
                            if (drippy.userdata['idToken']) {
                                this.update("main");
                            }
                        }).catch(() => this.update("login"));
                    });
                } else this.update("login");
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