<template>
  <v-app>
    <Navbar/>
    <v-main>
      <Snackbar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Snackbar from './components/Snackbar'

export default {
  name: 'App',

  components: {
    Navbar,
    Snackbar
  },

  data: () => ({
    
  }),
};
</script>