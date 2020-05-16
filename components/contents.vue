<template>
    <div>
        <span class="headline font-weight-bold pa-4" v-text="title"></span>
        <v-container class="d-flex flex-row overflow-x-auto pa-0" fluid>
            <v-col v-for="(item, i) in contents" :key="i" cols="6" sm="4" md="2">
                <v-card link :to="{ name: route, params: { id: item.id } }">
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
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        route: String,
        contents: Array
    }
}
</script>