<template>
  <v-container>
    <v-row fill-height>
      <v-col cols="12">
        <v-row v-show="isLoading" class="fill-height ma-0" align="center" justify="center">
            <div class="text-center">
              <v-overlay>
                <v-progress-circular
                  indeterminate
                  size="80"
                  color="orange"
                ></v-progress-circular>
              </v-overlay>
            </div>
          </v-row>
         <v-row v-show="!isLoading" justify="space-around" fill-height>
            <Poster
                v-for="item of items()"
                :key="item.id"
                :src="$config.api.meta+`/image/w342`+item.poster_path"
                :name="item.name"
                :date="item.first_air_date"
                aspect="2/3"
                :width="posterWidth"
                :to="`/show/`+item.id"
            /> 
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Poster from '@/components/Poster.vue'

export default {
  name: 'Shows',
  data: () => ({
    isLoading: false,
    movies: [],
    filter: null,
    windowWidth: null
  }),
  components: {
    Poster
  }, 
  computed: {
    size(){
      const x = this.windowWidth * 0.8
      const limit = 1200
      return x < limit ? x : limit
    },
    posterWidth(){
      return this.size < 500 ? 130 : 170
    }
  },
  methods: {
    async load(func, params = {}){
      this.isLoading = true
      await func(params)
      this.isLoading = false
    },
    async getShows(){
      const { data } = await this.$media.get('/shows')
      function compare(a,b){
        const dateA = new Date(a.first_air_date)
        const dateB = new Date(b.first_air_date)
        return dateB - dateA
      }
      this.movies = data.sort(compare)
    },
    items(){
      return this.filter ? this.movies.filter(m => m.name.toLowerCase().includes(this.filter)) : this.movies
    },
    setScreen(){
      this.windowWidth = this.$vuetify.breakpoint.width
    },
  },
  async mounted(){
    await this.load(this.getShows)
    this.$root.$on('search-shows', (e) => {
          this.filter = e ? this.filter = e.toLowerCase() : null
    })
    this.setScreen()
  },
  beforeDestroy() {
    this.$root.$off('search-shows')
  },
  created(){
    window.addEventListener('resize',this.setScreen)
  }
}
</script>
