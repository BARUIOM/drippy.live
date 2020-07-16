<template>
    <div class="row">
        <div class="col">
            <span class="q-px-md text-h5 text-weight-bold" v-text="title" />
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Results extends Vue {

    @Prop({ required: true })
    private title!: string;

}
</script>