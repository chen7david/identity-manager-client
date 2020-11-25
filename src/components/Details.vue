<template>
    <v-sheet class="pa-5" :width="width">
        <v-row class="text-left">
        <v-col cols="12">
            <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5">{{name}}</v-list-item-title>
                <v-list-item-subtitle class="text-6 blue-grey--text">{{year}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <hr class=" mb-5 orange">
            <ReadMore
                :text="overview" 
                :limit="textlimit"
            />
            <slot name="content"></slot>
        </v-col>
    </v-row>
    </v-sheet>
</template>

<script>
import ReadMore from './ReadMore'
export default {
    name: 'Details',
    components: {
        ReadMore
    },
    props: {
        name: null,
        rating: null,
        overview: null,
        state: null,
        width: null,
        date: null,
        textlimit: null
    },
    computed: {
        year(){ return new Date(this.date).getFullYear().toString() }
    },

}
</script>