<template>
    <v-list nav dense>
        <v-list-item link to="/" exact>
            <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/search" exact>
            <v-list-item-icon>
                <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Search</v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'Drawer',
    data: () => ({})
}
</script>