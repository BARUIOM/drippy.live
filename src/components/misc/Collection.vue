<template>
    <div v-if="collection && collection.length">
        <div v-if="title">
            <div class="q-pa-md">
                <span class="text-h5 text-weight-bold" v-text="title" />
            </div>
            <q-separator />
        </div>
        <div class="q-pa-sm">
            <div class="row q-pa-xs">
                <template v-for="(item, i) in collection">
                    <div :key="i" class="q-pa-xs col-xs-6 col-sm-3 col-md-2">
                        <div class="shadow-4 bg-grey-10" @click="$emit('click', item)">
                            <q-img
                                :src="(item.images[0] || $drippy.thumbnails['collection']).url"
                                :ratio="1"
                            />
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

    @Prop()
    private title!: string;

    @Prop({ required: true })
    private collection!: any[]

}
</script>