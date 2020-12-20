<template>
    <Dialog ref="dialog" v-slot="{ close }">
        <div class="flex w-full h-full items-center justify-center p-2">
            <ValidationObserver
                class="mx-auto w-full md:w-1/2 text-center"
                v-slot="{ invalid }"
            >
                <form @submit.prevent="submit">
                    <div class="text-xl sm:text-4xl font-bold p-4">
                        Create a new playlist
                    </div>
                    <TextField v-model="name" label="Untitled Playlist" />
                    <div class="flex justify-around p-2">
                        <Button
                            @click="close"
                            class="border rounded-full px-8 h-9"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            class="bg-primary rounded-full px-8 h-9"
                            :disabled="invalid"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </Dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Dialog from './Dialog.vue'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'

@Component({ components: { Dialog, Button, TextField } })
export default class CreatePlaylist extends Vue {

    private name: string = '';

    private mounted(): void {
        const dialog = this.$refs['dialog'] as Dialog;
        this.$root.$on('new-playlist', () => dialog.show());
        dialog.$on('close', () => this.name = '');
    }

    private submit(): void {
        this.$drippy.createPlaylist(this.name.trim(), this.$user)
            .then(playlist => {
                // TODO toast
            }).finally(() =>
                (this.$refs['dialog'] as Dialog).close()
            );
    }

}
</script>