<template>
    <v-container fluid fill-height>
        <v-card class="mx-auto" max-width="600" min-height="200">
            <v-progress-linear v-if="pending" indeterminate color="orange"></v-progress-linear>
            <v-card-title v-text="title"></v-card-title>
            <v-card-text v-text="info"></v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        pending: true,
        title: 'Verifying your e-mail address',
        info: 'Soon you will be able to use your account!'
    }),
    mounted() {
        this.$drippy.verifyEmail(sessionStorage['code']).then(response => {
            this.pending = false;
            this.title = 'Verification done!';
            this.info = response['message'];
        }).catch(error => {
            this.pending = false;
            if (error.response) {
                this.title = 'Error verifying e-mail address:';
                this.info = error.response.data['message'];
            }
        }).finally(() => delete sessionStorage['code']);
    }
}
</script>