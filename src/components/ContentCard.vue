<template>
    <div
        @click="$emit('click')"
        class="transition-shadow duration-300 shadow hover:shadow-lg cursor-pointer rounded bg-accent-light dark:bg-accent-dark md:p-2"
    >
        <Cover class="shadow rounded-t md:rounded-none md:m-2" :url="cover" />
        <div
            class="text-md md:text-xl text-center font-bold truncate p-4 md:p-0 md:m-2"
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