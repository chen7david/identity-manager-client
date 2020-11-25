<template>
    <v-container fluid>
        <v-row fill-height>
            <v-col cols="12">
                <v-row fill-height justify="space-around">
                    <v-col v-for="user of users" :key="user.id">
                        <UserCard :user="user"/>
                    </v-col>
                    <!-- <v-data-table
                        :headers="headers"
                        :items="users"
                        class="elevation-1"
                        
                        item-key="name"
                    >
                        <template v-slot:items="props">
                             <tr :active="props.selected" @click="props.selected = !props.selected">
                            <td>
                                <v-checkbox
                                    :input-value="props.selected"
                                    primary
                                    hide-details
                                ></v-checkbox>
                            </td>
                                <td>{{ props.item.name }}</td>
                                <td class="text-xs-right">{{ props.item.calories }}</td>
                                <td class="text-xs-right">{{ props.item.fat }}</td>
                                <td class="text-xs-right">{{ props.item.carbs }}</td>
                                <td class="text-xs-right">{{ props.item.protein }}</td>
                                <td class="text-xs-right">{{ props.item.iron }}</td>
                             </tr>
                        </template>
                    </v-data-table> -->
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
        headers: [
            { text: 'UserID', value: 'userId' },
            { text: 'Phone', value: 'phone' },
            { text: 'Email', value: 'email' },
            { text: 'First Name', value: 'firstName' },
            { text: 'LastName', value: 'lastName' },
        ],
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