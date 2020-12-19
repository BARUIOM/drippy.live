<template>
    <div
        v-bind:class="{ visible }"
        class="dialog absolute w-full h-full bg-black bg-opacity-90 select-none text-white"
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
                            class="border rounded-full px-8 py-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            class="bg-primary rounded-full px-8 py-1"
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

<style lang="scss" scoped>
div.dialog {
    z-index: 100;
    visibility: hidden;
    backdrop-filter: blur(8px);

    > div {
        transform: scale(0);
        will-change: transform;
        transition: transform 200ms ease-in-out;
    }
}

div.dialog.visible {
    visibility: visible;

    > div {
        transform: scale(1);
    }
}
</style>