<template>
    <v-dialog v-model="dialog" persistent max-width="600px">

      <template v-slot:activator="{ on, attrs }">
        <v-btn color="white"  icon v-bind="attrs" v-on="on">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-card tile>

        <v-card-title>
          <span class="headline">Update User</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal first name*"
                  required
                  v-model="users.firstName"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="users.email"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  v-model="users.password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
export default {
    props: {
       item: null 
    },
    data: () => ({
        dialog: false,
        users: {}
    }),
    mounted(){
      Object.assign(this.users, this.item)
    }
}
</script>