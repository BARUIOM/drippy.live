<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary" md-elevation="0">
                <div class="md-toolbar-row">
                    <div class="md-toolbar-section-start">
                        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
                            <md-icon>menu</md-icon>
                        </md-button>
                        <span class="md-title">Drippy Music</span>
                    </div>

                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button">
                            <md-icon>refresh</md-icon>
                        </md-button>

                        <md-button class="md-icon-button">
                            <md-icon>more_vert</md-icon>
                        </md-button>
                    </div>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
                <md-toolbar class="md-transparent" md-elevation="0">
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button md-dense" @click="toggleMenu">
                            <md-icon>keyboard_arrow_left</md-icon>
                        </md-button>
                    </div>
                </md-toolbar>

                <md-list>
                    <md-list-item to="/" exact>
                        <md-icon>home</md-icon>
                        <span class="md-list-item-text">Home</span>
                    </md-list-item>

                    <md-list-item to="/search" exact>
                        <md-icon>search</md-icon>
                        <span class="md-list-item-text">Search</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>delete</md-icon>
                        <span class="md-list-item-text">Trash</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>error</md-icon>
                        <span class="md-list-item-text">Spam</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <router-view />
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
import engine from './socket-engine.js'

export default {
    name: "App",
    data: () => ({
        menuVisible: false
    }),
    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        }
    },
    sockets: engine.sockets
};
</script>

<style lang="scss" scoped>
.md-app {
    min-height: 100vh;
}
</style>