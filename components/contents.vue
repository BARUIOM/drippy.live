<template>
    <v-card color="accent" elevation="0" tile>
        <v-card-title class="headline font-weight-bold" v-text="title"></v-card-title>
        <v-container class="d-flex flex-row overflow-x-hidden pa-0" fluid>
            <v-col v-for="(item, i) in contents" :key="i" cols="6" sm="4" md="2">
                <v-card @click="open(item.id)">
                    <div class="pa-4">
                        <v-img
                            aspect-ratio="1"
                            class="elevation-10"
                            :src="$drippy.getPicture(item, 1)"
                        ></v-img>
                    </div>
                    <v-card-title class="text-truncate justify-center" v-text="item.name"></v-card-title>
                </v-card>
            </v-col>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props: {
        title: String,
        route: String,
        contents: Array
    },
    methods: {
        open(id) {
            this.$router.push({ name: this.route, params: { id } });
        }
    }
}
</script>