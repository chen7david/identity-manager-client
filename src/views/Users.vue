<template>
    <v-container fluid>
        <v-row fill-height>
            <v-col cols="12">
                <v-row fill-height justify="space-around">
                    <v-col v-for="user of users" :key="user.id">
                        <UserCard :item="user"/>
                    </v-col>
                </v-row> 
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import UserCard from './../components/UserCard'

export default {
    name: 'Account',
    components: {
        UserCard
    },
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