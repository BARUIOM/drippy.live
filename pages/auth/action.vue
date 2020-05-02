<script>
export default {
    mounted() {
        if (this.$route.query['mode']) {
            sessionStorage['code'] = this.$route.query['oobCode'];
            switch (this.$route.query['mode']) {
                case "verifyEmail":
                    return this.$router.push('/auth/verify');
            }
        }
    }
}
</script>