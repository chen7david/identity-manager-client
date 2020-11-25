<template>
    <v-hover v-slot:default="{ hover }" open-delay="10">
        <v-card
            class="mb-4" 
            :max-width="width" 
            color="rgb(0, 0, 0, 0.0)"
            elevation="0"
        >
            <lazy-img
                :src="src"
                :width="width"
                :aspect="aspect"
                :spinner="spinner"
                :onDone="onDone"
            >
                <template v-slot:surface>
                    <v-overlay absolute :value="hover">
                        <v-btn router :to="to" x-large icon>
                            <v-icon>mdi-play</v-icon>
                        </v-btn>
                    </v-overlay>
                </template>
            </lazy-img>
            <v-card-subtitle class="text-left pa-0">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <div 
                            v-on="on" 
                            v-bind="attrs" 
                            class="font-weight-medium text-truncate"
                        >
                            {{name}}
                        </div>
                    </template>
                    <span>{{name}}</span>
                </v-tooltip>
                <div class="blue-grey--text">{{year}}</div>
            </v-card-subtitle>
            
        </v-card>
    </v-hover>
</template>

<script>
import lazyImg from './LazyImage'
export default {
    name:'Poster',
    components: {
        'lazy-img': lazyImg
    },
    props: {
        src: null,
        to: null,
        width: null,
        name: null,
        date: null,
        aspect: null,
        spinner: null
    },
    computed: {
        year(){ return new Date(this.date).getFullYear().toString() },
        height(){
            const [w,h] = this.aspect.split('/') 
            return (this.width/w) * h
        },
    },
    methods: {
        onError(){
            this.imageError = true
            console.log('@image error ...')
        },
        onDone(){
            this.imageDone = true
            console.log('@image done ...')
        }      
    }

}
</script>