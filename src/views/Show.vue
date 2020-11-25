<template>
    <v-container fill-height>
        <v-row>
          <v-col cols="12">
            <v-row justify="center"> 
                <v-col align="center" lg="9" sm="12" xs="12">
                  <v-sheet class="text-left" :width="size">
                    <v-btn router to="/shows" class="ma-3" icon>
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                  </v-sheet>
                  <media-player
                      ref="media"
                      :baseURL="$config.api.file+`/shows`"
                      :videos="episode.videos"
                      :subtitles="episode.subtitles"
                      :poster="$config.api.meta+`/image/w1280`+item.backdrop_path"
                      aspect="16/9"
                      :width="size"        
                  />
                  <SeasonsTable @selected="setEpisode" align="center" :item="item" :width="size"/>
                </v-col>
              </v-row>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MediaPlayer from './../components/MediaPlayer';
import SeasonsTable from './../components/SeasonsTable';


export default {
  name: 'Show',

  components: {
    'media-player' : MediaPlayer,
    SeasonsTable
  },

  props: {
    id: null
  },

  data: () => ({
    item: {},
    windowWidth: null,
    episode: {}
  }),

  computed: {
    size(){
      const x = this.windowWidth * 0.8
      const limit = 900
      return x < limit ? x : limit
    }
  },
  methods: {
    async getShow(){
      const user = await this.$http.get('/me')
      console.log({user})
      const  { data }  = await this.$media.get(`/shows/${this.id}`)
      const seasons = data.seasons.filter(s => s.episodes.length > 0)
      this.episode = seasons[0].episodes[0]
      data.seasons = seasons
      this.item = data
    },
 
    setScreen(){
      this.windowWidth = this.$vuetify.breakpoint.width
    },
    async setEpisode(ep){
      const user = await this.$http.get('/me')
      console.log({user})
      this.episode = ep
      this.$refs.media.$refs.player
      // await video.play()
    }
  },
  async mounted(){
    await this.getShow()
    this.setScreen()
  },
  created(){
    window.addEventListener('resize',this.setScreen)
    this.setScreen()
  }
};
</script>