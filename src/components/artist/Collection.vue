<template>
    <div v-if="collection && collection.length">
        <div class="q-pa-md">
            <span class="text-h5 text-weight-bold" v-text="title" />
        </div>
        <q-separator />
        <div class="q-pa-sm">
            <div class="row q-pa-xs">
                <template v-for="(item, i) in collection">
                    <div :key="i" class="q-pa-xs col-xs-6 col-md-4 col-lg-2">
                        <div class="shadow-4" @click="$emit('click', item.id)">
                            <q-img :src="item.images[0].url" :ratio="1" />
                        </div>
                        <div
                            class="q-py-sm text-center text-subtitle1 text-weight-bold"
                            v-text="item.name"
                        />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Collection extends Vue {

    @Prop({ required: true })
    private title!: string;

    @Prop({ required: true })
    private collection!: any[]

}
</script>