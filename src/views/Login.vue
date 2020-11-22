<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col align="center" cols="12">
                <v-card max-width="400">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline">Login</div>
                        </v-list-item-content>
                    </v-list-item>
                    
                    <v-col>
                        <v-col>
                            <v-text-field
                                :error-messages="validate('phone')"
                                label="Phone"
                                name="phone"
                                outlined
                                clearable
                                hint="please enter an 11 digit number"
                                v-model="user.phone"
                            ></v-text-field>
                        
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
                                v-model="user.password"
                            ></v-text-field>
                        </v-col>
                        <v-btn :loading="isLoading" large elevation="0" @click="login(user)" block >login</v-btn>  
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Login',
    data: () => ({
        user: {
            phone: '18500420909',
            password: '888888',
        },
        show: false,
    }),
    computed: {
        ...mapGetters([
            'validate',
            'isLoading'
        ])
    },
    methods: {
        async login(){
           const { data } = await this.$http.post('/login', this.user)
           console.log({data})
        }
    }
}
</script>