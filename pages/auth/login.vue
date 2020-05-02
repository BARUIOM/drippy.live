<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="4" xl="3">
                <v-card>
                    <v-card-title class="justify-center">Log in to your account</v-card-title>
                    <ValidationObserver v-slot="{ valid, handleSubmit }">
                        <v-form @submit.prevent="handleSubmit(submit)">
                            <v-card-text>
                                <ValidationProvider
                                    name="E-mail"
                                    rules="required|email"
                                    v-slot="{ errors }"
                                >
                                    <v-text-field
                                        :error-messages="errors"
                                        label="E-mail"
                                        v-model="email"
                                    ></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider
                                    name="Password"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <v-text-field
                                        :error-messages="errors"
                                        type="password"
                                        label="Password"
                                        v-model="password"
                                    ></v-text-field>
                                </ValidationProvider>
                            </v-card-text>
                            <v-card-actions class="d-flex flex-column">
                                <v-btn class="my-1" type="submit" :disabled="!valid" block>Sign in</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn class="my-1" link to="/auth/register" block>Create an account</v-btn>
                            </v-card-actions>
                        </v-form>
                    </ValidationObserver>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        email: '',
        password: ''
    }),
    methods: {
        submit() {
            this.$root.$emit('overlay', true);
            this.$drippy.login(this.email, this.password).then(() => this.$router.push('/')).catch(error => {
                if (error.response && error.response.status == 401) {
                    this.$root.$emit('snackbar', error.response.data['message'], 'error');
                }
            }).finally(() => this.$root.$emit('overlay', false));
        }
    }
}
</script>