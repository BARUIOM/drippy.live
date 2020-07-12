<template>
    <q-dialog v-model="visible" persistent maximized>
        <div class="row flex-center">
            <div class="col-12 q-gutter-y-md">
                <div class="row justify-center">
                    <span class="text-h5">Create a new playlist</span>
                </div>
                <q-form ref="form" class="q-gutter-y-md" @reset="reset" @submit.prevent="submit">
                    <div class="row justify-center">
                        <div class="col-4">
                            <q-input v-model="name" :placeholder="placeholder" standout dense />
                        </div>
                    </div>
                    <div class="row q-gutter-x-lg justify-center">
                        <q-btn @click="visible = false" outline rounded>Cancel</q-btn>
                        <q-btn type="submit" color="primary" rounded>Create</q-btn>
                    </div>
                </q-form>
            </div>
        </div>
    </q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { QForm } from 'quasar'
import { Component } from 'vue-property-decorator'

import User from '@/modules/drippy-user';

@Component
export default class CreatePlaylist extends Vue {

    private visible: boolean = false;

    private name: string = '';
    private readonly placeholder: string = 'Untitled Playlist';

    public show(): void {
        this.visible = true;
    }

    private submit(): void {
        this.$drippy.createPlaylist(this.name.trim() || this.placeholder, this.$user as User).then(playlist => {
            this.$q.notify({ type: 'positive', message: `Playlist '${playlist['name']}' created!`, position: 'top' });
            (this.$refs['form'] as QForm).reset();
        }).finally(() => {
            this.visible = false;
            this.$emit('close');
        });
    }

    private reset(): void {
        this.name = String();
    }

}
</script>