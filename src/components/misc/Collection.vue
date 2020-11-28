<template>
    <div v-if="collection && collection.length" class="w-full">
        <div v-if="title" class="p-2 text-xl font-bold" v-text="title" />
        <div class="flex flex-wrap">
            <template v-for="(item, i) in collection">
                <div :key="i" class="p-2 w-1/2 sm:w-1/4 lg:w-1/6 xl:w-1/8">
                    <ContentCard
                        :title="item.name"
                        :cover="item.images[0].url"
                        @click="$emit('click', item)"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import ContentCard from '@/components/ContentCard.vue'

@Component({ components: { ContentCard } })
export default class Collection extends Vue {

    @Prop()
    private title!: string;

    @Prop({ required: true })
    private collection!: any[]

}
</script>