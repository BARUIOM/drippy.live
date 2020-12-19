<template>
    <div
        v-bind:class="{ visible }"
        class="dialog bg-black bg-opacity-90 select-none text-white"
    >
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
                            class="border rounded-full px-8 py-1.5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            class="bg-primary rounded-full px-8 py-1.5"
                            :disabled="invalid"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'

@Component({ components: { Button, TextField } })
export default class CreatePlaylist extends Vue {

    private name: string = '';

    private visible: boolean = false;

    private mounted(): void {
        this.$root.$on('new-playlist', () =>
            this.visible = true
        );
    }

    private close(): void {
        this.$emit('close');
        this.visible = false;
        this.name = String();
    }

    private submit(): void {
        this.$drippy.createPlaylist(this.name.trim(), this.$user)
            .then(playlist => {
                // TODO toast
            }).finally(() => this.close());
    }

}
</script>