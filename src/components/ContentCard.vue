<template>
    <div
        @click="$emit('click')"
        class="transition-shadow duration-300 shadow hover:shadow-lg cursor-pointer rounded p-4 bg-accent-light dark:bg-accent-dark"
    >
        <Cover class="shadow" :url="cover" :responsive="true" />
        <div
            class="text-xl text-center font-bold truncate pt-4"
            v-text="title"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import Cover from '@/components/Cover.vue'

@Component({ components: { Cover } })
export default class ContentCard extends Vue {

    @Prop({ required: true })
    private readonly title!: string;

    @Prop({ required: true })
    private readonly cover!: string;

}
</script>