<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col align="center" cols="12">
                <v-card max-width="500">
                    <v-col>
                        <v-col>
                        <v-text-field
                            :error-messages="validate('username')"
                            label="Username"
                            name="username"
                            outlined
                            clearable
                            hint="At least 1 character, no spaces"
                            v-model="newuser.username"
                        ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                :error-messages="validate('email')"
                                label="Email"
                                name="email"
                                outlined
                                clearable
                                hint="please enter a valid email"
                                v-model="newuser.email"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                :error-messages="validate('password')"
                                label="Password"
                                name="password"
                                outlined
                                clearable
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                hint="At least 6 characters"
                                @click:append="show = !show"
                                v-model="newuser.password"
                            ></v-text-field>
                        </v-col>
                        <v-btn :loading="isLoading" large elevation="0" @click="register(newuser)" block >register</v-btn>  
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Register',
    data: () => ({
        newuser: {},
        show: false,
    }),
    computed: {
        ...mapGetters([
            'validate',
            'isLoading'
        ])
    },
    methods: {
        async register(){
           const { data } = await this.$http.post('/register', this.newuser)
           console.log({data})
        }
    }
}
</script>