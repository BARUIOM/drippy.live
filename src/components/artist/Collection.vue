<template>
    <div class="q-pa-sm">
        <div class="row q-pa-xs">
            <div v-for="(album, i) in albums" :key="i" class="q-pa-xs col-xs-6 col-md-4 col-lg-2">
                <div class="shadow-4" @click="open(album.id)">
                    <q-img :src="album.images[0].url" :ratio="1" />
                </div>
                <div
                    class="q-py-sm text-center text-subtitle1 text-weight-bold"
                    v-text="album.name"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Albums extends Vue {

    @Prop({ required: true })
    private albums!: any[]

    public open(id: string) {

    }

}
</script>