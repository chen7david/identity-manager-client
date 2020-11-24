<template>
    <v-container fluid>
        <v-row fill-height>
            <v-col cols="12">
                <v-row fill-height justify="space-around">
                    <v-col v-for="user of users" :key="user.id">
                        <v-card width="300px">
                            {{user.email}}
                            <hr>
                            {{user.phone}}
                        </v-card>
                    </v-col>
                </v-row>
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