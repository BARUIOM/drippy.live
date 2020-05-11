<script>
export default {
    mounted() {
        if (this.$route.query['code']) {
            localStorage['spotify_code'] = this.$route.query['code'];
            this.$router.push('/auth/login');
        }
    }
}
</script>