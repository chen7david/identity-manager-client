<template>
    <nav>
        <v-navigation-drawer
            app
            dark
            v-model="drawer"
        >       
            <v-row justify="center" class="my-5">
                <v-avatar size="150px">
                    <img src="@/../public/male.png" alt="">
                    <!-- <img src="@/../public/female.png" alt=""> -->
                </v-avatar>
                <v-list-item three-line class="text-center">
                    <v-list-item-content>
                        <v-list-item-title>{{$user.email || 'unknown user'}}</v-list-item-title>
                        <v-list-item-subtitle class="my-2">'unknown role'</v-list-item-subtitle>
                        <v-list-item-subtitle>
                            <v-chip class="font-weight-bold" color="success">$0</v-chip>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-switch
                v-model="dark"
                color="purple"
                hide-details
                inset
            ></v-switch>
            </v-row>
            
            <v-list>
                <v-list-item
                    v-for="link of links"
                    :key="link.to"
                    router
                    :to="link.to"
                >
                    <v-list-item-action>
                        <v-icon>{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>{{link.name}}</v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            app
            dark
        >
            <v-app-bar-nav-icon @click="drawer = !drawer"/>
            <v-spacer></v-spacer>
            <div v-if="!isAuth">
                <v-btn tile router to="/login">Login</v-btn>
                <v-btn tile router to="/register">Register</v-btn>
            </div>
            <div v-else>
                <v-btn @click="logout" tile>Logout</v-btn>
            </div>
        </v-app-bar>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Navbar',
    data: () => ({
        drawer: true,
        dark: true,
    }),
    computed:{
        ...mapGetters([
            'links',
            '$user',
            'isAuth'
        ])
    }, 
    watch: {
      dark(dark){
        this.$vuetify.theme.dark = dark
      }
    },
    methods: {
        ...mapActions([
            '$setUserTo'
        ]),
        logout(){
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            localStorage.removeItem('user') 
            this.$setUserTo(null)
            this.$router.push('/login')
        }
    }
}
</script>