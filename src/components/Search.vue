<template>
    <div>
        <form class="md-layout" @submit.prevent="doSearch">
            <md-field>
                <md-icon>search</md-icon>
                <label>Search</label>
                <md-input v-model="search" @focus="focused = true" @blur="focused = false" required></md-input>
                <a @click="clear" v-if="focused">
                    <md-icon>close</md-icon>
                </a>
            </md-field>
        </form>

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
        focused: false,
        search_results: []
    }),
    methods: {
        clear() {
            this.search = "";
        },
        async doSearch() {
            let response = await this.axios.get("https://drippy-music.herokuapp.com", {
                params: { query: this.search }
            });
            this.search_results = response.data;
        },
        play(song) {
            this.$socket.emit("stream", song.data);
        }
    }
};
</script>

<style lang="scss" scoped>
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
</style>
