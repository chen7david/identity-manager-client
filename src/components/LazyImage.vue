<template>
    <v-lazy
        v-model="isActive"
        :options="{threshold: 0.5}"
        :min-height="height"
        transition="fade-transition"
    >
        <v-sheet
            :width="width"
            :height="height"
        >
            <v-img
                :src="src" 
                :height="height"
                :aspect-ratio="aspect"
                @error="errorHandler"
                @load="doneHandler"
            >
                <slot name="surface"></slot>
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular
                            v-if="!failed"
                            indeterminate
                            :color="spinner || `orange`"
                        ></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-sheet>
    </v-lazy>
</template>

<script>
export default {
    name: 'lazyImg',
    props: {
        width: null,
        aspect: null,
        src: null,
        onError: null,
        onDone: null,
        spinner: null
    },
    data: () => ({
        isActive: null,
        failed: false,
        done: false,
    }),
    computed: {
        height: (props) => {
            const [w,h] = props.aspect.split('/') 
            return (props.width/w) * h
        },
    },
    methods: {
        errorHandler(){
            this.failed = true
            if(this.onError) this.onError() 
        },
        doneHandler(){
            this.done = true
            if(this.onDone) this.onDone() 
        }
    }
}
</script>