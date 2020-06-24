<template>
    <span v-bind:class="{ 'd-inline-flex': spacer, 'd-inline-block': !spacer }">
        <template v-for="(artist, i) in artists">
            <span
                v-if="i > 0"
                v-bind:class="{ 'mx-1': spacer }"
                v-text="separator"
                :key="'s' + i"
            ></span>
            <span class="link" :key="'a' + i" @click.stop="open(artist.id)" v-text="artist.name"></span>
        </template>
    </span>
</template>

<script>
export default {
    props: {
        artists: Array,
        spacer: {
            type: Boolean,
            default: false
        },
        separator: {
            type: String,
            default: ','
        }
    },
    methods: {
        open(id) {
            this.$router.push({ name: 'index-artist-id', params: { id } });
        }
    }
}
</script>

<style lang="scss" scoped>
span.link {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
}

span.link:hover {
    color: white;
    text-decoration: underline;
}
</style>