<template>
    <v-overlay v-model="visible" color="black" opacity="0.9" z-index="100">
        <v-form @submit.prevent="visible = false; $emit('submit', name)">
            <v-container class="pa-0" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" align="center">
                        <span class="headline">Create a new playlist</span>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="name"
                            label="Playlist name"
                            color="orange"
                            hide-details
                            solo
                            flat
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" align="right">
                        <v-btn @click="visible = false" text>Cancel</v-btn>
                    </v-col>
                    <v-col cols="6" align="left">
                        <v-btn type="submit" color="orange" text>Create</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-overlay>
</template>

<script>
export default {
    data: () => ({
        name: '',
        visible: false
    }),
    mounted() {
        this.$on('show', () => this.visible = true);
    }
}
</script>