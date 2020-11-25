<template>
  <v-card width="400" :color="bgColor" class="white--text" tile>
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-toolbar-title class="title white--text text-capitalize">
              {{device.browser.name}}
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="white" icon v-if="isActive">
              <v-icon @click="revoke" small>mdi-close</v-icon>
            </v-btn>
    </v-app-bar>
    <v-card-subtitle class="ma-0">
      {{device.platform}} {{device.os.name}} {{device.os.version.info}} | {{item.call_count}} | {{fromNow}}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import ua from 'ua_parser'
import moment from 'moment'

export default {
    name:'DeviceCard',
    props: {
        item: null
    },
    data: () => ({
        tokens: [],
    }),
    computed: {
      device(){
        return ua.userAgent(this.item.useragent)
      },
      fromNow(){
        return moment(this.item.updated_at).fromNow()
      },
      bgColor(){
          if(this.item.revoked) return '#E65100'
          return this.item.active ? '#303F9F' : '#263238'
      },
      isActive(){
        return this.item.active && !this.item.revoked
      }
    },
    methods: {
      async revoke(){
          this.$http.delete(`/tokens/${this.item.tokenId}/revoke`)
      }
    },
}
</script>