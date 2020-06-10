<template>
    <span>
        <template v-for="(artist, i) in artists">
            <span class="body-2 grey--text text-truncate" :key="'a' + i">
                <span v-if="i > 0">,</span>
                <nuxt-link
                    class="link"
                    :to="'/artist/' + artist.id"
                    v-text="artist.name"
                    no-prefetch
                />
            </span>
        </template>
    </span>
</template>

<script>
export default {
    props: {
        artists: Array
    }
}
</script>

<style lang="scss" scoped>
a.link {
    color: inherit;
    text-decoration: none;
}

a.link:hover {
    color: white;
    text-decoration: underline;
}
</style>