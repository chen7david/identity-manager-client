<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col align="center" cols="12">
                <v-card width="300px" v-for="user of users" :key="user.id">
                    {{user}}
                </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>

export default {
    name: 'Account',
    data: () => ({
        users: [],
    }),
    computed: {
    },
    methods: {
        async fetchUser(){
           const { data } = await this.$http.get('/users')
           this.users = data
        }
    },
    async mounted(){
        await this.fetchUser()
    }
}
</script>