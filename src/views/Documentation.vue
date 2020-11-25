<template>
  <v-container>
    <h1>Documentation</h1>
    <hr class="my-5">
    <p><v-chip>{{$config.api.meta}}</v-chip></p>
    <v-btn @click="load(importMovies)" :loading="isLoading" class="ma-3">
      <v-icon>mdi-movie</v-icon>
      import
    </v-btn>
    <v-btn @click="load(graphMovies)" :loading="isLoading" class="ma-3">
      <v-icon>mdi-movie</v-icon>
      graph
    </v-btn>
    <v-btn @click="load(importShows)" :loading="isLoading" class="ma-3">
      <v-icon>mdi-monitor</v-icon>
      import
    </v-btn>
    <v-btn @click="load(graphShows)" :loading="isLoading" class="ma-3">
      <v-icon>mdi-monitor</v-icon>
      graph
    </v-btn>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Method
          </th>
          <th class="text-left">
            URL
          </th>
          <th class="text-left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.method }}</td>
          <td>{{ item.path }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
      </template>
  </v-simple-table>
  </v-container>
</template>

<script>

export default {
  name: 'Documentation',

  data: () => ({
    isLoading: false,
    items: [
      {
        name: 'search tmdb-movies',
        method: 'get',
        path: 'tmdb-movies?search=nemo&year=2017',
        description: 'returns an array of movie metadata objects from tmdb'
      },
      {
        name: 'search tmdb-show',
        method: 'get',
        path: 'tmdb-shows?search=pokemon&year=2016',
        description: 'returns an array of show metadata objects from tmdb'
      },
      {
        name: 'search movies',
        method: 'get',
        path: 'movies?search=nemo&year=2017',
        description: 'returns an array of movie metadata objects'
      },
      {
        name: 'search show',
        method: 'get',
        path: 'shows?search=pokemon&year=2016',
        description: 'returns an array of show metadata objects'
      },
      {
        name: 'getById Movie',
        method: 'get',
        path: 'movie/:id/id',
        description: 'returns a single movie\'s metadata'
      },
      {
        name: 'getById show',
        method: 'get',
        path: 'show/:id/id',
        description: 'returns a single show\'s metadata'
      },
      {
        name: 'images',
        method: 'get',
        path: '/image/$size/$imgURL',
        description: 'retrieves an image with a specified size'
      },
      
    ],
  }),
  computed: {},
  methods: {
    async load(func, params = {}){
      this.isLoading = true
      await func(params)
      this.isLoading = false
    },
    async importMovies(){
      await this.$http('/movies-import')
    },
    async graphMovies(){
      await this.$http('/movies-graph')
    },
    async importShows(){
      await this.$http('/shows-import')
    },
    async graphShows(){
      await this.$http('/shows-graph')
    },
  }
};

</script>
