<template>
    <v-container fill-height>
        <v-row>
          <v-col cols="12">
            <v-row justify="center"> 
                <v-col align="center" lg="9" sm="12" xs="12">
                  <v-sheet class="text-left" :width="size">
                    <v-btn router to="/movies" class="ma-3" icon>
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                  </v-sheet>
                  <media-player
                      :baseURL="$config.api.file+`/movies`"
                      :videos="item.videos"
                      :subtitles="item.subtitles"
                      :poster="$config.api.meta+`/image/w1280`+item.backdrop_path"
                      aspect="16/9"
                      :width="size"        
                  />
                  <Details
                    :width="size"
                    :name="item.title"
                    :date="item.release_date"
                    :overview="item.overview"
                    textlimit="200"
                  />
                </v-col>
              </v-row>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MediaPlayer from './../components/MediaPlayer';
import Details from './../components/Details';


export default {
  name: 'Movie',

  components: {
    'media-player' : MediaPlayer,
    Details
  },

  props: {
    id: null
  },

  data: () => ({
    item: {},
    windowWidth: null
  }),

  computed: {
    size(){
      const x = this.windowWidth * 0.9
      const limit = 900
      return x < limit ? x : limit
    }
  },
  methods: {
    async getMovie(){
      const  { data }  = await this.$media.get(`/movies/${this.id}`)
      this.item = data
    },

    setScreen(){
      this.windowWidth = this.$vuetify.breakpoint.width
    }
  },
  async mounted(){
    await this.getMovie()
    this.setScreen()
  },
  created(){
    window.addEventListener('resize',this.setScreen)
  }
};
</script>