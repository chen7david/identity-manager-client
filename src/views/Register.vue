<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col align="center" cols="12">
                <v-card max-width="400">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline">register</div>
                            <v-list-item-subtitle>create an account</v-list-item-subtitle>
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
                                v-model="newuser.phone"
                            ></v-text-field>
                        
                            <v-text-field
                                :error-messages="validate('email')"
                                label="Email"
                                name="email"
                                outlined
                                clearable
                                hint="please enter a valid email"
                                v-model="newuser.email"
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
                                v-model="newuser.password"
                            ></v-text-field>
                        
                            <v-text-field
                            v-if="newuser.password"
                                :error-messages="validate('passwordConfirm')"
                                label="Password Confirm"
                                name="passwordConfirm"
                                outlined
                                clearable
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                hint="Repeat the password you entered above"
                                @click:append="show = !show"
                                v-model="newuser.passwordConfirm"
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
        newuser: {
            phone: '18500420909',
            email: 'a@b.com',
            password: '888888',
            passwordConfirm: '888888',
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
        async register(){
           const { data } = await this.$http.post('/register', this.newuser)
           console.log({data})
        }
    }
}
</script>