<template>
  <v-card color="blue-grey darken-2" class="white--text" tile>
    <v-card-title title>
      <div>
        <span>{{device.browser.name}}</span>
        <br/>
        <span>{{device.platform}}</span>
        <br/>
        <span>{{device.os.name}}</span>
        <br/>
        <span>{{device.os.version.info}}</span>
        <span>{{device.os.version.info}}</span>
        <br/>
        {{fromNow}}
        <br/>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat dark>Listen now</v-btn>
    </v-card-actions>
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
      }
    },
    methods: {
    },
}
</script>