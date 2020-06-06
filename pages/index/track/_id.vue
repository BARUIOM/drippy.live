<template></template>

<script>
export default {
    mounted() {
        if (this.$route.params['id']) {
            this.$drippy.getTrack(this.$route.params['id']).then(track => {
                this.$router.push({
                    name: 'index-album-id',
                    params: { id: track['album'].id },
                    query: { highlight: track.id }
                });
            });
        }
    }
}
</script>