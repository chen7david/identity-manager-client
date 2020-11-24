<template>
  <div class="text-center">
    <v-snackbar
      top
      v-model="snackbar.show"
      :multi-line="multiLine"
      :color="snackbar.color || `success`"
      :timeout="snackbar.timeout || 6000"
      class="text--center"
    >
      {{ snackbar.message }}
      <template v-slot:action>
        <v-btn text @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
      
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'Snackbar',
    data: () => ({
      multiLine:true
    }),
    computed:{
        ...mapGetters([
            'snackbar',
        ]),
    },
    methods:{
    }
}
</script>