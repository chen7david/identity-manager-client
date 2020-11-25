<template>
    <v-sheet
        :width="width"
        :height="height"
        color="black"
    >
        <video
            id="player"
            v-if="videos && videos[0]"
            controls 
            controlsList="nodownload"
            crossorigin="anonymous"
            :key="videos[0].src" 
            :poster="poster"  
            :width="width" 
            :height="height"
        >
            <source :src="getURL(videos[0].src)" type="video/mp4">
                video can not be played in this browser.
            <track
                crossorigin="anonymous"
                v-for="subtitle in subtitles" 
                :key="subtitle.lang" 
                :label="sublabel(subtitle.lang)" 
                kind="captions" 
                :srclang="subtitle.lang" 
                :src="getURL(subtitle.src)" 
                default
            >
        </video>
        <v-sheet
            v-else
            :width="width" 
            :height="height"
        >   
            <h1 >This video was not found!</h1>
        </v-sheet>
    </v-sheet>
</template>

<script>
export default {
    name: 'MediaPlayer',
    props: {
        baseURL: null,
        videos: null,
        subtitles: null,
        poster: null,
        aspect: null,
        width: null
    },
    computed: {
        height(){
            const [w,h] = this.aspect.split('/') 
            return (this.width/w) * h
        },
    },
    methods: {
        sublabel(lang){
            const map = {
                en: 'English',
                zh: 'Chinese',
                nl: 'Dutch',
                de: 'German',
                fr: 'French',
                es: 'Spanish'
            }
            return map[lang] || 'unknown'
        },
        getURL(url){
            console.log({url})
            return this.baseURL ? this.baseURL + url : url
        }
    }, 
}
</script>

<style scoped>
video {
  outline: none;
}
</style>