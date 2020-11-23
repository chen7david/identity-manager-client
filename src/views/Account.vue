<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col align="center" cols="12">
                <v-card max-width="400">
                   <v-col>{{$user}}</v-col>
                </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Account',
    data: () => ({
        user: {
            phone: '18500420909',
            password: '888888',
        },
        show: false,
    }),
    computed: {
        ...mapGetters([
            '$user',
            'isLoading'
        ])
    },
    methods: {
        ...mapActions([
            '$setUserTo'
        ]),
        async login(){
           const { data } = await this.$http.post('/login', this.user)
           localStorage.setItem('access-token', data.accessToken)
           localStorage.setItem('refresh-token', data.refreshToken)
           localStorage.setItem('user', JSON.stringify(data.user))
           this.$setUserTo(data.user)
        }
    }
}
</script>