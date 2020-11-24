<template>
    <v-container fluid>
        <v-row fill-height>
            <v-col cols="12">
                <v-row fill-height justify="space-around">
                    <v-col v-for="token of tokens" :key="token.id">
                        <v-card width="300px">
                            {{token.tokenId}}
                            {{token.useragent}}
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>

export default {
    name: 'Devices',
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
        }
    },
    async mounted(){
        await this.fetchTokens()
    }
}
</script>