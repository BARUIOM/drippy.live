<template>
    <div class="main">
        <form class="md-layout md-gutter md-alignment-center-center" @submit.prevent="doLogin">
            <md-card class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-30 md-small-size-50 md-xsmall-size-70">
                <md-card-header>
                    <div class="md-title">Drippy Music</div>
                </md-card-header>

                <md-card-content>
                    <md-field>
                        <label>E-Mail</label>
                        <md-input type="email" v-model="email" required />
                    </md-field>
                    <md-field>
                        <label>Password</label>
                        <md-input type="password" v-model="password" required />
                    </md-field>
                    <md-field v-if="newUser">
                        <label>Username</label>
                        <md-input type="text" v-model="username" required />
                    </md-field>
                    <md-checkbox v-model="newUser">I don't have an account</md-checkbox>
                </md-card-content>

                <md-card-actions>
                    <md-button ref="submit" type="submit" class="md-primary">
                        <span v-if="newUser">Register</span>
                        <span v-else>Login</span>
                    </md-button>
                </md-card-actions>
            </md-card>
        </form>

        <md-snackbar :md-position="'center'" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
            <span>{{ message }}</span>
        </md-snackbar>
    </div>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        email: '',
        password: '',
        username: '',
        newUser: false,
        message: '',
        showSnackbar: false,
    }),
    methods: {
        async doLogin() {
            this.showSnackbar = false;
            this.$refs.submit.$el.setAttribute('disabled', 'true');
            try {
                if (this.newUser) {
                    await this.axios({
                        url: '/register',
                        baseURL: this.$root.api_url,
                        method: 'POST',
                        data: { email: this.email, password: this.password, username: this.username }
                    });

                    this.newUser = false;
                    this.message = 'User successfully registered, now please verify your e-mail!';
                    this.showSnackbar = true;
                } else {
                    const response = await this.axios({
                        url: '/login',
                        baseURL: this.$root.api_url,
                        method: 'POST',
                        data: { email: this.email, password: this.password }
                    });
                    this.$emit('set-user', response.data);
                }
            } catch (error) {
                if (error.response && error.response.status == 401) {
                    this.message = error.response.data['message'];
                    this.showSnackbar = true;
                }
            } finally {
                this.$refs.submit.$el.removeAttribute('disabled');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
div.main {
    overflow: hidden;
}

form.md-layout {
    min-height: 100vh;
}
</style>