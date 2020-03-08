<template>
    <v-container>
        <v-form @submit.prevent="doSearch">
            <v-text-field v-model="search_input" label="Search" color="orange" prepend-inner-icon="mdi-magnify" solo clearable required></v-text-field>
        </v-form>

        <v-simple-table v-if="search_results.length" class="results-large">
            <thead>
                <tr>
                    <th></th>
                    <th class="text-left">Title</th>
                    <th class="text-left">Artist</th>
                    <th class="text-left">Album</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in search_results" :key="item[0].data" @click="play(item[0])" class="table-item">
                    <td class="song-artwork">
                        <v-avatar size="32" tile>
                            <v-img :src="item[0].artwork_url" />
                        </v-avatar>
                    </td>
                    <td>{{ item[0].title }}</td>
                    <td>{{ item[0].artists.join(', ') }}</td>
                    <td>{{ item[0].album }}</td>
                </tr>
            </tbody>
        </v-simple-table>

        <v-list v-if="search_results.length" class="results-small" three-line>
            <template v-for="(item, index) in search_results">
                <v-list-item :key="item[0].data" @click="play(item[0])">
                    <v-list-item-avatar tile size="64">
                        <v-img :src="item[0].artwork_url" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="item[0].title"></v-list-item-title>
                        <v-list-item-subtitle v-text="item[0].album"></v-list-item-subtitle>
                        <v-list-item-subtitle v-text="item[0].artists.join(', ')"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider :key="index"></v-divider>
            </template>
        </v-list>
    </v-container>
</template>

<script>
export default {
    name: 'Search',
    data: () => ({
        search_input: '',
        search_results: []
    }),
    mounted() {
        if (sessionStorage['search_results']) {
            this.search_results = [].concat(JSON.parse(sessionStorage['search_results']));
        }
    },
    methods: {
        async doSearch() {
            let response = await this.axios({
                url: '/audio',
                baseURL: this.$root.api_url,
                params: { query: this.search_input },
                headers: { 'User-Token': this.$root.userdata['idToken'] }
            });
            sessionStorage['search_results'] = JSON.stringify(response.data);
            this.search_results = [].concat(response.data);
        },
        play(song) {
            this.$root.$emit('playback_started', song);
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 840px) {
    .results-large {
        display: none;
    }
}

@media screen and (min-width: 840px) {
    .results-small {
        display: none;
    }
}

.song-artwork {
    width: 32px;
}

.table-item {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
}
</style>