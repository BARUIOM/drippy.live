<template>
    <div>
        <form class="md-layout" @submit.prevent="doSearch">
            <md-field>
                <md-icon>search</md-icon>
                <label>Search</label>
                <md-input v-model="search" required></md-input>
                <span class="clear-button" @mousedown="$event.preventDefault()" @click="search = ''">
                    <md-icon>close</md-icon>
                </span>
            </md-field>
        </form>

        <md-list class="md-triple-line" md-dense>
            <div v-for="item in search_results" v-bind:key="item[0].data">
                <md-list-item @click="play(item[0])">
                    <md-avatar class="md-large">
                        <img :src="item[0].artwork_url" />
                    </md-avatar>

                    <div class="md-list-item-text">
                        <span>{{ item[0].title }}</span>
                        <span>{{ item[0].album }}</span>
                        <p>{{ item[0].artists.join(', ') }}</p>
                    </div>
                </md-list-item>

                <md-divider class="md-inset"></md-divider>
            </div>
        </md-list>

        <md-table v-model="search_results" md-card>
            <md-table-row slot="md-table-row" slot-scope="{ item }" @click="play(item[0])">
                <md-table-cell md-label="Title" md-sort-by="title">
                    <img :src="item[0].artwork_url" width="32px" />
                    <span class="songtitle">{{ item[0].title }}</span>
                </md-table-cell>
                <md-table-cell
                    md-label="Artist"
                    md-sort-by="artists[0]"
                >{{ item[0].artists.join(', ') }}</md-table-cell>
                <md-table-cell md-label="Album" md-sort-by="album">{{ item[0].album }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
export default {
    name: "Search",
    data: () => ({
        search: "",
        search_results: []
    }),
    methods: {
        async doSearch() {
            let response = await this.axios({
                url: '/audio',
                baseURL: this.$root.api_url,
                params: { query: this.search },
                headers: { 'User-Token': this.$root.userdata['idToken'] }
            });
            this.search_results = response.data;
        },
        play(song) {
            this.$root.$emit('playback_started', song);
        }
    }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 700px) {
    .md-table {
        display: none;
    }
}

@media screen and (min-width: 700px) {
    .md-list {
        display: none;
    }
}

.songtitle {
    padding-left: 10px;
}

.md-table-cell {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
}

.md-avatar.md-large {
    border-radius: 0px;
}

.md-field:not(.md-focused) .clear-button {
    display: none;
}
</style>
