<template>
    <div class="flex items-center justify-center p-2">
        <div
            class="rounded w-full sm:w-1/2 md:w-1/3 xl:w-1/4 bg-accent-light dark:bg-accent-dark p-1"
        >
            <div class="font-bold text-xl text-center p-4">
                Log in to your account
            </div>
            <form @submit.prevent="submit">
                <TextField v-model="email" class="m-1" label="E-mail" />
                <TextField
                    v-model="password"
                    class="m-1"
                    label="Password"
                    type="password"
                />

                <div class="p-1">
                    <Button type="submit" class="shadow w-full my-1 p-1">
                        <span>Sign in</span>
                    </Button>
                    <Button class="shadow w-full my-1 p-1">
                        <span>Create account</span>
                    </Button>
                </div>
            </form>

            <div class="rounded border border-white border-opacity-10"></div>
            <div class="p-1">
                <Button
                    @click="open"
                    style="background: #1db954"
                    class="relative shadow w-full p-1"
                >
                    <span
                        class="absolute left-0 mx-2 mdi mdi-spotify mdi-24px"
                    ></span>
                    <span>Sign in with Spotify</span>
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'

import { Manager } from '@/modules/drippy-api'
import { LocalStorage } from '@/modules/utils'

@Component({ components: { Button, TextField } })
export default class Login extends Vue {

    private email: string = "";
    private password: string = "";

    mounted() {
        if (LocalStorage.has('spotify_code')) {
            this.$root.$emit('overlay', true);

            const { code } = LocalStorage.get('spotify_code');
            this.$drippy.spotifyCheck(code).then(async data => {
                if (data !== undefined) {
                    await this.$drippy.login({ token: data['token'] });
                    this.$user = await Manager.getUser();
                    //this.$q.notify({ type: 'positive', message: data['message'], position: 'top' });
                    this.$router.push('/');
                }
            }).finally(() => {
                this.$root.$emit('overlay', false);
                LocalStorage.remove('spotify_code');
            });
        }
    }

    submit() {
        this.$root.$emit('overlay', true);
        this.$drippy.login({ email: this.email, password: this.password })
            .then(async () => {
                this.$user = await Manager.getUser();
                this.$router.push('/');
            }).catch(error => {
                //if (error.response && error.response.status == 400)
                //this.$q.notify({ type: 'negative', message: error.response.data['message'] });
            }).finally(() => this.$root.$emit('overlay', false));
    }

    open() {
        this.$root.$emit('overlay', true);
        window.open(this.$drippy.url + '/spotify', '_self');
    }

}
</script>