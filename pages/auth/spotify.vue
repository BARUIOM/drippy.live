<script>
export default {
    mounted() {
        if (this.$route.query['code']) {
            localStorage['spotify'] = this.$route.query['code'];
        }
        window.close();
    }
}
</script>