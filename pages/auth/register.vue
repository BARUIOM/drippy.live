<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="4" xl="3">
                <v-card class="mx-auto" max-width="500">
                    <v-card-title class="justify-center">Create an account</v-card-title>

                    <ValidationObserver v-slot="{ valid, handleSubmit }">
                        <v-form @submit.prevent="handleSubmit(submit)">
                            <v-card-text>
                                <v-window v-model="step">
                                    <v-window-item :value="1">
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
                                    </v-window-item>

                                    <v-window-item :value="2">
                                        <ValidationProvider
                                            name="Username"
                                            rules="required"
                                            v-slot="{ errors }"
                                        >
                                            <v-text-field
                                                :error-messages="errors"
                                                label="Username"
                                                v-model="username"
                                            ></v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider
                                            name="Password"
                                            rules="required|min:8"
                                            v-slot="{ errors }"
                                        >
                                            <v-text-field
                                                :error-messages="errors"
                                                type="password"
                                                label="Password"
                                                v-model="password"
                                            ></v-text-field>
                                        </ValidationProvider>
                                    </v-window-item>

                                    <v-window-item :value="3">
                                        <div class="pa-4 text-center">
                                            <h3
                                                class="headline font-weight-bold mb-2"
                                            >User successfully registered</h3>
                                            <span
                                                class="caption grey--text"
                                            >Please verify the e-mail "{{ email }}"</span>
                                        </div>
                                    </v-window-item>
                                </v-window>
                            </v-card-text>

                            <v-card-actions v-if="step < 3">
                                <v-btn @click="back" icon>
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn :disabled="!valid" type="submit" icon>
                                    <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-card-actions>
                            <v-card-actions v-else>
                                <v-btn link to="/auth/login" block>Go back</v-btn>
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
        step: 1,
        email: '',
        username: '',
        password: ''
    }),
    methods: {
        back() {
            if (this.step == 1) {
                this.$router.push('/auth/login');
            } else this.step--;
        },
        submit() {
            this.$root.$emit('overlay', true);
            if (this.step == 1) {
                this.$drippy.checkEmail(this.email).then(() => {
                    this.username = /(.+?)@/g.exec(this.email)[1];
                    this.step++;
                }).catch(error => {
                    if (error.response && error.response.status == 401) {
                        this.$root.$emit('snackbar', error.response.data['message'], 'error');
                    }
                }).finally(() => this.$root.$emit('overlay', false));
            } else if (this.step == 2) {
                this.$drippy.register(this.email, this.username, this.password).then(() => this.step++).catch(error => {
                    if (error.response && error.response.status == 401) {
                        this.$root.$emit('snackbar', error.response.data['message'], 'error');
                    }
                }).finally(() => this.$root.$emit('overlay', false));
            }
        }
    }
}
</script>