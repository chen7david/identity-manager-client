<template>
  <v-card width="400" color="#286fa8" class="white--text" tile>
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-toolbar-title class="title white--text text-capitalize">
              {{item.email}}
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <UserUpdateForm class="ma-0" :item="item"/>
            <v-btn color="white" icon>
              <v-icon small>mdi-close</v-icon>
            </v-btn>
    </v-app-bar>
    <v-card-subtitle class="ma-0">
      {{item.phone}} | {{age}}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import moment from 'moment'
import UserUpdateForm from './UserUpdateForm'
export default {
    name:'UserCard',
    components: {
       UserUpdateForm
    },
    props: {
        item: null
    },
    data: () => ({
    }),
    computed: {
      fromNow(){
        return moment(this.item.updated_at).fromNow()
      },
      age(){
        return this.item.birthDate ? moment().diff(this.item.birthDate, 'years') : 0
      }
    },
    methods: {
      async revoke(){
          this.$http.delete(`/tokens/${this.item.tokenId}/revoke`)
      }
    },
}
</script>