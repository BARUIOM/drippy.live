<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col sm="6" lg="4" xl="3">
                <v-card>
                    <v-card-title>Drippy Music</v-card-title>
                    <v-card-subtitle>Unlimited music anywhere</v-card-subtitle>
                    <v-card-text>
                        <v-form v-model="valid" :lazy-validation="false" @submit.prevent="submit">
                            <v-text-field
                                label="E-mail"
                                color="orange"
                                v-model="email"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                color="orange"
                                v-model="password"
                                type="password"
                                :rules="passwordRules"
                                required
                            ></v-text-field>
                            <v-checkbox
                                label="I don't have an account"
                                color="orange"
                                v-model="new_user"
                            ></v-checkbox>
                            <v-layout justify-space-between>
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="orange"
                                    type="submit"
                                    :disabled="!valid"
                                >{{ new_user ? "Register" : "Login" }}</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" :color="status" :bottom="true" :timeout="4000">{{ message }}</v-snackbar>
    </v-container>
</template>

<script>

export default {
    data: () => ({
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password must have at least 8 characters',
        ],
        new_user: false,
        status: '',
        message: '',
        snackbar: false,
        valid: false
    }),
    methods: {
        async submit() {
            this.valid = false;
            this.snackbar = false;
            try {
                if (this.new_user) {
                    const response = await this.$drippy.register(this.email, this.password);

                    this.new_user = false;
                    this.status = 'success';
                    this.message = response['message'];
                    this.snackbar = true;
                } else {
                    await this.$drippy.login(this.email, this.password);
                    this.$router.push('/');
                }
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status == 401) {
                    this.status = 'error';
                    this.message = error.response.data['message'];
                    this.snackbar = true;
                }
            } finally {
                this.valid = true;
            }
        }
    }
}
</script>