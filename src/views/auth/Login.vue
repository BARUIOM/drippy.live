<template>
    <div class="q-pa-md window-height">
        <div class="row justify-center items-center fit">
            <div class="col-12 col-sm-6 col-md-4 col-xl-3">
                <q-card class="my-card">
                    <q-card-section>
                        <div class="text-h6 text-center">Log in to your account</div>
                    </q-card-section>

                    <q-form @submit.prevent="submit">
                        <q-card-section>
                            <q-input v-model="email" class="q-pb-sm" type="email" label="Email" />
                            <q-input v-model="password" type="password" label="Password" />
                        </q-card-section>

                        <q-card-actions vertical>
                            <q-btn color="grey-10" type="submit">Sign in</q-btn>
                            <q-btn color="grey-10" disable>Create an account</q-btn>
                        </q-card-actions>
                    </q-form>

                    <q-separator />

                    <q-card-actions vertical>
                        <q-btn style="background: #1DB954" @click="open">
                            <q-icon name="img:/spotify.svg" left />Sign in with Spotify
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Manager } from '@/modules/drippy-api';

@Component
export default class Login extends Vue {

    private email: string = "";
    private password: string = "";

    mounted() {
        if (this.$q.localStorage.has('spotify_code')) {
            this.$q.loading.show();

            const code = this.$q.localStorage.getItem('spotify_code') as string;
            this.$drippy.spotifyCheck(code).then(async data => {
                if (data !== undefined) {
                    await this.$drippy.login({ token: data['token'] });
                    Vue.prototype.$user = await Manager.getUser();
                    this.$q.notify({ type: 'positive', message: data['message'], position: 'top' });
                    this.$router.push('/');
                }
            }).finally(() => {
                this.$q.loading.hide();
                this.$q.localStorage.remove('spotify_code');
            });
        }
    }

    submit() {
        this.$q.loading.show();
        this.$drippy.login({ email: this.email, password: this.password })
            .then(() => this.$router.push('/')).catch(error => {
                if (error.response && error.response.status == 400)
                    this.$q.notify({ type: 'negative', message: error.response.data['message'] });
            }).finally(() => this.$q.loading.hide());
    }

    open() {
        this.$q.loading.show();
        window.open(this.$drippy.url + '/spotify', '_self');
    }

}
</script>