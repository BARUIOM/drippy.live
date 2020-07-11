<template>
    <div class="q-pa-sm row" v-bind:class="{ 'no-wrap': !wrap }">
        <div class="q-pa-sm col-6 col-sm-4 col-md-2" v-for="(content, i) in contents" :key="i">
            <q-card @click.stop="$emit('click', content.id)" clickable v-ripple>
                <q-card-section>
                    <q-img
                        class="shadow-8"
                        :src="(content.images[0] || $drippy.thumbnails[type]).url"
                        :ratio="1"
                    />
                </q-card-section>

                <q-card-section class="non-selectable">
                    <div class="text-h6 text-center ellipsis" v-text="content.name"></div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import Item from '@/models/item'

@Component
export default class Contents extends Vue {

    @Prop({ required: true })
    private contents!: Item[];

    @Prop({ required: true })
    private type!: string;

    @Prop({ default: false })
    private wrap!: boolean;

}
</script>

<style lang="scss" scoped>
div {
    overflow: hidden;
}
</style>