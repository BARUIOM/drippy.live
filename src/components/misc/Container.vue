<template>
    <div>
        <div class="q-pa-sm fit">
            <div class="q-pa-xs row no-wrap">
                <div class="col-xs-4 col-sm-2 col-lg-1">
                    <q-img class="shadow-8" :src="thumbnail" :ratio="1" />
                </div>
                <div class="q-pa-md col q-gutter-y-sm">
                    <div class="row">
                        <div class="text-h4 text-weight-bold ellipsis" v-text="headline" />
                    </div>
                    <div v-if="subheader" class="row">
                        <div class="text-h6" v-text="subheader" />
                    </div>
                    <div class="row">
                        <slot name="actions" />
                    </div>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Container extends Vue {

    @Prop({ required: true })
    private headline!: string;

    @Prop({ required: true })
    private thumbnail!: string;

    @Prop()
    private subheader!: string;

}
</script>