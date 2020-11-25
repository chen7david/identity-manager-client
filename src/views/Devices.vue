<template>
    <v-container fluid>
        <v-row fill-height>
            <v-col cols="12">
                <v-row fill-height justify="space-around">
                    <v-col v-for="token of tokens" :key="token.id">
                        <DeviceCard :item="token" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import DeviceCard from './../components/DeviceCard'

export default {
    name: 'Devices',
    components: {
        DeviceCard
    },
    data: () => ({
        tokens: [],
    }),
    computed: {
    },
    methods: {
        async fetchTokens(){
           const { data } = await this.$http.get('/tokens')
           console.log({data})
           this.tokens = data
        },
    },
    async mounted(){
        await this.fetchTokens()
    }
}
</script>